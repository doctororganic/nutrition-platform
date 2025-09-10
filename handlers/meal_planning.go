package handlers

import (
	"net/http"
	"strings"

	"doctorhealthy1/models"
	"doctorhealthy1/services"

	"github.com/labstack/echo/v4"
)

// MealPlanningHandler handles meal planning endpoints
type MealPlanningHandler struct {
	mealPlanningService *services.MealPlanningService
	halalFilterService  *services.HalalFilterService
	disclaimerService   *services.DisclaimerService
	cookingTipsService  *services.CookingTipsService
}

// NewMealPlanningHandler creates a new meal planning handler
func NewMealPlanningHandler(
	mealPlanningService *services.MealPlanningService,
	halalFilterService *services.HalalFilterService,
	disclaimerService *services.DisclaimerService,
	cookingTipsService *services.CookingTipsService,
) *MealPlanningHandler {
	return &MealPlanningHandler{
		mealPlanningService: mealPlanningService,
		halalFilterService:  halalFilterService,
		disclaimerService:   disclaimerService,
		cookingTipsService:  cookingTipsService,
	}
}

// GenerateMealPlan generates a personalized meal plan
func (h *MealPlanningHandler) GenerateMealPlan(c echo.Context) error {
	var request models.MealPlanRequest
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request format: " + err.Error(),
		})
	}

	// Validate request
	if err := c.Validate(&request); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Validation failed: " + err.Error(),
		})
	}

	// Generate meal plan
	response, err := h.mealPlanningService.GenerateMealPlan(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to generate meal plan: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: response.Message,
		Data: map[string]interface{}{
			"meal_plan":           response.MealPlan,
			"calculation_details": response.CalculationDetails,
			"disclaimer":          response.Disclaimer,
		},
	})
}

// GetAvailableCuisines returns available cuisines/countries
func (h *MealPlanningHandler) GetAvailableCuisines(c echo.Context) error {
	cuisines := h.mealPlanningService.GetAvailableCuisines()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"cuisines": cuisines,
			"count":    len(cuisines),
		},
	})
}

// GetAvailableDietTypes returns available diet types
func (h *MealPlanningHandler) GetAvailableDietTypes(c echo.Context) error {
	dietTypes := h.mealPlanningService.GetAvailableDietTypes()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"diet_types": dietTypes,
			"count":      len(dietTypes),
		},
	})
}

// GetRecipesByCuisine returns recipes for a specific cuisine
func (h *MealPlanningHandler) GetRecipesByCuisine(c echo.Context) error {
	cuisine := c.Param("cuisine")
	if cuisine == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Cuisine parameter is required",
		})
	}

	recipes := h.mealPlanningService.GetRecipesByCuisine(cuisine)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"cuisine": cuisine,
			"recipes": recipes,
			"count":   len(recipes),
		},
	})
}

// GetRecipeDetails returns detailed information about a specific recipe
func (h *MealPlanningHandler) GetRecipeDetails(c echo.Context) error {
	cuisine := c.Param("cuisine")
	recipeName := c.Param("recipeName")

	if cuisine == "" || recipeName == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Cuisine and recipe name parameters are required",
		})
	}

	recipes := h.mealPlanningService.GetRecipesByCuisine(cuisine)

	// Find the specific recipe
	var targetRecipe *models.Recipe
	for _, recipe := range recipes {
		if recipe.RecipeName["en"] == recipeName || recipe.RecipeName["ar"] == recipeName {
			targetRecipe = &recipe
			break
		}
	}

	if targetRecipe == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Recipe not found: " + recipeName,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    targetRecipe,
	})
}

// CalculateNutritionalNeeds calculates nutritional needs without generating a meal plan
func (h *MealPlanningHandler) CalculateNutritionalNeeds(c echo.Context) error {
	var clientData models.ClientData
	if err := c.Bind(&clientData); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid client data format: " + err.Error(),
		})
	}

	// Validate client data
	if err := c.Validate(&clientData); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Validation failed: " + err.Error(),
		})
	}

	// Calculate nutritional needs
	nutritionalNeeds := h.mealPlanningService.CalculateNutritionalNeeds(&clientData)

	// Create calculation details
	calculationDetails := h.mealPlanningService.CreateCalculationDetails(clientData, nutritionalNeeds)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"nutritional_needs":   nutritionalNeeds,
			"calculation_details": calculationDetails,
		},
	})
}

// GetMealPlanTemplate returns a meal plan template based on diet type
func (h *MealPlanningHandler) GetMealPlanTemplate(c echo.Context) error {
	dietType := c.Param("dietType")
	if dietType == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Diet type parameter is required",
		})
	}

	// Get available diet types to validate
	dietTypes := h.mealPlanningService.GetAvailableDietTypes()

	var targetDiet *models.DietType
	for _, diet := range dietTypes {
		if diet.Code == dietType {
			targetDiet = &diet
			break
		}
	}

	if targetDiet == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Diet type not found: " + dietType,
		})
	}

	// Create a sample meal plan template
	template := map[string]interface{}{
		"diet_type": targetDiet,
		"sample_meals": map[string]interface{}{
			"breakfast": "Sample breakfast meal",
			"lunch":     "Sample lunch meal",
			"dinner":    "Sample dinner meal",
			"snacks":    "Sample snack options",
		},
		"nutritional_guidelines": map[string]interface{}{
			"macro_ratio": targetDiet.MacroRatio,
			"description": targetDiet.Description,
		},
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    template,
	})
}

