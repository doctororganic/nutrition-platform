package handlers

import (
	"net/http"

	"doctorhealthy1/models"
	"doctorhealthy1/services"
	"doctorhealthy1/utils"

	"github.com/labstack/echo/v4"
)

// AuthHandler handles authentication-related endpoints
type AuthHandler struct {
	userService *services.UserService
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler(userService *services.UserService) *AuthHandler {
	return &AuthHandler{
		userService: userService,
	}
}

// Register handles user registration
func (ah *AuthHandler) Register(c echo.Context) error {
	var req models.RegisterRequestLegacy

	// Bind and validate request
	if err := utils.BindAndValidate(c, &req); err != nil {
		return err
	}

	user, err := ah.userService.Register(&req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	// Remove password from response
	user.Password = ""

	return c.JSON(http.StatusCreated, models.APIResponse{
		Success: true,
		Message: "User registered successfully",
		Data:    user,
	})
}

// Login handles user authentication
func (ah *AuthHandler) Login(c echo.Context) error {
	var req models.LoginRequestLegacy

	// Bind and validate request
	if err := utils.BindAndValidate(c, &req); err != nil {
		return err
	}

	token, user, err := ah.userService.Login(&req)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	// Remove password from response
	user.Password = ""

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Login successful",
		Data: map[string]interface{}{
			"token": token,
			"user":  user,
		},
	})
}

// GetProfile returns the current user's profile
func (ah *AuthHandler) GetProfile(c echo.Context) error {
	user := c.Get("user").(*models.User)

	// Fetch full user details
	fullUser, err := ah.userService.GetUserByID(user.ID)
	if err != nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "User not found",
		})
	}

	// Remove password from response
	fullUser.Password = ""

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    fullUser,
	})
}

// UpdateProfile updates the current user's profile
func (ah *AuthHandler) UpdateProfile(c echo.Context) error {
	user := c.Get("user").(*models.User)

	var updates map[string]interface{}
	if err := c.Bind(&updates); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request data",
		})
	}

	updatedUser, err := ah.userService.UpdateUser(user.ID, updates)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	// Remove password from response
	updatedUser.Password = ""

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Profile updated successfully",
		Data:    updatedUser,
	})
}

// ChangePassword changes the current user's password
func (ah *AuthHandler) ChangePassword(c echo.Context) error {
	user := c.Get("user").(*models.User)

	var req struct {
		CurrentPassword string `json:"current_password" validate:"required"`
		NewPassword     string `json:"new_password" validate:"required,min=8"`
	}

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request data",
		})
	}

	err := ah.userService.ChangePassword(user.ID, req.CurrentPassword, req.NewPassword)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "Password changed successfully",
	})
}
