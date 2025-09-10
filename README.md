# Nutrition Platform API

A secure Go backend for a nutrition platform with intermittent fasting support for Arabian Gulf countries.

## Features

- **🔐 Secure Authentication**: JWT-based authentication with password hashing
- **👥 Role-Based Authorization**: Admin and User roles with granular permissions
- **🥗 Nutrition Calculations**: BMR, TDEE, and personalized diet plans
- **⏰ Intermittent Fasting**: Support for 16:8, 18:6, 20:4, and OMAD schedules
- **🌍 Regional Support**: Meal plans for Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman
- **✅ Input Validation**: Comprehensive validation and sanitization
- **🛡️ Security Headers**: Protection against common web vulnerabilities
- **📊 Rate Limiting**: Built-in rate limiting for API protection

## Security Measures Implemented

### 1. Input Validation
- Struct-level validation using `go-playground/validator`
- Custom validation functions for business logic
- Regex patterns for format validation
- Sanitization of user inputs

### 2. Authentication
- JWT (JSON Web Tokens) with expiration
- Secure password hashing using bcrypt
- Token-based stateless authentication
- Proper token validation and parsing

### 3. Authorization
- Role-based access control (RBAC)
- Granular permissions for different endpoints
- Admin and User role separation
- Protection against privilege escalation

### 4. Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security
- Content-Security-Policy
- Referrer-Policy

### 5. Rate Limiting
- Request throttling per IP address
- Protection against brute force attacks
- Configurable limits

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (authenticated)
- `PUT /auth/profile` - Update user profile (authenticated)
- `POST /auth/change-password` - Change password (authenticated)

### Nutrition
- `POST /api/calculate-diet` - Calculate diet plan (authenticated)
- `GET /api/nutrition-info` - Get nutrition information (authenticated)
- `POST /api/validate-diet` - Validate diet input (authenticated)

### Admin
- `GET /admin/users` - List all users (admin only)
- `GET /admin/users/:id` - Get specific user (admin only)
- `PUT /admin/users/:id` - Update user (admin only)
- `DELETE /admin/users/:id` - Delete user (admin only)
- `POST /admin/users/:id/promote` - Promote to admin (admin only)
- `POST /admin/users/:id/demote` - Demote to user (admin only)

### General
- `GET /health` - Health check
- `GET /api` - API documentation

## Quick Start

### Prerequisites
- Go 1.21 or higher
- Git

### Installation

1. **Clone and setup:**
   ```bash
   cd "d:\VS new healthy1"
   ```

2. **Install dependencies:**
   ```bash
   go mod tidy
   ```

3. **Run the server:**
   ```bash
   go run main.go
   ```

4. **Access the API:**
   - Server: http://localhost:8080
   - Documentation: http://localhost:8080/api
   - Health check: http://localhost:8080/health

### Default Admin Account
- Username: `admin`
- Password: `admin123`

## Usage Examples

### 1. Register a new user
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePass123",
    "confirm_password": "SecurePass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "SecurePass123"
  }'
```

### 3. Calculate diet plan (requires authentication)
```bash
curl -X POST http://localhost:8080/api/calculate-diet \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "age": 30,
    "weight": 70,
    "height": 175,
    "gender": "male",
    "activity_level": "moderately_active",
    "goal": "lose_weight",
    "country": "saudi_arabia",
    "if_schedule": "16_8",
    "health_conditions": [],
    "allergies": []
  }'
```

## Project Structure

```
├── main.go              # Application entry point
├── go.mod              # Go module dependencies
├── models/             # Data models and validation
│   └── models.go
├── auth/               # Authentication utilities
│   └── jwt.go
├── middleware/         # HTTP middleware
│   └── auth.go
├── services/           # Business logic
│   ├── nutrition.go
│   └── user.go
├── handlers/           # HTTP handlers
│   ├── auth.go
│   ├── nutrition.go
│   └── admin.go
└── Nutrition.js.Json   # Nutrition data
```

## Security Best Practices

1. **Change the JWT secret**: Update `JWTSecret` in production
2. **Use HTTPS**: Always use TLS in production
3. **Environment variables**: Store sensitive config in env vars
4. **Database**: Replace in-memory storage with a proper database
5. **Logging**: Implement comprehensive logging for security monitoring
6. **Input limits**: Add request size limits
7. **CORS**: Configure CORS properly for your frontend domains

## Configuration

### Environment Variables (Recommended for production)
```bash
export JWT_SECRET="your-super-secret-jwt-key"
export PORT="8080"
export DB_CONNECTION_STRING="your-database-connection"
```

## Dependencies

- **Echo v4**: Web framework
- **JWT v5**: JSON Web Tokens
- **bcrypt**: Password hashing
- **validator v10**: Input validation

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api` endpoint
- Review the health check at `/health` endpoint
