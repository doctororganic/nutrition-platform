package services

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"doctorhealthy1/models"
)

// DiseaseManagementService handles disease management and treatment planning
type DiseaseManagementService struct {
	dataPath        string
	diseases        []models.Disease
	medications     []models.Medication
	oldDiseases     []models.Disease
	drugNutrition   []DrugNutrition
	vitaminsMinerals []VitaminMineral
	categories      []string
	severityLevels  []string
	treatmentTypes  []string
	preventionTypes []string
	monitoringTypes []string
}

// DrugNutrition represents drug-nutrition interaction information
type DrugNutrition struct {
	ID              string            `json:"id"`
	DrugName        map[string]string  `json:"drug_name"`        // en/ar
	GenericName     map[string]string  `json:"generic_name"`     // en/ar
	Category        string            `json:"category"`
	Interactions    []DrugInteraction `json:"interactions"`
	Precautions     []map[string]string `json:"precautions"`     // en/ar
	Recommendations []map[string]string `json:"recommendations"` // en/ar
}

// DrugInteraction represents a specific drug-nutrition interaction
type DrugInteraction struct {
	Type            string            `json:"type"` // food, supplement, herb
	Name            map[string]string  `json:"name"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Severity        string            `json:"severity"`    // mild, moderate, severe
	Mechanism       map[string]string  `json:"mechanism"`   // en/ar
	Recommendation  map[string]string  `json:"recommendation"` // en/ar
	Timing          string            `json:"timing"`
}

// VitaminMineral represents vitamin and mineral information
type VitaminMineral struct {
	ID              string            `json:"id"`
	Name            map[string]string  `json:"name"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Category        string            `json:"category"`
	Functions       []map[string]string `json:"functions"`     // en/ar
	Sources         []map[string]string `json:"sources"`       // en/ar
	Deficiency      []map[string]string `json:"deficiency"`    // en/ar
	Excess          []map[string]string `json:"excess"`       // en/ar
	DailyRequirement map[string]string  `json:"daily_requirement"` // en/ar
	Interactions    []DrugInteraction `json:"interactions"`
}

// NewDiseaseManagementService creates a new disease management service
func NewDiseaseManagementService(dataPath string) *DiseaseManagementService {
	service := &DiseaseManagementService{
		dataPath: dataPath,
	}
	
	// Load all data
	service.loadData()
	
	return service
}

// loadData loads all disease-related data from files
func (dms *DiseaseManagementService) loadData() {
	// Load diseases from disease file
	dms.loadDiseases()
	
	// Load old diseases from old disease file
	dms.loadOldDiseases()
	
	// Load medications from drugs affect nutrition file
	dms.loadDrugNutrition()
	
	// Load vitamins and minerals
	dms.loadVitaminsMinerals()
	
	// Extract unique values
	dms.extractUniqueValues()
}

// loadDiseases loads diseases from disease file
func (dms *DiseaseManagementService) loadDiseases() {
	filePath := filepath.Join(dms.dataPath, "disease.js")
	data, err := dms.loadJSONFile(filePath)
	if err != nil {
		fmt.Printf("Warning: Could not load diseases from %s: %v\n", filePath, err)
		return
	}
	
	// Parse diseases from the data
	if diseaseData, ok := data.(map[string]interface{}); ok {
		if diseases, ok := diseaseData["diseases"].([]interface{}); ok {
			for _, d := range diseases {
				if disease, ok := d.(map[string]interface{}); ok {
					diseaseModel := dms.parseDisease(disease)
					dms.diseases = append(dms.diseases, diseaseModel)
				}
			}
		}
	}
}

// loadOldDiseases loads old diseases from old disease file
func (dms *DiseaseManagementService) loadOldDiseases() {
	filePath := filepath.Join(dms.dataPath, "old disease.js")
	data, err := dms.loadJSONFile(filePath)
	if err != nil {
		fmt.Printf("Warning: Could not load old diseases from %s: %v\n", filePath, err)
		return
	}
	
	// Parse old diseases from the data
	if oldDiseaseData, ok := data.(map[string]interface{}); ok {
		if diseases, ok := oldDiseaseData["diseases"].([]interface{}); ok {
			for _, d := range diseases {
				if disease, ok := d.(map[string]interface{}); ok {
					diseaseModel := dms.parseDisease(disease)
					dms.oldDiseases = append(dms.oldDiseases, diseaseModel)
				}
			}
		}
	}
}

