package models

import (
	"errors"
	"regexp"
	"time"

	"github.com/go-playground/validator/v10"
)

// Role represents user roles in the system
type Role int

const (
	Admin Role = iota
	RegularUser
)

// User represents an authenticated user
type User struct {
	ID        uint      `json:"id" db:"id"`
	Username  string    `json:"username" db:"username" validate:"required,min=3,max=50"`
	Email     string    `json:"email" db:"email" validate:"required,email"`
	Password  string    `json:"-" db:"password"`
	Role      Role      `json:"role" db:"role"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// HasRole checks if the user has the specified role
func (u *User) HasRole(role Role) bool {
	return u.Role == role || u.Role == Admin // Admin has access to everything
}

// Diet represents the diet calculation input
type Diet struct {
	UserID           uint     `json:"user_id"`
	Age              int      `json:"age" validate:"required,min=13,max=120"`
	Weight           float64  `json:"weight" validate:"required,min=30,max=300"`
	Height           float64  `json:"height" validate:"required,min=100,max=250"`
	Gender           string   `json:"gender" validate:"required,oneof=male female"`
	ActivityLevel    string   `json:"activity_level" validate:"required,oneof=sedentary lightly_active moderately_active very_active extremely_active"`
	Goal             string   `json:"goal" validate:"required,oneof=lose_weight maintain_weight gain_weight"`
	Country          string   `json:"country" validate:"required,oneof=saudi_arabia uae kuwait qatar bahrain oman"`
	IFSchedule       string   `json:"if_schedule" validate:"required,oneof=16_8 18_6 20_4 omad"`
	HealthConditions []string `json:"health_conditions,omitempty"`
	Allergies        []string `json:"allergies,omitempty"`
}

// Validate performs custom validation on Diet struct
func (d *Diet) Validate() error {
	validate := validator.New()

	// Basic struct validation
	if err := validate.Struct(d); err != nil {
		return err
	}

	// Custom validations
	if d.Age <= 0 {
		return errors.New("age must be a positive integer")
	}

	if d.Weight <= 0 {
		return errors.New("weight must be a positive number")
	}

	if d.Height <= 0 {
		return errors.New("height must be a positive number")
	}

	// Validate country code format
	countryRegex := regexp.MustCompile(`^[a-z_]+$`)
	if !countryRegex.MatchString(d.Country) {
		return errors.New("invalid country format")
	}

	// Validate health conditions (if provided)
	for _, condition := range d.HealthConditions {
		if len(condition) > 100 {
			return errors.New("health condition description too long")
		}
	}

	// Validate allergies (if provided)
	for _, allergy := range d.Allergies {
		if len(allergy) > 50 {
			return errors.New("allergy description too long")
		}
	}

	return nil
}

// DietResult represents the calculated diet plan result
type DietResult struct {
	UserID         uint                   `json:"user_id"`
	BMR            float64                `json:"bmr"`
	TDEE           float64                `json:"tdee"`
	TargetCalories float64                `json:"target_calories"`
	MacroTargets   MacroTargets           `json:"macro_targets"`
	MealPlan       map[string]interface{} `json:"meal_plan"`
	GeneratedAt    time.Time              `json:"generated_at"`
}

// MacroTargets represents macronutrient targets
type MacroTargets struct {
	ProteinGrams   float64 `json:"protein_grams"`
	CarbGrams      float64 `json:"carb_grams"`
	FatGrams       float64 `json:"fat_grams"`
	ProteinPercent float64 `json:"protein_percent"`
	CarbPercent    float64 `json:"carb_percent"`
	FatPercent     float64 `json:"fat_percent"`
}

// LoginRequest represents user login credentials (legacy - use LoginRequest from api_v1.go)
type LoginRequestLegacy struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

// RegisterRequest represents user registration data (legacy - use RegisterRequest from api_v1.go)
type RegisterRequestLegacy struct {
	Username        string `json:"username" validate:"required,min=3,max=50"`
	Email           string `json:"email" validate:"required,email"`
	Password        string `json:"password" validate:"required,min=8"`
	ConfirmPassword string `json:"confirm_password" validate:"required"`
}

// Validate performs validation on RegisterRequestLegacy
func (r *RegisterRequestLegacy) Validate() error {
	validate := validator.New()

	if err := validate.Struct(r); err != nil {
		return err
	}

	if r.Password != r.ConfirmPassword {
		return errors.New("passwords do not match")
	}

	// Password strength validation
	if len(r.Password) < 8 {
		return errors.New("password must be at least 8 characters long")
	}

	// Check for at least one uppercase, one lowercase, and one digit
	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(r.Password)
	hasLower := regexp.MustCompile(`[a-z]`).MatchString(r.Password)
	hasDigit := regexp.MustCompile(`\d`).MatchString(r.Password)

	if !hasUpper || !hasLower || !hasDigit {
		return errors.New("password must contain at least one uppercase letter, one lowercase letter, and one digit")
	}

	return nil
}

// APIResponse represents a standard API response
type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// Workout represents workout plan input (legacy - use Workout from api_v1.go)
type WorkoutLegacy struct {
	UserID     uint     `json:"user_id"`
	Name       string   `json:"name" validate:"required,min=2,max=100"`
	Age        int      `json:"age" validate:"required,min=13,max=120"`
	Weight     float64  `json:"weight" validate:"required,min=30,max=300"`
	Height     float64  `json:"height" validate:"required,min=100,max=250"`
	Gender     string   `json:"gender" validate:"required,oneof=male female"`
	Goal       string   `json:"goal" validate:"required,oneof=weight_loss muscle_gain endurance strength general"`
	Experience string   `json:"experience" validate:"oneof=beginner intermediate advanced"`
	Injuries   string   `json:"injuries,omitempty" validate:"max=500"`
	Equipment  []string `json:"equipment,omitempty"`
}

// Validate performs custom validation on WorkoutLegacy struct
func (w *WorkoutLegacy) Validate() error {
	validate := validator.New()

	// Basic struct validation
	if err := validate.Struct(w); err != nil {
		return err
	}

	// Custom validations
	if w.Age <= 0 {
		return errors.New("age must be a positive integer")
	}

	if w.Weight <= 0 {
		return errors.New("weight must be a positive number")
	}

	if w.Height <= 0 {
		return errors.New("height must be a positive number")
	}

	// Validate name format (letters, numbers, spaces, and common punctuation)
	nameRegex := regexp.MustCompile(`^[a-zA-Z\s\-'\.]+$`)
	if !nameRegex.MatchString(w.Name) {
		return errors.New("name contains invalid characters")
	}

	// Validate equipment list
	for _, item := range w.Equipment {
		if len(item) > 50 {
			return errors.New("equipment item name too long")
		}
	}

	return nil
}

// WorkoutResult represents the generated workout plan (legacy - use WorkoutResult from api_v1.go)
type WorkoutResultLegacy struct {
	UserID      uint                   `json:"user_id"`
	WeeklyPlan  map[string]interface{} `json:"weekly_plan"`
	Notes       []string               `json:"notes"`
	SafetyTips  []string               `json:"safety_tips"`
	GeneratedAt time.Time              `json:"generated_at"`
}

// PatientConsultation represents medical consultation input
type PatientConsultation struct {
	UserID         uint     `json:"user_id"`
	Name           string   `json:"name" validate:"required,min=2,max=100"`
	Age            int      `json:"age" validate:"required,min=13,max=120"`
	Weight         float64  `json:"weight" validate:"required,min=30,max=300"`
	Height         float64  `json:"height" validate:"required,min=100,max=250"`
	Gender         string   `json:"gender" validate:"required,oneof=male female"`
	PrimaryDisease string   `json:"primary_disease" validate:"required,oneof=diabetes hypertension heart_disease thyroid kidney liver"`
	Medications    []string `json:"medications,omitempty"`
	Symptoms       string   `json:"symptoms,omitempty" validate:"max=1000"`
	Duration       string   `json:"duration,omitempty" validate:"max=100"`
}

// Validate performs custom validation on PatientConsultation struct
func (p *PatientConsultation) Validate() error {
	validate := validator.New()

	// Basic struct validation
	if err := validate.Struct(p); err != nil {
		return err
	}

	// Custom validations
	if p.Age <= 0 {
		return errors.New("age must be a positive integer")
	}

	if p.Weight <= 0 {
		return errors.New("weight must be a positive number")
	}

	if p.Height <= 0 {
		return errors.New("height must be a positive number")
	}

	// Validate name format
	nameRegex := regexp.MustCompile(`^[a-zA-Z\s\-'\.]+$`)
	if !nameRegex.MatchString(p.Name) {
		return errors.New("name contains invalid characters")
	}

	// Validate medications list
	for _, med := range p.Medications {
		if len(med) > 100 {
			return errors.New("medication name too long")
		}
	}

	return nil
}

// ConsultationResult represents medical consultation response
type ConsultationResult struct {
	UserID          uint                   `json:"user_id"`
	Recommendations map[string]interface{} `json:"recommendations"`
	Warnings        []string               `json:"warnings"`
	FollowUp        string                 `json:"follow_up"`
	GeneratedAt     time.Time              `json:"generated_at"`
}
