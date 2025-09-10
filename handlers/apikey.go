package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
	"doctorhealthy1/services"
)

type APIKeyHandler struct {
	apiKeyService *services.APIKeyService
}

func NewAPIKeyHandler(apiKeyService *services.APIKeyService) *APIKeyHandler {
	return &APIKeyHandler{
		apiKeyService: apiKeyService,
	}
}

// CreateAPIKey handles API key creation
func (h *APIKeyHandler) CreateAPIKey(c echo.Context) error {
	// Only admin can create API keys
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	if !apiKey.HasPermission("admin:full") {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Admin permission required",
		})
	}

	var req models.APIKeyRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request body",
		})
	}

	newAPIKey, err := h.apiKeyService.CreateAPIKey(apiKey.UserID, req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to create API key: " + err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"api_key":     newAPIKey.Key,
			"id":          newAPIKey.ID,
			"name":        newAPIKey.Name,
			"permissions": newAPIKey.Permissions,
			"rate_limit":  newAPIKey.RateLimit,
			"expires_at":  newAPIKey.ExpiresAt,
		},
	})
}

// ListAPIKeys returns all API keys (without sensitive data)
func (h *APIKeyHandler) ListAPIKeys(c echo.Context) error {
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	if !apiKey.HasPermission("admin:full") {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Admin permission required",
		})
	}

	apiKeys := h.apiKeyService.ListAPIKeys()
	
	// Remove sensitive data
	sanitizedKeys := make([]map[string]interface{}, len(apiKeys))
	for i, key := range apiKeys {
		sanitizedKeys[i] = map[string]interface{}{
			"id":          key.ID,
			"name":        key.Name,
			"permissions": key.Permissions,
			"rate_limit":  key.RateLimit,
			"expires_at":  key.ExpiresAt,
			"is_active":   key.IsActive,
			"created_at":  key.CreatedAt,
			"last_used":   key.LastUsedAt,
			"usage_count": key.UsageCount,
			"key_preview": key.Key[:8] + "...", // Only show first 8 characters
		}
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    sanitizedKeys,
	})
}

// GetAPIKey returns specific API key details
func (h *APIKeyHandler) GetAPIKey(c echo.Context) error {
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	keyID := c.Param("id")
	
	// Users can view their own key, admins can view all
	if !apiKey.HasPermission("admin:full") && apiKey.ID != keyID {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Can only view your own API key",
		})
	}

	targetKey := h.apiKeyService.GetAPIKey(keyID)
	if targetKey == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "API key not found",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"id":          targetKey.ID,
			"name":        targetKey.Name,
			"permissions": targetKey.Permissions,
			"rate_limit":  targetKey.RateLimit,
			"expires_at":  targetKey.ExpiresAt,
			"is_active":   targetKey.IsActive,
			"created_at":  targetKey.CreatedAt,
			"last_used":   targetKey.LastUsedAt,
			"usage_count": targetKey.UsageCount,
			"key_preview": targetKey.Key[:8] + "...",
		},
	})
}

// RevokeAPIKey revokes an API key
func (h *APIKeyHandler) RevokeAPIKey(c echo.Context) error {
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	keyID := c.Param("id")
	
	// Users can revoke their own key, admins can revoke any
	if !apiKey.HasPermission("admin:full") && apiKey.ID != keyID {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Can only revoke your own API key",
		})
	}

	err := h.apiKeyService.RevokeAPIKey(apiKey.UserID, keyID)
	if err == nil {
		return c.JSON(http.StatusOK, models.APIResponse{
			Success: true,
			Message: "API key revoked successfully",
		})
	}

	return c.JSON(http.StatusNotFound, models.APIResponse{
		Success: false,
		Error:   "API key not found",
	})
}

// UpdateAPIKey updates API key settings
func (h *APIKeyHandler) UpdateAPIKey(c echo.Context) error {
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	keyID := c.Param("id")
	
	// Only admin can update API keys
	if !apiKey.HasPermission("admin:full") {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Admin permission required",
		})
	}

	var req struct {
		Name        *string  `json:"name"`
		Permissions []string `json:"permissions"`
		RateLimit   *int     `json:"rate_limit"`
		IsActive    *bool    `json:"is_active"`
	}

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request body",
		})
	}

	targetKey := h.apiKeyService.GetAPIKey(keyID)
	if targetKey == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "API key not found",
		})
	}

	// Update fields
	if req.Name != nil {
		targetKey.Name = *req.Name
	}
	if req.Permissions != nil {
		targetKey.Permissions = req.Permissions
	}
	if req.RateLimit != nil {
		targetKey.RateLimit = *req.RateLimit
	}
	if req.IsActive != nil {
		targetKey.IsActive = *req.IsActive
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "API key updated successfully",
		Data: map[string]interface{}{
			"id":          targetKey.ID,
			"name":        targetKey.Name,
			"permissions": targetKey.Permissions,
			"rate_limit":  targetKey.RateLimit,
			"is_active":   targetKey.IsActive,
		},
	})
}

// GetAPIKeyStats returns usage statistics
func (h *APIKeyHandler) GetAPIKeyStats(c echo.Context) error {
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	keyID := c.Param("id")
	
	// Users can view their own stats, admins can view all
	if !apiKey.HasPermission("admin:full") && apiKey.ID != keyID {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Can only view your own API key stats",
		})
	}

	targetKey := h.apiKeyService.GetAPIKey(keyID)
	if targetKey == nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "API key not found",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data: map[string]interface{}{
			"id":           targetKey.ID,
			"name":         targetKey.Name,
			"usage_count":  targetKey.UsageCount,
			"last_used":    targetKey.LastUsedAt,
			"rate_limit":   targetKey.RateLimit,
			"requests_remaining": targetKey.RateLimit - targetKey.UsageCount,
			"created_at":   targetKey.CreatedAt,
			"expires_at":   targetKey.ExpiresAt,
		},
	})
}

// ValidateAPIKey endpoint for testing
func (h *APIKeyHandler) ValidateAPIKey(c echo.Context) error {
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "API key is valid",
		Data: map[string]interface{}{
			"id":          apiKey.ID,
			"name":        apiKey.Name,
			"permissions": apiKey.Permissions,
			"rate_limit":  apiKey.RateLimit,
			"expires_at":  apiKey.ExpiresAt,
		},
	})
}
