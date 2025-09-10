package services

import (
	"time"

	"doctorhealthy1/models"
)

// WorkoutService handles workout plan generation
type WorkoutService struct {
	// In a real application, this would have database dependencies
}

// NewWorkoutService creates a new workout service
func NewWorkoutService() *WorkoutService {
	return &WorkoutService{}
}

// GeneratePlan generates a personalized workout plan
func (ws *WorkoutService) GeneratePlan(input *models.WorkoutLegacy) (*models.WorkoutResultLegacy, error) {
	// Calculate BMI for workout intensity adjustments
	bmi := input.Weight / ((input.Height / 100) * (input.Height / 100))

	// Generate weekly plan based on goal and experience
	weeklyPlan := ws.generateWeeklyPlan(input.Goal, input.Experience, bmi, input.Injuries != "")

	// Generate safety tips based on injuries and experience
	safetyTips := ws.generateSafetyTips(input.Injuries, input.Experience)

	// Generate general notes
	notes := ws.generateNotes(input.Goal, input.Age, bmi)

	result := &models.WorkoutResultLegacy{
		UserID:      input.UserID,
		WeeklyPlan:  weeklyPlan,
		Notes:       notes,
		SafetyTips:  safetyTips,
		GeneratedAt: time.Now(),
	}

	return result, nil
}

