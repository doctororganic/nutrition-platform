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

// WorkoutManagementService handles workout planning and management
type WorkoutManagementService struct {
	dataPath         string
	exerciseTypes    []models.ExerciseType
	exercises        []models.Exercise
	injuries         []models.Injury
	complaints       []models.Complaint
	workoutGoals     []string
	equipmentTypes   []string
	muscleGroups     []string
	difficultyLevels []string
}

// NewWorkoutManagementService creates a new workout management service
func NewWorkoutManagementService(dataPath string) *WorkoutManagementService {
	service := &WorkoutManagementService{
		dataPath: dataPath,
	}

	// Load all data
	service.loadData()

	return service
}

// loadData loads all workout-related data from files
func (wms *WorkoutManagementService) loadData() {
	// Load exercise types from workouts file
	wms.loadExerciseTypes()

	// Load exercises from workouts file
	wms.loadExercises()

	// Load injuries from injury file
	wms.loadInjuries()

	// Load complaints from metabolism file
	wms.loadComplaints()

	// Extract unique values
	wms.extractUniqueValues()
}

// loadExerciseTypes loads exercise types from workouts file
func (wms *WorkoutManagementService) loadExerciseTypes() {
	filePath := filepath.Join(wms.dataPath, "workouts teq.js")
	data, err := wms.loadJSONFile(filePath)
	if err != nil {
		fmt.Printf("Warning: Could not load exercise types from %s: %v\n", filePath, err)
		return
	}

	// Parse exercise types from the data
	if workoutData, ok := data.(map[string]interface{}); ok {
		if types, ok := workoutData["exercise_types"].([]interface{}); ok {
			for _, t := range types {
				if typeData, ok := t.(map[string]interface{}); ok {
					exerciseType := wms.parseExerciseType(typeData)
					wms.exerciseTypes = append(wms.exerciseTypes, exerciseType)
				}
			}
		}
	}
}

// loadExercises loads exercises from workouts file
func (wms *WorkoutManagementService) loadExercises() {
	filePath := filepath.Join(wms.dataPath, "workouts teq.js")
	data, err := wms.loadJSONFile(filePath)
	if err != nil {
		fmt.Printf("Warning: Could not load exercises from %s: %v\n", filePath, err)
		return
	}

	// Parse exercises from the data
	if workoutData, ok := data.(map[string]interface{}); ok {
		if exercises, ok := workoutData["exercises"].([]interface{}); ok {
			for _, e := range exercises {
				if exerciseData, ok := e.(map[string]interface{}); ok {
					exercise := wms.parseExercise(exerciseData)
					wms.exercises = append(wms.exercises, exercise)
				}
			}
		}
	}
}

// loadInjuries loads injuries from injury file
func (wms *WorkoutManagementService) loadInjuries() {
	filePath := filepath.Join(wms.dataPath, "injury.js")
	data, err := wms.loadJSONFile(filePath)
	if err != nil {
		fmt.Printf("Warning: Could not load injuries from %s: %v\n", filePath, err)
		return
	}

	// Parse injuries from the data
	if injuryData, ok := data.(map[string]interface{}); ok {
		if injuries, ok := injuryData["injuries"].([]interface{}); ok {
			for _, i := range injuries {
				if injury, ok := i.(map[string]interface{}); ok {
					injuryModel := wms.parseInjury(injury)
					wms.injuries = append(wms.injuries, injuryModel)
				}
			}
		}
	}
}

// loadComplaints loads complaints from metabolism file
func (wms *WorkoutManagementService) loadComplaints() {
	filePath := filepath.Join(wms.dataPath, "metabolism.js")
	data, err := wms.loadJSONFile(filePath)
	if err != nil {
		fmt.Printf("Warning: Could not load complaints from %s: %v\n", filePath, err)
		return
	}

	// Parse complaints from the data
	if metabolismData, ok := data.(map[string]interface{}); ok {
		if complaints, ok := metabolismData["complaints"].([]interface{}); ok {
			for _, c := range complaints {
				if complaint, ok := c.(map[string]interface{}); ok {
					complaintModel := wms.parseComplaint(complaint)
					wms.complaints = append(wms.complaints, complaintModel)
				}
			}
		}
	}
}