// loadDrugNutrition loads drug-nutrition interactions from drugs affect nutrition file
func (dms *DiseaseManagementService) loadDrugNutrition() {
	filePath := filepath.Join(dms.dataPath, "drugs affect nutrition.js")
	data, err := dms.loadJSONFile(filePath)
	if err != nil {
		fmt.Printf("Warning: Could not load drug nutrition from %s: %v\n", filePath, err)
		return
	}
	
	// Parse drug nutrition from the data
	if drugData, ok := data.(map[string]interface{}); ok {
		if drugs, ok := drugData["drugs"].([]interface{}); ok {
			for _, d := range drugs {
				if drug, ok := d.(map[string]interface{}); ok {
					drugModel := dms.parseDrugNutrition(drug)
					dms.drugNutrition = append(dms.drugNutrition, drugModel)
				}
			}
		}
	}
}

// loadVitaminsMinerals loads vitamins and minerals from vitamins and minerals file
func (dms *DiseaseManagementService) loadVitaminsMinerals() {
	filePath := filepath.Join(dms.dataPath, "vitamins and minerals.js")
	data, err := dms.loadJSONFile(filePath)
	if err != nil {
		fmt.Printf("Warning: Could not load vitamins and minerals from %s: %v\n", filePath, err)
		return
	}
	
	// Parse vitamins and minerals from the data
	if vmData, ok := data.(map[string]interface{}); ok {
		if vitamins, ok := vmData["vitamins_minerals"].([]interface{}); ok {
			for _, v := range vitamins {
				if vitamin, ok := v.(map[string]interface{}); ok {
					vitaminModel := dms.parseVitaminMineral(vitamin)
					dms.vitaminsMinerals = append(dms.vitaminsMinerals, vitaminModel)
				}
			}
		}
	}
}

// extractUniqueValues extracts unique values from loaded data
func (dms *DiseaseManagementService) extractUniqueValues() {
	// Extract categories
	categoryMap := make(map[string]bool)
	for _, disease := range dms.diseases {
		categoryMap[disease.Category] = true
	}
	for _, disease := range dms.oldDiseases {
		categoryMap[disease.Category] = true
	}
	for category := range categoryMap {
		dms.categories = append(dms.categories, category)
	}
	
	// Extract severity levels
	severityMap := make(map[string]bool)
	for _, disease := range dms.diseases {
		severityMap[disease.Severity] = true
	}
	for _, disease := range dms.oldDiseases {
		severityMap[disease.Severity] = true
	}
	for severity := range severityMap {
		dms.severityLevels = append(dms.severityLevels, severity)
	}
	
	// Extract treatment types
	treatmentMap := make(map[string]bool)
	for _, disease := range dms.diseases {
		for _, treatment := range disease.Treatment {
			// Extract treatment type from treatment description
			if strings.Contains(strings.ToLower(treatment["en"]), "medication") {
				treatmentMap["medication"] = true
			}
			if strings.Contains(strings.ToLower(treatment["en"]), "therapy") {
				treatmentMap["therapy"] = true
			}
			if strings.Contains(strings.ToLower(treatment["en"]), "surgery") {
				treatmentMap["surgery"] = true
			}
			if strings.Contains(strings.ToLower(treatment["en"]), "lifestyle") {
				treatmentMap["lifestyle"] = true
			}
		}
	}
	for treatmentType := range treatmentMap {
		dms.treatmentTypes = append(dms.treatmentTypes, treatmentType)
	}
	
	// Extract prevention types
	preventionMap := make(map[string]bool)
	for _, disease := range dms.diseases {
		for _, prevention := range disease.Prevention {
			if strings.Contains(strings.ToLower(prevention["en"]), "primary") {
				preventionMap["primary"] = true
			}
			if strings.Contains(strings.ToLower(prevention["en"]), "secondary") {
				preventionMap["secondary"] = true
			}
			if strings.Contains(strings.ToLower(prevention["en"]), "tertiary") {
				preventionMap["tertiary"] = true
			}
		}
	}
	for preventionType := range preventionMap {
		dms.preventionTypes = append(dms.preventionTypes, preventionType)
	}
	
	// Extract monitoring types
	monitoringMap := make(map[string]bool)
	monitoringMap["symptoms"] = true
	monitoringMap["tests"] = true
	monitoringMap["appointments"] = true
	for monitoringType := range monitoringMap {
		dms.monitoringTypes = append(dms.monitoringTypes, monitoringType)
	}
}

