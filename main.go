package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"doctorhealthy1/handlers"
	"doctorhealthy1/middleware"
	"doctorhealthy1/models"
	"doctorhealthy1/services"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found, using system environment variables")
	}

	// Initialize Echo with optimized settings
	e := echo.New()
	e.HideBanner = true
	e.HidePort = true

	// Production optimizations
	if os.Getenv("ENVIRONMENT") == "production" {
		e.Debug = false
	}

	// Initialize services
	userService := services.NewUserService()
	nutritionService := services.NewNutritionService()
	workoutService := services.NewWorkoutService()
	consultationService := services.NewConsultationService()
	apiKeyService := services.NewAPIKeyService()
	securityService := services.NewSecurityAuditService(apiKeyService)
	compressionService := services.NewCompressionService()
	pwaService := services.NewPWAService()
	healthDataService := services.NewHealthDataService(".")
	mealPlanningService := services.NewMealPlanningService(".")
	workoutManagementService := services.NewWorkoutManagementService(".")
	diseaseManagementService := services.NewDiseaseManagementService(".")
	halalFilterService := services.NewHalalFilterService()
	disclaimerService := services.NewDisclaimerService()
	cookingTipsService := services.NewCookingTipsService()

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(userService)
	nutritionHandler := handlers.NewNutritionHandler(nutritionService)
	workoutHandler := handlers.NewWorkoutHandler(workoutService)
	patientHandler := handlers.NewPatientHandler(consultationService)
	adminHandler := handlers.NewAdminHandler(userService)
	apiKeyHandler := handlers.NewAPIKeyHandler(apiKeyService)
	securityHandler := handlers.NewSecurityHandler(securityService)
	pwaHandler := handlers.NewPWAHandler(pwaService)
	optimizationHandler := handlers.NewOptimizationHandler(".")
	carbCyclingHandler := handlers.NewCarbCyclingHandler(".")
	healthDataHandler := handlers.NewHealthDataHandler(healthDataService)
	mealPlanningHandler := handlers.NewMealPlanningHandler(mealPlanningService, halalFilterService, disclaimerService, cookingTipsService)
	workoutManagementHandler := handlers.NewWorkoutManagementHandler(workoutManagementService)
	diseaseManagementHandler := handlers.NewDiseaseManagementHandler(diseaseManagementService)

	// Initialize enhanced API v1 handlers
	apiV1Handler := handlers.NewAPIv1Handler()

	// Production middleware
	e.Use(echomiddleware.Logger())
	e.Use(echomiddleware.Recover())
	e.Use(middleware.SecurityHeaders())
	e.Use(middleware.CompressionMiddleware(compressionService))
	e.Use(middleware.CacheMiddleware())

	// CORS with production settings
	corsOrigins := os.Getenv("CORS_ALLOWED_ORIGINS")
	if corsOrigins == "" {
		corsOrigins = "http://localhost:8080,http://127.0.0.1:8080,https://doctorhealthy1.fly.dev"
	}
	e.Use(echomiddleware.CORSWithConfig(echomiddleware.CORSConfig{
		AllowOrigins:     []string{corsOrigins},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "X-Requested-With"},
		AllowCredentials: true,
		MaxAge:           86400,
	}))

	// Rate limiting
	e.Use(middleware.RateLimitingMiddleware())

	// Request size limiting
	maxRequestSize := os.Getenv("MAX_REQUEST_SIZE")
	if maxRequestSize == "" {
		maxRequestSize = "10M"
	}
	e.Use(echomiddleware.BodyLimit(maxRequestSize))

	// Static file serving with compression
	e.Static("/static", "public/static")
	e.File("/manifest.json", "public/manifest.json")
	e.File("/sw-v2.js", "public/sw-v2.js") // Enhanced service worker
	e.File("/sw.js", "public/sw.js")       // Legacy fallback
	e.File("/offline.html", "public/offline.html")
	
	// Root route with cache-busting headers
	e.GET("/", func(c echo.Context) error {
		c.Response().Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		c.Response().Header().Set("Pragma", "no-cache")
		c.Response().Header().Set("Expires", "0")
		return c.File("public/index.html")
	})

	// Enhanced API v1 routes (RFC 7807 compliant)
	apiV1 := e.Group("/api/v1")

	// Health endpoint
	apiV1.GET("/health", apiV1Handler.Health)

	// Authentication endpoints
	apiV1.POST("/auth/register", apiV1Handler.Register)
	apiV1.POST("/auth/login", apiV1Handler.Login)

	// Protected API v1 routes
	apiV1Protected := apiV1.Group("", middleware.JWTMiddleware())

	// Nutrition endpoints
	apiV1Protected.GET("/nutrition/plans", apiV1Handler.GetNutritionPlans)
	apiV1Protected.POST("/nutrition/plans", apiV1Handler.CreateCarbCyclingPlan)
	apiV1Protected.GET("/nutrition/plans/:id", apiV1Handler.GetNutritionPlan)
	apiV1Protected.PUT("/nutrition/plans/:id", apiV1Handler.UpdateNutritionPlan)
	apiV1Protected.DELETE("/nutrition/plans/:id", apiV1Handler.DeleteNutritionPlan)

	// Health check endpoint
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, models.APIResponse{
			Success: true,
			Message: "Nutrition Platform API is running",
			Data: map[string]string{
				"version": "1.0.0",
				"status":  "healthy",
			},
		})
	})

	// API documentation endpoint
	e.GET("/api", func(c echo.Context) error {
		docs := map[string]interface{}{
			"name":        "Nutrition Platform API",
			"version":     "1.0.0",
			"description": "Secure nutrition platform with intermittent fasting support for Arabian Gulf countries",
			"endpoints": map[string]interface{}{
				"authentication": map[string]string{
					"POST /auth/register":        "Register a new user account",
					"POST /auth/login":           "Login and get JWT token",
					"GET /auth/profile":          "Get current user profile (requires auth)",
					"PUT /auth/profile":          "Update current user profile (requires auth)",
					"POST /auth/change-password": "Change current user password (requires auth)",
				},
				"api_keys": map[string]string{
					"POST /api/keys":          "Create new API key (admin only)",
					"GET /api/keys":           "List all API keys (admin only)",
					"GET /api/keys/:id":       "Get specific API key details",
					"PUT /api/keys/:id":       "Update API key settings (admin only)",
					"DELETE /api/keys/:id":    "Revoke API key",
					"GET /api/keys/:id/stats": "Get API key usage statistics",
					"GET /api/keys/validate":  "Validate current API key",
				},
				"security": map[string]string{
					"GET /api/security/audit":           "Perform comprehensive security audit (admin only)",
					"GET /api/security/validate":        "Validate security configuration (admin only)",
					"POST /api/security/generate-key":   "Generate secure API key (admin only)",
					"GET /api/security/recommendations": "Get security recommendations (admin only)",
				},
				"optimization": map[string]string{
					"POST /api/optimize/diseases": "Optimize disease JSON files (admin only)",
					"GET /api/optimize/status":    "Get optimization status (admin only)",
					"GET /api/optimize/validate":  "Validate optimization (admin only)",
				},
				"nutrition": map[string]string{
					"POST /api/calculate-diet":       "Calculate personalized diet plan (requires auth)",
					"GET /api/nutrition-info":        "Get general nutrition information (requires auth)",
					"POST /api/validate-diet":        "Validate diet input without calculating (requires auth)",
					"GET /api/diseases/list":         "Get list of available disease nutrition guides (requires auth)",
					"GET /api/diseases/:diseaseName": "Get detailed nutrition guide for specific disease (requires auth)",
					"GET /api/injuries/list":         "Get list of available injury rehabilitation guides (requires auth)",
					"GET /api/injuries/:injuryName":  "Get detailed rehabilitation guide for specific injury (requires auth)",
				},
				"metabolism": map[string]string{
					"GET /api/metabolism":        "Get comprehensive metabolism data (requires auth)",
					"GET /api/metabolism/search": "Search metabolism data by keyword (requires auth)",
				},
				"old_diseases": map[string]string{
					"GET /api/old-diseases":              "Get old diseases data (requires auth)",
					"GET /api/old-diseases/search":       "Search old diseases data by keyword (requires auth)",
					"GET /api/old-diseases/:diseaseName": "Get specific disease data (requires auth)",
				},
				"workout_techniques": map[string]string{
					"GET /api/workout-techniques":                "Get workout techniques data (requires auth)",
					"GET /api/workout-techniques/:techniqueName": "Get specific workout technique (requires auth)",
				},
				"meal_plans": map[string]string{
					"GET /api/meal-plans": "Get meal plans data (requires auth)",
				},
				"calories": map[string]string{
					"GET /api/calories":           "Get calories data (requires auth)",
					"GET /api/calories/:foodName": "Get calorie information for specific food (requires auth)",
				},
				"drug_nutrition": map[string]string{
					"GET /api/drug-nutrition": "Get drug nutrition effects data (requires auth)",
				},
				"vitamins_minerals": map[string]string{
					"GET /api/vitamins-minerals":               "Get vitamins and minerals data (requires auth)",
					"GET /api/vitamins-minerals/:nutrientName": "Get specific nutrient data (requires auth)",
				},
				"type_plans": map[string]string{
					"GET /api/type-plans": "Get type plans data (requires auth)",
				},
				"meal_planning": map[string]string{
					"POST /api/meal-planning/generate":                             "Generate personalized meal plan (requires auth)",
					"GET /api/meal-planning/cuisines":                              "Get available cuisines/countries (requires auth)",
					"GET /api/meal-planning/diet-types":                            "Get available diet types (requires auth)",
					"GET /api/meal-planning/cuisines/:cuisine/recipes":             "Get recipes for specific cuisine (requires auth)",
					"GET /api/meal-planning/cuisines/:cuisine/recipes/:recipeName": "Get detailed recipe information (requires auth)",
					"POST /api/meal-planning/calculate-nutrition":                  "Calculate nutritional needs (requires auth)",
					"GET /api/meal-planning/templates/:dietType":                   "Get meal plan template for diet type (requires auth)",
					"GET /api/meal-planning/recipes":                               "Get filtered recipes by cuisine/diet/meal type (requires auth)",
					"POST /api/meal-planning/validate":                             "Validate meal plan request (requires auth)",
					"GET /api/meal-planning/statistics":                            "Get meal planning statistics (requires auth)",
				},
				"workout_management": map[string]string{
					"POST /api/workout-management/generate":               "Generate personalized workout plan (requires auth)",
					"GET /api/workout-management/exercise-types":          "Get available exercise types (requires auth)",
					"GET /api/workout-management/injuries":                "Get available injuries (requires auth)",
					"GET /api/workout-management/complaints":              "Get available health complaints (requires auth)",
					"GET /api/workout-management/goals":                   "Get available workout goals (requires auth)",
					"GET /api/workout-management/equipment-types":         "Get available equipment types (requires auth)",
					"GET /api/workout-management/muscle-groups":           "Get available muscle groups (requires auth)",
					"GET /api/workout-management/difficulty-levels":       "Get available difficulty levels (requires auth)",
					"GET /api/workout-management/injuries/:injuryID":      "Get detailed injury information (requires auth)",
					"GET /api/workout-management/complaints/:complaintID": "Get detailed complaint information (requires auth)",
					"GET /api/workout-management/exercises/by-goal":       "Get exercises filtered by goal (requires auth)",
					"GET /api/workout-management/exercises/by-equipment":  "Get exercises filtered by equipment (requires auth)",
					"POST /api/workout-management/validate":               "Validate workout request (requires auth)",
					"GET /api/workout-management/statistics":              "Get workout management statistics (requires auth)",
				},
				"disease_management": map[string]string{
					"POST /api/disease-management/generate":                 "Generate personalized disease management plan (requires auth)",
					"GET /api/disease-management/diseases":                  "Get available diseases (requires auth)",
					"GET /api/disease-management/medications":               "Get available medications (requires auth)",
					"GET /api/disease-management/categories":                "Get disease categories (requires auth)",
					"GET /api/disease-management/severity-levels":           "Get severity levels (requires auth)",
					"GET /api/disease-management/treatment-types":           "Get treatment types (requires auth)",
					"GET /api/disease-management/prevention-types":          "Get prevention types (requires auth)",
					"GET /api/disease-management/monitoring-types":          "Get monitoring types (requires auth)",
					"GET /api/disease-management/diseases/:diseaseID":       "Get detailed disease information (requires auth)",
					"GET /api/disease-management/medications/:medicationID": "Get detailed medication information (requires auth)",
					"GET /api/disease-management/diseases/by-category":      "Get diseases filtered by category (requires auth)",
					"GET /api/disease-management/diseases/by-severity":      "Get diseases filtered by severity (requires auth)",
					"GET /api/disease-management/medications/by-category":   "Get medications filtered by category (requires auth)",
					"POST /api/disease-management/check-interactions":       "Check drug interactions (requires auth)",
					"POST /api/disease-management/validate":                 "Validate disease request (requires auth)",
					"GET /api/disease-management/statistics":                "Get disease management statistics (requires auth)",
				},
				"health_data_management": map[string]string{
					"GET /api/health-data/types":   "Get available data types (requires auth)",
					"GET /api/health-data/stats":   "Get health data statistics (requires auth)",
					"POST /api/health-data/reload": "Reload data files (admin only)",
				},
				"admin": map[string]string{
					"GET /admin/users":              "List all users (admin only)",
					"GET /admin/users/:id":          "Get specific user (admin only)",
					"PUT /admin/users/:id":          "Update user information (admin only)",
					"DELETE /admin/users/:id":       "Delete user account (admin only)",
					"POST /admin/users/:id/promote": "Promote user to admin (admin only)",
					"POST /admin/users/:id/demote":  "Demote admin to user (admin only)",
				},
			},
			"authentication": map[string]string{
				"type":   "Bearer JWT or API Key",
				"header": "Authorization: Bearer <token> or Authorization: APIKey <api_key>",
			},
			"default_admin": map[string]string{
				"username": "admin",
				"password": "admin123",
			},
		}

		return c.JSON(http.StatusOK, models.APIResponse{
			Success: true,
			Data:    docs,
		})
	})

	// Public routes (no authentication required)
	e.POST("/auth/register", authHandler.Register)
	e.POST("/auth/login", authHandler.Login)

	// API Key protected routes (API key authentication required)
	apiKeyProtected := e.Group("/api/", middleware.APIKeyMiddleware(apiKeyService))

	// Nutrition routes with API key access
	apiKeyProtected.POST("calculate-diet", nutritionHandler.CalculateDiet, middleware.RequireAPIPermission("nutrition:read"))
	apiKeyProtected.GET("nutrition-info", nutritionHandler.GetNutritionInfo, middleware.RequireAPIPermission("nutrition:read"))
	apiKeyProtected.POST("validate-diet", nutritionHandler.ValidateDietInput, middleware.RequireAPIPermission("nutrition:read"))

	// Disease data routes with API key access
	apiKeyProtected.GET("diseases/list", nutritionHandler.GetDiseaseList, middleware.RequireAPIPermission("diseases:read"))
	apiKeyProtected.GET("diseases/:diseaseName", nutritionHandler.GetDiseaseInfo, middleware.RequireAPIPermission("diseases:read"))

	// Injury management routes with API key access
	apiKeyProtected.GET("injuries/list", nutritionHandler.GetInjuryList, middleware.RequireAPIPermission("injuries:read"))
	apiKeyProtected.GET("injuries/:injuryName", nutritionHandler.GetInjuryInfo, middleware.RequireAPIPermission("injuries:read"))

	// Metabolism data routes with API key access
	apiKeyProtected.GET("metabolism", healthDataHandler.GetMetabolismData, middleware.RequireAPIPermission("metabolism:read"))
	apiKeyProtected.GET("metabolism/search", healthDataHandler.SearchMetabolismData, middleware.RequireAPIPermission("metabolism:read"))

	// Old diseases data routes with API key access
	apiKeyProtected.GET("old-diseases", healthDataHandler.GetOldDiseasesData, middleware.RequireAPIPermission("old_diseases:read"))
	apiKeyProtected.GET("old-diseases/search", healthDataHandler.SearchOldDiseasesData, middleware.RequireAPIPermission("old_diseases:read"))
	apiKeyProtected.GET("old-diseases/:diseaseName", healthDataHandler.GetDiseaseByName, middleware.RequireAPIPermission("old_diseases:read"))

	// Workout techniques data routes with API key access
	apiKeyProtected.GET("workout-techniques", healthDataHandler.GetWorkoutTechniquesData, middleware.RequireAPIPermission("workout_techniques:read"))
	apiKeyProtected.GET("workout-techniques/:techniqueName", healthDataHandler.GetWorkoutTechniqueByName, middleware.RequireAPIPermission("workout_techniques:read"))

	// Meal plans data routes with API key access
	apiKeyProtected.GET("meal-plans", healthDataHandler.GetMealPlansData, middleware.RequireAPIPermission("meal_plans:read"))

	// Calories data routes with API key access
	apiKeyProtected.GET("calories", healthDataHandler.GetCaloriesData, middleware.RequireAPIPermission("calories:read"))
	apiKeyProtected.GET("calories/:foodName", healthDataHandler.GetCalorieInfo, middleware.RequireAPIPermission("calories:read"))

	// Drug nutrition data routes with API key access
	apiKeyProtected.GET("drug-nutrition", healthDataHandler.GetDrugNutritionData, middleware.RequireAPIPermission("drug_nutrition:read"))

	// Vitamins and minerals data routes with API key access
	apiKeyProtected.GET("vitamins-minerals", healthDataHandler.GetVitaminsMineralsData, middleware.RequireAPIPermission("vitamins_minerals:read"))
	apiKeyProtected.GET("vitamins-minerals/:nutrientName", healthDataHandler.GetVitaminMineralByName, middleware.RequireAPIPermission("vitamins_minerals:read"))

	// Type plans data routes with API key access
	apiKeyProtected.GET("type-plans", healthDataHandler.GetTypePlansData, middleware.RequireAPIPermission("type_plans:read"))

	// Meal planning routes with API key access
	apiKeyProtected.POST("meal-planning/generate", mealPlanningHandler.GenerateMealPlan, middleware.RequireAPIPermission("meal_plans:read"))
	apiKeyProtected.GET("meal-planning/cuisines", mealPlanningHandler.GetAvailableCuisines)
	apiKeyProtected.GET("meal-planning/diet-types", mealPlanningHandler.GetAvailableDietTypes)
	apiKeyProtected.GET("meal-planning/cuisines/:cuisine/recipes", mealPlanningHandler.GetRecipesByCuisine, middleware.RequireAPIPermission("meal_plans:read"))
	apiKeyProtected.GET("meal-planning/cuisines/:cuisine/recipes/:recipeName", mealPlanningHandler.GetRecipeDetails, middleware.RequireAPIPermission("meal_plans:read"))
	apiKeyProtected.POST("meal-planning/calculate-nutrition", mealPlanningHandler.CalculateNutritionalNeeds, middleware.RequireAPIPermission("meal_plans:read"))
	apiKeyProtected.GET("meal-planning/templates/:dietType", mealPlanningHandler.GetMealPlanTemplate, middleware.RequireAPIPermission("meal_plans:read"))
	apiKeyProtected.GET("meal-planning/recipes", mealPlanningHandler.GetCuisineRecipes, middleware.RequireAPIPermission("meal_plans:read"))
	apiKeyProtected.POST("meal-planning/validate", mealPlanningHandler.ValidateMealPlanRequest, middleware.RequireAPIPermission("meal_plans:read"))
	apiKeyProtected.GET("meal-planning/statistics", mealPlanningHandler.GetMealPlanStatistics, middleware.RequireAPIPermission("meal_plans:read"))

	// Workout management routes with API key access
	apiKeyProtected.POST("workout-management/generate", workoutManagementHandler.GenerateWorkoutPlan, middleware.RequireAPIPermission("workout_management:read"))
	apiKeyProtected.GET("workout-management/exercise-types", workoutManagementHandler.GetAvailableExerciseTypes)
	apiKeyProtected.GET("workout-management/injuries", workoutManagementHandler.GetAvailableInjuries)
	apiKeyProtected.GET("workout-management/complaints", workoutManagementHandler.GetAvailableComplaints)
	apiKeyProtected.GET("workout-management/goals", workoutManagementHandler.GetWorkoutGoals)
	apiKeyProtected.GET("workout-management/equipment-types", workoutManagementHandler.GetEquipmentTypes)
	apiKeyProtected.GET("workout-management/muscle-groups", workoutManagementHandler.GetMuscleGroups)
	apiKeyProtected.GET("workout-management/difficulty-levels", workoutManagementHandler.GetDifficultyLevels)
	apiKeyProtected.GET("workout-management/injuries/:injuryID", workoutManagementHandler.GetInjuryDetails)
	apiKeyProtected.GET("workout-management/complaints/:complaintID", workoutManagementHandler.GetComplaintDetails)
	apiKeyProtected.GET("workout-management/exercises/by-goal", workoutManagementHandler.GetExercisesByGoal)
	apiKeyProtected.GET("workout-management/exercises/by-equipment", workoutManagementHandler.GetExercisesByEquipment)
	apiKeyProtected.POST("workout-management/validate", workoutManagementHandler.ValidateWorkoutRequest)
	apiKeyProtected.GET("workout-management/statistics", workoutManagementHandler.GetWorkoutStatistics)

	// Disease management routes with API key access
	apiKeyProtected.POST("disease-management/generate", diseaseManagementHandler.GenerateDiseasePlan, middleware.RequireAPIPermission("disease_management:read"))
	apiKeyProtected.GET("disease-management/diseases", diseaseManagementHandler.GetAvailableDiseases)
	apiKeyProtected.GET("disease-management/medications", diseaseManagementHandler.GetAvailableMedications)
	apiKeyProtected.GET("disease-management/categories", diseaseManagementHandler.GetDiseaseCategories)
	apiKeyProtected.GET("disease-management/severity-levels", diseaseManagementHandler.GetSeverityLevels)
	apiKeyProtected.GET("disease-management/treatment-types", diseaseManagementHandler.GetTreatmentTypes)
	apiKeyProtected.GET("disease-management/prevention-types", diseaseManagementHandler.GetPreventionTypes)
	apiKeyProtected.GET("disease-management/monitoring-types", diseaseManagementHandler.GetMonitoringTypes)
	apiKeyProtected.GET("disease-management/diseases/:diseaseID", diseaseManagementHandler.GetDiseaseDetails)
	apiKeyProtected.GET("disease-management/medications/:medicationID", diseaseManagementHandler.GetMedicationDetails)
	apiKeyProtected.GET("disease-management/diseases/by-category", diseaseManagementHandler.GetDiseasesByCategory)
	apiKeyProtected.GET("disease-management/diseases/by-severity", diseaseManagementHandler.GetDiseasesBySeverity)
	apiKeyProtected.GET("disease-management/medications/by-category", diseaseManagementHandler.GetMedicationsByCategory)
	apiKeyProtected.POST("disease-management/check-interactions", diseaseManagementHandler.CheckDrugInteractions)
	apiKeyProtected.POST("disease-management/validate", diseaseManagementHandler.ValidateDiseaseRequest)
	apiKeyProtected.GET("disease-management/statistics", diseaseManagementHandler.GetDiseaseStatistics)

	// Health data management routes
	apiKeyProtected.GET("health-data/types", healthDataHandler.GetAvailableDataTypes)
	apiKeyProtected.GET("health-data/stats", healthDataHandler.GetHealthDataStats, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.POST("health-data/reload", healthDataHandler.ReloadData, middleware.RequireAPIPermission("admin:full"))

	// API key management routes
	apiKeyProtected.POST("keys", apiKeyHandler.CreateAPIKey, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.GET("keys", apiKeyHandler.ListAPIKeys, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.GET("keys/:id", apiKeyHandler.GetAPIKey)
	apiKeyProtected.PUT("keys/:id", apiKeyHandler.UpdateAPIKey, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.DELETE("keys/:id", apiKeyHandler.RevokeAPIKey)
	apiKeyProtected.GET("keys/:id/stats", apiKeyHandler.GetAPIKeyStats)
	apiKeyProtected.GET("keys/validate", apiKeyHandler.ValidateAPIKey)

	// Security audit routes
	apiKeyProtected.GET("security/audit", securityHandler.SecurityAudit, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.GET("security/validate", securityHandler.ValidateSecurityConfiguration, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.POST("security/generate-key", securityHandler.GenerateSecureAPIKey, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.GET("security/recommendations", securityHandler.GetSecurityRecommendations, middleware.RequireAPIPermission("admin:full"))

	// Optimization routes
	apiKeyProtected.POST("optimize/diseases", optimizationHandler.OptimizeDiseaseFiles, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.GET("optimize/status", optimizationHandler.GetOptimizationStatus, middleware.RequireAPIPermission("admin:full"))
	apiKeyProtected.GET("optimize/validate", optimizationHandler.ValidateOptimization, middleware.RequireAPIPermission("admin:full"))

	// Protected routes (JWT authentication required)
	protected := e.Group("/", middleware.JWTMiddleware())

	// User routes
	protected.GET("auth/profile", authHandler.GetProfile)
	protected.PUT("auth/profile", authHandler.UpdateProfile)
	protected.POST("auth/change-password", authHandler.ChangePassword)

	// Nutrition routes (require user role or higher)
	nutritionGroup := protected.Group("api/", middleware.RequireRole(models.RegularUser))
	nutritionGroup.POST("calculate-diet", nutritionHandler.CalculateDiet)
	nutritionGroup.GET("nutrition-info", nutritionHandler.GetNutritionInfo)
	nutritionGroup.POST("validate-diet", nutritionHandler.ValidateDietInput)

	// Workout routes (require user role or higher)
	workoutGroup := protected.Group("api/", middleware.RequireRole(models.RegularUser))
	workoutGroup.POST("generate-workout", workoutHandler.GenerateWorkoutPlan)
	workoutGroup.GET("workout-history", workoutHandler.GetWorkoutHistory)

	// Patient consultation routes (require user role or higher)
	patientGroup := protected.Group("api/", middleware.RequireRole(models.RegularUser))
	patientGroup.POST("consultation", patientHandler.GetConsultation)
	patientGroup.GET("consultation-history", patientHandler.GetConsultationHistory)

	// Disease data routes (require user role or higher)
	diseaseGroup := protected.Group("api/diseases/", middleware.RequireRole(models.RegularUser))
	diseaseGroup.GET("list", nutritionHandler.GetDiseaseList)
	diseaseGroup.GET(":diseaseName", nutritionHandler.GetDiseaseInfo)

	// Injury management routes (require user role or higher)
	injuryGroup := protected.Group("api/injuries/", middleware.RequireRole(models.RegularUser))
	injuryGroup.GET("list", nutritionHandler.GetInjuryList)
	injuryGroup.GET(":injuryName", nutritionHandler.GetInjuryInfo)

	// Metabolism data routes (require user role or higher)
	metabolismGroup := protected.Group("api/metabolism/", middleware.RequireRole(models.RegularUser))
	metabolismGroup.GET("", healthDataHandler.GetMetabolismData)
	metabolismGroup.GET("search", healthDataHandler.SearchMetabolismData)

	// Old diseases data routes (require user role or higher)
	oldDiseasesGroup := protected.Group("api/old-diseases/", middleware.RequireRole(models.RegularUser))
	oldDiseasesGroup.GET("", healthDataHandler.GetOldDiseasesData)
	oldDiseasesGroup.GET("search", healthDataHandler.SearchOldDiseasesData)
	oldDiseasesGroup.GET(":diseaseName", healthDataHandler.GetDiseaseByName)

	// Workout techniques data routes (require user role or higher)
	workoutTechniquesGroup := protected.Group("api/workout-techniques/", middleware.RequireRole(models.RegularUser))
	workoutTechniquesGroup.GET("", healthDataHandler.GetWorkoutTechniquesData)
	workoutTechniquesGroup.GET(":techniqueName", healthDataHandler.GetWorkoutTechniqueByName)

	// Meal plans data routes (require user role or higher)
	mealPlansGroup := protected.Group("api/meal-plans/", middleware.RequireRole(models.RegularUser))
	mealPlansGroup.GET("", healthDataHandler.GetMealPlansData)

	// Calories data routes (require user role or higher)
	caloriesGroup := protected.Group("api/calories/", middleware.RequireRole(models.RegularUser))
	caloriesGroup.GET("", healthDataHandler.GetCaloriesData)
	caloriesGroup.GET(":foodName", healthDataHandler.GetCalorieInfo)

	// Drug nutrition data routes (require user role or higher)
	drugNutritionGroup := protected.Group("api/drug-nutrition/", middleware.RequireRole(models.RegularUser))
	drugNutritionGroup.GET("", healthDataHandler.GetDrugNutritionData)

	// Vitamins and minerals data routes (require user role or higher)
	vitaminsMineralsGroup := protected.Group("api/vitamins-minerals/", middleware.RequireRole(models.RegularUser))
	vitaminsMineralsGroup.GET("", healthDataHandler.GetVitaminsMineralsData)
	vitaminsMineralsGroup.GET(":nutrientName", healthDataHandler.GetVitaminMineralByName)

	// Type plans data routes (require user role or higher)
	typePlansGroup := protected.Group("api/type-plans/", middleware.RequireRole(models.RegularUser))
	typePlansGroup.GET("", healthDataHandler.GetTypePlansData)

	// Meal planning routes (require user role or higher)
	mealPlanningGroup := protected.Group("api/meal-planning/", middleware.RequireRole(models.RegularUser))
	mealPlanningGroup.POST("generate", mealPlanningHandler.GenerateMealPlan)
	mealPlanningGroup.GET("cuisines", mealPlanningHandler.GetAvailableCuisines)
	mealPlanningGroup.GET("diet-types", mealPlanningHandler.GetAvailableDietTypes)
	mealPlanningGroup.GET("cuisines/:cuisine/recipes", mealPlanningHandler.GetRecipesByCuisine)
	mealPlanningGroup.GET("cuisines/:cuisine/recipes/:recipeName", mealPlanningHandler.GetRecipeDetails)
	mealPlanningGroup.POST("calculate-nutrition", mealPlanningHandler.CalculateNutritionalNeeds)
	mealPlanningGroup.GET("templates/:dietType", mealPlanningHandler.GetMealPlanTemplate)
	mealPlanningGroup.GET("recipes", mealPlanningHandler.GetCuisineRecipes)
	mealPlanningGroup.POST("validate", mealPlanningHandler.ValidateMealPlanRequest)
	mealPlanningGroup.GET("statistics", mealPlanningHandler.GetMealPlanStatistics)

	// Workout management routes (require user role or higher)
	workoutManagementGroup := protected.Group("api/workout-management/", middleware.RequireRole(models.RegularUser))
	workoutManagementGroup.POST("generate", workoutManagementHandler.GenerateWorkoutPlan)
	workoutManagementGroup.GET("exercise-types", workoutManagementHandler.GetAvailableExerciseTypes)
	workoutManagementGroup.GET("injuries", workoutManagementHandler.GetAvailableInjuries)
	workoutManagementGroup.GET("complaints", workoutManagementHandler.GetAvailableComplaints)
	workoutManagementGroup.GET("goals", workoutManagementHandler.GetWorkoutGoals)
	workoutManagementGroup.GET("equipment-types", workoutManagementHandler.GetEquipmentTypes)
	workoutManagementGroup.GET("muscle-groups", workoutManagementHandler.GetMuscleGroups)
	workoutManagementGroup.GET("difficulty-levels", workoutManagementHandler.GetDifficultyLevels)
	workoutManagementGroup.GET("injuries/:injuryID", workoutManagementHandler.GetInjuryDetails)
	workoutManagementGroup.GET("complaints/:complaintID", workoutManagementHandler.GetComplaintDetails)
	workoutManagementGroup.GET("exercises/by-goal", workoutManagementHandler.GetExercisesByGoal)
	workoutManagementGroup.GET("exercises/by-equipment", workoutManagementHandler.GetExercisesByEquipment)
	workoutManagementGroup.POST("validate", workoutManagementHandler.ValidateWorkoutRequest)
	workoutManagementGroup.GET("statistics", workoutManagementHandler.GetWorkoutStatistics)

	// Disease management routes (require user role or higher)
	diseaseManagementGroup := protected.Group("api/disease-management/", middleware.RequireRole(models.RegularUser))
	diseaseManagementGroup.POST("generate", diseaseManagementHandler.GenerateDiseasePlan)
	diseaseManagementGroup.GET("diseases", diseaseManagementHandler.GetAvailableDiseases)
	diseaseManagementGroup.GET("medications", diseaseManagementHandler.GetAvailableMedications)
	diseaseManagementGroup.GET("categories", diseaseManagementHandler.GetDiseaseCategories)
	diseaseManagementGroup.GET("severity-levels", diseaseManagementHandler.GetSeverityLevels)
	diseaseManagementGroup.GET("treatment-types", diseaseManagementHandler.GetTreatmentTypes)
	diseaseManagementGroup.GET("prevention-types", diseaseManagementHandler.GetPreventionTypes)
	diseaseManagementGroup.GET("monitoring-types", diseaseManagementHandler.GetMonitoringTypes)
	diseaseManagementGroup.GET("diseases/:diseaseID", diseaseManagementHandler.GetDiseaseDetails)
	diseaseManagementGroup.GET("medications/:medicationID", diseaseManagementHandler.GetMedicationDetails)
	diseaseManagementGroup.GET("diseases/by-category", diseaseManagementHandler.GetDiseasesByCategory)
	diseaseManagementGroup.GET("diseases/by-severity", diseaseManagementHandler.GetDiseasesBySeverity)
	diseaseManagementGroup.GET("medications/by-category", diseaseManagementHandler.GetMedicationsByCategory)
	diseaseManagementGroup.POST("check-interactions", diseaseManagementHandler.CheckDrugInteractions)
	diseaseManagementGroup.POST("validate", diseaseManagementHandler.ValidateDiseaseRequest)
	diseaseManagementGroup.GET("statistics", diseaseManagementHandler.GetDiseaseStatistics)

	// Health data management routes (require user role or higher)
	healthDataGroup := protected.Group("api/health-data/", middleware.RequireRole(models.RegularUser))
	healthDataGroup.GET("types", healthDataHandler.GetAvailableDataTypes)
	healthDataGroup.GET("stats", healthDataHandler.GetHealthDataStats)

	// Carb cycling routes (require user role or higher)
	carbCyclingGroup := protected.Group("api/carb-cycling/", middleware.RequireRole(models.RegularUser))
	carbCyclingGroup.POST("personalized-plan", carbCyclingHandler.GeneratePersonalizedPlan)
	carbCyclingGroup.GET("templates", carbCyclingHandler.GetCarbCyclingTemplates)
	carbCyclingGroup.POST("calculate-macros", carbCyclingHandler.CalculateMacros)
	carbCyclingGroup.POST("validate-nutrition", carbCyclingHandler.ValidateNutritionInput)

	// Admin routes (require admin role)
	adminGroup := protected.Group("admin/", middleware.RequireRole(models.Admin))
	adminGroup.GET("users", adminHandler.ListUsers)
	adminGroup.GET("users/:id", adminHandler.GetUser)
	adminGroup.PUT("users/:id", adminHandler.UpdateUser)
	adminGroup.DELETE("users/:id", adminHandler.DeleteUser)
	adminGroup.POST("users/:id/promote", adminHandler.PromoteUser)
	adminGroup.POST("users/:id/demote", adminHandler.DemoteUser)

	// PWA routes
	e.GET("/pwa/manifest", pwaHandler.GetManifest)
	e.GET("/pwa/install", pwaHandler.GetInstallPrompt)
	e.POST("/pwa/install", pwaHandler.HandleInstall)

	// Custom error handler with compression
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		code := http.StatusInternalServerError
		message := "Internal server error"

		if he, ok := err.(*echo.HTTPError); ok {
			code = he.Code
			message = he.Message.(string)
		}

		if !c.Response().Committed {
			c.JSON(code, models.APIResponse{
				Success: false,
				Error:   message,
			})
		}
	}

	// Graceful shutdown
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	host := os.Getenv("HOST")
	if host == "" {
		host = "0.0.0.0"
	}

	server := &http.Server{
		Addr:         fmt.Sprintf("%s:%s", host, port),
		Handler:      e,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	// Start server in goroutine
	go func() {
		log.Printf("Starting Nutrition PWA Platform on %s:%s", host, port)
		log.Printf("Environment: %s", os.Getenv("ENVIRONMENT"))
		log.Printf("PWA available at: http://%s:%s", host, port)
		log.Printf("API documentation: http://%s:%s/api", host, port)
		log.Printf("Health check: http://%s:%s/health", host, port)
		log.Printf("Static files served from: public/")
		log.Printf("Root route serves: public/index.html")

		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Failed to start server:", err)
		}
	}()

	// Wait for interrupt signal for graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server shutdown complete")
}
