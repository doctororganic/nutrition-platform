package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"math/rand"
	"path/filepath"
	"strings"
	"time"

	"doctorhealthy1/models"
)

// MealPlanningService handles meal plan generation and recipe management
type MealPlanningService struct {
	dataPath          string
	recipes           map[string][]models.Recipe
	caloriesData      map[string]interface{}
	typePlansData     map[string]interface{}
	oldDiseasesData   map[string]interface{}
	drugNutritionData map[string]interface{}
	mealsPlansData    map[string]interface{}
}

// NewMealPlanningService creates a new meal planning service
func NewMealPlanningService(dataPath string) *MealPlanningService {
	service := &MealPlanningService{
		dataPath: dataPath,
		recipes:  make(map[string][]models.Recipe),
	}

	// Load all necessary data
	service.loadData()

	return service
}

// loadData loads all necessary data files
func (mps *MealPlanningService) loadData() {
	// Load recipes
	mps.loadRecipes()

	// Load calories data
	mps.caloriesData = mps.loadJSONFile("calories.js")

	// Load type plans data
	mps.typePlansData = mps.loadJSONFile("Type plan.js")

	// Load old diseases data
	mps.oldDiseasesData = mps.loadJSONFile("old disease.js")

	// Load drug nutrition data
	mps.drugNutritionData = mps.loadJSONFile("drugs-affect-nutrition.json")

	// Load meals plans data
	mps.mealsPlansData = mps.loadJSONFile("meals plans.js")
}

// loadRecipes loads recipes from the recipes directory
func (mps *MealPlanningService) loadRecipes() {
	recipesPath := filepath.Join(mps.dataPath, "plans-and-recipes-json")

	recipeFiles := []string{
		"easy recipes.js",
		"sweet recipes.js",
		"other recipes.js",
		"diet plans meals.js",
	}

	for _, filename := range recipeFiles {
		filePath := filepath.Join(recipesPath, filename)
		recipes := mps.parseRecipesFile(filePath)

		// Group recipes by country
		for _, recipe := range recipes {
			country := strings.ToLower(recipe.Country)
			mps.recipes[country] = append(mps.recipes[country], recipe)
		}
	}

	log.Printf("Loaded recipes for %d countries", len(mps.recipes))
}

// parseRecipesFile parses a recipes file and extracts individual recipes
func (mps *MealPlanningService) parseRecipesFile(filePath string) []models.Recipe {
	var recipes []models.Recipe

	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Printf("Warning: Could not read recipes file %s: %v", filePath, err)
		return recipes
	}

	// Parse the content to extract individual recipes
	// This is a simplified parser - in production you'd want a more robust solution
	contentStr := string(content)

	// Split by recipe markers and parse each recipe
	recipeBlocks := strings.Split(contentStr, "```json")

	for _, block := range recipeBlocks {
		if strings.Contains(block, "country") {
			// Extract JSON from the block
			start := strings.Index(block, "{")
			end := strings.LastIndex(block, "}")

			if start != -1 && end != -1 && end > start {
				jsonStr := block[start : end+1]

				var recipe models.Recipe
				if err := json.Unmarshal([]byte(jsonStr), &recipe); err == nil {
					recipes = append(recipes, recipe)
				}
			}
		}
	}

	return recipes
}

// loadJSONFile loads a JSON file and returns its content
func (mps *MealPlanningService) loadJSONFile(filename string) map[string]interface{} {
	filePath := filepath.Join(mps.dataPath, filename)

	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Printf("Warning: Could not load %s: %v", filename, err)
		return make(map[string]interface{})
	}

	var data map[string]interface{}
	if err := json.Unmarshal(content, &data); err != nil {
		log.Printf("Warning: Could not parse JSON from %s: %v", filename, err)
		return make(map[string]interface{})
	}

	return data
}