// extractUniqueValues extracts unique values from loaded data
func (wms *WorkoutManagementService) extractUniqueValues() {
	// Extract workout goals
	goalsMap := make(map[string]bool)
	for _, exercise := range wms.exercises {
		for _, goal := range exercise.Goals {
			goalsMap[goal] = true
		}
	}
	for goal := range goalsMap {
		wms.workoutGoals = append(wms.workoutGoals, goal)
	}

	// Extract equipment types
	equipmentMap := make(map[string]bool)
	for _, exercise := range wms.exercises {
		for _, equipment := range exercise.Equipment {
			equipmentMap[equipment] = true
		}
	}
	for equipment := range equipmentMap {
		wms.equipmentTypes = append(wms.equipmentTypes, equipment)
	}

	// Extract muscle groups
	muscleMap := make(map[string]bool)
	for _, exercise := range wms.exercises {
		for _, muscle := range exercise.MuscleGroup {
			muscleMap[muscle] = true
		}
	}
	for muscle := range muscleMap {
		wms.muscleGroups = append(wms.muscleGroups, muscle)
	}

	// Extract difficulty levels
	difficultyMap := make(map[string]bool)
	for _, exercise := range wms.exercises {
		difficultyMap[exercise.Difficulty] = true
	}
	for difficulty := range difficultyMap {
		wms.difficultyLevels = append(wms.difficultyLevels, difficulty)
	}
}

// parseExerciseType parses exercise type from JSON data
func (wms *WorkoutManagementService) parseExerciseType(data map[string]interface{}) models.ExerciseType {
	exerciseType := models.ExerciseType{}

	if id, ok := data["id"].(string); ok {
		exerciseType.ID = id
	}

	if name, ok := data["name"].(map[string]interface{}); ok {
		exerciseType.Name = wms.convertToStringMap(name)
	}

	if description, ok := data["description"].(map[string]interface{}); ok {
		exerciseType.Description = wms.convertToStringMap(description)
	}

	if category, ok := data["category"].(string); ok {
		exerciseType.Category = category
	}

	if equipment, ok := data["equipment"].([]interface{}); ok {
		exerciseType.Equipment = wms.convertToStringSlice(equipment)
	}

	if muscleGroup, ok := data["muscle_group"].([]interface{}); ok {
		exerciseType.MuscleGroup = wms.convertToStringSlice(muscleGroup)
	}

	if difficulty, ok := data["difficulty"].(string); ok {
		exerciseType.Difficulty = difficulty
	}

	if goals, ok := data["goals"].([]interface{}); ok {
		exerciseType.Goals = wms.convertToStringSlice(goals)
	}

	return exerciseType
}

