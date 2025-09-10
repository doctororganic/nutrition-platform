// Carb Cycling Algorithm - Frontend Logic
// Based on Gulf region nutrition requirements and medical conditions

class CarbCyclingCalculator {
    constructor() {
        this.dietTypes = {
            LOW_CARB: 'low_carb',
            MEDITERRANEAN: 'mediterranean', 
            DASH: 'dash',
            ZONE: 'zone',
            ANTI_INFLAMMATORY: 'anti_inflammatory',
            CARB_CYCLING: 'carb_cycling',
            BALANCED: 'balanced'
        };
        
        this.cycleTypes = {
            CLASSIC: 'classic_carb_cycling',
            TARGETED: 'targeted_carb_cycling',
            MODERATE: 'moderate_cycling'
        };
    }

    // Main algorithm function
    calculatePersonalizedPlan(clientData) {
        // Step 1: Check for medical conditions (priority)
        const medicalAssessment = this.assessMedicalConditions(clientData.medicalConditions);
        
        if (medicalAssessment.hasCriticalCondition) {
            return this.createMedicalBasedPlan(medicalAssessment, clientData);
        }
        
        // Step 2: Goal-based selection
        const goalBasedPlan = this.selectByGoalAndPreferences(clientData);
        
        // Step 3: Add intermittent fasting if suitable
        const intermittentFasting = this.assessIntermittentFasting(clientData);
        
        // Step 4: Calculate macros and calories
        const nutritionPlan = this.calculateNutritionRequirements(clientData, goalBasedPlan);
        
        // Step 5: Generate meal plans
        const mealPlans = this.generateMealPlans(nutritionPlan, clientData);
        
        return {
            planType: goalBasedPlan.type,
            cycleType: goalBasedPlan.cycleType,
            intermittentFasting: intermittentFasting,
            nutrition: nutritionPlan,
            mealPlans: mealPlans,
            recommendations: this.generateRecommendations(clientData, goalBasedPlan)
        };
    }

    // Medical conditions assessment
    assessMedicalConditions(conditions) {
        const criticalConditions = {
            diabetes: conditions.includes('diabetes') || conditions.includes('insulin_resistance'),
            heart: conditions.includes('heart_disease') || conditions.includes('hypertension'),
            kidney: conditions.includes('kidney_disease'),
            inflammation: conditions.includes('arthritis') || conditions.includes('inflammatory_bowel')
        };

        if (criticalConditions.diabetes) {
            return {
                hasCriticalCondition: true,
                recommendedDiet: this.dietTypes.LOW_CARB,
                carbPercentage: 25,
                reason: 'تحسين حساسية الأنسولين وخفض سكر الدم',
                restrictions: ['avoid_refined_sugar', 'limit_processed_foods']
            };
        }

        if (criticalConditions.heart) {
            return {
                hasCriticalCondition: true,
                recommendedDiet: this.dietTypes.MEDITERRANEAN,
                carbPercentage: 55,
                proteinPercentage: 25,
                reason: 'خفض الدهون والضغط',
                restrictions: ['limit_saturated_fats', 'reduce_sodium']
            };
        }

        if (criticalConditions.kidney) {
            return {
                hasCriticalCondition: true,
                recommendedDiet: 'controlled_protein',
                proteinLimit: '0.6-0.8g/kg',
                reason: 'تجنب تفاقم الحالة',
                restrictions: ['limit_protein', 'limit_phosphorus', 'limit_potassium']
            };
        }

        if (criticalConditions.inflammation) {
            return {
                hasCriticalCondition: true,
                recommendedDiet: this.dietTypes.ANTI_INFLAMMATORY,
                focus: 'increase_omega3_decrease_sugar',
                reason: 'تقليل الالتهابات',
                restrictions: ['avoid_processed_foods', 'limit_refined_sugar']
            };
        }

        return { hasCriticalCondition: false };
    }

    // Goal-based diet selection
    selectByGoalAndPreferences(clientData) {
        const { goal, activityLevel, bmi, preferences } = clientData;

        // Obesity (BMI > 30)
        if (bmi > 30) {
            if (activityLevel === 'high' || activityLevel === 'very_high') {
                return {
                    type: this.dietTypes.CARB_CYCLING,
                    cycleType: this.cycleTypes.CLASSIC,
                    reason: 'تدوير الكربوهيدرات للرياضيين مع خسارة الوزن'
                };
            } else {
                return {
                    type: this.dietTypes.LOW_CARB,
                    reason: 'خسارة وزن سريعة للسمنة'
                };
            }
        }

        // Muscle building
        if (goal === 'muscle_building') {
            if (activityLevel === 'very_high') {
                return {
                    type: this.dietTypes.CARB_CYCLING,
                    cycleType: this.cycleTypes.TARGETED,
                    reason: 'بناء العضلات مع تحكم دقيق في الكربوهيدرات'
                };
            } else {
                return {
                    type: this.dietTypes.ZONE,
                    reason: 'توزيع العناصر بدقة وحماية العضلات'
                };
            }
        }

        // Weight loss
        if (goal === 'weight_loss') {
            return {
                type: this.dietTypes.CARB_CYCLING,
                cycleType: this.cycleTypes.CLASSIC,
                reason: 'خسارة دهون مع المحافظة على العضلات'
            };
        }

        // General health
        return {
            type: this.dietTypes.MEDITERRANEAN,
            reason: 'الاستدامة والوقاية من الأمراض'
        };
    }

