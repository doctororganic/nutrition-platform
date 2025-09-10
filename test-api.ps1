# PowerShell script to test the Nutrition Platform API

Write-Host "Nutrition Platform API Test Script" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green

$baseUrl = "http://localhost:8081"

# Test if server is running
try {
    $healthCheck = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "✅ Server is running!" -ForegroundColor Green
    Write-Host "Server Status: $($healthCheck.data.status)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Server is not running. Please start the server first:" -ForegroundColor Red
    Write-Host "Run: .\setup.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Testing API endpoints..." -ForegroundColor Yellow

# Test 1: Register a new user
Write-Host ""
Write-Host "1. Registering a test user..." -ForegroundColor Cyan
$registerData = @{
    username = "testuser"
    email = "test@example.com"
    password = "TestPass123"
    confirm_password = "TestPass123"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body $registerData -ContentType "application/json"
    Write-Host "✅ User registered successfully!" -ForegroundColor Green
    Write-Host "User ID: $($registerResponse.data.id)" -ForegroundColor White
} catch {
    $errorResponse = $_.Exception.Response
    if ($errorResponse.StatusCode -eq 400) {
        Write-Host "⚠️ User might already exist, continuing with login..." -ForegroundColor Yellow
    } else {
        Write-Host "❌ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 2: Login
Write-Host ""
Write-Host "2. Logging in..." -ForegroundColor Cyan
$loginData = @{
    username = "testuser"
    password = "TestPass123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginData -ContentType "application/json"
    Write-Host "✅ Login successful!" -ForegroundColor Green
    $token = $loginResponse.data.token
    Write-Host "JWT Token received (first 50 chars): $($token.Substring(0, [Math]::Min(50, $token.Length)))..." -ForegroundColor White
} catch {
    Write-Host "❌ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Get user profile
Write-Host ""
Write-Host "3. Getting user profile..." -ForegroundColor Cyan
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

try {
    $profileResponse = Invoke-RestMethod -Uri "$baseUrl/auth/profile" -Method Get -Headers $headers
    Write-Host "✅ Profile retrieved!" -ForegroundColor Green
    Write-Host "Username: $($profileResponse.data.username)" -ForegroundColor White
    Write-Host "Email: $($profileResponse.data.email)" -ForegroundColor White
    Write-Host "Role: $($profileResponse.data.role)" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to get profile: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Get nutrition info
Write-Host ""
Write-Host "4. Getting nutrition information..." -ForegroundColor Cyan
try {
    $nutritionInfoResponse = Invoke-RestMethod -Uri "$baseUrl/api/nutrition-info" -Method Get -Headers $headers
    Write-Host "✅ Nutrition info retrieved!" -ForegroundColor Green
    Write-Host "Supported countries: $($nutritionInfoResponse.data.supported_countries -join ', ')" -ForegroundColor White
    Write-Host "Supported IF schedules: $($nutritionInfoResponse.data.supported_if_schedules -join ', ')" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to get nutrition info: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Calculate diet plan
Write-Host ""
Write-Host "5. Calculating diet plan..." -ForegroundColor Cyan
$dietData = @{
    age = 30
    weight = 70.0
    height = 175.0
    gender = "male"
    activity_level = "moderately_active"
    goal = "lose_weight"
    country = "saudi_arabia"
    if_schedule = "16_8"
    health_conditions = @()
    allergies = @()
} | ConvertTo-Json

try {
    $dietResponse = Invoke-RestMethod -Uri "$baseUrl/api/calculate-diet" -Method Post -Body $dietData -Headers $headers
    Write-Host "✅ Diet plan calculated!" -ForegroundColor Green
    Write-Host "BMR: $($dietResponse.data.bmr) calories" -ForegroundColor White
    Write-Host "TDEE: $($dietResponse.data.tdee) calories" -ForegroundColor White
    Write-Host "Target Calories: $($dietResponse.data.target_calories) calories" -ForegroundColor White
    Write-Host "Protein: $($dietResponse.data.macro_targets.protein_grams)g" -ForegroundColor White
    Write-Host "Carbs: $($dietResponse.data.macro_targets.carb_grams)g" -ForegroundColor White
    Write-Host "Fat: $($dietResponse.data.macro_targets.fat_grams)g" -ForegroundColor White
} catch {
    Write-Host "❌ Failed to calculate diet: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Admin login (optional)
Write-Host ""
Write-Host "6. Testing admin access..." -ForegroundColor Cyan
$adminLoginData = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $adminLoginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $adminLoginData -ContentType "application/json"
    $adminToken = $adminLoginResponse.data.token
    $adminHeaders = @{
        "Authorization" = "Bearer $adminToken"
        "Content-Type" = "application/json"
    }
    
    $usersResponse = Invoke-RestMethod -Uri "$baseUrl/admin/users" -Method Get -Headers $adminHeaders
    Write-Host "✅ Admin access working!" -ForegroundColor Green
    Write-Host "Total users in system: $($usersResponse.data.Count)" -ForegroundColor White
} catch {
    Write-Host "⚠️ Admin test skipped or failed: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 API testing completed!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now:" -ForegroundColor Cyan
Write-Host "- Visit http://localhost:8080/api for full API documentation" -ForegroundColor White
Write-Host "- Use Postman or curl to test additional endpoints" -ForegroundColor White
Write-Host "- Integrate with your frontend application" -ForegroundColor White
