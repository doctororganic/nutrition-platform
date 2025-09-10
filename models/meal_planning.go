package models

import (
	"time"
)

// ClientData represents client information for meal planning
type ClientData struct {
	Name           string  `json:"name" validate:"required"`
	Age            int     `json:"age" validate:"required,min=1,max=120"`
	Weight         float64 `json:"weight" validate:"required,min=20,max=500"` // in kg
	Height         float64 `json:"height" validate:"required,min=100,max=250"` // in cm
	ActivityLevel  string  `json:"activity_level" validate:"required,oneof=sedentary light moderate active very_active"`
	MetabolicRate  string  `json:"metabolic_rate" validate:"required,oneof=low medium high"`
	SystemGoal     string  `json:"system_goal" validate:"required,oneof=strength_muscle weight_gain weight_loss weight_maintenance reshaping"`
	ExcludedFoods  []string `json:"excluded_foods"` // foods to exclude
	Diseases       []string `json:"diseases"`        // medical conditions
	Medications    []string `json:"medications"`    // current medications
	PreferredCuisine string `json:"preferred_cuisine"` // preferred cuisine/country
	Gender         string  `json:"gender" validate:"required,oneof=male female other"`
}

// NutritionalNeeds represents calculated nutritional requirements
type NutritionalNeeds struct {
	DailyCalories    int     `json:"daily_calories"`
	ProteinGrams     float64 `json:"protein_grams"`
	CarbGrams        float64 `json:"carb_grams"`
	FatGrams         float64 `json:"fat_grams"`
	FiberGrams       float64 `json:"fiber_grams"`
	BMICategory      string  `json:"bmi_category"`
	CalorieMultiplier float64 `json:"calorie_multiplier"`
	ProteinMultiplier float64 `json:"protein_multiplier"`
	CalculationMethod string  `json:"calculation_method"`
}