// parseDisease parses disease from JSON data
func (dms *DiseaseManagementService) parseDisease(data map[string]interface{}) models.Disease {
	disease := models.Disease{}
	
	if id, ok := data["id"].(string); ok {
		disease.ID = id
	}
	
	if name, ok := data["name"].(map[string]interface{}); ok {
		disease.Name = dms.convertToStringMap(name)
	}
	
	if description, ok := data["description"].(map[string]interface{}); ok {
		disease.Description = dms.convertToStringMap(description)
	}
	
	if category, ok := data["category"].(string); ok {
		disease.Category = category
	}
	
	if severity, ok := data["severity"].(string); ok {
		disease.Severity = severity
	}
	
	if causes, ok := data["causes"].([]interface{}); ok {
		disease.Causes = dms.convertToStringMapSlice(causes)
	}
	
	if symptoms, ok := data["symptoms"].([]interface{}); ok {
		disease.Symptoms = dms.convertToStringMapSlice(symptoms)
	}
	
	if riskFactors, ok := data["risk_factors"].([]interface{}); ok {
		disease.RiskFactors = dms.convertToStringMapSlice(riskFactors)
	}
	
	if complications, ok := data["complications"].([]interface{}); ok {
		disease.Complications = dms.convertToStringMapSlice(complications)
	}
	
	if treatment, ok := data["treatment"].([]interface{}); ok {
		disease.Treatment = dms.convertToStringMapSlice(treatment)
	}
	
	if medications, ok := data["medications"].([]interface{}); ok {
		disease.Medications = dms.parseMedications(medications)
	}
	
	if dietaryAdvice, ok := data["dietary_advice"].([]interface{}); ok {
		disease.DietaryAdvice = dms.convertToStringMapSlice(dietaryAdvice)
	}
	
	if lifestyleAdvice, ok := data["lifestyle_advice"].([]interface{}); ok {
		disease.LifestyleAdvice = dms.convertToStringMapSlice(lifestyleAdvice)
	}
	
	if prevention, ok := data["prevention"].([]interface{}); ok {
		disease.Prevention = dms.convertToStringMapSlice(prevention)
	}
	
	if whenToSeeDoctor, ok := data["when_to_see_doctor"].([]interface{}); ok {
		disease.WhenToSeeDoctor = dms.convertToStringMapSlice(whenToSeeDoctor)
	}
	
	if contraindications, ok := data["contraindications"].([]interface{}); ok {
		disease.Contraindications = dms.convertToStringMapSlice(contraindications)
	}
	
	return disease
}

// parseMedications parses medications from JSON data
func (dms *DiseaseManagementService) parseMedications(data []interface{}) []models.Medication {
	var medications []models.Medication
	
	for _, m := range data {
		if medicationData, ok := m.(map[string]interface{}); ok {
			medication := models.Medication{}
			
			if id, ok := medicationData["id"].(string); ok {
				medication.ID = id
			}
			
			if name, ok := medicationData["name"].(map[string]interface{}); ok {
				medication.Name = dms.convertToStringMap(name)
			}
			
			if genericName, ok := medicationData["generic_name"].(map[string]interface{}); ok {
				medication.GenericName = dms.convertToStringMap(genericName)
			}
			
			if description, ok := medicationData["description"].(map[string]interface{}); ok {
				medication.Description = dms.convertToStringMap(description)
			}
			
			if category, ok := medicationData["category"].(string); ok {
				medication.Category = category
			}
			
			if dosage, ok := medicationData["dosage"].(string); ok {
				medication.Dosage = dosage
			}
			
			if timing, ok := medicationData["timing"].(string); ok {
				medication.Timing = timing
			}
			
			if duration, ok := medicationData["duration"].(string); ok {
				medication.Duration = duration
			}
			
			if sideEffects, ok := medicationData["side_effects"].([]interface{}); ok {
				medication.SideEffects = dms.convertToStringMapSlice(sideEffects)
			}
			
			if interactions, ok := medicationData["interactions"].([]interface{}); ok {
				medication.Interactions = dms.convertToStringMapSlice(interactions)
			}
			
			if contraindications, ok := medicationData["contraindications"].([]interface{}); ok {
				medication.Contraindications = dms.convertToStringMapSlice(contraindications)
			}
			
			if precautions, ok := medicationData["precautions"].([]interface{}); ok {
				medication.Precautions = dms.convertToStringMapSlice(precautions)
			}
			
			if foodInteractions, ok := medicationData["food_interactions"].([]interface{}); ok {
				medication.FoodInteractions = dms.convertToStringMapSlice(foodInteractions)
			}
			
			if supplements, ok := medicationData["supplements"].([]interface{}); ok {
				medication.Supplements = dms.parseSupplements(supplements)
			}
			
			medications = append(medications, medication)
		}
	}
	
	return medications
}