// GenerateMealPlan generates a personalized meal plan based on client data
func (mps *MealPlanningService) GenerateMealPlan(request models.MealPlanRequest) (*models.MealPlanResponse, error) {
	// Calculate nutritional needs
	nutritionalNeeds := mps.CalculateNutritionalNeeds(&request.ClientData)

	// Determine appropriate diet type
	dietType := mps.determineDietType(request.ClientData, request.DietType)

	// Generate weekly meal schedule
	weeklySchedule := mps.generateWeeklySchedule(request, nutritionalNeeds, dietType)

	// Create meal plan
	mealPlan := &models.MealPlan{
		ID:               generateMealPlanID(),
		ClientData:       request.ClientData,
		NutritionalNeeds: nutritionalNeeds,
		DietType:         dietType,
		WeeklySchedule:   weeklySchedule,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}

	// Calculate totals
	mps.calculateMealPlanTotals(mealPlan)

	// Create calculation details
	calculationDetails := mps.CreateCalculationDetails(request.ClientData, nutritionalNeeds)

	// Create disclaimer
	disclaimer := mps.createDisclaimer(request.ClientData)

	return &models.MealPlanResponse{
		Success:            true,
		Message:            "Meal plan generated successfully",
		MealPlan:           mealPlan,
		CalculationDetails: calculationDetails,
		Disclaimer:         disclaimer,
	}, nil
}

// CalculateNutritionalNeeds calculates daily nutritional requirements
func (mps *MealPlanningService) CalculateNutritionalNeeds(clientData *models.ClientData) models.NutritionalNeeds {
	// Calculate BMI category
	bmiCategory := clientData.GetBMICategory()

	// Calculate calorie multiplier
	calorieMultiplier := clientData.CalculateCalorieMultiplier()

	// Calculate daily calories
	dailyCalories := int(clientData.Weight * calorieMultiplier)

	// Calculate protein multiplier
	proteinMultiplier := clientData.CalculateProteinMultiplier()

	// Calculate macronutrients
	proteinGrams := clientData.Weight * proteinMultiplier

	// Determine macro ratios based on diet type (will be refined later)
	var carbRatio, fatRatio float64
	switch clientData.SystemGoal {
	case "strength_muscle":
		carbRatio = 0.45
		fatRatio = 0.30
	case "weight_gain":
		carbRatio = 0.50
		fatRatio = 0.25
	case "weight_loss":
		carbRatio = 0.35
		fatRatio = 0.35
	case "weight_maintenance":
		carbRatio = 0.45
		fatRatio = 0.30
	case "reshaping":
		carbRatio = 0.40
		fatRatio = 0.30
	default:
		carbRatio = 0.45
		fatRatio = 0.30
	}

	carbGrams := (float64(dailyCalories) * carbRatio) / 4 // 4 calories per gram of carbs
	fatGrams := (float64(dailyCalories) * fatRatio) / 9   // 9 calories per gram of fat

	// Calculate fiber (14g per 1000 calories)
	fiberGrams := (float64(dailyCalories) / 1000) * 14

	return models.NutritionalNeeds{
		DailyCalories:     dailyCalories,
		ProteinGrams:      proteinGrams,
		CarbGrams:         carbGrams,
		FatGrams:          fatGrams,
		FiberGrams:        fiberGrams,
		BMICategory:       bmiCategory,
		CalorieMultiplier: calorieMultiplier,
		ProteinMultiplier: proteinMultiplier,
		CalculationMethod: "Weight-based calculation with activity and goal adjustments",
	}
}

// determineDietType determines the most appropriate diet type for the client
func (mps *MealPlanningService) determineDietType(clientData models.ClientData, requestedDiet string) string {
	if requestedDiet != "" {
		return requestedDiet
	}

	// Auto-determine based on client data
	switch {
	case len(clientData.Diseases) > 0:
		// Check for specific conditions that require special diets
		for _, disease := range clientData.Diseases {
			diseaseLower := strings.ToLower(disease)
			switch {
			case strings.Contains(diseaseLower, "diabetes"):
				return "low_carb"
			case strings.Contains(diseaseLower, "heart") || strings.Contains(diseaseLower, "cardiovascular"):
				return "mediterranean"
			case strings.Contains(diseaseLower, "hypertension"):
				return "dash"
			case strings.Contains(diseaseLower, "inflammation"):
				return "anti_inflammatory"
			}
		}
	case clientData.SystemGoal == "weight_loss":
		return "low_carb"
	case clientData.SystemGoal == "strength_muscle":
		return "high_carb"
	case clientData.SystemGoal == "weight_gain":
		return "balanced"
	default:
		return "balanced"
	}

	return "balanced"
}

