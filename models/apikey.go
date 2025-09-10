package models

import (
	"crypto/rand"
	"encoding/hex"
	"time"
)

// APIKey represents an API key with metadata
type APIKey struct {
	ID          string    `json:"id"`
	Key         string    `json:"key"`
	Name        string    `json:"name"`
	UserID      string    `json:"user_id"`
	Permissions []string  `json:"permissions"`
	IsActive    bool      `json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	LastUsedAt  *time.Time `json:"last_used_at,omitempty"`
	ExpiresAt   *time.Time `json:"expires_at,omitempty"`
	RateLimit   int       `json:"rate_limit"` // requests per hour
	UsageCount  int       `json:"usage_count"`
}

// APIKeyRequest represents request to create API key
type APIKeyRequest struct {
	Name        string    `json:"name" validate:"required,min=3,max=50"`
	Permissions []string  `json:"permissions" validate:"required"`
	ExpiresAt   *time.Time `json:"expires_at,omitempty"`
	RateLimit   int       `json:"rate_limit" validate:"min=1,max=10000"`
}

// APIKeyResponse represents API key response (without sensitive data)
type APIKeyResponse struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Permissions []string  `json:"permissions"`
	IsActive    bool      `json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	LastUsedAt  *time.Time `json:"last_used_at,omitempty"`
	ExpiresAt   *time.Time `json:"expires_at,omitempty"`
	RateLimit   int       `json:"rate_limit"`
	UsageCount  int       `json:"usage_count"`
}

// Predefined permissions
var (
	PermissionReadNutrition = "nutrition:read"
	PermissionWriteNutrition = "nutrition:write"
	PermissionReadDiseases = "diseases:read"
	PermissionWriteDiseases = "diseases:write"
	PermissionReadInjuries = "injuries:read"
	PermissionWriteInjuries = "injuries:write"
	PermissionReadWorkouts = "workouts:read"
	PermissionWriteWorkouts = "workouts:write"
	PermissionReadMetabolism = "metabolism:read"
	PermissionWriteMetabolism = "metabolism:write"
	PermissionReadOldDiseases = "old_diseases:read"
	PermissionWriteOldDiseases = "old_diseases:write"
	PermissionReadWorkoutTechniques = "workout_techniques:read"
	PermissionWriteWorkoutTechniques = "workout_techniques:write"
	PermissionReadMealPlans = "meal_plans:read"
	PermissionWriteMealPlans = "meal_plans:write"
	PermissionReadCalories = "calories:read"
	PermissionWriteCalories = "calories:write"
	PermissionReadDrugNutrition = "drug_nutrition:read"
	PermissionWriteDrugNutrition = "drug_nutrition:write"
	PermissionReadVitaminsMinerals = "vitamins_minerals:read"
	PermissionWriteVitaminsMinerals = "vitamins_minerals:write"
	PermissionReadTypePlans = "type_plans:read"
	PermissionWriteTypePlans = "type_plans:write"
	PermissionReadWorkoutManagement = "workout_management:read"
	PermissionWriteWorkoutManagement = "workout_management:write"
	PermissionReadDiseaseManagement = "disease_management:read"
	PermissionWriteDiseaseManagement = "disease_management:write"
	PermissionAdmin = "admin:full"
)

// ValidPermissions list of all valid permissions
var ValidPermissions = []string{
	PermissionReadNutrition,
	PermissionWriteNutrition,
	PermissionReadDiseases,
	PermissionWriteDiseases,
	PermissionReadInjuries,
	PermissionWriteInjuries,
	PermissionReadWorkouts,
	PermissionWriteWorkouts,
	PermissionReadMetabolism,
	PermissionWriteMetabolism,
	PermissionReadOldDiseases,
	PermissionWriteOldDiseases,
	PermissionReadWorkoutTechniques,
	PermissionWriteWorkoutTechniques,
	PermissionReadMealPlans,
	PermissionWriteMealPlans,
	PermissionReadCalories,
	PermissionWriteCalories,
	PermissionReadDrugNutrition,
	PermissionWriteDrugNutrition,
	PermissionReadVitaminsMinerals,
	PermissionWriteVitaminsMinerals,
	PermissionReadTypePlans,
	PermissionWriteTypePlans,
	PermissionReadWorkoutManagement,
	PermissionWriteWorkoutManagement,
	PermissionReadDiseaseManagement,
	PermissionWriteDiseaseManagement,
	PermissionAdmin,
}

// GenerateAPIKey generates a secure random API key
func GenerateAPIKey() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return "nhp_" + hex.EncodeToString(bytes), nil
}

// IsExpired checks if the API key is expired
func (ak *APIKey) IsExpired() bool {
	if ak.ExpiresAt == nil {
		return false
	}
	return time.Now().After(*ak.ExpiresAt)
}

// HasPermission checks if the API key has a specific permission
func (ak *APIKey) HasPermission(permission string) bool {
	for _, perm := range ak.Permissions {
		if perm == permission || perm == PermissionAdmin {
			return true
		}
	}
	return false
}

// ToResponse converts APIKey to APIKeyResponse (removes sensitive data)
func (ak *APIKey) ToResponse() APIKeyResponse {
	return APIKeyResponse{
		ID:          ak.ID,
		Name:        ak.Name,
		Permissions: ak.Permissions,
		IsActive:    ak.IsActive,
		CreatedAt:   ak.CreatedAt,
		LastUsedAt:  ak.LastUsedAt,
		ExpiresAt:   ak.ExpiresAt,
		RateLimit:   ak.RateLimit,
		UsageCount:  ak.UsageCount,
	}
}

// RateLimitExceeded checks if rate limit is exceeded for the current hour
func (ak *APIKey) RateLimitExceeded() bool {
	// This is a simplified check - in production, you'd want to implement
	// a proper sliding window or token bucket algorithm
	return ak.UsageCount >= ak.RateLimit
}
