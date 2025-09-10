package middleware

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
	"doctorhealthy1/services"
)

// APIKeyMiddleware validates API keys
func APIKeyMiddleware(apiKeyService *services.APIKeyService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Extract API key from header
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return c.JSON(http.StatusUnauthorized, models.APIResponse{
					Success: false,
					Error:   "API key required",
				})
			}

			// Check if it starts with "Bearer " or "APIKey "
			var apiKey string
			if strings.HasPrefix(authHeader, "Bearer ") {
				apiKey = strings.TrimPrefix(authHeader, "Bearer ")
			} else if strings.HasPrefix(authHeader, "APIKey ") {
				apiKey = strings.TrimPrefix(authHeader, "APIKey ")
			} else {
				return c.JSON(http.StatusUnauthorized, models.APIResponse{
					Success: false,
					Error:   "Invalid authorization header format. Use 'Bearer <key>' or 'APIKey <key>'",
				})
			}

			// Validate API key
			validatedKey, err := apiKeyService.ValidateAPIKey(apiKey)
			if err != nil {
				return c.JSON(http.StatusUnauthorized, models.APIResponse{
					Success: false,
					Error:   "Invalid API key: " + err.Error(),
				})
			}

			// Store API key in context for later use
			c.Set("api_key", validatedKey)

			return next(c)
		}
	}
}

// RequireAPIPermission checks if the API key has required permission
func RequireAPIPermission(permission string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			apiKey, ok := c.Get("api_key").(*models.APIKey)
			if !ok {
				return c.JSON(http.StatusUnauthorized, models.APIResponse{
					Success: false,
					Error:   "API key not found in context",
				})
			}

			if !apiKey.HasPermission(permission) {
				return c.JSON(http.StatusForbidden, models.APIResponse{
					Success: false,
					Error:   "Insufficient permissions",
				})
			}

			return next(c)
		}
	}
}

// APIKeyOrJWTMiddleware allows either API key or JWT authentication
func APIKeyOrJWTMiddleware(apiKeyService *services.APIKeyService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return c.JSON(http.StatusUnauthorized, models.APIResponse{
					Success: false,
					Error:   "Authentication required",
				})
			}

			// Try API key first
			if strings.HasPrefix(authHeader, "APIKey ") {
				apiKey := strings.TrimPrefix(authHeader, "APIKey ")
				validatedKey, err := apiKeyService.ValidateAPIKey(apiKey)
				if err != nil {
					return c.JSON(http.StatusUnauthorized, models.APIResponse{
						Success: false,
						Error:   "Invalid API key: " + err.Error(),
					})
				}
				c.Set("api_key", validatedKey)
				c.Set("auth_type", "api_key")
				return next(c)
			}

			// Try JWT
			if strings.HasPrefix(authHeader, "Bearer ") {
				// Check if it's an API key or JWT
				token := strings.TrimPrefix(authHeader, "Bearer ")
				if strings.HasPrefix(token, "nhp_") {
					// It's an API key
					validatedKey, err := apiKeyService.ValidateAPIKey(token)
					if err != nil {
						return c.JSON(http.StatusUnauthorized, models.APIResponse{
							Success: false,
							Error:   "Invalid API key: " + err.Error(),
						})
					}
					c.Set("api_key", validatedKey)
					c.Set("auth_type", "api_key")
					return next(c)
				}
				
				// It's a JWT, let the existing JWT middleware handle it
				c.Set("auth_type", "jwt")
				// Continue to JWT validation
			}

			return c.JSON(http.StatusUnauthorized, models.APIResponse{
				Success: false,
				Error:   "Invalid authorization header format",
			})
		}
	}
}
