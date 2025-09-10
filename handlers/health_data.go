package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
	"doctorhealthy1/services"
)

// HealthDataHandler handles health data endpoints
type HealthDataHandler struct {
	healthDataService *services.HealthDataService
}

// NewHealthDataHandler creates a new health data handler
func NewHealthDataHandler(healthDataService *services.HealthDataService) *HealthDataHandler {
	return &HealthDataHandler{
		healthDataService: healthDataService,
	}
}

// GetMetabolismData returns metabolism data
func (h *HealthDataHandler) GetMetabolismData(c echo.Context) error {
	data, err := h.healthDataService.GetMetabolismData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve metabolism data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// SearchMetabolismData searches metabolism data by keyword
func (h *HealthDataHandler) SearchMetabolismData(c echo.Context) error {
	query := c.QueryParam("q")
	if query == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Search query parameter 'q' is required",
		})
	}

	data, err := h.healthDataService.SearchMetabolismData(query)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to search metabolism data: " + err.Error(),
		})
	}

	if data == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "No metabolism data found for query: " + query,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetOldDiseasesData returns old diseases data
func (h *HealthDataHandler) GetOldDiseasesData(c echo.Context) error {
	data, err := h.healthDataService.GetOldDiseasesData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve old diseases data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetDiseaseByName returns specific disease data
func (h *HealthDataHandler) GetDiseaseByName(c echo.Context) error {
	diseaseName := c.Param("diseaseName")
	if diseaseName == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Disease name parameter is required",
		})
	}

	data, err := h.healthDataService.GetDiseaseByName(diseaseName)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve disease data: " + err.Error(),
		})
	}

	if data == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Disease not found: " + diseaseName,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// SearchOldDiseasesData searches old diseases data by keyword
func (h *HealthDataHandler) SearchOldDiseasesData(c echo.Context) error {
	query := c.QueryParam("q")
	if query == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Search query parameter 'q' is required",
		})
	}

	data, err := h.healthDataService.SearchOldDiseasesData(query)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to search old diseases data: " + err.Error(),
		})
	}

	if data == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "No old diseases data found for query: " + query,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetWorkoutTechniquesData returns workout techniques data
func (h *HealthDataHandler) GetWorkoutTechniquesData(c echo.Context) error {
	data, err := h.healthDataService.GetWorkoutTechniquesData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve workout techniques data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetWorkoutTechniqueByName returns specific workout technique data
func (h *HealthDataHandler) GetWorkoutTechniqueByName(c echo.Context) error {
	techniqueName := c.Param("techniqueName")
	if techniqueName == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Technique name parameter is required",
		})
	}

	data, err := h.healthDataService.GetWorkoutTechniqueByName(techniqueName)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve workout technique data: " + err.Error(),
		})
	}

	if data == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Workout technique not found: " + techniqueName,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetMealPlansData returns meal plans data
func (h *HealthDataHandler) GetMealPlansData(c echo.Context) error {
	data, err := h.healthDataService.GetMealPlansData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve meal plans data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetCaloriesData returns calories data
func (h *HealthDataHandler) GetCaloriesData(c echo.Context) error {
	data, err := h.healthDataService.GetCaloriesData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve calories data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetCalorieInfo returns calorie information for specific food
func (h *HealthDataHandler) GetCalorieInfo(c echo.Context) error {
	foodName := c.Param("foodName")
	if foodName == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Food name parameter is required",
		})
	}

	data, err := h.healthDataService.GetCalorieInfo(foodName)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve calorie information: " + err.Error(),
		})
	}

	if data == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Food not found: " + foodName,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetDrugNutritionData returns drug nutrition effects data
func (h *HealthDataHandler) GetDrugNutritionData(c echo.Context) error {
	data, err := h.healthDataService.GetDrugNutritionData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve drug nutrition data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetVitaminsMineralsData returns vitamins and minerals data
func (h *HealthDataHandler) GetVitaminsMineralsData(c echo.Context) error {
	data, err := h.healthDataService.GetVitaminsMineralsData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve vitamins and minerals data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetTypePlansData returns type plans data
func (h *HealthDataHandler) GetTypePlansData(c echo.Context) error {
	data, err := h.healthDataService.GetTypePlansData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve type plans data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetVitaminMineralByName returns specific vitamin/mineral data
func (h *HealthDataHandler) GetVitaminMineralByName(c echo.Context) error {
	nutrientName := c.Param("nutrientName")
	if nutrientName == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Nutrient name parameter is required",
		})
	}

	data, err := h.healthDataService.GetVitaminMineralByName(nutrientName)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve nutrient data: " + err.Error(),
		})
	}

	if data == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Nutrient not found: " + nutrientName,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    data,
	})
}

// GetAvailableDataTypes returns list of available data types
func (h *HealthDataHandler) GetAvailableDataTypes(c echo.Context) error {
	dataTypes := h.healthDataService.GetAvailableDataTypes()
	
	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"available_data_types": dataTypes,
			"count":                len(dataTypes),
		},
	})
}

// ReloadData reloads all data files from disk (admin only)
func (h *HealthDataHandler) ReloadData(c echo.Context) error {
	// Check if user has admin permissions
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	if !apiKey.HasPermission("admin:full") {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Admin permission required",
		})
	}

	err := h.healthDataService.ReloadData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to reload data: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Data reloaded successfully",
		Data: map[string]interface{}{
			"available_data_types": h.healthDataService.GetAvailableDataTypes(),
		},
	})
}

// GetHealthDataStats returns statistics about health data
func (h *HealthDataHandler) GetHealthDataStats(c echo.Context) error {
	dataTypes := h.healthDataService.GetAvailableDataTypes()
	
	stats := make(map[string]interface{})
	for _, dataType := range dataTypes {
		// This is a simplified implementation - in production you might want to track actual usage
		stats[dataType] = map[string]interface{}{
			"available": true,
			"last_accessed": "N/A", // Would be tracked in a real implementation
			"access_count": 0,      // Would be tracked in a real implementation
		}
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"total_data_types": len(dataTypes),
			"data_types":       stats,
		},
	})
}
