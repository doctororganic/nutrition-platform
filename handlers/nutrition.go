package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
	"doctorhealthy1/services"
	"doctorhealthy1/utils"
)

// NutritionHandler handles nutrition-related endpoints
type NutritionHandler struct {
	nutritionService *services.NutritionService
}

// NewNutritionHandler creates a new nutrition handler
func NewNutritionHandler(nutritionService *services.NutritionService) *NutritionHandler {
	return &NutritionHandler{
		nutritionService: nutritionService,
	}
}

// CalculateDiet handles diet calculation requests
func (nh *NutritionHandler) CalculateDiet(c echo.Context) error {
	// Get authenticated user
	user := c.Get("user").(*models.User)

	// Check if user has required permissions
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Access denied",
		})
	}

	var input models.Diet
	
	// Bind and validate request
	if err := utils.BindAndValidate(c, &input); err != nil {
		return err
	}

	// Set user ID from authenticated user
	input.UserID = user.ID

	// Validate input using model's custom validation
	if err := input.Validate(); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	// Additional business validation
	if err := nh.nutritionService.ValidateNutritionRequest(&input); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	// Calculate diet plan
	result, err := nh.nutritionService.CalculateDiet(&input)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to calculate diet plan: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Diet plan calculated successfully",
		Data:    result,
	})
}

// GetNutritionInfo provides general nutrition information
func (nh *NutritionHandler) GetNutritionInfo(c echo.Context) error {
	// This endpoint can be accessed by any authenticated user
	user := c.Get("user").(*models.User)
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Access denied",
		})
	}

	// Return general nutrition guidelines
	info := map[string]interface{}{
		"supported_countries": []string{
			"saudi_arabia", "uae", "kuwait", "qatar", "bahrain", "oman",
		},
		"supported_if_schedules": []string{
			"16_8", "18_6", "20_4", "omad",
		},
		"supported_goals": []string{
			"lose_weight", "maintain_weight", "gain_weight",
		},
		"activity_levels": []string{
			"sedentary", "lightly_active", "moderately_active", "very_active", "extremely_active",
		},
		"macro_distribution": map[string]float64{
			"protein_percent": 28,
			"fat_percent":     32,
			"carb_percent":    40,
		},
		"general_guidelines": map[string]string{
			"hydration":      "Drink at least 8 glasses of water daily",
			"meal_timing":    "Follow your chosen intermittent fasting schedule consistently",
			"food_quality":   "Focus on whole, unprocessed foods",
			"portion_control": "Listen to your body's hunger and satiety cues",
		},
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    info,
	})
}

// ValidateDietInput validates diet input without calculating
func (nh *NutritionHandler) ValidateDietInput(c echo.Context) error {
	user := c.Get("user").(*models.User)
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Access denied",
		})
	}

	var input models.Diet
	if err := c.Bind(&input); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid input data",
		})
	}

	input.UserID = user.ID

	// Validate input
	if err := input.Validate(); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	// Additional business validation
	if err := nh.nutritionService.ValidateNutritionRequest(&input); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Diet input is valid",
	})
}

// GetDiseaseList returns a list of available disease files
func (nh *NutritionHandler) GetDiseaseList(c echo.Context) error {
	// Get authenticated user
	user := c.Get("user").(*models.User)

	// Check if user has required permissions
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Access denied",
		})
	}

	diseaseList, err := nh.nutritionService.GetDiseaseList()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve disease list",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Disease list retrieved successfully",
		Data:    diseaseList,
	})
}

// GetDiseaseInfo returns detailed information for a specific disease
func (nh *NutritionHandler) GetDiseaseInfo(c echo.Context) error {
	// Get authenticated user
	user := c.Get("user").(*models.User)

	// Check if user has required permissions
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Access denied",
		})
	}

	diseaseName := c.Param("diseaseName")
	if diseaseName == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Disease name is required",
		})
	}

	diseaseInfo, err := nh.nutritionService.GetDiseaseInfo(diseaseName)
	if err != nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Disease information not found",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Disease information retrieved successfully",
		Data:    diseaseInfo,
	})
}

// GetInjuryList returns a list of all available injury rehabilitation guides
func (nh *NutritionHandler) GetInjuryList(c echo.Context) error {
	// Get authenticated user
	user := c.Get("user").(*models.User)

	// Check if user has required permissions
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Access denied",
		})
	}

	injuryList, err := nh.nutritionService.GetInjuryList()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve injury list",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Injury list retrieved successfully",
		Data:    injuryList,
	})
}

// GetInjuryInfo returns detailed rehabilitation information for a specific injury
func (nh *NutritionHandler) GetInjuryInfo(c echo.Context) error {
	// Get authenticated user
	user := c.Get("user").(*models.User)

	// Check if user has required permissions
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
		Success: false,
		Error:   "Access denied",
	})
	}

	injuryName := c.Param("injuryName")
	if injuryName == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Injury name is required",
		})
	}

	injuryInfo, err := nh.nutritionService.GetInjuryInfo(injuryName)
	if err != nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Injury information not found",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Injury information retrieved successfully",
		Data:    injuryInfo,
	})
}
