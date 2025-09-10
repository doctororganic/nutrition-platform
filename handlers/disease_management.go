package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
	"doctorhealthy1/services"
)

// DiseaseManagementHandler handles disease management endpoints
type DiseaseManagementHandler struct {
	diseaseManagementService *services.DiseaseManagementService
}

// NewDiseaseManagementHandler creates a new disease management handler
func NewDiseaseManagementHandler(diseaseManagementService *services.DiseaseManagementService) *DiseaseManagementHandler {
	return &DiseaseManagementHandler{
		diseaseManagementService: diseaseManagementService,
	}
}

// GenerateDiseasePlan generates a personalized disease management plan
func (h *DiseaseManagementHandler) GenerateDiseasePlan(c echo.Context) error {
	var request models.DiseaseRequest
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

	// Generate disease plan
	response, err := h.diseaseManagementService.GenerateDiseasePlan(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to generate disease plan: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: response.Message,
		Data: map[string]interface{}{
			"disease_plan": response.DiseasePlan,
			"medications":  response.Medications,
			"interactions": response.Interactions,
			"disclaimer":   response.Disclaimer,
		},
	})
}

// GetAvailableDiseases returns available diseases
func (h *DiseaseManagementHandler) GetAvailableDiseases(c echo.Context) error {
	diseases := h.diseaseManagementService.GetAvailableDiseases()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"diseases": diseases,
			"count":    len(diseases),
		},
	})
}

// GetAvailableMedications returns available medications
func (h *DiseaseManagementHandler) GetAvailableMedications(c echo.Context) error {
	medications := h.diseaseManagementService.GetAvailableMedications()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"medications": medications,
			"count":       len(medications),
		},
	})
}

// GetDiseaseCategories returns available disease categories
func (h *DiseaseManagementHandler) GetDiseaseCategories(c echo.Context) error {
	categories := h.diseaseManagementService.GetCategories()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"categories": categories,
			"count":      len(categories),
		},
	})
}

// GetSeverityLevels returns available severity levels
func (h *DiseaseManagementHandler) GetSeverityLevels(c echo.Context) error {
	severityLevels := h.diseaseManagementService.GetSeverityLevels()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"severity_levels": severityLevels,
			"count":           len(severityLevels),
		},
	})
}

// GetTreatmentTypes returns available treatment types
func (h *DiseaseManagementHandler) GetTreatmentTypes(c echo.Context) error {
	treatmentTypes := h.diseaseManagementService.GetTreatmentTypes()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"treatment_types": treatmentTypes,
			"count":           len(treatmentTypes),
		},
	})
}

// GetPreventionTypes returns available prevention types
func (h *DiseaseManagementHandler) GetPreventionTypes(c echo.Context) error {
	preventionTypes := h.diseaseManagementService.GetPreventionTypes()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"prevention_types": preventionTypes,
			"count":            len(preventionTypes),
		},
	})
}

// GetMonitoringTypes returns available monitoring types
func (h *DiseaseManagementHandler) GetMonitoringTypes(c echo.Context) error {
	monitoringTypes := h.diseaseManagementService.GetMonitoringTypes()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"monitoring_types": monitoringTypes,
			"count":            len(monitoringTypes),
		},
	})
}

// GetDiseaseDetails returns detailed information about a specific disease
func (h *DiseaseManagementHandler) GetDiseaseDetails(c echo.Context) error {
	diseaseID := c.Param("diseaseID")
	if diseaseID == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Disease ID parameter is required",
		})
	}

	diseases := h.diseaseManagementService.GetAvailableDiseases()

	// Find the specific disease
	var targetDisease *models.Disease
	for _, disease := range diseases {
		if disease.ID == diseaseID {
			targetDisease = &disease
			break
		}
	}

	if targetDisease == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Disease not found: " + diseaseID,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    targetDisease,
	})
}

// GetMedicationDetails returns detailed information about a specific medication
func (h *DiseaseManagementHandler) GetMedicationDetails(c echo.Context) error {
	medicationID := c.Param("medicationID")
	if medicationID == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Medication ID parameter is required",
		})
	}

	medications := h.diseaseManagementService.GetAvailableMedications()

	// Find the specific medication
	var targetMedication *models.Medication
	for _, medication := range medications {
		if medication.ID == medicationID {
			targetMedication = &medication
			break
		}
	}

	if targetMedication == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "Medication not found: " + medicationID,
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    targetMedication,
	})
}

// GetDiseasesByCategory returns diseases filtered by category
func (h *DiseaseManagementHandler) GetDiseasesByCategory(c echo.Context) error {
	category := c.QueryParam("category")
	if category == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Category parameter is required",
		})
	}

	diseases := h.diseaseManagementService.GetAvailableDiseases()

	// Filter diseases by category
	var filteredDiseases []models.Disease
	for _, disease := range diseases {
		if disease.Category == category {
			filteredDiseases = append(filteredDiseases, disease)
		}
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"category": category,
			"diseases": filteredDiseases,
			"count":    len(filteredDiseases),
		},
	})
}

// GetDiseasesBySeverity returns diseases filtered by severity
func (h *DiseaseManagementHandler) GetDiseasesBySeverity(c echo.Context) error {
	severity := c.QueryParam("severity")
	if severity == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Severity parameter is required",
		})
	}

	diseases := h.diseaseManagementService.GetAvailableDiseases()

	// Filter diseases by severity
	var filteredDiseases []models.Disease
	for _, disease := range diseases {
		if disease.Severity == severity {
			filteredDiseases = append(filteredDiseases, disease)
		}
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"severity": severity,
			"diseases": filteredDiseases,
			"count":    len(filteredDiseases),
		},
	})
}

