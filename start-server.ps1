# Refined PowerShell script to start the Nutrition Platform
Write-Host "========================================" -ForegroundColor Green
Write-Host " Nutrition Platform API Server" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Refresh environment variables
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

# Check if Go is available
try {
    $goVersion = go version 2>$null
    Write-Host "✅ Go found: $goVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Go not found in PATH" -ForegroundColor Red
    Write-Host "Please install Go or restart your terminal after installation" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Building application..." -ForegroundColor Yellow
try {
    go build -o nutrition-platform.exe .
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed"
    }
    Write-Host "✅ Build successful!" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "🚀 Starting Nutrition Platform API server..." -ForegroundColor Green
Write-Host ""
Write-Host "Server will be available at:" -ForegroundColor Cyan
Write-Host "- Health Check: http://localhost:8081/health" -ForegroundColor White
Write-Host "- API Documentation: http://localhost:8081/api" -ForegroundColor White
Write-Host "- Default Admin: username=admin, password=admin123" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
try {
    .\nutrition-platform.exe
} catch {
    Write-Host "❌ Server failed to start: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit"
}