    // Intermittent fasting assessment
    assessIntermittentFasting(clientData) {
        const { medicalConditions, medications, pregnancy, eatingDisorders, age } = clientData;
        
        // Contraindications
        if (pregnancy || eatingDisorders) {
            return {
                suitable: false,
                reason: 'قد يؤثر على التغذية أو يزيد من اضطرابات الأكل'
            };
        }

        if (medications.includes('insulin') || medications.includes('diabetes_medication')) {
            return {
                suitable: false,
                reason: 'خطر نقص سكر الدم',
                note: 'يمكن تطبيقه تحت إشراف طبي'
            };
        }

        // Age considerations
        if (age < 18 || age > 65) {
            return {
                suitable: false,
                reason: 'يحتاج تقييم طبي خاص للفئات العمرية المتطرفة'
            };
        }

        // Suitable cases
        if (medicalConditions.includes('insulin_resistance') && !medications.includes('insulin')) {
            return {
                suitable: true,
                type: '16:8',
                reason: 'يحسن حساسية الأنسولين',
                supervision: 'recommended'
            };
        }

        return {
            suitable: true,
            type: '16:8',
            reason: 'آمن لتحسين الأيض وخسارة الوزن'
        };
    }

    // Calculate nutrition requirements
    calculateNutritionRequirements(clientData, planType) {
        const { weight, height, age, gender, activityLevel } = clientData;
        
        // Calculate BMR using Harris-Benedict equation
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        // Activity multipliers
        const activityMultipliers = {
            sedentary: 1.2,
            lightly_active: 1.375,
            moderately_active: 1.55,
            very_active: 1.725,
            extremely_active: 1.9
        };

        const tdee = bmr * (activityMultipliers[activityLevel] || 1.55);
        
        // Adjust for goal
        let targetCalories = tdee;
        if (clientData.goal === 'weight_loss') {
            targetCalories = tdee * 0.8; // 20% deficit
        } else if (clientData.goal === 'muscle_building') {
            targetCalories = tdee * 1.1; // 10% surplus
        }

        // Macro distribution based on plan type
        let macroDistribution = this.getMacroDistribution(planType, clientData);
        
        return {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            targetCalories: Math.round(targetCalories),
            macros: this.calculateMacros(targetCalories, macroDistribution, weight),
            waterIntake: this.calculateWaterIntake(weight, activityLevel)
        };
    }

    // Get macro distribution based on plan type
    getMacroDistribution(planType, clientData) {
        if (planType.type === this.dietTypes.CARB_CYCLING) {
            return {
                high_carb: { carbs: 45, protein: 30, fat: 25 },
                moderate_carb: { carbs: 35, protein: 35, fat: 30 },
                low_carb: { carbs: 20, protein: 40, fat: 40 }
            };
        }

        const distributions = {
            [this.dietTypes.LOW_CARB]: { carbs: 25, protein: 35, fat: 40 },
            [this.dietTypes.MEDITERRANEAN]: { carbs: 50, protein: 20, fat: 30 },
            [this.dietTypes.DASH]: { carbs: 55, protein: 25, fat: 20 },
            [this.dietTypes.ZONE]: { carbs: 40, protein: 30, fat: 30 },
            [this.dietTypes.ANTI_INFLAMMATORY]: { carbs: 45, protein: 25, fat: 30 },
            [this.dietTypes.BALANCED]: { carbs: 45, protein: 25, fat: 30 }
        };

        return distributions[planType.type] || distributions[this.dietTypes.BALANCED];
    }

    // Calculate macro grams
    calculateMacros(calories, distribution, weight) {
        if (distribution.high_carb) {
            // Carb cycling calculations
            return {
                high_carb_day: {
                    carbs: Math.round((calories * distribution.high_carb.carbs / 100) / 4),
                    protein: Math.round((calories * distribution.high_carb.protein / 100) / 4),
                    fat: Math.round((calories * distribution.high_carb.fat / 100) / 9)
                },
                moderate_carb_day: {
                    carbs: Math.round((calories * distribution.moderate_carb.carbs / 100) / 4),
                    protein: Math.round((calories * distribution.moderate_carb.protein / 100) / 4),
                    fat: Math.round((calories * distribution.moderate_carb.fat / 100) / 9)
                },
                low_carb_day: {
                    carbs: Math.round((calories * distribution.low_carb.carbs / 100) / 4),
                    protein: Math.round((calories * distribution.low_carb.protein / 100) / 4),
                    fat: Math.round((calories * distribution.low_carb.fat / 100) / 9)
                }
            };
        }

        // Single distribution
        return {
            carbs: Math.round((calories * distribution.carbs / 100) / 4),
            protein: Math.round((calories * distribution.protein / 100) / 4),
            fat: Math.round((calories * distribution.fat / 100) / 9)
        };
    }

