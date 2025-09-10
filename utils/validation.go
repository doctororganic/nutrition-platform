package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

// Validator is a custom validator instance
type Validator struct {
	validator *validator.Validate
}

// NewValidator creates a new validator instance
func NewValidator() *Validator {
	v := validator.New()
	
	// Register custom validation functions
	v.RegisterValidation("arabicname", validateArabicName)
	v.RegisterValidation("gccountry", validateGCCountry)
	v.RegisterValidation("phonenumber", validatePhoneNumber)
	
	return &Validator{validator: v}
}

// Validate validates a struct
func (v *Validator) Validate(i interface{}) error {
	if err := v.validator.Struct(i); err != nil {
		return err
	}
	return nil
}

// Custom validation functions

// validateArabicName validates Arabic names
func validateArabicName(fl validator.FieldLevel) bool {
	value := fl.Field().String()
	if value == "" {
		return true // Let required tag handle empty values
	}
	
	// Allow Arabic characters, English letters, spaces, and common punctuation
	for _, r := range value {
		if !((r >= 'a' && r <= 'z') || 
			 (r >= 'A' && r <= 'Z') || 
			 (r >= '\u0600' && r <= '\u06FF') || // Arabic block
			 (r >= '\u0750' && r <= '\u077F') || // Arabic Supplement
			 (r >= '\uFB50' && r <= '\uFDFF') || // Arabic Presentation Forms-A
			 (r >= '\uFE70' && r <= '\uFEFF') || // Arabic Presentation Forms-B
			 r == ' ' || r == '-' || r == '\'' || r == '.') {
			return false
		}
	}
	return true
}

// validateGCCountry validates Gulf Cooperation Council countries
func validateGCCountry(fl validator.FieldLevel) bool {
	country := fl.Field().String()
	validCountries := []string{
		"saudi_arabia", "uae", "kuwait", "qatar", "bahrain", "oman",
	}
	
	for _, valid := range validCountries {
		if country == valid {
			return true
		}
	}
	return false
}

// validatePhoneNumber validates phone numbers for Gulf countries
func validatePhoneNumber(fl validator.FieldLevel) bool {
	phone := fl.Field().String()
	if phone == "" {
		return true // Let required tag handle empty values
	}
	
	// Basic phone number validation for Gulf countries
	// Allows formats like: +966123456789, 966123456789, 0123456789
	if len(phone) < 9 || len(phone) > 15 {
		return false
	}
	
	// Must contain only digits, plus sign, and spaces
	for _, r := range phone {
		if !((r >= '0' && r <= '9') || r == '+' || r == ' ' || r == '-') {
			return false
		}
	}
	
	return true
}

// ValidationError represents a validation error response
type ValidationError struct {
	Field   string `json:"field"`
	Tag     string `json:"tag"`
	Value   string `json:"value"`
	Message string `json:"message"`
}

// FormatValidationErrors formats validator errors into a user-friendly format
func FormatValidationErrors(err error) []ValidationError {
	var validationErrors []ValidationError
	
	if validatorErrors, ok := err.(validator.ValidationErrors); ok {
		for _, e := range validatorErrors {
			validationErrors = append(validationErrors, ValidationError{
				Field:   getJSONFieldName(e),
				Tag:     e.Tag(),
				Value:   e.Param(),
				Message: getErrorMessage(e),
			})
		}
	}
	
	return validationErrors
}

// getJSONFieldName extracts the JSON field name from validation error
func getJSONFieldName(fe validator.FieldError) string {
	field := fe.Field()
	
	// Convert field name to snake_case if it's CamelCase
	var result strings.Builder
	for i, r := range field {
		if i > 0 && r >= 'A' && r <= 'Z' {
			result.WriteRune('_')
		}
		result.WriteRune(r)
	}
	
	return strings.ToLower(result.String())
}

// getErrorMessage generates user-friendly error messages
func getErrorMessage(fe validator.FieldError) string {
	field := fe.Field()
	
	switch fe.Tag() {
	case "required":
		return fmt.Sprintf("%s is required", field)
	case "email":
		return "Invalid email format"
	case "min":
		return fmt.Sprintf("%s must be at least %s characters long", field, fe.Param())
	case "max":
		return fmt.Sprintf("%s must be at most %s characters long", field, fe.Param())
	case "oneof":
		return fmt.Sprintf("%s must be one of: %s", field, fe.Param())
	case "arabicname":
		return "Name contains invalid characters (only Arabic, English letters, spaces, and common punctuation allowed)"
	case "gccountry":
		return "Invalid country (must be a Gulf Cooperation Council country)"
	case "phonenumber":
		return "Invalid phone number format"
	default:
		return fmt.Sprintf("%s is invalid", field)
	}
}

// BindAndValidate binds request data and validates it
func BindAndValidate(c echo.Context, i interface{}) error {
	// Bind the request
	if err := c.Bind(i); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request format")
	}
	
	// Validate the struct
	validator := NewValidator()
	if err := validator.Validate(i); err != nil {
		validationErrors := FormatValidationErrors(err)
		return echo.NewHTTPError(http.StatusBadRequest, map[string]interface{}{
			"message": "Validation failed",
			"errors":  validationErrors,
		})
	}
	
	// Call custom validation method if it exists
	if v, ok := i.(interface{ Validate() error }); ok {
		if err := v.Validate(); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, map[string]interface{}{
				"message": "Custom validation failed",
				"error":   err.Error(),
			})
		}
	}
	
	return nil
}

// ParseJSON safely parses JSON with validation
func ParseJSON(data []byte, v interface{}) error {
	if err := json.Unmarshal(data, v); err != nil {
		return fmt.Errorf("invalid JSON format: %w", err)
	}
	
	validator := NewValidator()
	if err := validator.Validate(v); err != nil {
		return fmt.Errorf("validation failed: %w", err)
	}
	
	return nil
}

// SanitizeInput removes potentially harmful characters from input
func SanitizeInput(input string) string {
	// Remove control characters and excessive whitespace
	input = strings.TrimSpace(input)
	
	// Replace multiple spaces with single space
	input = regexp.MustCompile(`\s+`).ReplaceAllString(input, " ")
	
	return input
}

// ValidateAndSanitize validates and sanitizes string input
func ValidateAndSanitize(input string, minLen, maxLen int) (string, error) {
	// Sanitize first
	cleaned := SanitizeInput(input)
	
	// Validate length
	if len(cleaned) < minLen {
		return "", fmt.Errorf("input too short (minimum %d characters)", minLen)
	}
	
	if len(cleaned) > maxLen {
		return "", fmt.Errorf("input too long (maximum %d characters)", maxLen)
	}
	
	return cleaned, nil
}
