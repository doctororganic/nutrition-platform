package services

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"math"
	"path/filepath"
	"time"

	"doctorhealthy1/models"
)

// NutritionService handles nutrition calculations and meal planning
type NutritionService struct {
	nutritionData map[string]interface{}
}

// NewNutritionService creates a new nutrition service instance
func NewNutritionService() *NutritionService {
	service := &NutritionService{}
	service.loadNutritionData()
	return service
}

// loadNutritionData loads nutrition data from JSON file
func (ns *NutritionService) loadNutritionData() error {
	// Load the nutrition data from the JSON file
	filePath := filepath.Join(".", "Nutrition.js.Json")
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &ns.nutritionData)
	if err != nil {
		return err
	}

	return nil
}

// CalculateDiet performs diet calculations based on user input
func (ns *NutritionService) CalculateDiet(diet *models.Diet) (*models.DietResult, error) {
	// Calculate BMR (Basal Metabolic Rate)
	bmr := ns.calculateBMR(diet)
	
	// Calculate TDEE (Total Daily Energy Expenditure)
	tdee := ns.calculateTDEE(bmr, diet.ActivityLevel)
	
	// Adjust for goal and IF schedule
	targetCalories := ns.adjustForGoalAndIF(tdee, diet.Goal, diet.IFSchedule)
	
	// Calculate macro targets
	macroTargets := ns.calculateMacroTargets(targetCalories)
	
	// Get meal plan for the country and IF schedule
	mealPlan, err := ns.getMealPlan(diet.Country, diet.IFSchedule)
	if err != nil {
		return nil, err
	}

	result := &models.DietResult{
		UserID:         diet.UserID,
		BMR:            bmr,
		TDEE:           tdee,
		TargetCalories: targetCalories,
		MacroTargets:   macroTargets,
		MealPlan:       mealPlan,
		GeneratedAt:    time.Now(),
	}

	return result, nil
}

// calculateBMR calculates Basal Metabolic Rate using Mifflin-St Jeor equation
func (ns *NutritionService) calculateBMR(diet *models.Diet) float64 {
	var bmr float64
	
	if diet.Gender == "male" {
		bmr = 88.362 + (13.397 * diet.Weight) + (4.799 * diet.Height) - (5.677 * float64(diet.Age))
	} else {
		bmr = 447.593 + (9.247 * diet.Weight) + (3.098 * diet.Height) - (4.330 * float64(diet.Age))
	}
	
	return math.Round(bmr*100) / 100
}

// calculateTDEE calculates Total Daily Energy Expenditure
func (ns *NutritionService) calculateTDEE(bmr float64, activityLevel string) float64 {
	activityMultipliers := map[string]float64{
		"sedentary":          1.2,
		"lightly_active":     1.375,
		"moderately_active":  1.55,
		"very_active":        1.725,
		"extremely_active":   1.9,
	}
	
	multiplier, exists := activityMultipliers[activityLevel]
	if !exists {
		multiplier = 1.2 // Default to sedentary
	}
	
	return math.Round(bmr*multiplier*100) / 100
}

// adjustForGoalAndIF adjusts calories for weight goal and intermittent fasting
func (ns *NutritionService) adjustForGoalAndIF(tdee float64, goal string, ifSchedule string) float64 {
	// Adjust for weight goal
	var goalAdjustment float64
	switch goal {
	case "lose_weight":
		goalAdjustment = -0.2 // 20% calorie deficit
	case "gain_weight":
		goalAdjustment = 0.15 // 15% calorie surplus
	default:
		goalAdjustment = 0 // Maintain weight
	}
	
	// Adjust for IF schedule
	ifAdjustments := map[string]float64{
		"16_8": 1.0,
		"18_6": 0.95,
		"20_4": 0.90,
		"omad":  0.85,
	}
	
	ifMultiplier, exists := ifAdjustments[ifSchedule]
	if !exists {
		ifMultiplier = 1.0
	}
	
	adjustedCalories := tdee * (1 + goalAdjustment) * ifMultiplier
	return math.Round(adjustedCalories*100) / 100
}

