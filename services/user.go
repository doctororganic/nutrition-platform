package services

import (
	"errors"
	"sync"
	"time"

	"doctorhealthy1/auth"
	"doctorhealthy1/models"
)

// UserService handles user-related operations
type UserService struct {
	users  map[string]*models.User // In-memory storage (use database in production)
	mutex  sync.RWMutex
	nextID uint
}

// NewUserService creates a new user service instance
func NewUserService() *UserService {
	service := &UserService{
		users:  make(map[string]*models.User),
		nextID: 1,
	}

	// Create a default admin user for testing
	adminPassword, _ := auth.HashPassword("admin123")
	admin := &models.User{
		ID:        service.nextID,
		Username:  "admin",
		Email:     "admin@nutrition-platform.com",
		Password:  adminPassword,
		Role:      models.Admin,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	service.users[admin.Username] = admin
	service.nextID++

	return service
}

// Register creates a new user account
func (us *UserService) Register(req *models.RegisterRequestLegacy) (*models.User, error) {
	us.mutex.Lock()
	defer us.mutex.Unlock()

	// Validate request
	if err := req.Validate(); err != nil {
		return nil, err
	}

	// Check if username already exists
	if _, exists := us.users[req.Username]; exists {
		return nil, errors.New("username already exists")
	}

	// Check if email already exists
	for _, user := range us.users {
		if user.Email == req.Email {
			return nil, errors.New("email already exists")
		}
	}

	// Hash password
	hashedPassword, err := auth.HashPassword(req.Password)
	if err != nil {
		return nil, errors.New("failed to hash password")
	}

	// Create new user
	user := &models.User{
		ID:        us.nextID,
		Username:  req.Username,
		Email:     req.Email,
		Password:  hashedPassword,
		Role:      models.RegularUser, // Default role
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	us.users[user.Username] = user
	us.nextID++

	return user, nil
}

// Login authenticates a user and returns a JWT token
func (us *UserService) Login(req *models.LoginRequestLegacy) (string, *models.User, error) {
	us.mutex.RLock()
	defer us.mutex.RUnlock()

	// Find user
	user, exists := us.users[req.Username]
	if !exists {
		return "", nil, errors.New("invalid username or password")
	}

	// Check password
	if !auth.CheckPassword(req.Password, user.Password) {
		return "", nil, errors.New("invalid username or password")
	}

	// Generate token
	token, err := auth.GenerateToken(user)
	if err != nil {
		return "", nil, errors.New("failed to generate token")
	}

	return token, user, nil
}

// GetUserByUsername retrieves a user by username
func (us *UserService) GetUserByUsername(username string) (*models.User, error) {
	us.mutex.RLock()
	defer us.mutex.RUnlock()

	user, exists := us.users[username]
	if !exists {
		return nil, errors.New("user not found")
	}

	return user, nil
}

// GetUserByID retrieves a user by ID
func (us *UserService) GetUserByID(id uint) (*models.User, error) {
	us.mutex.RLock()
	defer us.mutex.RUnlock()

	for _, user := range us.users {
		if user.ID == id {
			return user, nil
		}
	}

	return nil, errors.New("user not found")
}

// UpdateUser updates user information
func (us *UserService) UpdateUser(id uint, updates map[string]interface{}) (*models.User, error) {
	us.mutex.Lock()
	defer us.mutex.Unlock()

	// Find user
	var targetUser *models.User
	for _, user := range us.users {
		if user.ID == id {
			targetUser = user
			break
		}
	}

	if targetUser == nil {
		return nil, errors.New("user not found")
	}

	// Apply updates
	if email, ok := updates["email"].(string); ok {
		targetUser.Email = email
	}

	if role, ok := updates["role"].(models.Role); ok {
		targetUser.Role = role
	}

	targetUser.UpdatedAt = time.Now()

	return targetUser, nil
}

// DeleteUser removes a user account
func (us *UserService) DeleteUser(id uint) error {
	us.mutex.Lock()
	defer us.mutex.Unlock()

	// Find and delete user
	for username, user := range us.users {
		if user.ID == id {
			delete(us.users, username)
			return nil
		}
	}

	return errors.New("user not found")
}

// ListUsers returns all users (admin only)
func (us *UserService) ListUsers() []*models.User {
	us.mutex.RLock()
	defer us.mutex.RUnlock()

	users := make([]*models.User, 0, len(us.users))
	for _, user := range us.users {
		users = append(users, user)
	}

	return users
}

// ChangePassword changes a user's password
func (us *UserService) ChangePassword(id uint, oldPassword, newPassword string) error {
	us.mutex.Lock()
	defer us.mutex.Unlock()

	// Find user
	var targetUser *models.User
	for _, user := range us.users {
		if user.ID == id {
			targetUser = user
			break
		}
	}

	if targetUser == nil {
		return errors.New("user not found")
	}

	// Verify old password
	if !auth.CheckPassword(oldPassword, targetUser.Password) {
		return errors.New("invalid current password")
	}

	// Hash new password
	hashedPassword, err := auth.HashPassword(newPassword)
	if err != nil {
		return errors.New("failed to hash new password")
	}

	targetUser.Password = hashedPassword
	targetUser.UpdatedAt = time.Now()

	return nil
}
