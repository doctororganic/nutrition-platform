package models

import "time"

// WorkoutClientData represents client data for workout planning
type WorkoutClientData struct {
	Name         string   `json:"name" validate:"required"`
	Weight       float64  `json:"weight" validate:"required,min=30,max=300"`
	Height       float64  `json:"height" validate:"required,min=120,max=250"`
	Gender       string   `json:"gender" validate:"required,oneof=male female"`
	ActivityLevel string  `json:"activity_level" validate:"required,oneof=sedentary moderate active very_active"`
	WorkoutGoal  string   `json:"workout_goal" validate:"required"`
	WorkoutType  string   `json:"workout_type" validate:"required,oneof=gym home"`
	Injuries     []string `json:"injuries"`
	Complaints   []string `json:"complaints"`
	Age          int      `json:"age" validate:"required,min=13,max=100"`
}

// ExerciseType represents different types of exercises
type ExerciseType struct {
	ID          string            `json:"id"`
	Name        map[string]string  `json:"name"`        // en/ar
	Description map[string]string  `json:"description"` // en/ar
	Category    string            `json:"category"`    // strength, cardio, flexibility, etc.
	Equipment   []string           `json:"equipment"`   // gym, home, bodyweight, etc.
	MuscleGroup []string           `json:"muscle_group"`
	Difficulty  string            `json:"difficulty"`   // beginner, intermediate, advanced
	Goals       []string           `json:"goals"`      // weight_loss, muscle_gain, strength, etc.
}

// Exercise represents a specific exercise
type Exercise struct {
	ID              string            `json:"id"`
	Name            map[string]string  `json:"name"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Type            string            `json:"type"`
	Equipment       []string          `json:"equipment"`
	MuscleGroup     []string          `json:"muscle_group"`
	Difficulty      string            `json:"difficulty"`
	Instructions    []map[string]string `json:"instructions"` // en/ar
	Sets            string            `json:"sets"`
	Reps            string            `json:"reps"`
	Rest            string            `json:"rest"`
	CommonMistakes  []map[string]string `json:"common_mistakes"` // en/ar
	Alternatives    []string          `json:"alternatives"` // IDs of alternative exercises
	Goals           []string          `json:"goals"`
	InjurySafe      []string          `json:"injury_safe"`   // safe for specific injuries
	InjuryAvoid     []string          `json:"injury_avoid"`  // avoid for specific injuries
}

// Injury represents injury information
type Injury struct {
	ID              string            `json:"id"`
	Name            map[string]string  `json:"name"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Category        string            `json:"category"`
	Severity        string            `json:"severity"`     // mild, moderate, severe
	Treatment       []map[string]string `json:"treatment"` // en/ar
	Exercises       []string          `json:"exercises"`   // recommended exercises
	AvoidExercises  []string          `json:"avoid_exercises"` // exercises to avoid
	RecoveryTime    string            `json:"recovery_time"`
	Prevention      []map[string]string `json:"prevention"` // en/ar
	WhenToSeeDoctor []map[string]string `json:"when_to_see_doctor"` // en/ar
}

