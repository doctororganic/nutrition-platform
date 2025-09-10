package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
	"doctorhealthy1/services"
)

// WorkoutManagementHandler handles workout management endpoints
type WorkoutManagementHandler struct {
	workoutManagementService *services.WorkoutManagementService
}

// NewWorkoutManagementHandler creates a new workout management handler
func NewWorkoutManagementHandler(workoutManagementService *services.WorkoutManagementService) *WorkoutManagementHandler {
	return &WorkoutManagementHandler{
		workoutManagementService: workoutManagementService,
	}
}

// GenerateWorkoutPlan generates a personalized workout plan
func (h *WorkoutManagementHandler) GenerateWorkoutPlan(c echo.Context) error {
	var request models.WorkoutRequest
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

	// Generate workout plan
	response, err := h.workoutManagementService.GenerateWorkoutPlan(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to generate workout plan: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: response.Message,
		Data: map[string]interface{}{
			"workout_plan":     response.WorkoutPlan,
			"injury_advice":    response.InjuryAdvice,
			"complaint_advice": response.ComplaintAdvice,
			"disclaimer":       response.Disclaimer,
		},
	})
}

// GetAvailableExerciseTypes returns available exercise types
func (h *WorkoutManagementHandler) GetAvailableExerciseTypes(c echo.Context) error {
	exerciseTypes := h.workoutManagementService.GetAvailableExerciseTypes()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"exercise_types": exerciseTypes,
			"count":          len(exerciseTypes),
		},
	})
}

// GetAvailableInjuries returns available injuries
func (h *WorkoutManagementHandler) GetAvailableInjuries(c echo.Context) error {
	injuries := h.workoutManagementService.GetAvailableInjuries()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"injuries": injuries,
			"count":    len(injuries),
		},
	})
}

// GetAvailableComplaints returns available complaints
func (h *WorkoutManagementHandler) GetAvailableComplaints(c echo.Context) error {
	complaints := h.workoutManagementService.GetAvailableComplaints()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"complaints": complaints,
			"count":      len(complaints),
		},
	})
}

// GetWorkoutGoals returns available workout goals
func (h *WorkoutManagementHandler) GetWorkoutGoals(c echo.Context) error {
	goals := h.workoutManagementService.GetWorkoutGoals()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"workout_goals": goals,
			"count":         len(goals),
		},
	})
}

// GetEquipmentTypes returns available equipment types
func (h *WorkoutManagementHandler) GetEquipmentTypes(c echo.Context) error {
	equipmentTypes := h.workoutManagementService.GetEquipmentTypes()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"equipment_types": equipmentTypes,
			"count":           len(equipmentTypes),
		},
	})
}

// GetMuscleGroups returns available muscle groups
func (h *WorkoutManagementHandler) GetMuscleGroups(c echo.Context) error {
	muscleGroups := h.workoutManagementService.GetMuscleGroups()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"muscle_groups": muscleGroups,
			"count":         len(muscleGroups),
		},
	})
}

// GetDifficultyLevels returns available difficulty levels
func (h *WorkoutManagementHandler) GetDifficultyLevels(c echo.Context) error {
	difficultyLevels := h.workoutManagementService.GetDifficultyLevels()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"difficulty_levels": difficultyLevels,
			"count":             len(difficultyLevels),
		},
	})
}

// GetInjuryDetails returns detailed information about a specific injury
func (h *WorkoutManagementHandler) GetInjuryDetails(c echo.Context) error {
	injuryID := c.Param("injuryID")
	if injuryID == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Injury ID parameter is required",
		})
	}

	injuries := h.workoutManagementService.GetAvailableInjuries()

	// Find the specific injury
	var targetInjury *models.Injury
	for _, injury := range injuries {
		if injury.ID == injuryID {
			targetInjury = &injury
			break
		}
	}

	if targetInjury == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Injury not found: " + injuryID,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    targetInjury,
	})
}

// GetComplaintDetails returns detailed information about a specific complaint
func (h *WorkoutManagementHandler) GetComplaintDetails(c echo.Context) error {
	complaintID := c.Param("complaintID")
	if complaintID == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Complaint ID parameter is required",
		})
	}

	complaints := h.workoutManagementService.GetAvailableComplaints()

	// Find the specific complaint
	var targetComplaint *models.Complaint
	for _, complaint := range complaints {
		if complaint.ID == complaintID {
			targetComplaint = &complaint
			break
		}
	}

	if targetComplaint == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Complaint not found: " + complaintID,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    targetComplaint,
	})
}

// GetExercisesByGoal returns exercises filtered by goal
func (h *WorkoutManagementHandler) GetExercisesByGoal(c echo.Context) error {
	goal := c.QueryParam("goal")
	if goal == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Goal parameter is required",
		})
	}

	// Get all exercises and filter by goal
	// This would need to be implemented in the service
	// For now, return a placeholder response
	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"goal":      goal,
			"exercises": []models.Exercise{},
			"count":     0,
		},
	})
}

// GetExercisesByEquipment returns exercises filtered by equipment
func (h *WorkoutManagementHandler) GetExercisesByEquipment(c echo.Context) error {
	equipment := c.QueryParam("equipment")
	if equipment == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Equipment parameter is required",
		})
	}

	// Get all exercises and filter by equipment
	// This would need to be implemented in the service
	// For now, return a placeholder response
	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"equipment": equipment,
			"exercises": []models.Exercise{},
			"count":     0,
		},
	})
}

// ValidateWorkoutRequest validates a workout request without generating the plan
func (h *WorkoutManagementHandler) ValidateWorkoutRequest(c echo.Context) error {
	var request models.WorkoutRequest
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
	validationResults := h.validateWorkoutRequest(request)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"request_valid":      true,
			"validation_results": validationResults,
		},
	})
}

// validateWorkoutRequest performs additional validation on workout requests
func (h *WorkoutManagementHandler) validateWorkoutRequest(request models.WorkoutRequest) map[string]interface{} {
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

	// Check for injuries
	if len(request.ClientData.Injuries) > 0 {
		results["injuries"] = map[string]interface{}{
			"has_injuries": true,
			"injuries":     request.ClientData.Injuries,
			"recommendation": "Consult with healthcare provider before starting workout plan",
		}
	} else {
		results["injuries"] = map[string]interface{}{
			"has_injuries": false,
		}
	}

	// Check for complaints
	if len(request.ClientData.Complaints) > 0 {
		results["complaints"] = map[string]interface{}{
			"has_complaints": true,
			"complaints":     request.ClientData.Complaints,
			"recommendation": "Consider health complaints when planning workouts",
		}
	} else {
		results["complaints"] = map[string]interface{}{
			"has_complaints": false,
		}
	}

	return results
}

// GetWorkoutStatistics returns statistics about workout system
func (h *WorkoutManagementHandler) GetWorkoutStatistics(c echo.Context) error {
	statistics := h.workoutManagementService.GetWorkoutStatistics()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"statistics": statistics,
			"available_features": []string{
				"Personalized workout planning",
				"Exercise type selection",
				"Injury management",
				"Health complaint solutions",
				"Equipment-based filtering",
				"Muscle group targeting",
				"Difficulty level adjustment",
				"Goal-oriented programming",
			},
		},
	})
}