// parseExercise parses exercise from JSON data
func (wms *WorkoutManagementService) parseExercise(data map[string]interface{}) models.Exercise {
	exercise := models.Exercise{}

	if id, ok := data["id"].(string); ok {
		exercise.ID = id
	}

	if name, ok := data["name"].(map[string]interface{}); ok {
		exercise.Name = wms.convertToStringMap(name)
	}

	if description, ok := data["description"].(map[string]interface{}); ok {
		exercise.Description = wms.convertToStringMap(description)
	}

	if exerciseType, ok := data["type"].(string); ok {
		exercise.Type = exerciseType
	}

	if equipment, ok := data["equipment"].([]interface{}); ok {
		exercise.Equipment = wms.convertToStringSlice(equipment)
	}

	if muscleGroup, ok := data["muscle_group"].([]interface{}); ok {
		exercise.MuscleGroup = wms.convertToStringSlice(muscleGroup)
	}

	if difficulty, ok := data["difficulty"].(string); ok {
		exercise.Difficulty = difficulty
	}

	if instructions, ok := data["instructions"].([]interface{}); ok {
		exercise.Instructions = wms.convertToStringMapSlice(instructions)
	}

	if sets, ok := data["sets"].(string); ok {
		exercise.Sets = sets
	}

	if reps, ok := data["reps"].(string); ok {
		exercise.Reps = reps
	}

	if rest, ok := data["rest"].(string); ok {
		exercise.Rest = rest
	}

	if commonMistakes, ok := data["common_mistakes"].([]interface{}); ok {
		exercise.CommonMistakes = wms.convertToStringMapSlice(commonMistakes)
	}

	if alternatives, ok := data["alternatives"].([]interface{}); ok {
		exercise.Alternatives = wms.convertToStringSlice(alternatives)
	}

	if goals, ok := data["goals"].([]interface{}); ok {
		exercise.Goals = wms.convertToStringSlice(goals)
	}

	if injurySafe, ok := data["injury_safe"].([]interface{}); ok {
		exercise.InjurySafe = wms.convertToStringSlice(injurySafe)
	}

	if injuryAvoid, ok := data["injury_avoid"].([]interface{}); ok {
		exercise.InjuryAvoid = wms.convertToStringSlice(injuryAvoid)
	}

	return exercise
}

// parseInjury parses injury from JSON data
func (wms *WorkoutManagementService) parseInjury(data map[string]interface{}) models.Injury {
	injury := models.Injury{}

	if id, ok := data["id"].(string); ok {
		injury.ID = id
	}

	if name, ok := data["name"].(map[string]interface{}); ok {
		injury.Name = wms.convertToStringMap(name)
	}

	if description, ok := data["description"].(map[string]interface{}); ok {
		injury.Description = wms.convertToStringMap(description)
	}

	if category, ok := data["category"].(string); ok {
		injury.Category = category
	}

	if severity, ok := data["severity"].(string); ok {
		injury.Severity = severity
	}

	if treatment, ok := data["treatment"].([]interface{}); ok {
		injury.Treatment = wms.convertToStringMapSlice(treatment)
	}

	if exercises, ok := data["exercises"].([]interface{}); ok {
		injury.Exercises = wms.convertToStringSlice(exercises)
	}

	if avoidExercises, ok := data["avoid_exercises"].([]interface{}); ok {
		injury.AvoidExercises = wms.convertToStringSlice(avoidExercises)
	}

	if recoveryTime, ok := data["recovery_time"].(string); ok {
		injury.RecoveryTime = recoveryTime
	}

	if prevention, ok := data["prevention"].([]interface{}); ok {
		injury.Prevention = wms.convertToStringMapSlice(prevention)
	}

	if whenToSeeDoctor, ok := data["when_to_see_doctor"].([]interface{}); ok {
		injury.WhenToSeeDoctor = wms.convertToStringMapSlice(whenToSeeDoctor)
	}

	return injury
}

// parseComplaint parses complaint from JSON data
func (wms *WorkoutManagementService) parseComplaint(data map[string]interface{}) models.Complaint {
	complaint := models.Complaint{}

	if id, ok := data["id"].(string); ok {
		complaint.ID = id
	}

	if name, ok := data["name"].(map[string]interface{}); ok {
		complaint.Name = wms.convertToStringMap(name)
	}

	if description, ok := data["description"].(map[string]interface{}); ok {
		complaint.Description = wms.convertToStringMap(description)
	}

	if category, ok := data["category"].(string); ok {
		complaint.Category = category
	}

	if causes, ok := data["causes"].([]interface{}); ok {
		complaint.Causes = wms.convertToStringMapSlice(causes)
	}

	if solutions, ok := data["solutions"].([]interface{}); ok {
		complaint.Solutions = wms.convertToStringMapSlice(solutions)
	}

	if nutritionalAdvice, ok := data["nutritional_advice"].([]interface{}); ok {
		complaint.NutritionalAdvice = wms.convertToStringMapSlice(nutritionalAdvice)
	}

	if supplements, ok := data["supplements"].([]interface{}); ok {
		complaint.Supplements = wms.parseSupplements(supplements)
	}

	if lifestyle, ok := data["lifestyle"].([]interface{}); ok {
		complaint.Lifestyle = wms.convertToStringMapSlice(lifestyle)
	}

	return complaint
}