// parseDrugNutrition parses drug nutrition from JSON data
func (dms *DiseaseManagementService) parseDrugNutrition(data map[string]interface{}) DrugNutrition {
	drug := DrugNutrition{}
	
	if id, ok := data["id"].(string); ok {
		drug.ID = id
	}
	
	if drugName, ok := data["drug_name"].(map[string]interface{}); ok {
		drug.DrugName = dms.convertToStringMap(drugName)
	}
	
	if genericName, ok := data["generic_name"].(map[string]interface{}); ok {
		drug.GenericName = dms.convertToStringMap(genericName)
	}
	
	if category, ok := data["category"].(string); ok {
		drug.Category = category
	}
	
	if interactions, ok := data["interactions"].([]interface{}); ok {
		drug.Interactions = dms.parseDrugInteractions(interactions)
	}
	
	if precautions, ok := data["precautions"].([]interface{}); ok {
		drug.Precautions = dms.convertToStringMapSlice(precautions)
	}
	
	if recommendations, ok := data["recommendations"].([]interface{}); ok {
		drug.Recommendations = dms.convertToStringMapSlice(recommendations)
	}
	
	return drug
}

// parseDrugInteractions parses drug interactions from JSON data
func (dms *DiseaseManagementService) parseDrugInteractions(data []interface{}) []DrugInteraction {
	var interactions []DrugInteraction
	
	for _, i := range data {
		if interactionData, ok := i.(map[string]interface{}); ok {
			interaction := DrugInteraction{}
			
			if interactionType, ok := interactionData["type"].(string); ok {
				interaction.Type = interactionType
			}
			
			if name, ok := interactionData["name"].(map[string]interface{}); ok {
				interaction.Name = dms.convertToStringMap(name)
			}
			
			if description, ok := interactionData["description"].(map[string]interface{}); ok {
				interaction.Description = dms.convertToStringMap(description)
			}
			
			if severity, ok := interactionData["severity"].(string); ok {
				interaction.Severity = severity
			}
			
			if mechanism, ok := interactionData["mechanism"].(map[string]interface{}); ok {
				interaction.Mechanism = dms.convertToStringMap(mechanism)
			}
			
			if recommendation, ok := interactionData["recommendation"].(map[string]interface{}); ok {
				interaction.Recommendation = dms.convertToStringMap(recommendation)
			}
			
			if timing, ok := interactionData["timing"].(string); ok {
				interaction.Timing = timing
			}
			
			interactions = append(interactions, interaction)
		}
	}
	
	return interactions
}

// parseVitaminMineral parses vitamin/mineral from JSON data
func (dms *DiseaseManagementService) parseVitaminMineral(data map[string]interface{}) VitaminMineral {
	vm := VitaminMineral{}
	
	if id, ok := data["id"].(string); ok {
		vm.ID = id
	}
	
	if name, ok := data["name"].(map[string]interface{}); ok {
		vm.Name = dms.convertToStringMap(name)
	}
	
	if description, ok := data["description"].(map[string]interface{}); ok {
		vm.Description = dms.convertToStringMap(description)
	}
	
	if category, ok := data["category"].(string); ok {
		vm.Category = category
	}
	
	if functions, ok := data["functions"].([]interface{}); ok {
		vm.Functions = dms.convertToStringMapSlice(functions)
	}
	
	if sources, ok := data["sources"].([]interface{}); ok {
		vm.Sources = dms.convertToStringMapSlice(sources)
	}
	
	if deficiency, ok := data["deficiency"].([]interface{}); ok {
		vm.Deficiency = dms.convertToStringMapSlice(deficiency)
	}
	
	if excess, ok := data["excess"].([]interface{}); ok {
		vm.Excess = dms.convertToStringMapSlice(excess)
	}
	
	if dailyRequirement, ok := data["daily_requirement"].(map[string]interface{}); ok {
		vm.DailyRequirement = dms.convertToStringMap(dailyRequirement)
	}
	
	if interactions, ok := data["interactions"].([]interface{}); ok {
		vm.Interactions = dms.parseDrugInteractions(interactions)
	}
	
	return vm
}

// parseSupplements parses supplements from JSON data
func (dms *DiseaseManagementService) parseSupplements(data []interface{}) []models.Supplement {
	var supplements []models.Supplement
	
	for _, s := range data {
		if supplementData, ok := s.(map[string]interface{}); ok {
			supplement := models.Supplement{}
			
			if name, ok := supplementData["name"].(map[string]interface{}); ok {
				supplement.Name = dms.convertToStringMap(name)
			}
			
			if description, ok := supplementData["description"].(map[string]interface{}); ok {
				supplement.Description = dms.convertToStringMap(description)
			}
			
			if dosage, ok := supplementData["dosage"].(string); ok {
				supplement.Dosage = dosage
			}
			
			if timing, ok := supplementData["timing"].(string); ok {
				supplement.Timing = timing
			}
			
			if duration, ok := supplementData["duration"].(string); ok {
				supplement.Duration = duration
			}
			
			if sideEffects, ok := supplementData["side_effects"].([]interface{}); ok {
				supplement.SideEffects = dms.convertToStringMapSlice(sideEffects)
			}
			
			if contraindications, ok := supplementData["contraindications"].([]interface{}); ok {
				supplement.Contraindications = dms.convertToStringMapSlice(contraindications)
			}
			
			supplements = append(supplements, supplement)
		}
	}
	
	return supplements
}