// Complaint represents health complaints
type Complaint struct {
	ID              string            `json:"id"`
	Name            map[string]string  `json:"name"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Category        string            `json:"category"`
	Causes          []map[string]string `json:"causes"`     // en/ar
	Solutions       []map[string]string `json:"solutions"`  // en/ar
	NutritionalAdvice []map[string]string `json:"nutritional_advice"` // en/ar
	Supplements     []Supplement      `json:"supplements"`
	Lifestyle       []map[string]string `json:"lifestyle"` // en/ar
}

// Supplement represents supplement information
type Supplement struct {
	Name        map[string]string `json:"name"`        // en/ar
	Description map[string]string `json:"description"` // en/ar
	Dosage      string           `json:"dosage"`
	Timing      string           `json:"timing"`
	Duration    string           `json:"duration"`
	SideEffects []map[string]string `json:"side_effects"` // en/ar
	Contraindications []map[string]string `json:"contraindications"` // en/ar
}

// WorkoutPlan represents a complete workout plan
type WorkoutPlan struct {
	ID              string       `json:"id"`
	ClientData      WorkoutClientData `json:"client_data"`
	Goal            string       `json:"goal"`
	WorkoutType     string       `json:"workout_type"`
	Duration        string       `json:"duration"`
	Frequency       string       `json:"frequency"`
	WeeklySchedule  []WorkoutDayPlan    `json:"weekly_schedule"`
	Exercises       []Exercise   `json:"exercises"`
	Alternatives    []Exercise   `json:"alternatives"`
	InjuryAdvice    []Injury     `json:"injury_advice"`
	ComplaintAdvice []Complaint  `json:"complaint_advice"`
	CreatedAt       time.Time    `json:"created_at"`
}

// WorkoutDayPlan represents a single day's workout
type WorkoutDayPlan struct {
	Day       string     `json:"day"`
	Focus     string     `json:"focus"`
	Exercises []Exercise `json:"exercises"`
	Duration  string     `json:"duration"`
	Intensity string     `json:"intensity"`
}

// WorkoutRequest represents a workout plan request
type WorkoutRequest struct {
	ClientData WorkoutClientData `json:"client_data" validate:"required"`
	Goal       string           `json:"goal" validate:"required"`
	Duration   string           `json:"duration" validate:"required"`
	Frequency  string           `json:"frequency" validate:"required"`
}

// WorkoutResponse represents a workout plan response
type WorkoutResponse struct {
	Success           bool        `json:"success"`
	Message           string      `json:"message"`
	WorkoutPlan       *WorkoutPlan `json:"workout_plan,omitempty"`
	InjuryAdvice      []Injury    `json:"injury_advice,omitempty"`
	ComplaintAdvice   []Complaint `json:"complaint_advice,omitempty"`
	Disclaimer        string      `json:"disclaimer,omitempty"`
}

// AvailableExerciseTypes represents available exercise types
type AvailableExerciseTypes struct {
	Types []ExerciseType `json:"types"`
	Count int            `json:"count"`
}

// AvailableInjuries represents available injuries
type AvailableInjuries struct {
	Injuries []Injury `json:"injuries"`
	Count    int      `json:"count"`
}

// AvailableComplaints represents available complaints
type AvailableComplaints struct {
	Complaints []Complaint `json:"complaints"`
	Count      int         `json:"count"`
}

// WorkoutStatistics represents workout system statistics
type WorkoutStatistics struct {
	TotalExerciseTypes int                    `json:"total_exercise_types"`
	TotalExercises     int                    `json:"total_exercises"`
	TotalInjuries      int                    `json:"total_injuries"`
	TotalComplaints    int                    `json:"total_complaints"`
	GoalsSupported     []string               `json:"goals_supported"`
	EquipmentTypes     []string               `json:"equipment_types"`
	MuscleGroups       []string               `json:"muscle_groups"`
	DifficultyLevels   []string               `json:"difficulty_levels"`
	Categories         map[string]int         `json:"categories"`
}

// Methods for WorkoutClientData
func (w *WorkoutClientData) CalculateBMI() float64 {
	heightInMeters := w.Height / 100
	return w.Weight / (heightInMeters * heightInMeters)
}

func (w *WorkoutClientData) GetBMICategory() string {
	bmi := w.CalculateBMI()
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

func (w *WorkoutClientData) GetActivityMultiplier() float64 {
	switch w.ActivityLevel {
	case "sedentary":
		return 1.2
	case "moderate":
		return 1.375
	case "active":
		return 1.55
	case "very_active":
		return 1.725
	default:
		return 1.375
	}
}

func (w *WorkoutClientData) CalculateBMR() float64 {
	// Mifflin-St Jeor Equation
	var bmr float64
	if w.Gender == "male" {
		bmr = 10*w.Weight + 6.25*w.Height - 5*float64(w.Age) + 5
	} else {
		bmr = 10*w.Weight + 6.25*w.Height - 5*float64(w.Age) - 161
	}
	return bmr
}

func (w *WorkoutClientData) CalculateTDEE() float64 {
	return w.CalculateBMR() * w.GetActivityMultiplier()
}