// generateWeeklySchedule generates a weekly meal schedule
func (mps *MealPlanningService) generateWeeklySchedule(request models.MealPlanRequest, nutritionalNeeds models.NutritionalNeeds, dietType string) []models.DayPlan {
	var weeklySchedule []models.DayPlan

	days := []string{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}

	for i, day := range days {
		dayPlan := models.DayPlan{
			Day: day,
		}

		// Determine meal structure based on goals and preferences
		mealsPerDay := mps.determineMealsPerDay(request, i)

		// Generate meals for the day
		dayPlan.Meals = mps.generateDayMeals(request, nutritionalNeeds, dietType, mealsPerDay)

		// Generate snacks if requested
		if request.IncludeSnacks {
			dayPlan.Snacks = mps.generateSnacks(request, nutritionalNeeds, dietType)
		}

		// Calculate day totals
		mps.calculateDayTotals(&dayPlan)

		weeklySchedule = append(weeklySchedule, dayPlan)
	}

	return weeklySchedule
}

// determineMealsPerDay determines how many meals to have per day
func (mps *MealPlanningService) determineMealsPerDay(request models.MealPlanRequest, dayIndex int) int {
	if request.MealsPerDay > 0 {
		return request.MealsPerDay
	}

	// Auto-determine based on goals and intermittent fasting
	if request.IntermittentFasting && (dayIndex == 2 || dayIndex == 5) { // Wednesday and Saturday
		return 2 // Two meals + one snack for fasting days
	}

	switch request.ClientData.SystemGoal {
	case "strength_muscle", "weight_gain":
		return 4 // Four meals for muscle building and weight gain
	case "weight_loss":
		return 3 // Three meals for weight loss
	default:
		return 3 // Default to three meals
	}
}

// generateDayMeals generates meals for a single day
func (mps *MealPlanningService) generateDayMeals(request models.MealPlanRequest, nutritionalNeeds models.NutritionalNeeds, dietType string, mealsPerDay int) []models.Meal {
	var meals []models.Meal

	mealTypes := []string{"breakfast", "lunch", "dinner"}
	if mealsPerDay == 4 {
		mealTypes = append(mealTypes, "second_lunch")
	}

	// Calculate calories per meal
	caloriesPerMeal := nutritionalNeeds.DailyCalories / mealsPerDay

	for i, mealType := range mealTypes {
		if i >= mealsPerDay {
			break
		}

		meal := mps.generateMeal(request, nutritionalNeeds, dietType, mealType, caloriesPerMeal)
		meals = append(meals, meal)
	}

	return meals
}

// generateMeal generates a single meal
func (mps *MealPlanningService) generateMeal(request models.MealPlanRequest, nutritionalNeeds models.NutritionalNeeds, dietType string, mealType string, targetCalories int) models.Meal {
	// Get recipes for the preferred cuisine
	cuisine := strings.ToLower(request.ClientData.PreferredCuisine)
	if cuisine == "" {
		cuisine = "egypt" // Default to Egyptian cuisine
	}

	recipes := mps.recipes[cuisine]
	if len(recipes) == 0 {
		// Fallback to any available recipes
		for _, countryRecipes := range mps.recipes {
			if len(countryRecipes) > 0 {
				recipes = countryRecipes
				break
			}
		}
	}

	// Select a recipe based on meal type and diet compatibility
	selectedRecipe := mps.selectRecipe(recipes, mealType, dietType, request.ClientData.ExcludedFoods)

	// Convert recipe to meal
	meal := mps.convertRecipeToMeal(selectedRecipe, mealType, targetCalories, request)

	return meal
}

// selectRecipe selects an appropriate recipe based on criteria
func (mps *MealPlanningService) selectRecipe(recipes []models.Recipe, mealType string, dietType string, excludedFoods []string) models.Recipe {
	var compatibleRecipes []models.Recipe

	for _, recipe := range recipes {
		// Check if recipe is compatible with diet type
		if mps.isRecipeCompatibleWithDiet(recipe, dietType) {
			// Check if recipe contains excluded foods
			if !mps.containsExcludedFoods(recipe, excludedFoods) {
				compatibleRecipes = append(compatibleRecipes, recipe)
			}
		}
	}

	if len(compatibleRecipes) == 0 {
		// Fallback to any recipe
		compatibleRecipes = recipes
	}

	// Randomly select a recipe
	if len(compatibleRecipes) > 0 {
		return compatibleRecipes[rand.Intn(len(compatibleRecipes))]
	}

	// Return a default recipe if none found
	return models.Recipe{
		Country:     "Default",
		RecipeName:  map[string]string{"en": "Default Meal", "ar": "وجبة افتراضية"},
		Description: map[string]string{"en": "A balanced meal", "ar": "وجبة متوازنة"},
		Ingredients: []models.RecipeIngredient{},
		Method:      []map[string]string{},
		Nutrition: models.RecipeNutrition{
			Calories: "300",
			Protein:  "20g",
			Carbs:    "30g",
			Fat:      "10g",
		},
	}
}