// parseSupplements parses supplements from JSON data
func (wms *WorkoutManagementService) parseSupplements(data []interface{}) []models.Supplement {
	var supplements []models.Supplement

	for _, s := range data {
		if supplementData, ok := s.(map[string]interface{}); ok {
			supplement := models.Supplement{}

			if name, ok := supplementData["name"].(map[string]interface{}); ok {
				supplement.Name = wms.convertToStringMap(name)
			}

			if description, ok := supplementData["description"].(map[string]interface{}); ok {
				supplement.Description = wms.convertToStringMap(description)
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
				supplement.SideEffects = wms.convertToStringMapSlice(sideEffects)
			}

			if contraindications, ok := supplementData["contraindications"].([]interface{}); ok {
				supplement.Contraindications = wms.convertToStringMapSlice(contraindications)
			}

			supplements = append(supplements, supplement)
		}
	}

	return supplements
}

// GenerateWorkoutPlan generates a personalized workout plan
func (wms *WorkoutManagementService) GenerateWorkoutPlan(request models.WorkoutRequest) (*models.WorkoutResponse, error) {
	// Initialize response
	response := &models.WorkoutResponse{
		Success: true,
		Message: "Workout plan generated successfully",
	}

	// Create workout plan
	workoutPlan := &models.WorkoutPlan{
		ID:          wms.generateWorkoutPlanID(),
		ClientData:  request.ClientData,
		Goal:        request.Goal,
		WorkoutType: request.ClientData.WorkoutType,
		Duration:    request.Duration,
		Frequency:   request.Frequency,
		CreatedAt:   time.Now(),
	}

	// Generate weekly schedule
	workoutPlan.WeeklySchedule = wms.generateWeeklySchedule(request)

	// Select exercises based on goal and client data
	workoutPlan.Exercises = wms.selectExercises(request)

	// Generate alternatives for each exercise
	workoutPlan.Alternatives = wms.generateExerciseAlternatives(request, workoutPlan.Exercises)

	// Generate injury advice if client has injuries
	if len(request.ClientData.Injuries) > 0 {
		workoutPlan.InjuryAdvice = wms.generateInjuryAdvice(request.ClientData.Injuries)
	}

	// Generate complaint advice if client has complaints
	if len(request.ClientData.Complaints) > 0 {
		workoutPlan.ComplaintAdvice = wms.generateComplaintAdvice(request.ClientData.Complaints, request.ClientData)
	}

	// Generate disclaimer if needed
	if len(request.ClientData.Injuries) > 0 || len(request.ClientData.Complaints) > 0 {
		response.Disclaimer = wms.createDisclaimer(request.ClientData)
	}

	response.WorkoutPlan = workoutPlan
	response.InjuryAdvice = workoutPlan.InjuryAdvice
	response.ComplaintAdvice = workoutPlan.ComplaintAdvice

	return response, nil
}

// generateWeeklySchedule generates a weekly workout schedule
func (wms *WorkoutManagementService) generateWeeklySchedule(request models.WorkoutRequest) []models.WorkoutDayPlan {
	var schedule []models.WorkoutDayPlan

	days := []string{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}

	for i, day := range days {
		dayPlan := models.WorkoutDayPlan{
			Day:       day,
			Focus:     wms.determineDayFocus(request.ClientData.WorkoutGoal, i),
			Duration:  wms.determineWorkoutDuration(request.ClientData.ActivityLevel, request.ClientData.WorkoutGoal),
			Intensity: wms.determineIntensity(request.ClientData.ActivityLevel, request.ClientData.WorkoutGoal),
		}

		// Add rest days for certain goals
		if wms.shouldRest(request.ClientData.WorkoutGoal, i) {
			dayPlan.Focus = "Rest"
			dayPlan.Exercises = []models.Exercise{}
		} else {
			dayPlan.Exercises = wms.selectDayExercises(request, dayPlan.Focus)
		}

		schedule = append(schedule, dayPlan)
	}

	return schedule
}