// calculateMacroTargets calculates macronutrient targets
func (ns *NutritionService) calculateMacroTargets(calories float64) models.MacroTargets {
	proteinPercent := 0.28
	fatPercent := 0.32
	carbPercent := 0.40
	
	proteinCalories := calories * proteinPercent
	fatCalories := calories * fatPercent
	carbCalories := calories * carbPercent
	
	// Convert calories to grams (protein: 4 cal/g, fat: 9 cal/g, carbs: 4 cal/g)
	proteinGrams := math.Round(proteinCalories/4*100) / 100
	fatGrams := math.Round(fatCalories/9*100) / 100
	carbGrams := math.Round(carbCalories/4*100) / 100
	
	return models.MacroTargets{
		ProteinGrams:   proteinGrams,
		CarbGrams:      carbGrams,
		FatGrams:       fatGrams,
		ProteinPercent: proteinPercent * 100,
		CarbPercent:    carbPercent * 100,
		FatPercent:     fatPercent * 100,
	}
}

// getMealPlan retrieves meal plan for specific country and IF schedule
func (ns *NutritionService) getMealPlan(country string, ifSchedule string) (map[string]interface{}, error) {
	if ns.nutritionData == nil {
		return nil, errors.New("nutrition data not loaded")
	}
	
	// Navigate through the JSON structure
	arabianGulfAPI, ok := ns.nutritionData["arabian_gulf_intermittent_fasting_api"].(map[string]interface{})
	if !ok {
		return nil, errors.New("invalid nutrition data structure")
	}
	
	mealPlans, ok := arabianGulfAPI["meal_plans"].(map[string]interface{})
	if !ok {
		return nil, errors.New("meal plans not found")
	}
	
	countryPlans, ok := mealPlans[country].(map[string]interface{})
	if !ok {
		return nil, errors.New("meal plan not found for country: " + country)
	}
	
	scheduleKey := ifSchedule + "_schedule"
	schedulePlan, ok := countryPlans[scheduleKey].(map[string]interface{})
	if !ok {
		return nil, errors.New("meal plan not found for IF schedule: " + ifSchedule)
	}
	
	return schedulePlan, nil
}

// ValidateNutritionRequest performs additional business logic validation
func (ns *NutritionService) ValidateNutritionRequest(diet *models.Diet) error {
	// Check if the combination of country and IF schedule is supported
	_, err := ns.getMealPlan(diet.Country, diet.IFSchedule)
	if err != nil {
		return errors.New("meal plan not available for the selected country and IF schedule combination")
	}
	
	// Additional business validations can be added here
	// For example, checking for conflicting health conditions
	
	return nil
}

// GetDiseaseList returns a list of available disease files
func (ns *NutritionService) GetDiseaseList() ([]map[string]interface{}, error) {
	diseaseDir := filepath.Join(".", "disease-easy-json-files")
	
	files, err := ioutil.ReadDir(diseaseDir)
	if err != nil {
		return nil, err
	}

	var diseaseList []map[string]interface{}
	
	for _, file := range files {
		if filepath.Ext(file.Name()) == ".json" {
			// Extract disease name without extension
			diseaseName := file.Name()[:len(file.Name())-5] // Remove .json
			
			diseaseInfo := map[string]interface{}{
				"filename":     file.Name(),
				"diseaseName":  diseaseName,
				"lastModified": file.ModTime(),
				"size":         file.Size(),
			}
			
			// Try to get basic info from the file
			filePath := filepath.Join(diseaseDir, file.Name())
			if basicInfo, err := ns.getBasicDiseaseInfo(filePath); err == nil {
				diseaseInfo["condition"] = basicInfo
			}
			
			diseaseList = append(diseaseList, diseaseInfo)
		}
	}
	
	return diseaseList, nil
}

