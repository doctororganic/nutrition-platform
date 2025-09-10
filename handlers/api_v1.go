package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
)

type APIv1Handler struct {
	startTime time.Time
}

func NewAPIv1Handler() *APIv1Handler {
	return &APIv1Handler{
		startTime: time.Now(),
	}
}

// Health Check - GET /api/v1/health
func (h *APIv1Handler) Health(c echo.Context) error {
	uptime := time.Since(h.startTime)
	
	response := models.HealthResponse{
		Status:      "healthy",
		Version:     "1.0.0",
		Environment: "development",
		Timestamp:   time.Now(),
		Services: map[string]string{
			"database":    "healthy",
			"cache":       "healthy",
			"compression": "healthy",
		},
		Uptime: uptime.String(),
	}

	// Minify JSON response
	jsonBytes, err := json.Marshal(response)
	if err != nil {
		return h.sendProblem(c, models.NewServerErrorProblem(
			"Failed to serialize health response",
			c.Request().RequestURI,
		))
	}

	c.Response().Header().Set("Content-Type", "application/json")
	return c.Blob(http.StatusOK, "application/json", jsonBytes)
}

// Authentication - POST /api/v1/auth/login
func (h *APIv1Handler) Login(c echo.Context) error {
	var req models.LoginRequest
	if err := c.Bind(&req); err != nil {
		return h.sendProblem(c, models.NewValidationProblem(
			"Invalid request body format",
			c.Request().RequestURI,
			map[string]interface{}{"body": "Invalid JSON format"},
		))
	}

	if err := c.Validate(req); err != nil {
		return h.sendProblem(c, models.NewValidationProblem(
			"Validation failed",
			c.Request().RequestURI,
			map[string]interface{}{"validation_errors": err.Error()},
		))
	}

	// Mock authentication logic
	if req.Email != "admin@example.com" || req.Password != "password123" {
		return h.sendProblem(c, models.NewAuthenticationProblem(
			"Invalid email or password",
			c.Request().RequestURI,
		))
	}

	response := models.APIResponseV1{
		Data: models.LoginResponse{
			Token:        "jwt_token_here",
			RefreshToken: "refresh_token_here",
			ExpiresAt:    time.Now().Add(24 * time.Hour),
			User: models.UserInfo{
				ID:       "user_123",
				Email:    req.Email,
				Name:     "Admin User",
				Role:     "admin",
				Verified: true,
			},
		},
		Timestamp: time.Now(),
	}

	return h.sendJSONResponse(c, http.StatusOK, response)
}

// Registration - POST /api/v1/auth/register
func (h *APIv1Handler) Register(c echo.Context) error {
	var req models.RegisterRequest
	if err := c.Bind(&req); err != nil {
		return h.sendProblem(c, models.NewValidationProblem(
			"Invalid request body format",
			c.Request().RequestURI,
			map[string]interface{}{"body": "Invalid JSON format"},
		))
	}

	if err := c.Validate(req); err != nil {
		return h.sendProblem(c, models.NewValidationProblem(
			"Validation failed",
			c.Request().RequestURI,
			map[string]interface{}{"validation_errors": err.Error()},
		))
	}

	// Mock user creation
	response := models.APIResponseV1{
		Data: models.UserInfo{
			ID:       "user_new_123",
			Email:    req.Email,
			Name:     req.Name,
			Role:     "user",
			Verified: false,
		},
		Timestamp: time.Now(),
	}

	return h.sendJSONResponse(c, http.StatusCreated, response)
}

// Carb Cycling Plan - POST /api/v1/nutrition/carb-cycling
func (h *APIv1Handler) CreateCarbCyclingPlan(c echo.Context) error {
	var req models.CarbCyclingRequest
	if err := c.Bind(&req); err != nil {
		return h.sendProblem(c, models.NewValidationProblem(
			"Invalid request body format",
			c.Request().RequestURI,
			map[string]interface{}{"body": "Invalid JSON format"},
		))
	}

	if err := c.Validate(req); err != nil {
		return h.sendProblem(c, models.NewValidationProblem(
			"Validation failed",
			c.Request().RequestURI,
			map[string]interface{}{"validation_errors": err.Error()},
		))
	}

	// Calculate BMR and create plan
	plan := h.calculateNutritionPlan(req)

	response := models.APIResponseV1{
		Data:      plan,
		Timestamp: time.Now(),
	}

	return h.sendJSONResponse(c, http.StatusCreated, response)
}

// Get Nutrition Plans - GET /api/v1/nutrition/plans
func (h *APIv1Handler) GetNutritionPlans(c echo.Context) error {
	// Mock data
	plans := []models.NutritionPlanResponse{
		{
			ID:             "plan_123",
			PlanType:       "carb_cycling",
			CycleType:      "classic",
			TargetCalories: 2200,
			CreatedAt:      time.Now().Add(-24 * time.Hour),
			ValidUntil:     time.Now().Add(7 * 24 * time.Hour),
		},
	}

	response := models.APIResponseV1{
		Data: plans,
		Meta: &models.Meta{
			Page:       1,
			PerPage:    10,
			Total:      1,
			TotalPages: 1,
		},
		Timestamp: time.Now(),
	}

	return h.sendJSONResponse(c, http.StatusOK, response)
}