// selectExercises selects exercises based on client data and goal
func (wms *WorkoutManagementService) selectExercises(request models.WorkoutRequest) []models.Exercise {
	var selectedExercises []models.Exercise

	// Filter exercises by goal
	goalExercises := wms.filterExercisesByGoal(request.ClientData.WorkoutGoal)

	// Filter by workout type (gym/home)
	equipmentExercises := wms.filterExercisesByEquipment(goalExercises, request.ClientData.WorkoutType)

	// Filter by injuries (avoid exercises that could worsen injuries)
	safeExercises := wms.filterExercisesByInjuries(equipmentExercises, request.ClientData.Injuries)

	// Select exercises based on difficulty and client level
	selectedExercises = wms.selectExercisesByDifficulty(safeExercises, request.ClientData.ActivityLevel)

	return selectedExercises
}

// generateExerciseAlternatives generates alternatives for each exercise
func (wms *WorkoutManagementService) generateExerciseAlternatives(request models.WorkoutRequest, exercises []models.Exercise) []models.Exercise {
	var alternatives []models.Exercise

	for _, exercise := range exercises {
		// Find alternative exercises
		exerciseAlternatives := wms.findExerciseAlternatives(exercise, request)
		alternatives = append(alternatives, exerciseAlternatives...)
	}

	return alternatives
}

// generateInjuryAdvice generates advice for client injuries
func (wms *WorkoutManagementService) generateInjuryAdvice(injuries []string) []models.Injury {
	var injuryAdvice []models.Injury

	for _, injuryID := range injuries {
		for _, injury := range wms.injuries {
			if injury.ID == injuryID {
				injuryAdvice = append(injuryAdvice, injury)
				break
			}
		}
	}

	return injuryAdvice
}

// generateComplaintAdvice generates advice for client complaints
func (wms *WorkoutManagementService) generateComplaintAdvice(complaints []string, clientData models.WorkoutClientData) []models.Complaint {
	var complaintAdvice []models.Complaint

	for _, complaintID := range complaints {
		for _, complaint := range wms.complaints {
			if complaint.ID == complaintID {
				// Adjust supplement dosages based on client weight
				wms.adjustSupplementDosages(&complaint, clientData.Weight)
				complaintAdvice = append(complaintAdvice, complaint)
				break
			}
		}
	}

	return complaintAdvice
}

// Helper methods for workout plan generation
func (wms *WorkoutManagementService) determineDayFocus(goal string, dayIndex int) string {
	switch goal {
	case "weight_loss":
		switch dayIndex % 7 {
		case 0, 3: // Monday, Thursday
			return "Cardio"
		case 1, 4: // Tuesday, Friday
			return "Strength Training"
		case 2, 5: // Wednesday, Saturday
			return "HIIT"
		default:
			return "Active Recovery"
		}
	case "muscle_gain":
		switch dayIndex % 7 {
		case 0: // Monday
			return "Chest & Triceps"
		case 1: // Tuesday
			return "Back & Biceps"
		case 2: // Wednesday
			return "Legs"
		case 3: // Thursday
			return "Shoulders"
		case 4: // Friday
			return "Arms"
		case 5: // Saturday
			return "Legs"
		default:
			return "Rest"
		}
	case "strength":
		switch dayIndex % 7 {
		case 0, 3: // Monday, Thursday
			return "Upper Body"
		case 1, 4: // Tuesday, Friday
			return "Lower Body"
		case 2, 5: // Wednesday, Saturday
			return "Full Body"
		default:
			return "Rest"
		}
	default:
		return "General Fitness"
	}
}