// GetDiseaseInfo returns detailed information for a specific disease
func (ns *NutritionService) GetDiseaseInfo(diseaseName string) (map[string]interface{}, error) {
	diseaseDir := filepath.Join(".", "disease-easy-json-files")
	
	// Try to find the file by exact match or partial match
	files, err := ioutil.ReadDir(diseaseDir)
	if err != nil {
		return nil, err
	}
	
	var targetFile string
	for _, file := range files {
		if filepath.Ext(file.Name()) == ".json" {
			// Check for exact match (without extension)
			fileName := file.Name()[:len(file.Name())-5]
			if fileName == diseaseName || file.Name() == diseaseName {
				targetFile = file.Name()
				break
			}
		}
	}
	
	if targetFile == "" {
		return nil, errors.New("disease file not found")
	}
	
	// Read and parse the disease file
	filePath := filepath.Join(diseaseDir, targetFile)
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	
	var diseaseData map[string]interface{}
	err = json.Unmarshal(data, &diseaseData)
	if err != nil {
		return nil, err
	}
	
	return diseaseData, nil
}

// getBasicDiseaseInfo extracts basic information from a disease file
func (ns *NutritionService) getBasicDiseaseInfo(filePath string) (map[string]interface{}, error) {
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	
	var diseaseData map[string]interface{}
	err = json.Unmarshal(data, &diseaseData)
	if err != nil {
		return nil, err
	}
	
	// Extract only the condition information
	if condition, exists := diseaseData["condition"]; exists {
		return condition.(map[string]interface{}), nil
	}
	
	return nil, errors.New("condition information not found")
}

// GetInjuryList returns a list of available injury rehabilitation files
func (ns *NutritionService) GetInjuryList() ([]map[string]interface{}, error) {
	injuryDir := filepath.Join(".", "injury-easy-json")
	
	files, err := ioutil.ReadDir(injuryDir)
	if err != nil {
		return nil, err
	}

	var injuryList []map[string]interface{}
	
	for _, file := range files {
		if filepath.Ext(file.Name()) == ".json" {
			// Extract injury name without extension
			injuryName := file.Name()[:len(file.Name())-5] // Remove .json
			
			injuryInfo := map[string]interface{}{
				"filename":     file.Name(),
				"injuryName":   injuryName,
				"lastModified": file.ModTime(),
				"size":         file.Size(),
			}
			
			// Try to get basic info from the file
			filePath := filepath.Join(injuryDir, file.Name())
			if basicInfo, err := ns.getBasicInjuryInfo(filePath); err == nil {
				injuryInfo["injury"] = basicInfo
			}
			
			injuryList = append(injuryList, injuryInfo)
		}
	}
	
	return injuryList, nil
}

// GetInjuryInfo returns detailed rehabilitation information for a specific injury
func (ns *NutritionService) GetInjuryInfo(injuryName string) (map[string]interface{}, error) {
	injuryDir := filepath.Join(".", "injury-easy-json")
	
	// Try to find the file by exact match or partial match
	files, err := ioutil.ReadDir(injuryDir)
	if err != nil {
		return nil, err
	}
	
	var targetFile string
	for _, file := range files {
		if filepath.Ext(file.Name()) == ".json" {
			// Check for exact match (without extension)
			fileName := file.Name()[:len(file.Name())-5]
			if fileName == injuryName || file.Name() == injuryName {
				targetFile = file.Name()
				break
			}
		}
	}
	
	if targetFile == "" {
		return nil, errors.New("injury file not found")
	}
	
	// Read and parse the injury file
	filePath := filepath.Join(injuryDir, targetFile)
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	
	var injuryData map[string]interface{}
	err = json.Unmarshal(data, &injuryData)
	if err != nil {
		return nil, err
	}
	
	return injuryData, nil
}

// getBasicInjuryInfo extracts basic information from an injury file
func (ns *NutritionService) getBasicInjuryInfo(filePath string) (map[string]interface{}, error) {
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	
	var injuryData map[string]interface{}
	err = json.Unmarshal(data, &injuryData)
	if err != nil {
		return nil, err
	}
	
	// Extract only the injury information
	if injury, exists := injuryData["injury"]; exists {
		return injury.(map[string]interface{}), nil
	}
	
	return nil, errors.New("injury information not found")
}
