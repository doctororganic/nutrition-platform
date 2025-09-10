package services

import (
	"crypto/subtle"
	"errors"
	"fmt"
	"sync"
	"time"

	"doctorhealthy1/models"
)

// APIKeyService handles API key operations
type APIKeyService struct {
	apiKeys map[string]*models.APIKey
	mutex   sync.RWMutex
}

// NewAPIKeyService creates a new API key service
func NewAPIKeyService() *APIKeyService {
	service := &APIKeyService{
		apiKeys: make(map[string]*models.APIKey),
	}
	
	// Create default API keys for testing
	service.createDefaultAPIKeys()
	
	return service
}

// createDefaultAPIKeys creates some default API keys for testing
func (aks *APIKeyService) createDefaultAPIKeys() {
	defaultKeys := []struct {
		name        string
		permissions []string
		rateLimit   int
	}{
		{
			name: "Admin Full Access",
			permissions: []string{models.PermissionAdmin},
			rateLimit: 5000,
		},
		{
			name: "Nutrition Read Only",
			permissions: []string{
				models.PermissionReadNutrition,
				models.PermissionReadDiseases,
				models.PermissionReadInjuries,
			},
			rateLimit: 1000,
		},
		{
			name: "Medical Professional",
			permissions: []string{
				models.PermissionReadNutrition,
				models.PermissionWriteNutrition,
				models.PermissionReadDiseases,
				models.PermissionReadInjuries,
				models.PermissionReadWorkouts,
				models.PermissionReadMetabolism,
				models.PermissionReadOldDiseases,
				models.PermissionReadDrugNutrition,
				models.PermissionReadVitaminsMinerals,
			},
			rateLimit: 2000,
		},
		{
			name: "Fitness Trainer",
			permissions: []string{
				models.PermissionReadNutrition,
				models.PermissionReadWorkouts,
				models.PermissionWriteWorkouts,
				models.PermissionReadInjuries,
				models.PermissionReadWorkoutTechniques,
				models.PermissionReadMealPlans,
				models.PermissionReadCalories,
			},
			rateLimit: 1500,
		},
		{
			name: "Metabolism Specialist",
			permissions: []string{
				models.PermissionReadMetabolism,
				models.PermissionWriteMetabolism,
				models.PermissionReadNutrition,
				models.PermissionReadCalories,
			},
			rateLimit: 1200,
		},
		{
			name: "Disease Management Expert",
			permissions: []string{
				models.PermissionReadOldDiseases,
				models.PermissionWriteOldDiseases,
				models.PermissionReadDiseases,
				models.PermissionReadDrugNutrition,
				models.PermissionReadVitaminsMinerals,
			},
			rateLimit: 1800,
		},
		{
			name: "Nutrition & Supplements Expert",
			permissions: []string{
				models.PermissionReadDrugNutrition,
				models.PermissionWriteDrugNutrition,
				models.PermissionReadVitaminsMinerals,
				models.PermissionWriteVitaminsMinerals,
				models.PermissionReadNutrition,
				models.PermissionReadTypePlans,
				models.PermissionWriteTypePlans,
			},
			rateLimit: 1600,
		},
		{
			name: "Workout & Meal Planning Specialist",
			permissions: []string{
				models.PermissionReadWorkoutTechniques,
				models.PermissionWriteWorkoutTechniques,
				models.PermissionReadMealPlans,
				models.PermissionWriteMealPlans,
				models.PermissionReadCalories,
				models.PermissionReadWorkouts,
				models.PermissionReadWorkoutManagement,
				models.PermissionWriteWorkoutManagement,
			},
			rateLimit: 1400,
		},
		{
			name: "Disease Management Specialist",
			permissions: []string{
				models.PermissionReadDiseaseManagement,
				models.PermissionWriteDiseaseManagement,
				models.PermissionReadOldDiseases,
				models.PermissionReadDrugNutrition,
				models.PermissionReadVitaminsMinerals,
				models.PermissionReadDiseases,
			},
			rateLimit: 1200,
		},
	}

	for i, keyData := range defaultKeys {
		key, _ := models.GenerateAPIKey()
		apiKey := &models.APIKey{
			ID:          fmt.Sprintf("default-%d", i+1),
			Key:         key,
			Name:        keyData.name,
			UserID:      "system",
			Permissions: keyData.permissions,
			IsActive:    true,
			CreatedAt:   time.Now(),
			RateLimit:   keyData.rateLimit,
			UsageCount:  0,
		}
		aks.apiKeys[key] = apiKey
		
		// Log the generated keys for testing
		fmt.Printf("Generated API Key '%s': %s\n", keyData.name, key)
	}
}