// GenerateDiseasePlan generates a personalized disease management plan
func (dms *DiseaseManagementService) GenerateDiseasePlan(request models.DiseaseRequest) (*models.DiseaseResponse, error) {
	// Initialize response
	response := &models.DiseaseResponse{
		Success: true,
		Message: "Disease management plan generated successfully",
	}
	
	// Create disease plan
	diseasePlan := &models.DiseasePlan{
		ID:         dms.generateDiseasePlanID(),
		ClientData: request.ClientData,
		CreatedAt:  time.Now(),
	}
	
	// Load diseases based on client data
	diseasePlan.Diseases = dms.loadClientDiseases(request.ClientData.Diseases)
	
	// Load medications based on client data
	diseasePlan.Medications = dms.loadClientMedications(request.ClientData.Medications)
	
	// Generate treatment plan
	diseasePlan.TreatmentPlan = dms.generateTreatmentPlan(diseasePlan.Diseases, request.ClientData)
	
	// Generate dietary advice
	diseasePlan.DietaryAdvice = dms.generateDietaryAdvice(diseasePlan.Diseases, request.ClientData)
	
	// Generate lifestyle advice
	diseasePlan.LifestyleAdvice = dms.generateLifestyleAdvice(diseasePlan.Diseases, request.ClientData)
	
	// Generate prevention strategies
	diseasePlan.Prevention = dms.generatePreventionStrategies(diseasePlan.Diseases, request.ClientData)
	
	// Generate monitoring recommendations
	diseasePlan.Monitoring = dms.generateMonitoringRecommendations(diseasePlan.Diseases, request.ClientData)
	
			// Check for drug interactions
		interactions := dms.CheckDrugInteractions(diseasePlan.Medications, request.ClientData)
	
	// Generate disclaimer if needed
	if len(request.ClientData.Diseases) > 0 || len(request.ClientData.Medications) > 0 {
		response.Disclaimer = dms.createDisclaimer(request.ClientData)
	}
	
	response.DiseasePlan = diseasePlan
	response.Medications = diseasePlan.Medications
	response.Interactions = interactions
	
	return response, nil
}

// loadClientDiseases loads diseases based on client disease IDs
func (dms *DiseaseManagementService) loadClientDiseases(diseaseIDs []string) []models.Disease {
	var clientDiseases []models.Disease
	
	// Search in current diseases
	for _, diseaseID := range diseaseIDs {
		for _, disease := range dms.diseases {
			if disease.ID == diseaseID {
				clientDiseases = append(clientDiseases, disease)
				break
			}
		}
	}
	
	// Search in old diseases if not found
	for _, diseaseID := range diseaseIDs {
		found := false
		for _, disease := range clientDiseases {
			if disease.ID == diseaseID {
				found = true
				break
			}
		}
		if !found {
			for _, disease := range dms.oldDiseases {
				if disease.ID == diseaseID {
					clientDiseases = append(clientDiseases, disease)
					break
				}
			}
		}
	}
	
	return clientDiseases
}

// loadClientMedications loads medications based on client medication IDs
func (dms *DiseaseManagementService) loadClientMedications(medicationIDs []string) []models.Medication {
	var clientMedications []models.Medication
	
	// Search in all diseases for medications
	for _, medicationID := range medicationIDs {
		for _, disease := range dms.diseases {
			for _, medication := range disease.Medications {
				if medication.ID == medicationID {
					clientMedications = append(clientMedications, medication)
					break
				}
			}
		}
	}
	
	return clientMedications
}

// generateTreatmentPlan generates treatment recommendations
func (dms *DiseaseManagementService) generateTreatmentPlan(diseases []models.Disease, clientData models.DiseaseClientData) []models.Treatment {
	var treatments []models.Treatment
	
	for _, disease := range diseases {
		// Create treatment based on disease severity and client data
		treatment := dms.createTreatmentFromDisease(disease, clientData)
		treatments = append(treatments, treatment)
	}
	
	return treatments
}

// generateDietaryAdvice generates dietary recommendations
func (dms *DiseaseManagementService) generateDietaryAdvice(diseases []models.Disease, clientData models.DiseaseClientData) []models.DietaryAdvice {
	var dietaryAdvice []models.DietaryAdvice
	
	for _, disease := range diseases {
		// Create dietary advice based on disease and client data
		advice := dms.createDietaryAdviceFromDisease(disease, clientData)
		dietaryAdvice = append(dietaryAdvice, advice...)
	}
	
	return dietaryAdvice
}