func (wms *WorkoutManagementService) determineWorkoutDuration(activityLevel, goal string) string {
	switch activityLevel {
	case "sedentary":
		return "30 minutes"
	case "moderate":
		return "45 minutes"
	case "active":
		return "60 minutes"
	case "very_active":
		return "75 minutes"
	default:
		return "45 minutes"
	}
}

func (wms *WorkoutManagementService) determineIntensity(activityLevel, goal string) string {
	switch activityLevel {
	case "sedentary":
		return "Low"
	case "moderate":
		return "Medium"
	case "active":
		return "High"
	case "very_active":
		return "Very High"
	default:
		return "Medium"
	}
}

func (wms *WorkoutManagementService) shouldRest(goal string, dayIndex int) bool {
	switch goal {
	case "weight_loss":
		return dayIndex == 6 // Sunday rest
	case "muscle_gain":
		return dayIndex == 6 // Sunday rest
	case "strength":
		return dayIndex == 6 // Sunday rest
	default:
		return dayIndex == 6 // Sunday rest
	}
}

func (wms *WorkoutManagementService) selectDayExercises(request models.WorkoutRequest, focus string) []models.Exercise {
	var dayExercises []models.Exercise

	// Filter exercises by focus area
	for _, exercise := range wms.exercises {
		if wms.exerciseMatchesFocus(exercise, focus) {
			dayExercises = append(dayExercises, exercise)
		}
	}

	// Limit to 4-6 exercises per day
	if len(dayExercises) > 6 {
		dayExercises = dayExercises[:6]
	}

	return dayExercises
}

func (wms *WorkoutManagementService) exerciseMatchesFocus(exercise models.Exercise, focus string) bool {
	focus = strings.ToLower(focus)

	switch {
	case strings.Contains(focus, "cardio"):
		return exercise.Type == "cardio"
	case strings.Contains(focus, "strength"):
		return exercise.Type == "strength"
	case strings.Contains(focus, "chest"):
		return wms.containsMuscleGroup(exercise.MuscleGroup, "chest")
	case strings.Contains(focus, "back"):
		return wms.containsMuscleGroup(exercise.MuscleGroup, "back")
	case strings.Contains(focus, "legs"):
		return wms.containsMuscleGroup(exercise.MuscleGroup, "legs")
	case strings.Contains(focus, "shoulders"):
		return wms.containsMuscleGroup(exercise.MuscleGroup, "shoulders")
	case strings.Contains(focus, "arms"):
		return wms.containsMuscleGroup(exercise.MuscleGroup, "arms") ||
			wms.containsMuscleGroup(exercise.MuscleGroup, "biceps") ||
			wms.containsMuscleGroup(exercise.MuscleGroup, "triceps")
	default:
		return true
	}
}

func (wms *WorkoutManagementService) containsMuscleGroup(muscleGroups []string, target string) bool {
	for _, muscle := range muscleGroups {
		if strings.Contains(strings.ToLower(muscle), target) {
			return true
		}
	}
	return false
}

func (wms *WorkoutManagementService) filterExercisesByGoal(goal string) []models.Exercise {
	var filtered []models.Exercise

	for _, exercise := range wms.exercises {
		for _, exerciseGoal := range exercise.Goals {
			if strings.ToLower(exerciseGoal) == strings.ToLower(goal) {
				filtered = append(filtered, exercise)
				break
			}
		}
	}

	return filtered
}

func (wms *WorkoutManagementService) filterExercisesByEquipment(exercises []models.Exercise, workoutType string) []models.Exercise {
	var filtered []models.Exercise

	for _, exercise := range exercises {
		for _, equipment := range exercise.Equipment {
			if (workoutType == "gym" && equipment == "gym") ||
				(workoutType == "home" && (equipment == "home" || equipment == "bodyweight")) {
				filtered = append(filtered, exercise)
				break
			}
		}
	}

	return filtered
}