// Get Single Plan - GET /api/v1/nutrition/plans/:id
func (h *APIv1Handler) GetNutritionPlan(c echo.Context) error {
	planID := c.Param("id")
	
	if planID == "" {
		return h.sendProblem(c, models.NewValidationProblem(
			"Plan ID is required",
			c.Request().RequestURI,
			map[string]interface{}{"parameter": "id is required"},
		))
	}

	// Mock plan lookup
	if planID != "plan_123" {
		return h.sendProblem(c, models.NewNotFoundProblem(
			"Nutrition plan not found",
			c.Request().RequestURI,
		))
	}

	plan := models.NutritionPlanResponse{
		ID:             planID,
		PlanType:       "carb_cycling",
		CycleType:      "classic",
		TargetCalories: 2200,
		Macros: map[string]interface{}{
			"high_carb_day": map[string]float64{
				"carbs":   247,
				"protein": 165,
				"fat":     61,
			},
			"low_carb_day": map[string]float64{
				"carbs":   110,
				"protein": 220,
				"fat":     98,
			},
		},
		WaterIntake: models.WaterIntakeInfo{
			DailyML:        2800,
			DailyCups:      11,
			Recommendation: "2.8 liters daily",
		},
		CreatedAt:  time.Now().Add(-24 * time.Hour),
		ValidUntil: time.Now().Add(7 * 24 * time.Hour),
	}

	response := models.APIResponseV1{
		Data:      plan,
		Timestamp: time.Now(),
	}

	return h.sendJSONResponse(c, http.StatusOK, response)
}

// Update Plan - PUT /api/v1/nutrition/plans/:id
func (h *APIv1Handler) UpdateNutritionPlan(c echo.Context) error {
	planID := c.Param("id")
	
	if planID != "plan_123" {
		return h.sendProblem(c, models.NewNotFoundProblem(
			"Nutrition plan not found",
			c.Request().RequestURI,
		))
	}

	var req models.CarbCyclingRequest
	if err := c.Bind(&req); err != nil {
		return h.sendProblem(c, models.NewValidationProblem(
			"Invalid request body format",
			c.Request().RequestURI,
			map[string]interface{}{"body": "Invalid JSON format"},
		))
	}

	// Update logic would go here
	return c.NoContent(http.StatusNoContent)
}

// Delete Plan - DELETE /api/v1/nutrition/plans/:id
func (h *APIv1Handler) DeleteNutritionPlan(c echo.Context) error {
	planID := c.Param("id")
	
	if planID != "plan_123" {
		return h.sendProblem(c, models.NewNotFoundProblem(
			"Nutrition plan not found",
			c.Request().RequestURI,
		))
	}

	// Delete logic would go here
	return c.NoContent(http.StatusNoContent)
}

// Helper functions
func (h *APIv1Handler) sendJSONResponse(c echo.Context, status int, data interface{}) error {
	// Minify JSON response
	jsonBytes, err := json.Marshal(data)
	if err != nil {
		return h.sendProblem(c, models.NewServerErrorProblem(
			"Failed to serialize response",
			c.Request().RequestURI,
		))
	}

	c.Response().Header().Set("Content-Type", "application/json")
	return c.Blob(status, "application/json", jsonBytes)
}

func (h *APIv1Handler) sendProblem(c echo.Context, problem models.ProblemDetails) error {
	// Minify JSON response
	jsonBytes, err := json.Marshal(problem)
	if err != nil {
		// Fallback error
		fallback := `{"type":"https://api.nutrition-platform.com/problems/server-error","title":"Internal Server Error","status":500}`
		c.Response().Header().Set("Content-Type", "application/problem+json")
		return c.Blob(http.StatusInternalServerError, "application/problem+json", []byte(fallback))
	}

	c.Response().Header().Set("Content-Type", "application/problem+json")
	return c.Blob(problem.Status, "application/problem+json", jsonBytes)
}

func (h *APIv1Handler) calculateNutritionPlan(req models.CarbCyclingRequest) models.NutritionPlanResponse {
	// Simple BMR calculation
	var bmr float64
	if req.Gender == "male" {
		bmr = 88.362 + (13.397 * req.Weight) + (4.799 * req.Height) - (5.677 * float64(req.Age))
	} else {
		bmr = 447.593 + (9.247 * req.Weight) + (3.098 * req.Height) - (4.330 * float64(req.Age))
	}

	// Activity multiplier
	activityMultiplier := 1.55 // moderate activity default
	targetCalories := bmr * activityMultiplier

	// Adjust for goal
	if req.Goal == "weight_loss" {
		targetCalories *= 0.8
	} else if req.Goal == "muscle_building" {
		targetCalories *= 1.1
	}

	return models.NutritionPlanResponse{
		ID:             "plan_" + time.Now().Format("20060102150405"),
		PlanType:       "carb_cycling",
		CycleType:      "classic",
		TargetCalories: targetCalories,
		Macros: map[string]interface{}{
			"high_carb_day": map[string]float64{
				"carbs":   targetCalories * 0.45 / 4,
				"protein": targetCalories * 0.30 / 4,
				"fat":     targetCalories * 0.25 / 9,
			},
			"low_carb_day": map[string]float64{
				"carbs":   targetCalories * 0.20 / 4,
				"protein": targetCalories * 0.40 / 4,
				"fat":     targetCalories * 0.40 / 9,
			},
		},
		WaterIntake: models.WaterIntakeInfo{
			DailyML:        req.Weight * 35,
			DailyCups:      int(req.Weight * 35 / 250),
			Recommendation: "Based on body weight",
		},
		CreatedAt:  time.Now(),
		ValidUntil: time.Now().Add(30 * 24 * time.Hour),
	}
}
