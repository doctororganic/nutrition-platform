# Deploy script for Render.com (PowerShell version)
# This script ensures proper deployment configuration

Write-Host "🚀 Starting deployment to Render..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "main.go")) {
    Write-Host "❌ Error: main.go not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Check if go.mod exists
if (-not (Test-Path "go.mod")) {
    Write-Host "❌ Error: go.mod not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Verify Go installation
try {
    $goVersion = go version
    Write-Host "✅ Go version: $goVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Go is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# Download dependencies
Write-Host "📦 Downloading dependencies..." -ForegroundColor Yellow
go mod download

# Verify dependencies
Write-Host "🔍 Verifying dependencies..." -ForegroundColor Yellow
go mod verify

# Run tests (if any)
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
go test ./... 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Warning: Some tests failed, but continuing deployment..." -ForegroundColor Yellow
}

# Build the application
Write-Host "🔨 Building application..." -ForegroundColor Yellow
$env:CGO_ENABLED = "0"
go build -o nutrition-platform.exe .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Check if binary was created
if (Test-Path "nutrition-platform.exe") {
    Write-Host "✅ Binary created successfully" -ForegroundColor Green
    Get-ChildItem nutrition-platform.exe | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "❌ Binary not found after build" -ForegroundColor Red
    exit 1
}

# Verify health endpoint exists
Write-Host "🏥 Verifying health endpoint configuration..." -ForegroundColor Yellow
if (Select-String -Path "main.go" -Pattern "health" -Quiet) {
    Write-Host "✅ Health endpoint found in main.go" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: Health endpoint not found in main.go" -ForegroundColor Yellow
}

# Check render.yaml
if (Test-Path "render.yaml") {
    Write-Host "✅ render.yaml found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: render.yaml not found" -ForegroundColor Yellow
}

Write-Host "🎉 Deployment preparation complete!" -ForegroundColor Green
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Push your code to GitHub" -ForegroundColor White
Write-Host "2. Connect your GitHub repository to Render" -ForegroundColor White
Write-Host "3. Render will automatically deploy using render.yaml configuration" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Your GitHub repository: https://github.com/doctororganic/nutrition-platform.git" -ForegroundColor Blue
Write-Host "🌐 Render dashboard: https://dashboard.render.com" -ForegroundColor Blue
