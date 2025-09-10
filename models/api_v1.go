package models

import (
	"encoding/json"
	"time"
)

// RFC 7807 Problem Details for HTTP APIs
type ProblemDetails struct {
	Type     string                 `json:"type"`
	Title    string                 `json:"title"`
	Status   int                    `json:"status"`
	Detail   string                 `json:"detail,omitempty"`
	Instance string                 `json:"instance,omitempty"`
	Extra    map[string]interface{} `json:"-"`
}

// MarshalJSON implements custom marshaling to include extra fields
func (p ProblemDetails) MarshalJSON() ([]byte, error) {
	type Alias ProblemDetails
	aux := struct {
		Alias
	}{
		Alias: Alias(p),
	}
	
	// Convert to map and add extra fields
	b, err := json.Marshal(aux)
	if err != nil {
		return nil, err
	}
	
	var m map[string]interface{}
	if err := json.Unmarshal(b, &m); err != nil {
		return nil, err
	}
	
	// Add extra fields
	for k, v := range p.Extra {
		m[k] = v
	}
	
	return json.Marshal(m)
}

// Standard API Response for successful operations
type APIResponseV1 struct {
	Data      interface{} `json:"data,omitempty"`
	Meta      *Meta       `json:"meta,omitempty"`
	Links     *Links      `json:"links,omitempty"`
	Timestamp time.Time   `json:"timestamp"`
}

type Meta struct {
	Page       int `json:"page,omitempty"`
	PerPage    int `json:"per_page,omitempty"`
	Total      int `json:"total,omitempty"`
	TotalPages int `json:"total_pages,omitempty"`
}

type Links struct {
	Self  string `json:"self,omitempty"`
	Next  string `json:"next,omitempty"`
	Prev  string `json:"prev,omitempty"`
	First string `json:"first,omitempty"`
	Last  string `json:"last,omitempty"`
}

// Health Check Response
type HealthResponse struct {
	Status      string            `json:"status"`
	Version     string            `json:"version"`
	Environment string            `json:"environment"`
	Timestamp   time.Time         `json:"timestamp"`
	Services    map[string]string `json:"services"`
	Uptime      string            `json:"uptime"`
}

// Authentication Responses
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
}

type LoginResponse struct {
	Token        string    `json:"token"`
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
	User         UserInfo  `json:"user"`
}

type UserInfo struct {
	ID       string `json:"id"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Role     string `json:"role"`
	Verified bool   `json:"verified"`
}

// Registration Request
type RegisterRequest struct {
	Name     string `json:"name" validate:"required,min=2,max=50"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

// Carb Cycling Request/Response
type CarbCyclingRequest struct {
	Age               int                `json:"age" validate:"required,min=16,max=100"`
	Weight            float64            `json:"weight" validate:"required,min=30,max=300"`
	Height            float64            `json:"height" validate:"required,min=120,max=250"`
	Gender            string             `json:"gender" validate:"required,oneof=male female"`
	ActivityLevel     string             `json:"activity_level" validate:"required"`
	Goal              string             `json:"goal" validate:"required"`
	MedicalConditions []string           `json:"medical_conditions"`
	Preferences       UserPreferences    `json:"preferences"`
	WorkoutSchedule   map[string]Workout `json:"workout_schedule"`
}

type UserPreferences struct {
	Cuisine   string   `json:"cuisine"`
	Allergies []string `json:"allergies"`
	Halal     bool     `json:"halal"`
	Vegetarian bool    `json:"vegetarian"`
}

type Workout struct {
	Intensity string `json:"intensity" validate:"oneof=low moderate high"`
	Duration  int    `json:"duration"` // minutes
}

type NutritionPlanResponse struct {
	ID              string                 `json:"id"`
	PlanType        string                 `json:"plan_type"`
	CycleType       string                 `json:"cycle_type"`
	TargetCalories  float64                `json:"target_calories"`
	Macros          map[string]interface{} `json:"macros"`
	WaterIntake     WaterIntakeInfo        `json:"water_intake"`
	MealPlans       map[string]interface{} `json:"meal_plans"`
	Recommendations []string               `json:"recommendations"`
	CreatedAt       time.Time              `json:"created_at"`
	ValidUntil      time.Time              `json:"valid_until"`
}

type WaterIntakeInfo struct {
	DailyML      float64 `json:"daily_ml"`
	DailyCups    int     `json:"daily_cups"`
	Recommendation string `json:"recommendation"`
}

// Error Types for RFC 7807
const (
	ProblemTypeValidation      = "https://api.nutrition-platform.com/problems/validation-error"
	ProblemTypeAuthentication  = "https://api.nutrition-platform.com/problems/authentication-error"
	ProblemTypeAuthorization   = "https://api.nutrition-platform.com/problems/authorization-error"
	ProblemTypeNotFound        = "https://api.nutrition-platform.com/problems/not-found"
	ProblemTypeRateLimit       = "https://api.nutrition-platform.com/problems/rate-limit"
	ProblemTypeServerError     = "https://api.nutrition-platform.com/problems/server-error"
	ProblemTypeUnavailable     = "https://api.nutrition-platform.com/problems/service-unavailable"
)

// Helper functions for creating standard problem responses
func NewValidationProblem(detail string, instance string, errors map[string]interface{}) ProblemDetails {
	p := ProblemDetails{
		Type:     ProblemTypeValidation,
		Title:    "Validation Error",
		Status:   422,
		Detail:   detail,
		Instance: instance,
		Extra:    make(map[string]interface{}),
	}
	if errors != nil {
		p.Extra["errors"] = errors
	}
	return p
}

func NewAuthenticationProblem(detail string, instance string) ProblemDetails {
	return ProblemDetails{
		Type:     ProblemTypeAuthentication,
		Title:    "Authentication Required",
		Status:   401,
		Detail:   detail,
		Instance: instance,
	}
}

func NewAuthorizationProblem(detail string, instance string) ProblemDetails {
	return ProblemDetails{
		Type:     ProblemTypeAuthorization,
		Title:    "Insufficient Permissions",
		Status:   403,
		Detail:   detail,
		Instance: instance,
	}
}

func NewNotFoundProblem(detail string, instance string) ProblemDetails {
	return ProblemDetails{
		Type:     ProblemTypeNotFound,
		Title:    "Resource Not Found",
		Status:   404,
		Detail:   detail,
		Instance: instance,
	}
}

func NewRateLimitProblem(detail string, instance string, retryAfter int) ProblemDetails {
	p := ProblemDetails{
		Type:     ProblemTypeRateLimit,
		Title:    "Rate Limit Exceeded",
		Status:   429,
		Detail:   detail,
		Instance: instance,
		Extra:    make(map[string]interface{}),
	}
	if retryAfter > 0 {
		p.Extra["retry_after"] = retryAfter
	}
	return p
}

func NewServerErrorProblem(detail string, instance string) ProblemDetails {
	return ProblemDetails{
		Type:     ProblemTypeServerError,
		Title:    "Internal Server Error",
		Status:   500,
		Detail:   detail,
		Instance: instance,
	}
}