func (wms *WorkoutManagementService) filterExercisesByInjuries(exercises []models.Exercise, injuries []string) []models.Exercise {
	var filtered []models.Exercise

	for _, exercise := range exercises {
		safe := true
		for _, injury := range injuries {
			for _, avoidInjury := range exercise.InjuryAvoid {
				if strings.ToLower(avoidInjury) == strings.ToLower(injury) {
					safe = false
					break
				}
			}
			if !safe {
				break
			}
		}
		if safe {
			filtered = append(filtered, exercise)
		}
	}

	return filtered
}

func (wms *WorkoutManagementService) selectExercisesByDifficulty(exercises []models.Exercise, activityLevel string) []models.Exercise {
	var selected []models.Exercise

	// Determine appropriate difficulty based on activity level
	var targetDifficulty string
	switch activityLevel {
	case "sedentary":
		targetDifficulty = "beginner"
	case "moderate":
		targetDifficulty = "beginner"
	case "active":
		targetDifficulty = "intermediate"
	case "very_active":
		targetDifficulty = "advanced"
	default:
		targetDifficulty = "beginner"
	}

	// Select exercises with appropriate difficulty
	for _, exercise := range exercises {
		if exercise.Difficulty == targetDifficulty {
			selected = append(selected, exercise)
		}
	}

	// If not enough exercises found, include other difficulties
	if len(selected) < 10 {
		for _, exercise := range exercises {
			if exercise.Difficulty != targetDifficulty && len(selected) < 20 {
				selected = append(selected, exercise)
			}
		}
	}

	return selected
}

func (wms *WorkoutManagementService) findExerciseAlternatives(exercise models.Exercise, request models.WorkoutRequest) []models.Exercise {
	var alternatives []models.Exercise

	// Find exercises that target the same muscle groups
	for _, altID := range exercise.Alternatives {
		for _, altExercise := range wms.exercises {
			if altExercise.ID == altID {
				// Check if alternative is suitable for client
				if wms.isExerciseSuitable(altExercise, request) {
					alternatives = append(alternatives, altExercise)
				}
				break
			}
		}
	}

	// If no alternatives found, find similar exercises
	if len(alternatives) == 0 {
		alternatives = wms.findSimilarExercises(exercise, request)
	}

	return alternatives
}

func (wms *WorkoutManagementService) isExerciseSuitable(exercise models.Exercise, request models.WorkoutRequest) bool {
	// Check workout type compatibility
	equipmentCompatible := false
	for _, equipment := range exercise.Equipment {
		if (request.ClientData.WorkoutType == "gym" && equipment == "gym") ||
			(request.ClientData.WorkoutType == "home" && (equipment == "home" || equipment == "bodyweight")) {
			equipmentCompatible = true
			break
		}
	}

	if !equipmentCompatible {
		return false
	}

	// Check injury compatibility
	for _, injury := range request.ClientData.Injuries {
		for _, avoidInjury := range exercise.InjuryAvoid {
			if strings.ToLower(avoidInjury) == strings.ToLower(injury) {
				return false
			}
		}
	}

	return true
}

func (wms *WorkoutManagementService) findSimilarExercises(exercise models.Exercise, request models.WorkoutRequest) []models.Exercise {
	var similar []models.Exercise

	for _, altExercise := range wms.exercises {
		if altExercise.ID == exercise.ID {
			continue
		}

		// Check if exercises target similar muscle groups
		similarMuscles := false
		for _, muscle1 := range exercise.MuscleGroup {
			for _, muscle2 := range altExercise.MuscleGroup {
				if strings.ToLower(muscle1) == strings.ToLower(muscle2) {
					similarMuscles = true
					break
				}
			}
			if similarMuscles {
				break
			}
		}

		if similarMuscles && wms.isExerciseSuitable(altExercise, request) {
			similar = append(similar, altExercise)
		}

		// Limit alternatives
		if len(similar) >= 3 {
			break
		}
	}

	return similar
}

