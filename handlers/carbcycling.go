package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
)

type CarbCyclingHandler struct {
	baseDir string
}

func NewCarbCyclingHandler(baseDir string) *CarbCyclingHandler {
	return &CarbCyclingHandler{
		baseDir: baseDir,
	}
}

// WorkoutDay represents a single day's workout schedule
type WorkoutDay struct {
	Intensity string `json:"intensity"`
}

// ClientData represents user input for personalized plan
type ClientData struct {
	Age               int      `json:"age" validate:"required,min=16,max=100"`
	Weight            float64  `json:"weight" validate:"required,min=30,max=300"`
	Height            float64  `json:"height" validate:"required,min=120,max=250"`
	Gender            string   `json:"gender" validate:"required,oneof=male female"`
	ActivityLevel     string   `json:"activity_level" validate:"required,oneof=sedentary lightly_active moderately_active very_active extremely_active"`
	Goal              string   `json:"goal" validate:"required,oneof=weight_loss muscle_building maintenance general_health"`
	MedicalConditions []string `json:"medical_conditions"`
	Medications       []string `json:"medications"`
	Pregnancy         bool     `json:"pregnancy"`
	EatingDisorders   bool     `json:"eating_disorders"`
	Preferences       struct {
		Cuisine   string `json:"cuisine"`
		Halal     bool   `json:"halal"`
		NoPork    bool   `json:"no_pork"`
		NoAlcohol bool   `json:"no_alcohol"`
	} `json:"preferences"`
	WorkoutSchedule map[string]WorkoutDay `json:"workout_schedule"`
}

// NutritionPlan represents calculated nutrition requirements
type NutritionPlan struct {
	BMR            float64                `json:"bmr"`
	TDEE           float64                `json:"tdee"`
	TargetCalories float64                `json:"target_calories"`
	Macros         map[string]interface{} `json:"macros"`
	WaterIntake    struct {
		DailyML         float64 `json:"daily_ml"`
		DailyCups       int     `json:"daily_cups"`
		RecommendationAR string  `json:"recommendation_ar"`
		RecommendationEN string  `json:"recommendation_en"`
	} `json:"water_intake"`
}

// PersonalizedPlan represents the complete nutrition plan
type PersonalizedPlan struct {
	PlanType             string                 `json:"plan_type"`
	CycleType            string                 `json:"cycle_type"`
	IntermittentFasting  map[string]interface{} `json:"intermittent_fasting"`
	Nutrition            NutritionPlan          `json:"nutrition"`
	MealPlans            map[string]interface{} `json:"meal_plans"`
	Recommendations      map[string]interface{} `json:"recommendations"`
	GulfSpecificFeatures map[string]interface{} `json:"gulf_specific_features"`
}

// GeneratePersonalizedPlan creates a personalized carb cycling plan
func (h *CarbCyclingHandler) GeneratePersonalizedPlan(c echo.Context) error {
	var clientData ClientData
	if err := c.Bind(&clientData); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid client data format",
		})
	}

	if err := c.Validate(clientData); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Validation failed: " + err.Error(),
		})
	}

	// Load carb cycling data
	carbCyclingData, err := h.loadCarbCyclingData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to load nutrition data",
		})
	}

	// Generate personalized plan
	plan := h.calculatePersonalizedPlan(clientData, carbCyclingData)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    plan,
		Message: "تم إنشاء خطة التغذية المخصصة بنجاح",
	})
}

// GetCarbCyclingTemplates returns available carb cycling templates
func (h *CarbCyclingHandler) GetCarbCyclingTemplates(c echo.Context) error {
	carbCyclingData, err := h.loadCarbCyclingData()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to load templates",
		})
	}

	templates := map[string]interface{}{
		"cycle_types":       carbCyclingData["carb_cycling_system"].(map[string]interface{})["carb_cycling_types"],
		"gulf_foods":        carbCyclingData["carb_cycling_system"].(map[string]interface{})["gulf_specific_foods"],
		"ramadan_specific":  carbCyclingData["carb_cycling_system"].(map[string]interface{})["ramadan_specific"],
		"sample_meal_plans": carbCyclingData["carb_cycling_system"].(map[string]interface{})["meal_plans"],
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    templates,
		Message: "تم تحميل قوالب تدوير الكربوهيدرات",
	})
}