// CreateAPIKey creates a new API key
func (aks *APIKeyService) CreateAPIKey(userID string, request models.APIKeyRequest) (*models.APIKey, error) {
	aks.mutex.Lock()
	defer aks.mutex.Unlock()

	// Validate permissions
	for _, perm := range request.Permissions {
		if !isValidPermission(perm) {
			return nil, fmt.Errorf("invalid permission: %s", perm)
		}
	}

	// Generate API key
	key, err := models.GenerateAPIKey()
	if err != nil {
		return nil, fmt.Errorf("failed to generate API key: %w", err)
	}

	// Create API key object
	apiKey := &models.APIKey{
		ID:          generateID(),
		Key:         key,
		Name:        request.Name,
		UserID:      userID,
		Permissions: request.Permissions,
		IsActive:    true,
		CreatedAt:   time.Now(),
		ExpiresAt:   request.ExpiresAt,
		RateLimit:   request.RateLimit,
		UsageCount:  0,
	}

	// Store API key
	aks.apiKeys[key] = apiKey

	return apiKey, nil
}

// ValidateAPIKey validates an API key and returns the associated API key object
func (aks *APIKeyService) ValidateAPIKey(keyString string) (*models.APIKey, error) {
	aks.mutex.Lock()
	defer aks.mutex.Unlock()

	// Find API key using constant-time comparison to prevent timing attacks
	var foundKey *models.APIKey
	for storedKey, apiKey := range aks.apiKeys {
		if subtle.ConstantTimeCompare([]byte(keyString), []byte(storedKey)) == 1 {
			foundKey = apiKey
			break
		}
	}

	if foundKey == nil {
		return nil, errors.New("invalid API key")
	}

	// Check if key is active
	if !foundKey.IsActive {
		return nil, errors.New("API key is inactive")
	}

	// Check if key is expired
	if foundKey.IsExpired() {
		return nil, errors.New("API key has expired")
	}

	// Check rate limit
	if foundKey.RateLimitExceeded() {
		return nil, errors.New("rate limit exceeded")
	}

	// Update usage
	foundKey.UsageCount++
	now := time.Now()
	foundKey.LastUsedAt = &now

	return foundKey, nil
}

// GetAPIKeys returns all API keys for a user
func (aks *APIKeyService) GetAPIKeys(userID string) []models.APIKeyResponse {
	aks.mutex.RLock()
	defer aks.mutex.RUnlock()

	var result []models.APIKeyResponse
	for _, apiKey := range aks.apiKeys {
		if apiKey.UserID == userID {
			result = append(result, apiKey.ToResponse())
		}
	}

	return result
}

// RevokeAPIKey revokes an API key
func (aks *APIKeyService) RevokeAPIKey(userID, keyID string) error {
	aks.mutex.Lock()
	defer aks.mutex.Unlock()

	for _, apiKey := range aks.apiKeys {
		if apiKey.ID == keyID && apiKey.UserID == userID {
			apiKey.IsActive = false
			// Optionally remove from map for complete deletion
			// delete(aks.apiKeys, key)
			return nil
		}
	}

	return errors.New("API key not found")
}

// GetAllAPIKeys returns all API keys (admin only)
func (aks *APIKeyService) GetAllAPIKeys() []models.APIKeyResponse {
	aks.mutex.RLock()
	defer aks.mutex.RUnlock()

	var result []models.APIKeyResponse
	for _, apiKey := range aks.apiKeys {
		result = append(result, apiKey.ToResponse())
	}

	return result
}

// ListAPIKeys returns all API keys as models.APIKey (for internal use)
func (aks *APIKeyService) ListAPIKeys() []*models.APIKey {
	aks.mutex.RLock()
	defer aks.mutex.RUnlock()

	var keys []*models.APIKey
	for _, apiKey := range aks.apiKeys {
		keys = append(keys, apiKey)
	}
	return keys
}

// GetAPIKey returns a specific API key by ID
func (aks *APIKeyService) GetAPIKey(keyID string) *models.APIKey {
	aks.mutex.RLock()
	defer aks.mutex.RUnlock()

	for _, apiKey := range aks.apiKeys {
		if apiKey.ID == keyID {
			return apiKey
		}
	}
	return nil
}

// ResetUsageCount resets usage count for rate limiting (called hourly)
func (aks *APIKeyService) ResetUsageCount() {
	aks.mutex.Lock()
	defer aks.mutex.Unlock()

	for _, apiKey := range aks.apiKeys {
		apiKey.UsageCount = 0
	}
}

// Helper functions

func isValidPermission(permission string) bool {
	for _, validPerm := range models.ValidPermissions {
		if permission == validPerm {
			return true
		}
	}
	return false
}

func generateID() string {
	return fmt.Sprintf("ak_%d", time.Now().UnixNano())
}