// GetMedicationsByCategory returns medications filtered by category
func (h *DiseaseManagementHandler) GetMedicationsByCategory(c echo.Context) error {
	category := c.QueryParam("category")
	if category == "" {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Category parameter is required",
		})
	}

	medications := h.diseaseManagementService.GetAvailableMedications()

	// Filter medications by category
	var filteredMedications []models.Medication
	for _, medication := range medications {
		if medication.Category == category {
			filteredMedications = append(filteredMedications, medication)
		}
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"category":    category,
			"medications": filteredMedications,
			"count":       len(filteredMedications),
		},
	})
}

// CheckDrugInteractions checks for drug interactions
func (h *DiseaseManagementHandler) CheckDrugInteractions(c echo.Context) error {
	var request struct {
		Medications []string `json:"medications" validate:"required"`
	}

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

	// Get medications
	allMedications := h.diseaseManagementService.GetAvailableMedications()
	var targetMedications []models.Medication

	for _, medicationID := range request.Medications {
		for _, medication := range allMedications {
			if medication.ID == medicationID {
				targetMedications = append(targetMedications, medication)
				break
			}
		}
	}

	// Check interactions
	clientData := models.DiseaseClientData{} // Empty client data for interaction checking
	interactions := h.diseaseManagementService.CheckDrugInteractions(targetMedications, clientData)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"medications":  targetMedications,
			"interactions": interactions,
			"count":        len(interactions),
		},
	})
}

// ValidateDiseaseRequest validates a disease request without generating the plan
func (h *DiseaseManagementHandler) ValidateDiseaseRequest(c echo.Context) error {
	var request models.DiseaseRequest
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
	validationResults := h.validateDiseaseRequest(request)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"request_valid":      true,
			"validation_results": validationResults,
		},
	})
}

// validateDiseaseRequest performs additional validation on disease requests
func (h *DiseaseManagementHandler) validateDiseaseRequest(request models.DiseaseRequest) map[string]interface{} {
	results := make(map[string]interface{})

	// Validate BMI
	bmi := request.ClientData.CalculateBMI()
	results["bmi"] = map[string]interface{}{
		"value":    bmi,
		"category": request.ClientData.GetBMICategory(),
		"valid":    bmi >= 10 && bmi <= 60,
	}

	// Validate age
	results["age"] = map[string]interface{}{
		"value": request.ClientData.Age,
		"valid": request.ClientData.Age >= 1 && request.ClientData.Age <= 120,
		"group":  request.ClientData.GetAgeGroup(),
	}

	// Validate weight
	results["weight"] = map[string]interface{}{
		"value": request.ClientData.Weight,
		"valid": request.ClientData.Weight >= 10 && request.ClientData.Weight <= 300,
	}

	// Validate height
	results["height"] = map[string]interface{}{
		"value": request.ClientData.Height,
		"valid": request.ClientData.Height >= 50 && request.ClientData.Height <= 250,
	}

	// Check for diseases
	if len(request.ClientData.Diseases) > 0 {
		results["diseases"] = map[string]interface{}{
			"has_diseases": true,
			"diseases":     request.ClientData.Diseases,
			"count":        len(request.ClientData.Diseases),
			"recommendation": "Consult with healthcare provider for proper management",
		}
	} else {
		results["diseases"] = map[string]interface{}{
			"has_diseases": false,
		}
	}

	// Check for medications
	if len(request.ClientData.Medications) > 0 {
		results["medications"] = map[string]interface{}{
			"has_medications": true,
			"medications":     request.ClientData.Medications,
			"count":           len(request.ClientData.Medications),
			"recommendation": "Monitor for potential drug interactions",
		}
	} else {
		results["medications"] = map[string]interface{}{
			"has_medications": false,
		}
	}

	// Check for complaints
	if len(request.ClientData.Complaints) > 0 {
		results["complaints"] = map[string]interface{}{
			"has_complaints": true,
			"complaints":     request.ClientData.Complaints,
			"count":          len(request.ClientData.Complaints),
			"recommendation": "Consider complaints in treatment planning",
		}
	} else {
		results["complaints"] = map[string]interface{}{
			"has_complaints": false,
		}
	}

	// Risk level assessment
	results["risk_level"] = map[string]interface{}{
		"level":        request.ClientData.GetRiskLevel(),
		"factors":      h.assessRiskFactors(request.ClientData),
		"recommendation": "Regular monitoring recommended",
	}

	return results
}

// assessRiskFactors assesses risk factors for the client
func (h *DiseaseManagementHandler) assessRiskFactors(clientData models.DiseaseClientData) []string {
	var factors []string

	// Age risk
	if clientData.Age > 65 {
		factors = append(factors, "Advanced age")
	}

	// BMI risk
	bmi := clientData.CalculateBMI()
	if bmi > 30 {
		factors = append(factors, "Obesity")
	} else if bmi < 18.5 {
		factors = append(factors, "Underweight")
	}

	// Multiple conditions
	if len(clientData.Diseases) > 1 {
		factors = append(factors, "Multiple medical conditions")
	}

	// Multiple medications
	if len(clientData.Medications) > 2 {
		factors = append(factors, "Multiple medications")
	}

	// Lifestyle risk
	if clientData.Lifestyle == "sedentary" {
		factors = append(factors, "Sedentary lifestyle")
	}

	return factors
}

// GetDiseaseStatistics returns statistics about disease management system
func (h *DiseaseManagementHandler) GetDiseaseStatistics(c echo.Context) error {
	statistics := h.diseaseManagementService.GetDiseaseStatistics()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"statistics": statistics,
			"available_features": []string{
				"Personalized disease management",
				"Medication management",
				"Drug interaction checking",
				"Treatment planning",
				"Dietary recommendations",
				"Lifestyle advice",
				"Prevention strategies",
				"Monitoring recommendations",
			},
		},
	})
}