// CalculateMacros calculates macronutrients for specific day type
func (h *CarbCyclingHandler) CalculateMacros(c echo.Context) error {
	var request struct {
		Weight        float64 `json:"weight" validate:"required"`
		Calories      float64 `json:"calories" validate:"required"`
		DayType       string  `json:"day_type" validate:"required,oneof=high moderate low"`
		ActivityLevel string  `json:"activity_level"`
	}

	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request format",
		})
	}

	macros := h.calculateMacrosForDay(request.Calories, request.DayType, request.Weight)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    macros,
		Message: "تم حساب التوزيع الغذائي",
	})
}

// ValidateNutritionInput validates user nutrition input
func (h *CarbCyclingHandler) ValidateNutritionInput(c echo.Context) error {
	var input struct {
		Foods []struct {
			Name     string  `json:"name"`
			Amount   float64 `json:"amount"`
			Unit     string  `json:"unit"`
			Calories float64 `json:"calories"`
			Carbs    float64 `json:"carbs"`
			Protein  float64 `json:"protein"`
			Fat      float64 `json:"fat"`
		} `json:"foods"`
		DayType      string  `json:"day_type"`
		TargetMacros map[string]float64 `json:"target_macros"`
	}

	if err := c.Bind(&input); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid input format",
		})
	}

	validation := h.validateDayNutrition(input.Foods, input.TargetMacros)

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    validation,
		Message: "تم تحليل المدخلات الغذائية",
	})
}

// Helper functions

func (h *CarbCyclingHandler) loadCarbCyclingData() (map[string]interface{}, error) {
	filePath := filepath.Join(h.baseDir, "carb-cycling-plans.json")
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var carbCyclingData map[string]interface{}
	err = json.Unmarshal(data, &carbCyclingData)
	return carbCyclingData, err
}

func (h *CarbCyclingHandler) calculatePersonalizedPlan(clientData ClientData, carbCyclingData map[string]interface{}) PersonalizedPlan {
	// Calculate BMR and TDEE
	bmr := h.calculateBMR(clientData.Weight, clientData.Height, float64(clientData.Age), clientData.Gender)
	tdee := h.calculateTDEE(bmr, clientData.ActivityLevel)
	targetCalories := h.adjustCaloriesForGoal(tdee, clientData.Goal)

	// Assess medical conditions
	medicalAssessment := h.assessMedicalConditions(clientData.MedicalConditions)
	
	// Select plan type
	planType, cycleType := h.selectPlanType(clientData, medicalAssessment)
	
	// Assess intermittent fasting
	ifAssessment := h.assessIntermittentFasting(clientData)
	
	// Calculate macros
	macros := h.calculateMacrosForPlan(targetCalories, planType, clientData.Weight)
	
	// Generate recommendations
	recommendations := h.generateRecommendations(clientData, planType, medicalAssessment)
	
	// Calculate water intake
	waterIntake := h.calculateWaterIntake(clientData.Weight, clientData.ActivityLevel)

	return PersonalizedPlan{
		PlanType:    planType,
		CycleType:   cycleType,
		IntermittentFasting: ifAssessment,
		Nutrition: NutritionPlan{
			BMR:            bmr,
			TDEE:           tdee,
			TargetCalories: targetCalories,
			Macros:         macros,
			WaterIntake:    waterIntake,
		},
		MealPlans:            h.generateWeeklyMealPlan(planType, targetCalories, clientData),
		Recommendations:      recommendations,
		GulfSpecificFeatures: h.getGulfSpecificFeatures(clientData),
	}
}

func (h *CarbCyclingHandler) calculateBMR(weight, height, age float64, gender string) float64 {
	if gender == "male" {
		return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
	}
	return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
}

func (h *CarbCyclingHandler) calculateTDEE(bmr float64, activityLevel string) float64 {
	multipliers := map[string]float64{
		"sedentary":          1.2,
		"lightly_active":     1.375,
		"moderately_active":  1.55,
		"very_active":        1.725,
		"extremely_active":   1.9,
	}
	
	multiplier, exists := multipliers[activityLevel]
	if !exists {
		multiplier = 1.55 // default to moderately active
	}
	
	return bmr * multiplier
}

