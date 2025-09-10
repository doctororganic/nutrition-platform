package handlers

import (
	"net/http"
	"strconv"

	"doctorhealthy1/models"
	"doctorhealthy1/services"

	"github.com/labstack/echo/v4"
)

// AdminHandler handles admin-only endpoints
type AdminHandler struct {
	userService *services.UserService
}

// NewAdminHandler creates a new admin handler
func NewAdminHandler(userService *services.UserService) *AdminHandler {
	return &AdminHandler{
		userService: userService,
	}
}

// ListUsers returns all users (admin only)
func (ah *AdminHandler) ListUsers(c echo.Context) error {
	users := ah.userService.ListUsers()

	// Remove passwords from response
	for _, user := range users {
		user.Password = ""
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    users,
	})
}

// GetUser returns a specific user by ID (admin only)
func (ah *AdminHandler) GetUser(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid user ID",
		})
	}

	user, err := ah.userService.GetUserByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   "User not found",
		})
	}

	// Remove password from response
	user.Password = ""

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    user,
	})
}

// UpdateUser updates a user's information (admin only)
func (ah *AdminHandler) UpdateUser(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid user ID",
		})
	}

	var updates map[string]interface{}
	if err := c.Bind(&updates); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request data",
		})
	}

	updatedUser, err := ah.userService.UpdateUser(uint(id), updates)
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
		Message: "User updated successfully",
		Data:    updatedUser,
	})
}

// DeleteUser deletes a user account (admin only)
func (ah *AdminHandler) DeleteUser(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid user ID",
		})
	}

	// Prevent admin from deleting themselves
	currentUser := c.Get("user").(*models.User)
	if currentUser.ID == uint(id) {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Cannot delete your own account",
		})
	}

	err = ah.userService.DeleteUser(uint(id))
	if err != nil {
		return c.JSON(http.StatusNotFound, models.APIResponse{
			Success: false,
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Message: "User deleted successfully",
	})
}

// PromoteUser promotes a user to admin role
func (ah *AdminHandler) PromoteUser(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid user ID",
		})
	}

	updates := map[string]interface{}{
		"role": models.Admin,
	}

	updatedUser, err := ah.userService.UpdateUser(uint(id), updates)
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
		Message: "User promoted to admin successfully",
		Data:    updatedUser,
	})
}

// DemoteUser demotes an admin to regular user role
func (ah *AdminHandler) DemoteUser(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid user ID",
		})
	}

	// Prevent admin from demoting themselves
	currentUser := c.Get("user").(*models.User)
	if currentUser.ID == uint(id) {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Cannot demote your own account",
		})
	}

	updates := map[string]interface{}{
		"role": models.RegularUser,
	}

	updatedUser, err := ah.userService.UpdateUser(uint(id), updates)
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
		Message: "User demoted to regular user successfully",
		Data:    updatedUser,
	})
}