    // Calculate water intake
    calculateWaterIntake(weight, activityLevel) {
        let baseWater = weight * 35; // ml per kg
        
        if (activityLevel === 'very_active' || activityLevel === 'extremely_active') {
            baseWater += 500; // Extra 500ml for high activity
        }

        return {
            daily_ml: Math.round(baseWater),
            daily_cups: Math.round(baseWater / 250), // 250ml per cup
            recommendation_ar: `${Math.round(baseWater / 1000)} لتر يومياً`,
            recommendation_en: `${Math.round(baseWater / 1000)} liters daily`
        };
    }

    // Generate recommendations
    generateRecommendations(clientData, planType) {
        const recommendations = {
            general: [
                {
                    ar: "شرب الماء بكمية كافية (2-3 لتر يومياً)",
                    en: "Drink adequate water (2-3 liters daily)"
                },
                {
                    ar: "تناول الألياف 25-30 جرام يومياً",
                    en: "Consume 25-30g fiber daily"
                },
                {
                    ar: "التركيز على الدهون الصحية (زيت زيتون، أفوكادو، أسماك)",
                    en: "Focus on healthy fats (olive oil, avocado, fish)"
                }
            ],
            specific: [],
            gulf_specific: [
                {
                    ar: "تناول التمر باعتدال (3-5 حبات يومياً)",
                    en: "Consume dates in moderation (3-5 pieces daily)"
                },
                {
                    ar: "استخدام البهارات المحلية (كركم، زنجبيل، هيل)",
                    en: "Use local spices (turmeric, ginger, cardamom)"
                },
                {
                    ar: "تجنب العصائر المحلاة والمشروبات الغازية",
                    en: "Avoid sweetened juices and sodas"
                }
            ]
        };

        // Add specific recommendations based on plan type
        if (planType.type === this.dietTypes.CARB_CYCLING) {
            recommendations.specific.push({
                ar: "تناول الكربوهيدرات حول أوقات التمرين في الأيام عالية الكربوهيدرات",
                en: "Time carbohydrates around workouts on high-carb days"
            });
        }

        if (planType.type === this.dietTypes.LOW_CARB) {
            recommendations.specific.push({
                ar: "زيادة تناول الخضروات الورقية والدهون الصحية",
                en: "Increase leafy vegetables and healthy fats"
            });
        }

        return recommendations;
    }

    // Generate weekly meal plans
    generateMealPlans(nutritionPlan, clientData) {
        // This would integrate with the meal plan data from the JSON
        const weeklyPlan = {};
        
        for (let day = 1; day <= 7; day++) {
            const dayType = this.determineDayType(day, clientData.workoutSchedule);
            weeklyPlan[`day_${day}`] = {
                type: dayType,
                meals: this.selectMealsForDay(dayType, nutritionPlan, clientData.preferences)
            };
        }

        return weeklyPlan;
    }

    // Determine day type for carb cycling
    determineDayType(day, workoutSchedule) {
        if (!workoutSchedule) {
            // Default pattern: 2 high, 3 moderate, 2 low
            const pattern = ['high', 'moderate', 'low', 'moderate', 'high', 'moderate', 'low'];
            return pattern[day - 1];
        }

        // Custom logic based on workout schedule
        if (workoutSchedule[day] && workoutSchedule[day].intensity === 'high') {
            return 'high';
        } else if (workoutSchedule[day]) {
            return 'moderate';
        } else {
            return 'low';
        }
    }

    // Select meals for specific day
    selectMealsForDay(dayType, nutritionPlan, preferences) {
        // This would reference the actual meal data from carb-cycling-plans.json
        // For now, returning structure
        return {
            breakfast: { planned: true },
            pre_workout: { planned: dayType !== 'low' },
            post_workout: { planned: dayType !== 'low' },
            lunch: { planned: true },
            dinner: { planned: true },
            snacks: { planned: dayType === 'high' }
        };
    }
}

// Usage example:
const calculator = new CarbCyclingCalculator();

// Example client data
const exampleClient = {
    age: 30,
    weight: 80,
    height: 175,
    gender: 'male',
    activityLevel: 'moderately_active',
    goal: 'muscle_building',
    medicalConditions: [],
    medications: [],
    pregnancy: false,
    eatingDisorders: false,
    preferences: {
        cuisine: 'gulf',
        halal: true,
        no_pork: true,
        no_alcohol: true
    },
    workoutSchedule: {
        1: { intensity: 'high' }, // Monday
        3: { intensity: 'moderate' }, // Wednesday  
        5: { intensity: 'high' }, // Friday
    }
};

// Generate personalized plan
// const personalizedPlan = calculator.calculatePersonalizedPlan(exampleClient);

export default CarbCyclingCalculator;
