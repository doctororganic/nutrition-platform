package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

// HealthDataService handles access to health-related data files
type HealthDataService struct {
	dataPath string
	cache    map[string]interface{}
}

// NewHealthDataService creates a new health data service
func NewHealthDataService(dataPath string) *HealthDataService {
	service := &HealthDataService{
		dataPath: dataPath,
		cache:    make(map[string]interface{}),
	}
	
	// Preload data files
	service.preloadData()
	
	return service
}

// preloadData loads all data files into memory for faster access
func (hds *HealthDataService) preloadData() {
	dataFiles := map[string]string{
		"metabolism":        "metabolism.js",
		"old_diseases":      "old disease.js",
		"workout_techniques": "workouts teq.js",
		"meal_plans":        "meals plans.js",
		"calories":          "calories.js",
		"drug_nutrition":    "drugs affect nutrition.js",
		"vitamins_minerals": "vitamins and minerals.js",
		"type_plans":        "Type plan.js",
	}

	for key, filename := range dataFiles {
		data, err := hds.loadJSONFile(filename)
		if err != nil {
			log.Printf("Warning: Could not load %s: %v", filename, err)
			continue
		}
		hds.cache[key] = data
		log.Printf("Loaded %s data successfully", key)
	}
}

// loadJSONFile loads a JSON file and returns its content
func (hds *HealthDataService) loadJSONFile(filename string) (interface{}, error) {
	filePath := filepath.Join(hds.dataPath, filename)
	
	// Check if file exists
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return nil, fmt.Errorf("file not found: %s", filename)
	}
	
	// Read file content
	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read file %s: %w", filename, err)
	}
	
	// Parse JSON
	var data interface{}
	if err := json.Unmarshal(content, &data); err != nil {
		return nil, fmt.Errorf("failed to parse JSON from %s: %w", filename, err)
	}
	
	return data, nil
}

// GetMetabolismData returns metabolism data
func (hds *HealthDataService) GetMetabolismData() (interface{}, error) {
	if data, exists := hds.cache["metabolism"]; exists {
		return data, nil
	}
	return nil, fmt.Errorf("metabolism data not available")
}

// GetOldDiseasesData returns old diseases data
func (hds *HealthDataService) GetOldDiseasesData() (interface{}, error) {
	if data, exists := hds.cache["old_diseases"]; exists {
		return data, nil
	}
	return nil, fmt.Errorf("old diseases data not available")
}

// GetWorkoutTechniquesData returns workout techniques data
func (hds *HealthDataService) GetWorkoutTechniquesData() (interface{}, error) {
	if data, exists := hds.cache["workout_techniques"]; exists {
		return data, nil
	}
	return nil, fmt.Errorf("workout techniques data not available")
}

// GetMealPlansData returns meal plans data
func (hds *HealthDataService) GetMealPlansData() (interface{}, error) {
	if data, exists := hds.cache["meal_plans"]; exists {
		return data, nil
	}
	return nil, fmt.Errorf("meal plans data not available")
}

// GetCaloriesData returns calories data
func (hds *HealthDataService) GetCaloriesData() (interface{}, error) {
	if data, exists := hds.cache["calories"]; exists {
		return data, nil
	}
	return nil, fmt.Errorf("calories data not available")
}

// GetDrugNutritionData returns drug nutrition effects data
func (hds *HealthDataService) GetDrugNutritionData() (interface{}, error) {
	if data, exists := hds.cache["drug_nutrition"]; exists {
		return data, nil
	}
	return nil, fmt.Errorf("drug nutrition data not available")
}

// GetVitaminsMineralsData returns vitamins and minerals data
func (hds *HealthDataService) GetVitaminsMineralsData() (interface{}, error) {
	if data, exists := hds.cache["vitamins_minerals"]; exists {
		return data, nil
	}
	return nil, fmt.Errorf("vitamins and minerals data not available")
}