// generateLifestyleAdvice generates lifestyle recommendations
func (dms *DiseaseManagementService) generateLifestyleAdvice(diseases []models.Disease, clientData models.DiseaseClientData) []models.LifestyleAdvice {
	var lifestyleAdvice []models.LifestyleAdvice
	
	for _, disease := range diseases {
		// Create lifestyle advice based on disease and client data
		advice := dms.createLifestyleAdviceFromDisease(disease, clientData)
		lifestyleAdvice = append(lifestyleAdvice, advice...)
	}
	
	return lifestyleAdvice
}

// generatePreventionStrategies generates prevention strategies
func (dms *DiseaseManagementService) generatePreventionStrategies(diseases []models.Disease, clientData models.DiseaseClientData) []models.Prevention {
	var preventionStrategies []models.Prevention
	
	for _, disease := range diseases {
		// Create prevention strategies based on disease and client data
		prevention := dms.createPreventionFromDisease(disease, clientData)
		preventionStrategies = append(preventionStrategies, prevention...)
	}
	
	return preventionStrategies
}

// generateMonitoringRecommendations generates monitoring recommendations
func (dms *DiseaseManagementService) generateMonitoringRecommendations(diseases []models.Disease, clientData models.DiseaseClientData) []models.Monitoring {
	var monitoringRecommendations []models.Monitoring
	
	for _, disease := range diseases {
		// Create monitoring recommendations based on disease and client data
		monitoring := dms.createMonitoringFromDisease(disease, clientData)
		monitoringRecommendations = append(monitoringRecommendations, monitoring...)
	}
	
	return monitoringRecommendations
}

// checkDrugInteractions checks for drug interactions
// CheckDrugInteractions checks for drug interactions between medications
func (dms *DiseaseManagementService) CheckDrugInteractions(medications []models.Medication, clientData models.DiseaseClientData) []models.Interaction {
	var interactions []models.Interaction
	
	// Check drug-drug interactions
	for i, med1 := range medications {
		for j, med2 := range medications {
			if i != j {
				interaction := dms.checkDrugDrugInteraction(med1, med2)
				if interaction != nil {
					interactions = append(interactions, *interaction)
				}
			}
		}
	}
	
	// Check drug-food interactions
	for _, medication := range medications {
		foodInteractions := dms.checkDrugFoodInteractions(medication, clientData)
		interactions = append(interactions, foodInteractions...)
	}
	
	return interactions
}

// Helper methods for disease plan generation
func (dms *DiseaseManagementService) createTreatmentFromDisease(disease models.Disease, clientData models.DiseaseClientData) models.Treatment {
	treatment := models.Treatment{
		Type:     dms.determineTreatmentType(disease),
		Name:     disease.Name,
		Duration: dms.determineTreatmentDuration(disease, clientData),
		FollowUp: dms.determineFollowUpSchedule(disease, clientData),
	}
	
	// Copy treatment instructions from disease
	if len(disease.Treatment) > 0 {
		treatment.Description = disease.Treatment[0]
		treatment.Instructions = disease.Treatment
	}
	
	// Add side effects and precautions from medications
	for _, medication := range disease.Medications {
		treatment.SideEffects = append(treatment.SideEffects, medication.SideEffects...)
		treatment.Precautions = append(treatment.Precautions, medication.Precautions...)
	}
	
	return treatment
}

func (dms *DiseaseManagementService) createDietaryAdviceFromDisease(disease models.Disease, clientData models.DiseaseClientData) []models.DietaryAdvice {
	var advice []models.DietaryAdvice
	
	// Create recommended foods advice
	if len(disease.DietaryAdvice) > 0 {
		recommendedAdvice := models.DietaryAdvice{
			Category:     "recommended",
			Reason:       map[string]string{"en": "Based on disease management", "ar": "بناءً على إدارة المرض"},
			Instructions: disease.DietaryAdvice,
			Timing:       "Daily",
			Quantity:     "As recommended",
		}
		advice = append(advice, recommendedAdvice)
	}
	
	// Add specific dietary advice based on client data
	if clientData.Diet != "" {
		dietAdvice := models.DietaryAdvice{
			Category: "recommended",
			Foods:    []map[string]string{{"en": "Follow " + clientData.Diet + " diet", "ar": "اتبع نظام " + clientData.Diet + " الغذائي"}},
			Reason:   map[string]string{"en": "Suitable for current diet", "ar": "مناسب للنظام الغذائي الحالي"},
			Timing:   "Daily",
			Quantity: "As per diet plan",
		}
		advice = append(advice, dietAdvice)
	}
	
	return advice
}