// MealPlan represents a complete meal plan
type MealPlan struct {
	ID              string    `json:"id"`
	ClientData     ClientData `json:"client_data"`
	NutritionalNeeds NutritionalNeeds `json:"nutritional_needs"`
	DietType        string    `json:"diet_type"`
	WeeklySchedule  []DayPlan  `json:"weekly_schedule"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
	TotalCalories   int       `json:"total_calories"`
	TotalProtein    float64   `json:"total_protein"`
	TotalCarbs      float64   `json:"total_carbs"`
	TotalFat        float64   `json:"total_fat"`
}

// DayPlan represents meals for a single day
type DayPlan struct {
	Day       string     `json:"day"`
	Meals     []Meal     `json:"meals"`
	Snacks    []Meal     `json:"snacks,omitempty"`
	TotalCalories int    `json:"total_calories"`
	TotalProtein  float64 `json:"total_protein"`
	TotalCarbs    float64 `json:"total_carbs"`
	TotalFat      float64 `json:"total_fat"`
}

// Meal represents a single meal with nutritional information
type Meal struct {
	Name           string         `json:"name"`
	Type           string         `json:"type"` // breakfast, lunch, dinner, snack
	Ingredients    []Ingredient   `json:"ingredients"`
	Instructions   []string       `json:"instructions"`
	Calories       int            `json:"calories"`
	Protein        float64        `json:"protein"`
	Carbs          float64        `json:"carbs"`
	Fat            float64        `json:"fat"`
	Fiber          float64        `json:"fiber"`
	Alternatives   []Meal         `json:"alternatives,omitempty"`
	PreparationTime string        `json:"preparation_time"`
	Cuisine        string         `json:"cuisine"`
	DietCompatible []string       `json:"diet_compatible"`
}

// Ingredient represents a food ingredient
type Ingredient struct {
	Name           string  `json:"name"`
	Amount         string  `json:"amount"`
	Unit           string  `json:"unit"`
	Calories       int     `json:"calories"`
	Protein        float64 `json:"protein"`
	Carbs          float64 `json:"carbs"`
	Fat            float64 `json:"fat"`
	Alternatives   []string `json:"alternatives,omitempty"`
}

// Recipe represents a recipe from the recipes file
type Recipe struct {
	Country        string                 `json:"country"`
	RecipeName     map[string]string      `json:"recipeName"`
	Description    map[string]string      `json:"description"`
	Ingredients    []RecipeIngredient     `json:"ingredients"`
	Method         []map[string]string    `json:"method"`
	Nutrition      RecipeNutrition        `json:"nutrition"`
	Value          map[string]string      `json:"value"`
	Tips           []map[string]string    `json:"tips"`
	DietCompatible []string               `json:"diet_compatible,omitempty"`
}

// RecipeIngredient represents an ingredient in a recipe
type RecipeIngredient struct {
	Name        map[string]string `json:"name"`
	Amount      string            `json:"amount"`
	Alternatives []map[string]string `json:"alternatives,omitempty"`
}

// RecipeNutrition represents nutritional information for a recipe
type RecipeNutrition struct {
	Calories string `json:"calories"`
	Protein  string `json:"protein"`
	Carbs    string `json:"carbs"`
	Fat      string `json:"fat"`
	Fiber    string `json:"fiber"`
}

// MealPlanRequest represents a request to generate a meal plan
type MealPlanRequest struct {
	ClientData      ClientData `json:"client_data" validate:"required"`
	DietType        string     `json:"diet_type,omitempty"`
	PreferredCuisine string    `json:"preferred_cuisine,omitempty"`
	MealsPerDay     int        `json:"meals_per_day,omitempty" validate:"min=2,max=6"`
	IncludeSnacks   bool       `json:"include_snacks,omitempty"`
	IntermittentFasting bool   `json:"intermittent_fasting,omitempty"`
}

// MealPlanResponse represents the response for meal plan generation
type MealPlanResponse struct {
	Success         bool      `json:"success"`
	Message         string    `json:"message,omitempty"`
	Error           string    `json:"error,omitempty"`
	MealPlan        *MealPlan `json:"meal_plan,omitempty"`
	CalculationDetails map[string]interface{} `json:"calculation_details,omitempty"`
	Disclaimer      string    `json:"disclaimer,omitempty"`
}

// Cuisine represents available cuisines/countries
type Cuisine struct {
	Country     string `json:"country"`
	CountryCode string `json:"country_code"`
	Region      string `json:"region"`
	Description string `json:"description"`
}

// DietType represents available diet types
type DietType struct {
	Name        string `json:"name"`
	Code        string `json:"code"`
	Description string `json:"description"`
	MacroRatio  string `json:"macro_ratio"`
}

// Available cuisines/countries
var AvailableCuisines = []Cuisine{
	{Country: "Egypt", CountryCode: "EG", Region: "Middle East", Description: "Traditional Egyptian cuisine with rich flavors"},
	{Country: "Lebanon", CountryCode: "LB", Region: "Middle East", Description: "Mediterranean Lebanese cuisine"},
	{Country: "Turkey", CountryCode: "TR", Region: "Middle East", Description: "Turkish cuisine with Ottoman influences"},
	{Country: "Morocco", CountryCode: "MA", Region: "North Africa", Description: "Moroccan cuisine with Berber and Arab influences"},
	{Country: "Saudi Arabia", CountryCode: "SA", Region: "Middle East", Description: "Traditional Saudi Arabian cuisine"},
	{Country: "UAE", CountryCode: "AE", Region: "Middle East", Description: "Emirati cuisine with Persian influences"},
	{Country: "Kuwait", CountryCode: "KW", Region: "Middle East", Description: "Kuwaiti cuisine with Gulf influences"},
	{Country: "Qatar", CountryCode: "QA", Region: "Middle East", Description: "Qatari cuisine with Bedouin traditions"},
	{Country: "Oman", CountryCode: "OM", Region: "Middle East", Description: "Omani cuisine with coastal influences"},
	{Country: "Bahrain", CountryCode: "BH", Region: "Middle East", Description: "Bahraini cuisine with pearl diving heritage"},
	{Country: "Jordan", CountryCode: "JO", Region: "Middle East", Description: "Jordanian cuisine with Bedouin traditions"},
	{Country: "Syria", CountryCode: "SY", Region: "Middle East", Description: "Syrian cuisine with ancient traditions"},
	{Country: "Iraq", CountryCode: "IQ", Region: "Middle East", Description: "Iraqi cuisine with Mesopotamian heritage"},
	{Country: "Yemen", CountryCode: "YE", Region: "Middle East", Description: "Yemeni cuisine with Arabian traditions"},
	{Country: "Tunisia", CountryCode: "TN", Region: "North Africa", Description: "Tunisian cuisine with Mediterranean influences"},
	{Country: "Algeria", CountryCode: "DZ", Region: "North Africa", Description: "Algerian cuisine with Berber and Arab influences"},
	{Country: "Libya", CountryCode: "LY", Region: "North Africa", Description: "Libyan cuisine with Mediterranean and Saharan influences"},
	{Country: "Sudan", CountryCode: "SD", Region: "North Africa", Description: "Sudanese cuisine with African and Arab influences"},
	{Country: "Somalia", CountryCode: "SO", Region: "East Africa", Description: "Somali cuisine with coastal and nomadic traditions"},
	{Country: "Djibouti", CountryCode: "DJ", Region: "East Africa", Description: "Djiboutian cuisine with French and Arab influences"},
}

// Available diet types
var AvailableDietTypes = []DietType{
	{Name: "Keto (Ketogenic)", Code: "keto", Description: "High-fat, low-carb diet for weight loss and metabolic health", MacroRatio: "70% Fat, 25% Protein, 5% Carbs"},
	{Name: "Mediterranean", Code: "mediterranean", Description: "Heart-healthy diet rich in olive oil, fish, and vegetables", MacroRatio: "25-35% Fat, 15-20% Protein, 45-55% Carbs"},
	{Name: "Low Carb", Code: "low_carb", Description: "Reduced carbohydrate intake for weight loss", MacroRatio: "30-40% Fat, 25-35% Protein, 20-30% Carbs"},
	{Name: "Balanced", Code: "balanced", Description: "Standard balanced diet with all food groups", MacroRatio: "25-35% Fat, 15-25% Protein, 45-55% Carbs"},
	{Name: "High Carb", Code: "high_carb", Description: "Higher carbohydrate intake for athletes and active individuals", MacroRatio: "15-25% Fat, 15-20% Protein, 55-65% Carbs"},
	{Name: "Vegan", Code: "vegan", Description: "Plant-based diet excluding all animal products", MacroRatio: "20-30% Fat, 15-20% Protein, 50-60% Carbs"},
	{Name: "Anti-Inflammatory", Code: "anti_inflammatory", Description: "Diet focused on reducing inflammation", MacroRatio: "25-35% Fat, 20-25% Protein, 40-50% Carbs"},
	{Name: "DASH", Code: "dash", Description: "Dietary Approaches to Stop Hypertension", MacroRatio: "25-35% Fat, 15-20% Protein, 45-55% Carbs"},
	{Name: "Paleo", Code: "paleo", Description: "Based on foods presumed to be available to Paleolithic humans", MacroRatio: "30-40% Fat, 25-35% Protein, 25-35% Carbs"},
	{Name: "Intermittent Fasting", Code: "intermittent_fasting", Description: "Time-restricted eating patterns", MacroRatio: "Varies by eating window"},
}

// CalculateBMI calculates BMI from weight and height
func (c *ClientData) CalculateBMI() float64 {
	heightM := c.Height / 100
	return c.Weight / (heightM * heightM)
}

// GetBMICategory returns the BMI category
func (c *ClientData) GetBMICategory() string {
	bmi := c.CalculateBMI()
	switch {
	case bmi < 18.5:
		return "underweight"
	case bmi < 25:
		return "normal"
	case bmi < 30:
		return "overweight"
	default:
		return "obese"
	}
}

// CalculateCalorieMultiplier determines the calorie multiplier based on client data
func (c *ClientData) CalculateCalorieMultiplier() float64 {
	bmiCategory := c.GetBMICategory()
	
	// Base multipliers by BMI and goal
	var baseMultiplier float64
	switch {
	case bmiCategory == "underweight" && c.SystemGoal == "weight_gain":
		baseMultiplier = 30
	case bmiCategory == "underweight" && c.SystemGoal == "weight_maintenance":
		baseMultiplier = 25
	case c.SystemGoal == "strength_muscle":
		baseMultiplier = 30
	case c.SystemGoal == "weight_gain":
		baseMultiplier = 25
	case c.SystemGoal == "weight_loss":
		baseMultiplier = 20
	case c.SystemGoal == "weight_maintenance":
		baseMultiplier = 20
	case c.SystemGoal == "reshaping":
		baseMultiplier = 22
	default:
		baseMultiplier = 20
	}
	
	// Adjust for metabolic rate
	switch c.MetabolicRate {
	case "high":
		baseMultiplier += 5
	case "low":
		baseMultiplier -= 3
	}
	
	// Adjust for activity level
	switch c.ActivityLevel {
	case "sedentary":
		baseMultiplier -= 2
	case "light":
		baseMultiplier += 0
	case "moderate":
		baseMultiplier += 3
	case "active":
		baseMultiplier += 5
	case "very_active":
		baseMultiplier += 8
	}
	
	return baseMultiplier
}

// CalculateProteinMultiplier determines protein needs based on activity and goals
func (c *ClientData) CalculateProteinMultiplier() float64 {
	baseMultiplier := 1.0
	
	// Adjust for system goal
	switch c.SystemGoal {
	case "strength_muscle":
		baseMultiplier = 1.7
	case "weight_gain":
		baseMultiplier = 1.5
	case "weight_loss":
		baseMultiplier = 1.3
	case "weight_maintenance":
		baseMultiplier = 1.2
	case "reshaping":
		baseMultiplier = 1.4
	}
	
	// Adjust for activity level
	switch c.ActivityLevel {
	case "sedentary":
		baseMultiplier -= 0.2
	case "light":
		baseMultiplier += 0
	case "moderate":
		baseMultiplier += 0.1
	case "active":
		baseMultiplier += 0.2
	case "very_active":
		baseMultiplier += 0.3
	}
	
	return baseMultiplier
}