func (wms *WorkoutManagementService) adjustSupplementDosages(complaint *models.Complaint, weight float64) {
	for i := range complaint.Supplements {
		// Adjust dosage based on weight (assuming standard dosage is for 70kg person)
		standardWeight := 70.0
		_ = weight / standardWeight // adjustmentFactor - used for future dosage calculation

		// Update dosage with weight-based adjustment
		complaint.Supplements[i].Dosage = fmt.Sprintf("Adjusted for %.1f kg: %s", weight, complaint.Supplements[i].Dosage)
	}
}

func (wms *WorkoutManagementService) createDisclaimer(clientData models.WorkoutClientData) string {
	disclaimer := "This workout plan is for informational purposes only and should not replace professional medical advice. "

	if len(clientData.Injuries) > 0 {
		disclaimer += "If you have injuries, please consult with a healthcare provider or physical therapist before starting this workout plan. "
	}

	if len(clientData.Complaints) > 0 {
		disclaimer += "If you have health complaints, please consult with a healthcare provider before following any recommendations. "
	}

	disclaimer += "Individual fitness needs may vary. Please adjust exercises and intensity according to your specific requirements and capabilities. "
	disclaimer += "Stop any exercise that causes pain or discomfort and consult with a healthcare provider."

	return disclaimer
}

// Public methods for data access
func (wms *WorkoutManagementService) GetAvailableExerciseTypes() []models.ExerciseType {
	return wms.exerciseTypes
}

func (wms *WorkoutManagementService) GetAvailableInjuries() []models.Injury {
	return wms.injuries
}

func (wms *WorkoutManagementService) GetAvailableComplaints() []models.Complaint {
	return wms.complaints
}

func (wms *WorkoutManagementService) GetWorkoutGoals() []string {
	return wms.workoutGoals
}

func (wms *WorkoutManagementService) GetEquipmentTypes() []string {
	return wms.equipmentTypes
}

func (wms *WorkoutManagementService) GetMuscleGroups() []string {
	return wms.muscleGroups
}

func (wms *WorkoutManagementService) GetDifficultyLevels() []string {
	return wms.difficultyLevels
}

func (wms *WorkoutManagementService) GetWorkoutStatistics() models.WorkoutStatistics {
	return models.WorkoutStatistics{
		TotalExerciseTypes: len(wms.exerciseTypes),
		TotalExercises:     len(wms.exercises),
		TotalInjuries:      len(wms.injuries),
		TotalComplaints:    len(wms.complaints),
		GoalsSupported:     wms.workoutGoals,
		EquipmentTypes:     wms.equipmentTypes,
		MuscleGroups:       wms.muscleGroups,
		DifficultyLevels:   wms.difficultyLevels,
		Categories:         wms.getCategoryStats(),
	}
}

// Helper methods
func (wms *WorkoutManagementService) loadJSONFile(filePath string) (interface{}, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var result interface{}
	err = json.Unmarshal(data, &result)
	return result, err
}

func (wms *WorkoutManagementService) convertToStringMap(data map[string]interface{}) map[string]string {
	result := make(map[string]string)
	for k, v := range data {
		if str, ok := v.(string); ok {
			result[k] = str
		}
	}
	return result
}

func (wms *WorkoutManagementService) convertToStringSlice(data []interface{}) []string {
	var result []string
	for _, item := range data {
		if str, ok := item.(string); ok {
			result = append(result, str)
		}
	}
	return result
}

func (wms *WorkoutManagementService) convertToStringMapSlice(data []interface{}) []map[string]string {
	var result []map[string]string
	for _, item := range data {
		if mapData, ok := item.(map[string]interface{}); ok {
			result = append(result, wms.convertToStringMap(mapData))
		}
	}
	return result
}

func (wms *WorkoutManagementService) generateWorkoutPlanID() string {
	return fmt.Sprintf("wp_%d", time.Now().UnixNano())
}

func (wms *WorkoutManagementService) getCategoryStats() map[string]int {
	stats := make(map[string]int)
	for _, exercise := range wms.exercises {
		stats[exercise.Type]++
	}
	return stats
}