func (h *CarbCyclingHandler) adjustCaloriesForGoal(tdee float64, goal string) float64 {
	switch goal {
	case "weight_loss":
		return tdee * 0.8 // 20% deficit
	case "muscle_building":
		return tdee * 1.1 // 10% surplus
	default:
		return tdee // maintenance
	}
}

func (h *CarbCyclingHandler) assessMedicalConditions(conditions []string) map[string]interface{} {
	hasDiabetes := h.contains(conditions, "diabetes") || h.contains(conditions, "insulin_resistance")
	hasHeart := h.contains(conditions, "heart_disease") || h.contains(conditions, "hypertension")
	hasKidney := h.contains(conditions, "kidney_disease")
	hasInflammation := h.contains(conditions, "arthritis") || h.contains(conditions, "inflammatory_bowel")

	assessment := map[string]interface{}{
		"has_critical_condition": hasDiabetes || hasHeart || hasKidney || hasInflammation,
	}

	if hasDiabetes {
		assessment["recommended_diet"] = "low_carb"
		assessment["carb_percentage"] = 25
		assessment["reason"] = "تحسين حساسية الأنسولين وخفض سكر الدم"
	} else if hasHeart {
		assessment["recommended_diet"] = "mediterranean"
		assessment["carb_percentage"] = 55
		assessment["reason"] = "خفض الدهون والضغط"
	} else if hasInflammation {
		assessment["recommended_diet"] = "anti_inflammatory"
		assessment["reason"] = "تقليل الالتهابات"
	}

	return assessment
}

func (h *CarbCyclingHandler) selectPlanType(clientData ClientData, medicalAssessment map[string]interface{}) (string, string) {
	// Check medical conditions first
	if medicalAssessment["has_critical_condition"].(bool) {
		if diet, exists := medicalAssessment["recommended_diet"]; exists {
			return diet.(string), ""
		}
	}

	// Calculate BMI
	bmi := clientData.Weight / math.Pow(clientData.Height/100, 2)

	// Goal-based selection
	if bmi > 30 {
		if clientData.ActivityLevel == "very_active" || clientData.ActivityLevel == "extremely_active" {
			return "carb_cycling", "classic_carb_cycling"
		}
		return "low_carb", ""
	}

	if clientData.Goal == "muscle_building" {
		if clientData.ActivityLevel == "very_active" || clientData.ActivityLevel == "extremely_active" {
			return "carb_cycling", "targeted_carb_cycling"
		}
		return "zone", ""
	}

	if clientData.Goal == "weight_loss" {
		return "carb_cycling", "classic_carb_cycling"
	}

	return "mediterranean", ""
}

func (h *CarbCyclingHandler) assessIntermittentFasting(clientData ClientData) map[string]interface{} {
	if clientData.Pregnancy || clientData.EatingDisorders {
		return map[string]interface{}{
			"suitable": false,
			"reason":   "قد يؤثر على التغذية أو يزيد من اضطرابات الأكل",
		}
	}

	if h.contains(clientData.Medications, "insulin") {
		return map[string]interface{}{
			"suitable": false,
			"reason":   "خطر نقص سكر الدم",
			"note":     "يمكن تطبيقه تحت إشراف طبي",
		}
	}

	if clientData.Age < 18 || clientData.Age > 65 {
		return map[string]interface{}{
			"suitable": false,
			"reason":   "يحتاج تقييم طبي خاص للفئات العمرية المتطرفة",
		}
	}

	return map[string]interface{}{
		"suitable": true,
		"type":     "16:8",
		"reason":   "آمن لتحسين الأيض وخسارة الوزن",
	}
}