// IsRecipeCompatibleWithDiet checks if a recipe is compatible with a diet type
func (mps *MealPlanningService) IsRecipeCompatibleWithDiet(recipe models.Recipe, dietType string) bool {
	// Check if recipe has diet compatibility information
	if len(recipe.DietCompatible) > 0 {
		for _, compatible := range recipe.DietCompatible {
			if strings.ToLower(compatible) == strings.ToLower(dietType) {
				return true
			}
		}
		return false
	}

	// Fallback compatibility check based on ingredients
	switch dietType {
	case "keto":
		return mps.isKetoCompatible(recipe)
	case "vegan":
		return mps.isVeganCompatible(recipe)
	case "low_carb":
		return mps.isLowCarbCompatible(recipe)
	default:
		return true // Most recipes are compatible with balanced diets
	}
}

// isRecipeCompatibleWithDiet checks if a recipe is compatible with a diet type
func (mps *MealPlanningService) isRecipeCompatibleWithDiet(recipe models.Recipe, dietType string) bool {
	// Check if recipe has diet compatibility information
	if len(recipe.DietCompatible) > 0 {
		for _, compatible := range recipe.DietCompatible {
			if strings.ToLower(compatible) == strings.ToLower(dietType) {
				return true
			}
		}
		return false
	}

	// Fallback compatibility check based on ingredients
	switch dietType {
	case "keto":
		return mps.isKetoCompatible(recipe)
	case "vegan":
		return mps.isVeganCompatible(recipe)
	case "low_carb":
		return mps.isLowCarbCompatible(recipe)
	default:
		return true // Most recipes are compatible with balanced diets
	}
}

// isKetoCompatible checks if a recipe is keto-compatible
func (mps *MealPlanningService) isKetoCompatible(recipe models.Recipe) bool {
	// Check for high-carb ingredients that are not keto-friendly
	highCarbIngredients := []string{"rice", "pasta", "bread", "potato", "sugar", "honey"}

	for _, ingredient := range recipe.Ingredients {
		ingredientName := strings.ToLower(ingredient.Name["en"])
		for _, highCarb := range highCarbIngredients {
			if strings.Contains(ingredientName, highCarb) {
				return false
			}
		}
	}

	return true
}

// isVeganCompatible checks if a recipe is vegan-compatible
func (mps *MealPlanningService) isVeganCompatible(recipe models.Recipe) bool {
	// Check for animal products
	animalIngredients := []string{"meat", "chicken", "beef", "lamb", "fish", "egg", "milk", "cheese", "butter"}

	for _, ingredient := range recipe.Ingredients {
		ingredientName := strings.ToLower(ingredient.Name["en"])
		for _, animal := range animalIngredients {
			if strings.Contains(ingredientName, animal) {
				return false
			}
		}
	}

	return true
}

// isLowCarbCompatible checks if a recipe is low-carb compatible
func (mps *MealPlanningService) isLowCarbCompatible(recipe models.Recipe) bool {
	// Similar to keto but less strict
	highCarbIngredients := []string{"rice", "pasta", "bread", "potato", "sugar"}

	for _, ingredient := range recipe.Ingredients {
		ingredientName := strings.ToLower(ingredient.Name["en"])
		for _, highCarb := range highCarbIngredients {
			if strings.Contains(ingredientName, highCarb) {
				return false
			}
		}
	}

	return true
}

// containsExcludedFoods checks if a recipe contains excluded foods
func (mps *MealPlanningService) containsExcludedFoods(recipe models.Recipe, excludedFoods []string) bool {
	for _, ingredient := range recipe.Ingredients {
		ingredientName := strings.ToLower(ingredient.Name["en"])
		for _, excluded := range excludedFoods {
			if strings.Contains(ingredientName, strings.ToLower(excluded)) {
				return true
			}
		}
	}

	return false
}