func (dms *DiseaseManagementService) createLifestyleAdviceFromDisease(disease models.Disease, clientData models.DiseaseClientData) []models.LifestyleAdvice {
	var advice []models.LifestyleAdvice
	
	// Create lifestyle advice from disease
	if len(disease.LifestyleAdvice) > 0 {
		lifestyleAdvice := models.LifestyleAdvice{
			Category:     "general",
			Title:        map[string]string{"en": "Disease Management", "ar": "إدارة المرض"},
			Description:  disease.LifestyleAdvice[0],
			Instructions: disease.LifestyleAdvice,
			Frequency:    "Daily",
			Duration:     "Ongoing",
		}
		advice = append(advice, lifestyleAdvice)
	}
	
	// Add exercise advice based on client lifestyle
	if clientData.Lifestyle != "" {
		exerciseAdvice := models.LifestyleAdvice{
			Category: "exercise",
			Title:    map[string]string{"en": "Physical Activity", "ar": "النشاط البدني"},
			Description: map[string]string{
				"en": "Maintain regular physical activity suitable for your condition",
				"ar": "حافظ على النشاط البدني المنتظم المناسب لحالتك",
			},
			Frequency: "3-5 times per week",
			Duration:  "30-60 minutes",
		}
		advice = append(advice, exerciseAdvice)
	}
	
	return advice
}

func (dms *DiseaseManagementService) createPreventionFromDisease(disease models.Disease, clientData models.DiseaseClientData) []models.Prevention {
	var prevention []models.Prevention
	
	// Create prevention strategies from disease
	if len(disease.Prevention) > 0 {
		preventionStrategy := models.Prevention{
			Category:      "primary",
			Title:         map[string]string{"en": "Disease Prevention", "ar": "منع المرض"},
			Description:   disease.Prevention[0],
			Strategies:    disease.Prevention,
			Frequency:     "Daily",
			Effectiveness: "High",
		}
		prevention = append(prevention, preventionStrategy)
	}
	
	return prevention
}

func (dms *DiseaseManagementService) createMonitoringFromDisease(disease models.Disease, clientData models.DiseaseClientData) []models.Monitoring {
	var monitoring []models.Monitoring
	
	// Create symptom monitoring
	symptomMonitoring := models.Monitoring{
		Type:        "symptoms",
		Title:       map[string]string{"en": "Symptom Monitoring", "ar": "مراقبة الأعراض"},
		Description: map[string]string{"en": "Monitor disease symptoms", "ar": "راقب أعراض المرض"},
		Frequency:   "Daily",
		Parameters:  disease.Symptoms,
		NormalRange: "No symptoms or mild symptoms only",
	}
	monitoring = append(monitoring, symptomMonitoring)
	
	// Create appointment monitoring
	appointmentMonitoring := models.Monitoring{
		Type:        "appointments",
		Title:       map[string]string{"en": "Medical Follow-up", "ar": "المتابعة الطبية"},
		Description: map[string]string{"en": "Regular medical check-ups", "ar": "فحوصات طبية منتظمة"},
		Frequency:   "As recommended by doctor",
		Parameters:  []map[string]string{{"en": "Blood tests", "ar": "فحوصات الدم"}, {"en": "Physical examination", "ar": "الفحص البدني"}},
		NormalRange: "Within normal ranges",
	}
	monitoring = append(monitoring, appointmentMonitoring)
	
	return monitoring
}

func (dms *DiseaseManagementService) checkDrugDrugInteraction(med1, med2 models.Medication) *models.Interaction {
	// Check if medications have known interactions
	for _, interaction := range med1.Interactions {
		if strings.Contains(strings.ToLower(interaction["en"]), strings.ToLower(med2.Name["en"])) {
			return &models.Interaction{
				Type:       "drug_drug",
				Drug1:      med1.Name["en"],
				Drug2:      med2.Name["en"],
				Severity:   "moderate",
				Description: map[string]string{"en": interaction["en"], "ar": interaction["ar"]},
				Mechanism:   map[string]string{"en": "Drug interaction", "ar": "تفاعل دوائي"},
				Recommendation: map[string]string{"en": "Consult healthcare provider", "ar": "استشر مقدم الرعاية الصحية"},
			}
		}
	}
	
	return nil
}

func (dms *DiseaseManagementService) checkDrugFoodInteractions(medication models.Medication, clientData models.DiseaseClientData) []models.Interaction {
	var interactions []models.Interaction
	
	// Check food interactions from medication data
	for _, foodInteraction := range medication.FoodInteractions {
		interaction := models.Interaction{
			Type:       "drug_food",
			Drug1:      medication.Name["en"],
			Food:       foodInteraction["en"],
			Severity:   "moderate",
			Description: map[string]string{"en": foodInteraction["en"], "ar": foodInteraction["ar"]},
			Mechanism:   map[string]string{"en": "Food-drug interaction", "ar": "تفاعل غذائي دوائي"},
			Recommendation: map[string]string{"en": "Avoid or adjust timing", "ar": "تجنب أو اضبط التوقيت"},
		}
		interactions = append(interactions, interaction)
	}
	
	return interactions
}