func (h *CarbCyclingHandler) calculateMacrosForPlan(calories float64, planType string, weight float64) map[string]interface{} {
	distributions := map[string]map[string]float64{
		"carb_cycling": {}, // Will be handled separately
		"low_carb":     {"carbs": 25, "protein": 35, "fat": 40},
		"mediterranean": {"carbs": 50, "protein": 20, "fat": 30},
		"dash":         {"carbs": 55, "protein": 25, "fat": 20},
		"zone":         {"carbs": 40, "protein": 30, "fat": 30},
		"anti_inflammatory": {"carbs": 45, "protein": 25, "fat": 30},
		"balanced":     {"carbs": 45, "protein": 25, "fat": 30},
	}

	if planType == "carb_cycling" {
		return map[string]interface{}{
			"high_carb_day": map[string]float64{
				"carbs":   math.Round((calories * 45 / 100) / 4),
				"protein": math.Round((calories * 30 / 100) / 4),
				"fat":     math.Round((calories * 25 / 100) / 9),
			},
			"moderate_carb_day": map[string]float64{
				"carbs":   math.Round((calories * 35 / 100) / 4),
				"protein": math.Round((calories * 35 / 100) / 4),
				"fat":     math.Round((calories * 30 / 100) / 9),
			},
			"low_carb_day": map[string]float64{
				"carbs":   math.Round((calories * 20 / 100) / 4),
				"protein": math.Round((calories * 40 / 100) / 4),
				"fat":     math.Round((calories * 40 / 100) / 9),
			},
		}
	}

	distribution, exists := distributions[planType]
	if !exists {
		distribution = distributions["balanced"]
	}

	return map[string]interface{}{
		"carbs":   math.Round((calories * distribution["carbs"] / 100) / 4),
		"protein": math.Round((calories * distribution["protein"] / 100) / 4),
		"fat":     math.Round((calories * distribution["fat"] / 100) / 9),
	}
}

func (h *CarbCyclingHandler) calculateMacrosForDay(calories float64, dayType string, weight float64) map[string]interface{} {
	distributions := map[string]map[string]float64{
		"high":     {"carbs": 45, "protein": 30, "fat": 25},
		"moderate": {"carbs": 35, "protein": 35, "fat": 30},
		"low":      {"carbs": 20, "protein": 40, "fat": 40},
	}

	distribution := distributions[dayType]
	
	return map[string]interface{}{
		"carbs":   math.Round((calories * distribution["carbs"] / 100) / 4),
		"protein": math.Round((calories * distribution["protein"] / 100) / 4),
		"fat":     math.Round((calories * distribution["fat"] / 100) / 9),
		"carbs_per_kg": math.Round((calories * distribution["carbs"] / 100) / 4 / weight * 10) / 10,
	}
}

func (h *CarbCyclingHandler) calculateWaterIntake(weight float64, activityLevel string) struct {
	DailyML         float64 `json:"daily_ml"`
	DailyCups       int     `json:"daily_cups"`
	RecommendationAR string  `json:"recommendation_ar"`
	RecommendationEN string  `json:"recommendation_en"`
} {
	baseWater := weight * 35 // ml per kg
	
	if activityLevel == "very_active" || activityLevel == "extremely_active" {
		baseWater += 500 // Extra 500ml for high activity
	}

	liters := math.Round(baseWater/1000*10) / 10

	return struct {
		DailyML         float64 `json:"daily_ml"`
		DailyCups       int     `json:"daily_cups"`
		RecommendationAR string  `json:"recommendation_ar"`
		RecommendationEN string  `json:"recommendation_en"`
	}{
		DailyML:         math.Round(baseWater),
		DailyCups:       int(math.Round(baseWater / 250)),
		RecommendationAR: fmt.Sprintf("%.1f لتر يومياً", liters),
		RecommendationEN: fmt.Sprintf("%.1f liters daily", liters),
	}
}

func (h *CarbCyclingHandler) generateRecommendations(clientData ClientData, planType string, medicalAssessment map[string]interface{}) map[string]interface{} {
	general := []map[string]string{
		{
			"ar": "شرب الماء بكمية كافية (2-3 لتر يومياً)",
			"en": "Drink adequate water (2-3 liters daily)",
		},
		{
			"ar": "تناول الألياف 25-30 جرام يومياً",
			"en": "Consume 25-30g fiber daily",
		},
		{
			"ar": "التركيز على الدهون الصحية (زيت زيتون، أفوكادو، أسماك)",
			"en": "Focus on healthy fats (olive oil, avocado, fish)",
		},
	}

	gulfSpecific := []map[string]string{
		{
			"ar": "تناول التمر باعتدال (3-5 حبات يومياً)",
			"en": "Consume dates in moderation (3-5 pieces daily)",
		},
		{
			"ar": "استخدام البهارات المحلية (كركم، زنجبيل، هيل)",
			"en": "Use local spices (turmeric, ginger, cardamom)",
		},
		{
			"ar": "تجنب العصائر المحلاة والمشروبات الغازية",
			"en": "Avoid sweetened juices and sodas",
		},
	}

	specific := []map[string]string{}

	if planType == "carb_cycling" {
		specific = append(specific, map[string]string{
			"ar": "تناول الكربوهيدرات حول أوقات التمرين في الأيام عالية الكربوهيدرات",
			"en": "Time carbohydrates around workouts on high-carb days",
		})
	}

	if planType == "low_carb" {
		specific = append(specific, map[string]string{
			"ar": "زيادة تناول الخضروات الورقية والدهون الصحية",
			"en": "Increase leafy vegetables and healthy fats",
		})
	}

	return map[string]interface{}{
		"general":       general,
		"specific":      specific,
		"gulf_specific": gulfSpecific,
	}
}