// convertRecipeToMeal converts a recipe to a meal with nutritional information
func (mps *MealPlanningService) convertRecipeToMeal(recipe models.Recipe, mealType string, targetCalories int, request models.MealPlanRequest) models.Meal {
	// Parse nutrition information
	calories := mps.parseNutritionValue(recipe.Nutrition.Calories)
	protein := mps.parseNutritionValue(recipe.Nutrition.Protein)
	carbs := mps.parseNutritionValue(recipe.Nutrition.Carbs)
	fat := mps.parseNutritionValue(recipe.Nutrition.Fat)

	// Scale nutrition to target calories
	scaleFactor := float64(targetCalories) / float64(calories)

	// Convert ingredients
	var ingredients []models.Ingredient
	for _, recipeIngredient := range recipe.Ingredients {
		ingredient := models.Ingredient{
			Name:     recipeIngredient.Name["en"],
			Amount:   recipeIngredient.Amount,
			Unit:     "serving",
			Calories: int(float64(calories) * scaleFactor / float64(len(recipe.Ingredients))),
			Protein:  protein * scaleFactor / float64(len(recipe.Ingredients)),
			Carbs:    carbs * scaleFactor / float64(len(recipe.Ingredients)),
			Fat:      fat * scaleFactor / float64(len(recipe.Ingredients)),
		}
		ingredients = append(ingredients, ingredient)
	}

	// Convert method to instructions
	var instructions []string
	for _, step := range recipe.Method {
		instructions = append(instructions, step["en"])
	}

	return models.Meal{
		Name:            recipe.RecipeName["en"],
		Type:            mealType,
		Ingredients:     ingredients,
		Instructions:    instructions,
		Calories:        targetCalories,
		Protein:         protein * scaleFactor,
		Carbs:           carbs * scaleFactor,
		Fat:             fat * scaleFactor,
		Fiber:           0,            // Will be calculated from ingredients
		PreparationTime: "30 minutes", // Default
		Cuisine:         recipe.Country,
		DietCompatible:  recipe.DietCompatible,
	}
}

// parseNutritionValue parses nutrition values from strings
func (mps *MealPlanningService) parseNutritionValue(value string) float64 {
	// Remove common units and parse
	value = strings.ToLower(value)
	value = strings.ReplaceAll(value, "g", "")
	value = strings.ReplaceAll(value, "calories", "")
	value = strings.ReplaceAll(value, "per serving", "")
	value = strings.TrimSpace(value)

	var result float64
	fmt.Sscanf(value, "%f", &result)
	return result
}

// generateMealAlternatives generates alternative meals
func (mps *MealPlanningService) generateMealAlternatives(request models.MealPlanRequest, nutritionalNeeds models.NutritionalNeeds, dietType string, mealType string, targetCalories int) []models.Meal {
	var alternatives []models.Meal

	// Get recipes for the preferred cuisine
	cuisine := strings.ToLower(request.ClientData.PreferredCuisine)
	if cuisine == "" {
		cuisine = "egypt" // Default to Egyptian cuisine
	}

	recipes := mps.recipes[cuisine]
	if len(recipes) == 0 {
		// Fallback to any available recipes
		for _, countryRecipes := range mps.recipes {
			if len(countryRecipes) > 0 {
				recipes = countryRecipes
				break
			}
		}
	}

	// Generate 2-3 alternatives
	for i := 0; i < 2 && i < len(recipes); i++ {
		// Select a different recipe for each alternative
		selectedRecipe := recipes[rand.Intn(len(recipes))]
		meal := mps.convertRecipeToMeal(selectedRecipe, mealType, targetCalories, request)
		alternatives = append(alternatives, meal)
	}

	return alternatives
}

// generateSnacks generates snacks for the day
func (mps *MealPlanningService) generateSnacks(request models.MealPlanRequest, nutritionalNeeds models.NutritionalNeeds, dietType string) []models.Meal {
	var snacks []models.Meal

	// Calculate snack calories (10% of daily calories)
	snackCalories := int(float64(nutritionalNeeds.DailyCalories) * 0.1)

	// Generate 1-2 snacks
	numSnacks := 1
	if request.ClientData.SystemGoal == "strength_muscle" || request.ClientData.SystemGoal == "weight_gain" {
		numSnacks = 2
	}

	for i := 0; i < numSnacks; i++ {
		snack := mps.generateMeal(request, nutritionalNeeds, dietType, "snack", snackCalories)
		snacks = append(snacks, snack)
	}

	return snacks
}