func (dms *DiseaseManagementService) determineTreatmentType(disease models.Disease) string {
	// Determine treatment type based on disease severity and category
	switch disease.Severity {
	case "mild":
		return "lifestyle"
	case "moderate":
		return "medication"
	case "severe":
		return "medication"
	case "critical":
		return "surgery"
	default:
		return "medication"
	}
}

func (dms *DiseaseManagementService) determineTreatmentDuration(disease models.Disease, clientData models.DiseaseClientData) string {
	// Determine treatment duration based on disease and client data
	switch disease.Severity {
	case "mild":
		return "2-4 weeks"
	case "moderate":
		return "4-8 weeks"
	case "severe":
		return "8-12 weeks"
	case "critical":
		return "Ongoing"
	default:
		return "4-6 weeks"
	}
}

func (dms *DiseaseManagementService) determineFollowUpSchedule(disease models.Disease, clientData models.DiseaseClientData) string {
	// Determine follow-up schedule based on disease severity
	switch disease.Severity {
	case "mild":
		return "Every 2 weeks"
	case "moderate":
		return "Weekly"
	case "severe":
		return "Every 3-5 days"
	case "critical":
		return "Daily"
	default:
		return "Weekly"
	}
}

func (dms *DiseaseManagementService) createDisclaimer(clientData models.DiseaseClientData) string {
	disclaimer := "This disease management plan is for informational purposes only and should not replace professional medical advice. "
	
	if len(clientData.Diseases) > 0 {
		disclaimer += "If you have medical conditions, please consult with a healthcare provider before following any recommendations. "
	}
	
	if len(clientData.Medications) > 0 {
		disclaimer += "If you take medications, please consult with a healthcare provider about potential interactions and side effects. "
	}
	
	disclaimer += "Individual medical needs may vary. Please adjust recommendations according to your specific requirements and consult with healthcare professionals for personalized advice. "
	disclaimer += "This information is not intended to diagnose, treat, cure, or prevent any disease."
	
	return disclaimer
}

// Public methods for data access
func (dms *DiseaseManagementService) GetAvailableDiseases() []models.Disease {
	return dms.diseases
}

func (dms *DiseaseManagementService) GetAvailableMedications() []models.Medication {
	var allMedications []models.Medication
	
	// Collect medications from all diseases
	for _, disease := range dms.diseases {
		allMedications = append(allMedications, disease.Medications...)
	}
	
	return allMedications
}

func (dms *DiseaseManagementService) GetCategories() []string {
	return dms.categories
}

func (dms *DiseaseManagementService) GetSeverityLevels() []string {
	return dms.severityLevels
}

func (dms *DiseaseManagementService) GetTreatmentTypes() []string {
	return dms.treatmentTypes
}

func (dms *DiseaseManagementService) GetPreventionTypes() []string {
	return dms.preventionTypes
}

func (dms *DiseaseManagementService) GetMonitoringTypes() []string {
	return dms.monitoringTypes
}

func (dms *DiseaseManagementService) GetDiseaseStatistics() models.DiseaseStatistics {
	return models.DiseaseStatistics{
		TotalDiseases:    len(dms.diseases) + len(dms.oldDiseases),
		TotalMedications: len(dms.GetAvailableMedications()),
		Categories:       dms.categories,
		SeverityLevels:   dms.severityLevels,
		Interactions:     len(dms.drugNutrition),
		TreatmentTypes:   dms.treatmentTypes,
		PreventionTypes:  dms.preventionTypes,
		MonitoringTypes:  dms.monitoringTypes,
	}
}

// Helper methods
func (dms *DiseaseManagementService) loadJSONFile(filePath string) (interface{}, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	
	var result interface{}
	err = json.Unmarshal(data, &result)
	return result, err
}

func (dms *DiseaseManagementService) convertToStringMap(data map[string]interface{}) map[string]string {
	result := make(map[string]string)
	for k, v := range data {
		if str, ok := v.(string); ok {
			result[k] = str
		}
	}
	return result
}

func (dms *DiseaseManagementService) convertToStringSlice(data []interface{}) []string {
	var result []string
	for _, item := range data {
		if str, ok := item.(string); ok {
			result = append(result, str)
		}
	}
	return result
}

func (dms *DiseaseManagementService) convertToStringMapSlice(data []interface{}) []map[string]string {
	var result []map[string]string
	for _, item := range data {
		if mapData, ok := item.(map[string]interface{}); ok {
			result = append(result, dms.convertToStringMap(mapData))
		}
	}
	return result
}

func (dms *DiseaseManagementService) generateDiseasePlanID() string {
	return fmt.Sprintf("dp_%d", time.Now().UnixNano())
}