func (h *CarbCyclingHandler) generateWeeklyMealPlan(planType string, calories float64, clientData ClientData) map[string]interface{} {
	weeklyPlan := make(map[string]interface{})
	
	for day := 1; day <= 7; day++ {
		dayType := h.determineDayType(day, clientData.WorkoutSchedule)
		weeklyPlan[fmt.Sprintf("day_%d", day)] = map[string]interface{}{
			"type":  dayType,
			"meals": h.selectMealsForDay(dayType, calories),
		}
	}

	return weeklyPlan
}

func (h *CarbCyclingHandler) determineDayType(day int, workoutSchedule map[string]WorkoutDay) string {
	dayStr := fmt.Sprintf("%d", day)
	
	if workout, exists := workoutSchedule[dayStr]; exists {
		if workout.Intensity == "high" {
			return "high"
		}
		return "moderate"
	}

	// Default pattern: 2 high, 3 moderate, 2 low
	pattern := []string{"high", "moderate", "low", "moderate", "high", "moderate", "low"}
	return pattern[day-1]
}

func (h *CarbCyclingHandler) selectMealsForDay(dayType string, calories float64) map[string]interface{} {
	return map[string]interface{}{
		"breakfast":    map[string]bool{"planned": true},
		"pre_workout":  map[string]bool{"planned": dayType != "low"},
		"post_workout": map[string]bool{"planned": dayType != "low"},
		"lunch":        map[string]bool{"planned": true},
		"dinner":       map[string]bool{"planned": true},
		"snacks":       map[string]bool{"planned": dayType == "high"},
	}
}

func (h *CarbCyclingHandler) getGulfSpecificFeatures(clientData ClientData) map[string]interface{} {
	return map[string]interface{}{
		"halal_compliance": clientData.Preferences.Halal,
		"ramadan_support":  true,
		"local_foods":      true,
		"prayer_time_consideration": true,
		"cultural_meal_timing": map[string]string{
			"breakfast": "6:00-8:00 AM",
			"lunch":     "12:00-2:00 PM", 
			"dinner":    "7:00-9:00 PM",
		},
	}
}

func (h *CarbCyclingHandler) validateDayNutrition(foods []struct {
	Name     string  `json:"name"`
	Amount   float64 `json:"amount"`
	Unit     string  `json:"unit"`
	Calories float64 `json:"calories"`
	Carbs    float64 `json:"carbs"`
	Protein  float64 `json:"protein"`
	Fat      float64 `json:"fat"`
}, targetMacros map[string]float64) map[string]interface{} {
	totalCalories := 0.0
	totalCarbs := 0.0
	totalProtein := 0.0
	totalFat := 0.0

	for _, food := range foods {
		totalCalories += food.Calories
		totalCarbs += food.Carbs
		totalProtein += food.Protein
		totalFat += food.Fat
	}

	validation := map[string]interface{}{
		"totals": map[string]float64{
			"calories": math.Round(totalCalories),
			"carbs":    math.Round(totalCarbs),
			"protein":  math.Round(totalProtein),
			"fat":      math.Round(totalFat),
		},
		"targets": targetMacros,
		"compliance": map[string]interface{}{
			"calories_match": math.Abs(totalCalories-targetMacros["calories"]) <= targetMacros["calories"]*0.1,
			"carbs_match":    math.Abs(totalCarbs-targetMacros["carbs"]) <= targetMacros["carbs"]*0.15,
			"protein_match":  math.Abs(totalProtein-targetMacros["protein"]) <= targetMacros["protein"]*0.15,
			"fat_match":      math.Abs(totalFat-targetMacros["fat"]) <= targetMacros["fat"]*0.15,
		},
	}

	return validation
}

func (h *CarbCyclingHandler) contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}