// calculateDayTotals calculates nutritional totals for a day
func (mps *MealPlanningService) calculateDayTotals(dayPlan *models.DayPlan) {
	var totalCalories int
	var totalProtein, totalCarbs, totalFat float64

	// Sum up meals
	for _, meal := range dayPlan.Meals {
		totalCalories += meal.Calories
		totalProtein += meal.Protein
		totalCarbs += meal.Carbs
		totalFat += meal.Fat
	}

	// Sum up snacks
	for _, snack := range dayPlan.Snacks {
		totalCalories += snack.Calories
		totalProtein += snack.Protein
		totalCarbs += snack.Carbs
		totalFat += snack.Fat
	}

	dayPlan.TotalCalories = totalCalories
	dayPlan.TotalProtein = totalProtein
	dayPlan.TotalCarbs = totalCarbs
	dayPlan.TotalFat = totalFat
}

// calculateMealPlanTotals calculates totals for the entire meal plan
func (mps *MealPlanningService) calculateMealPlanTotals(mealPlan *models.MealPlan) {
	var totalCalories int
	var totalProtein, totalCarbs, totalFat float64

	for _, day := range mealPlan.WeeklySchedule {
		totalCalories += day.TotalCalories
		totalProtein += day.TotalProtein
		totalCarbs += day.TotalCarbs
		totalFat += day.TotalFat
	}

	// Average over 7 days
	mealPlan.TotalCalories = totalCalories / 7
	mealPlan.TotalProtein = totalProtein / 7
	mealPlan.TotalCarbs = totalCarbs / 7
	mealPlan.TotalFat = totalFat / 7
}

// CreateCalculationDetails creates detailed calculation information
func (mps *MealPlanningService) CreateCalculationDetails(clientData models.ClientData, nutritionalNeeds models.NutritionalNeeds) map[string]interface{} {
	bmi := clientData.CalculateBMI()

	return map[string]interface{}{
		"bmi": map[string]interface{}{
			"value":    bmi,
			"category": nutritionalNeeds.BMICategory,
		},
		"calorie_calculation": map[string]interface{}{
			"weight_kg":          clientData.Weight,
			"calorie_multiplier": nutritionalNeeds.CalorieMultiplier,
			"daily_calories":     nutritionalNeeds.DailyCalories,
			"calculation_method": nutritionalNeeds.CalculationMethod,
		},
		"protein_calculation": map[string]interface{}{
			"weight_kg":          clientData.Weight,
			"protein_multiplier": nutritionalNeeds.ProteinMultiplier,
			"daily_protein_g":    nutritionalNeeds.ProteinGrams,
		},
		"macronutrient_distribution": map[string]interface{}{
			"protein_percentage": math.Round((nutritionalNeeds.ProteinGrams*4/float64(nutritionalNeeds.DailyCalories))*100*100) / 100,
			"carbs_percentage":   math.Round((nutritionalNeeds.CarbGrams*4/float64(nutritionalNeeds.DailyCalories))*100*100) / 100,
			"fat_percentage":     math.Round((nutritionalNeeds.FatGrams*9/float64(nutritionalNeeds.DailyCalories))*100*100) / 100,
		},
		"activity_level": map[string]interface{}{
			"level":          clientData.ActivityLevel,
			"metabolic_rate": clientData.MetabolicRate,
		},
		"system_goal": map[string]interface{}{
			"goal": clientData.SystemGoal,
		},
	}
}

// createDisclaimer creates a medical disclaimer
func (mps *MealPlanningService) createDisclaimer(clientData models.ClientData) string {
	disclaimer := "This meal plan is for informational purposes only and should not replace professional medical advice. "

	if len(clientData.Diseases) > 0 || len(clientData.Medications) > 0 {
		disclaimer += "If you have medical conditions or take medications, please consult with your healthcare provider before following this meal plan. "
		disclaimer += "Some foods may interact with medications or affect medical conditions. "
	}

	disclaimer += "Individual nutritional needs may vary. Please adjust portions and ingredients according to your specific requirements and preferences."

	return disclaimer
}

// GetAvailableCuisines returns available cuisines/countries
func (mps *MealPlanningService) GetAvailableCuisines() []models.Cuisine {
	return models.AvailableCuisines
}

// GetAvailableDietTypes returns available diet types
func (mps *MealPlanningService) GetAvailableDietTypes() []models.DietType {
	return models.AvailableDietTypes
}

// GetRecipesByCuisine returns recipes for a specific cuisine
func (mps *MealPlanningService) GetRecipesByCuisine(cuisine string) []models.Recipe {
	cuisineLower := strings.ToLower(cuisine)
	return mps.recipes[cuisineLower]
}

// Helper function to generate meal plan ID
func generateMealPlanID() string {
	return fmt.Sprintf("mp_%d", time.Now().UnixNano())
}