// GetTypePlansData returns type plans data
func (hds *HealthDataService) GetTypePlansData() (interface{}, error) {
	if data, exists := hds.cache["type_plans"]; exists {
		return data, nil
	}
	return nil, fmt.Errorf("type plans data not available")
}

// SearchMetabolismData searches metabolism data by keyword
func (hds *HealthDataService) SearchMetabolismData(query string) (interface{}, error) {
	data, err := hds.GetMetabolismData()
	if err != nil {
		return nil, err
	}
	
	// Simple search implementation - can be enhanced with more sophisticated search
	return hds.searchInData(data, query), nil
}

// SearchOldDiseasesData searches old diseases data by keyword
func (hds *HealthDataService) SearchOldDiseasesData(query string) (interface{}, error) {
	data, err := hds.GetOldDiseasesData()
	if err != nil {
		return nil, err
	}
	
	return hds.searchInData(data, query), nil
}

// GetDiseaseByName returns specific disease data by name
func (hds *HealthDataService) GetDiseaseByName(diseaseName string) (interface{}, error) {
	data, err := hds.GetOldDiseasesData()
	if err != nil {
		return nil, err
	}
	
	// Search for the specific disease
	return hds.findDiseaseByName(data, diseaseName), nil
}

// GetWorkoutTechniqueByName returns specific workout technique data
func (hds *HealthDataService) GetWorkoutTechniqueByName(techniqueName string) (interface{}, error) {
	data, err := hds.GetWorkoutTechniquesData()
	if err != nil {
		return nil, err
	}
	
	return hds.findWorkoutTechniqueByName(data, techniqueName), nil
}

// GetVitaminMineralByName returns specific vitamin/mineral data
func (hds *HealthDataService) GetVitaminMineralByName(nutrientName string) (interface{}, error) {
	data, err := hds.GetVitaminsMineralsData()
	if err != nil {
		return nil, err
	}
	
	return hds.findNutrientByName(data, nutrientName), nil
}

// GetCalorieInfo returns calorie information for specific food
func (hds *HealthDataService) GetCalorieInfo(foodName string) (interface{}, error) {
	data, err := hds.GetCaloriesData()
	if err != nil {
		return nil, err
	}
	
	return hds.findCalorieInfo(data, foodName), nil
}

// Helper methods for searching and filtering data
func (hds *HealthDataService) searchInData(data interface{}, query string) interface{} {
	// This is a simplified search implementation
	// In a production environment, you might want to use a proper search engine
	query = strings.ToLower(query)
	
	// Convert data to JSON string for simple text search
	jsonData, _ := json.Marshal(data)
	if strings.Contains(strings.ToLower(string(jsonData)), query) {
		return data
	}
	
	return nil
}

func (hds *HealthDataService) findDiseaseByName(data interface{}, diseaseName string) interface{} {
	// Implementation would depend on the structure of the old diseases data
	// This is a placeholder - actual implementation would parse the specific structure
	return data
}

func (hds *HealthDataService) findWorkoutTechniqueByName(data interface{}, techniqueName string) interface{} {
	// Implementation would depend on the structure of the workout techniques data
	return data
}

func (hds *HealthDataService) findNutrientByName(data interface{}, nutrientName string) interface{} {
	// Implementation would depend on the structure of the vitamins/minerals data
	return data
}

func (hds *HealthDataService) findCalorieInfo(data interface{}, foodName string) interface{} {
	// Implementation would depend on the structure of the calories data
	return data
}

// ReloadData reloads all data files from disk
func (hds *HealthDataService) ReloadData() error {
	hds.cache = make(map[string]interface{})
	hds.preloadData()
	return nil
}

// GetAvailableDataTypes returns list of available data types
func (hds *HealthDataService) GetAvailableDataTypes() []string {
	return []string{
		"metabolism",
		"old_diseases",
		"workout_techniques",
		"meal_plans",
		"calories",
		"drug_nutrition",
		"vitamins_minerals",
		"type_plans",
	}
}