// GetCuisineRecipes returns recipes filtered by cuisine and diet type
func (h *MealPlanningHandler) GetCuisineRecipes(c echo.Context) error {
	cuisine := c.QueryParam("cuisine")
	dietType := c.QueryParam("diet_type")
	mealType := c.QueryParam("meal_type")

	if cuisine == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Cuisine parameter is required",
		})
	}

	recipes := h.mealPlanningService.GetRecipesByCuisine(cuisine)

	// Filter recipes based on criteria
	var filteredRecipes []models.Recipe
	for _, recipe := range recipes {
		// Filter by diet type if specified
		if dietType != "" {
			if !h.mealPlanningService.IsRecipeCompatibleWithDiet(recipe, dietType) {
				continue
			}
		}

		// Filter by meal type if specified (this would need additional logic)
		if mealType != "" {
			// Simple filtering based on recipe name/content
			recipeName := strings.ToLower(recipe.RecipeName["en"])
			switch mealType {
			case "breakfast":
				if !strings.Contains(recipeName, "breakfast") && !strings.Contains(recipeName, "egg") && !strings.Contains(recipeName, "oat") {
					continue
				}
			case "lunch", "dinner":
				if strings.Contains(recipeName, "breakfast") || strings.Contains(recipeName, "dessert") {
					continue
				}
			case "snack":
				if strings.Contains(recipeName, "main") || strings.Contains(recipeName, "dinner") {
					continue
				}
			}
		}

		filteredRecipes = append(filteredRecipes, recipe)
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"cuisine":         cuisine,
			"diet_type":       dietType,
			"meal_type":       mealType,
			"recipes":         filteredRecipes,
			"count":           len(filteredRecipes),
			"total_available": len(recipes),
		},
	})
}

// ValidateMealPlanRequest validates a meal plan request without generating the plan
func (h *MealPlanningHandler) ValidateMealPlanRequest(c echo.Context) error {
	var request models.MealPlanRequest
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request format: " + err.Error(),
		})
	}

	// Validate request
	if err := c.Validate(&request); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Validation failed: " + err.Error(),
		})
	}

	// Additional validation logic
	validationResults := h.validateMealPlanRequest(request)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"request_valid":      true,
			"validation_results": validationResults,
		},
	})
}

// validateMealPlanRequest performs additional validation on meal plan requests
func (h *MealPlanningHandler) validateMealPlanRequest(request models.MealPlanRequest) map[string]interface{} {
	results := make(map[string]interface{})

	// Validate BMI
	bmi := request.ClientData.CalculateBMI()
	results["bmi"] = map[string]interface{}{
		"value":    bmi,
		"category": request.ClientData.GetBMICategory(),
		"valid":    bmi >= 15 && bmi <= 50,
	}

	// Validate age
	results["age"] = map[string]interface{}{
		"value": request.ClientData.Age,
		"valid": request.ClientData.Age >= 13 && request.ClientData.Age <= 100,
	}

	// Validate weight
	results["weight"] = map[string]interface{}{
		"value": request.ClientData.Weight,
		"valid": request.ClientData.Weight >= 30 && request.ClientData.Weight <= 300,
	}

	// Validate height
	results["height"] = map[string]interface{}{
		"value": request.ClientData.Height,
		"valid": request.ClientData.Height >= 120 && request.ClientData.Height <= 250,
	}

	// Check for medical conditions
	if len(request.ClientData.Diseases) > 0 || len(request.ClientData.Medications) > 0 {
		results["medical_conditions"] = map[string]interface{}{
			"has_conditions": true,
			"diseases":       request.ClientData.Diseases,
			"medications":    request.ClientData.Medications,
			"recommendation": "Consult with healthcare provider before following meal plan",
		}
	} else {
		results["medical_conditions"] = map[string]interface{}{
			"has_conditions": false,
		}
	}

	// Check excluded foods
	if len(request.ClientData.ExcludedFoods) > 0 {
		results["excluded_foods"] = map[string]interface{}{
			"count":             len(request.ClientData.ExcludedFoods),
			"foods":             request.ClientData.ExcludedFoods,
			"will_be_respected": true,
		}
	}

	return results
}

// GetMealPlanStatistics returns statistics about meal plan generation
func (h *MealPlanningHandler) GetMealPlanStatistics(c echo.Context) error {
	// Get available cuisines and diet types
	cuisines := h.mealPlanningService.GetAvailableCuisines()
	dietTypes := h.mealPlanningService.GetAvailableDietTypes()

	// Count recipes by cuisine
	cuisineStats := make(map[string]int)
	for _, cuisine := range cuisines {
		recipes := h.mealPlanningService.GetRecipesByCuisine(cuisine.Country)
		cuisineStats[cuisine.Country] = len(recipes)
	}

	// Calculate total recipes
	totalRecipes := 0
	for _, count := range cuisineStats {
		totalRecipes += count
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"total_cuisines":   len(cuisines),
			"total_diet_types": len(dietTypes),
			"total_recipes":    totalRecipes,
			"cuisine_stats":    cuisineStats,
			"available_features": []string{
				"Personalized meal planning",
				"Multi-cuisine recipes",
				"Diet-specific meal plans",
				"Nutritional calculations",
				"Medical condition considerations",
				"Food allergy/exclusion support",
				"Intermittent fasting support",
				"Macronutrient optimization",
			},
		},
	})
}
