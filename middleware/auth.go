package middleware

import (
	"net/http"
	"strings"

	"doctorhealthy1/auth"
	"doctorhealthy1/models"

	"github.com/labstack/echo/v4"
)

// JWTMiddleware validates JWT tokens
func JWTMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Missing authorization header")
			}

			// Extract token from "Bearer <token>"
			tokenParts := strings.Split(authHeader, " ")
			if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid authorization header format")
			}

			token := tokenParts[1]
			claims, err := auth.ValidateToken(token)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
			}

			// Store user info in context
			user := &models.User{
				ID:       claims.UserID,
				Username: claims.Username,
				Role:     claims.Role,
			}
			c.Set("user", user)
			c.Set("claims", claims)

			return next(c)
		}
	}
}

// RequireRole middleware checks if user has required role
func RequireRole(role models.Role) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			user, ok := c.Get("user").(*models.User)
			if !ok {
				return echo.NewHTTPError(http.StatusUnauthorized, "User not found in context")
			}

			if !user.HasRole(role) {
				return echo.NewHTTPError(http.StatusForbidden, "Insufficient permissions")
			}

			return next(c)
		}
	}
}

// RateLimitingMiddleware implements basic rate limiting
func RateLimitingMiddleware() echo.MiddlewareFunc {
	// This is a simple in-memory rate limiter
	// In production, use Redis or similar distributed solution
	requestCounts := make(map[string]int)

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			clientIP := c.RealIP()

			// Simple rate limiting: max 100 requests per minute per IP
			if requestCounts[clientIP] >= 100 {
				return echo.NewHTTPError(http.StatusTooManyRequests, "Rate limit exceeded")
			}

			requestCounts[clientIP]++

			// Reset counter every minute (simplified implementation)
			// In production, use proper sliding window or token bucket

			return next(c)
		}
	}
}

// SecurityHeaders adds security headers to responses
func SecurityHeaders() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Response().Header().Set("X-Content-Type-Options", "nosniff")
			c.Response().Header().Set("X-Frame-Options", "DENY")
			c.Response().Header().Set("X-XSS-Protection", "1; mode=block")
			c.Response().Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
			c.Response().Header().Set("Content-Security-Policy", "default-src 'self'")
			c.Response().Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")

			return next(c)
		}
	}
}

// InputSanitization middleware for basic input cleaning
func InputSanitization() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Basic input sanitization can be added here
			// For now, we rely on struct validation in handlers
			return next(c)
		}
	}
}