// generateWeeklyPlan creates a weekly workout schedule
func (ws *WorkoutService) generateWeeklyPlan(goal, experience string, bmi float64, hasInjuries bool) map[string]interface{} {
	plan := make(map[string]interface{})

	// Base plans by goal
	switch goal {
	case "weight_loss":
		plan = map[string]interface{}{
			"monday": map[string]string{
				"focus":     "Cardio + Core",
				"duration":  "45-60 minutes",
				"exercises": "Treadmill/Elliptical 30min, Planks 3x1min, Bicycle crunches 3x15, Russian twists 3x20",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"tuesday": map[string]string{
				"focus":     "Upper Body Strength",
				"duration":  "40-50 minutes",
				"exercises": "Push-ups 3x12, Pull-ups 3x8, Shoulder press 3x10, Tricep dips 3x12",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"wednesday": map[string]string{
				"focus":     "HIIT Cardio",
				"duration":  "30-40 minutes",
				"exercises": "Burpees 4x10, Jump squats 4x15, Mountain climbers 4x20, High knees 4x30sec",
				"intensity": "High intensity with 30sec rest",
			},
			"thursday": map[string]string{
				"focus":     "Lower Body",
				"duration":  "40-50 minutes",
				"exercises": "Squats 3x15, Lunges 3x12 each leg, Calf raises 3x20, Glute bridges 3x15",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"friday": map[string]string{
				"focus":     "Full Body Circuit",
				"duration":  "45-55 minutes",
				"exercises": "Circuit: 5 exercises, 3 rounds, 45sec work/15sec rest",
				"intensity": "Moderate to high",
			},
			"saturday": map[string]string{
				"focus":     "Active Recovery",
				"duration":  "30-45 minutes",
				"exercises": "Light walking, stretching, yoga, or swimming",
				"intensity": "Low intensity",
			},
			"sunday": map[string]string{
				"focus":     "Rest Day",
				"duration":  "Optional",
				"exercises": "Complete rest or gentle stretching",
				"intensity": "Recovery",
			},
		}

	case "muscle_gain":
		plan = map[string]interface{}{
			"monday": map[string]string{
				"focus":     "Chest & Triceps",
				"duration":  "60-75 minutes",
				"exercises": "Bench press 4x8, Incline press 3x10, Dips 3x12, Tricep extensions 3x12",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"tuesday": map[string]string{
				"focus":     "Back & Biceps",
				"duration":  "60-75 minutes",
				"exercises": "Deadlifts 4x6, Pull-ups 4x8, Rows 4x10, Bicep curls 3x12",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"wednesday": map[string]string{
				"focus":     "Legs",
				"duration":  "60-75 minutes",
				"exercises": "Squats 4x8, Leg press 3x12, Leg curls 3x10, Calf raises 4x15",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"thursday": map[string]string{
				"focus":     "Shoulders",
				"duration":  "50-60 minutes",
				"exercises": "Overhead press 4x8, Lateral raises 3x12, Rear delts 3x12, Shrugs 3x15",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"friday": map[string]string{
				"focus":     "Arms",
				"duration":  "45-60 minutes",
				"exercises": "Close grip bench 3x10, Skull crushers 3x12, Hammer curls 3x12, Cable curls 3x12",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"saturday": map[string]string{
				"focus":     "Legs & Core",
				"duration":  "50-60 minutes",
				"exercises": "Romanian deadlifts 3x10, Bulgarian split squats 3x12, Planks 3x1min",
				"intensity": "Moderate",
			},
			"sunday": map[string]string{
				"focus":     "Rest",
				"duration":  "Optional",
				"exercises": "Complete rest or light stretching",
				"intensity": "Recovery",
			},
		}

	default: // general fitness
		plan = map[string]interface{}{
			"monday": map[string]string{
				"focus":     "Full Body Strength",
				"duration":  "45-60 minutes",
				"exercises": "Squats 3x12, Push-ups 3x10, Rows 3x10, Planks 3x45sec",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"tuesday": map[string]string{
				"focus":     "Cardio",
				"duration":  "30-45 minutes",
				"exercises": "Brisk walking, cycling, or swimming",
				"intensity": "Moderate",
			},
			"wednesday": map[string]string{
				"focus":     "Upper Body",
				"duration":  "40-50 minutes",
				"exercises": "Push-ups 3x10, Pull-ups 3x6, Shoulder press 3x12, Tricep dips 3x10",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"thursday": map[string]string{
				"focus":     "Cardio + Core",
				"duration":  "40-50 minutes",
				"exercises": "Cardio 25min + Core exercises 15min",
				"intensity": "Moderate",
			},
			"friday": map[string]string{
				"focus":     "Lower Body",
				"duration":  "40-50 minutes",
				"exercises": "Squats 3x12, Lunges 3x10, Calf raises 3x15, Glute bridges 3x12",
				"intensity": ws.getIntensity(experience, hasInjuries),
			},
			"saturday": map[string]string{
				"focus":     "Active Recovery",
				"duration":  "30-45 minutes",
				"exercises": "Yoga, stretching, or light walking",
				"intensity": "Low",
			},
			"sunday": map[string]string{
				"focus":     "Rest",
				"duration":  "Optional",
				"exercises": "Complete rest",
				"intensity": "Recovery",
			},
		}
	}

	return plan
}

// getIntensity determines workout intensity based on experience and injuries
func (ws *WorkoutService) getIntensity(experience string, hasInjuries bool) string {
	if hasInjuries {
		return "Low to moderate (modify as needed)"
	}

	switch experience {
	case "beginner":
		return "Low to moderate"
	case "intermediate":
		return "Moderate to high"
	case "advanced":
		return "High intensity"
	default:
		return "Moderate"
	}
}

// generateSafetyTips creates safety tips based on user profile
func (ws *WorkoutService) generateSafetyTips(injuries, experience string) []string {
	tips := []string{
		"Always warm up for 5-10 minutes before exercising",
		"Stay hydrated throughout your workout",
		"Listen to your body and rest when needed",
		"Cool down and stretch after each workout",
		"Get adequate sleep for recovery",
	}

	if injuries != "" {
		tips = append(tips,
			"⚠️ Modify exercises to accommodate your injuries",
			"Consult with a healthcare provider before starting",
			"Stop immediately if you experience pain",
		)
	}

	if experience == "beginner" {
		tips = append(tips,
			"Start with lighter weights and focus on proper form",
			"Gradually increase intensity over time",
			"Consider working with a trainer initially",
		)
	}

	return tips
}

// generateNotes creates personalized notes
func (ws *WorkoutService) generateNotes(goal string, age int, bmi float64) []string {
	notes := []string{}

	// Age-specific notes
	if age > 50 {
		notes = append(notes, "Focus on joint-friendly exercises and adequate recovery time")
	}

	// BMI-specific notes
	if bmi > 30 {
		notes = append(notes, "Emphasize low-impact cardio to reduce joint stress")
	} else if bmi < 18.5 {
		notes = append(notes, "Focus on strength training and adequate nutrition for healthy weight gain")
	}

	// Goal-specific notes
	switch goal {
	case "weight_loss":
		notes = append(notes, "Combine exercise with a caloric deficit for optimal results")
	case "muscle_gain":
		notes = append(notes, "Ensure adequate protein intake and progressive overload")
	case "endurance":
		notes = append(notes, "Gradually increase duration and intensity of cardio exercises")
	}

	return notes
}

// GetUserWorkouts retrieves workout history for a user
func (ws *WorkoutService) GetUserWorkouts(userID uint) ([]models.WorkoutResultLegacy, error) {
	// In a real application, this would query the database
	// For now, return empty slice
	return []models.WorkoutResultLegacy{}, nil
}
