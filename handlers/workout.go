package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
	"doctorhealthy1/services"
	"doctorhealthy1/utils"
)

// WorkoutHandler handles workout-related endpoints
type WorkoutHandler struct {
	workoutService *services.WorkoutService
}

// NewWorkoutHandler creates a new workout handler
func NewWorkoutHandler(workoutService *services.WorkoutService) *WorkoutHandler {
	return &WorkoutHandler{
		workoutService: workoutService,
	}
}

// GenerateWorkoutPlan handles workout plan generation requests
func (wh *WorkoutHandler) GenerateWorkoutPlan(c echo.Context) error {
	// Get authenticated user
	user := c.Get("user").(*models.User)

	// Check if user has required permissions
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Access denied",
		})
	}

	var input models.WorkoutLegacy
	
	// Bind and validate request
	if err := utils.BindAndValidate(c, &input); err != nil {
		return err
	}

	// Set user ID from authenticated user
	input.UserID = user.ID

	// Generate workout plan
	result, err := wh.workoutService.GeneratePlan(&input)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to generate workout plan: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Workout plan generated successfully",
		Data:    result,
	})
}

// GetWorkoutHistory returns user's workout history
func (wh *WorkoutHandler) GetWorkoutHistory(c echo.Context) error {
	user := c.Get("user").(*models.User)

	history, err := wh.workoutService.GetUserWorkouts(user.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve workout history",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    history,
	})
}

// PatientHandler handles medical consultation endpoints
type PatientHandler struct {
	consultationService *services.ConsultationService
}

// NewPatientHandler creates a new patient handler
func NewPatientHandler(consultationService *services.ConsultationService) *PatientHandler {
	return &PatientHandler{
		consultationService: consultationService,
	}
}

// GetConsultation handles patient consultation requests
func (ph *PatientHandler) GetConsultation(c echo.Context) error {
	// Get authenticated user
	user := c.Get("user").(*models.User)

	// Check if user has required permissions
	if !user.HasRole(models.RegularUser) {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Access denied",
		})
	}

	var input models.PatientConsultation
	
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

	// Generate consultation result
	result, err := ph.consultationService.ProcessConsultation(&input)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to process consultation: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Consultation processed successfully",
		Data:    result,
	})
}

// GetConsultationHistory returns user's consultation history
func (ph *PatientHandler) GetConsultationHistory(c echo.Context) error {
	user := c.Get("user").(*models.User)

	history, err := ph.consultationService.GetUserConsultations(user.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to retrieve consultation history",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    history,
	})
}
