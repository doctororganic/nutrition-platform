# PowerShell script to install Go and run the nutrition platform

Write-Host "Nutrition Platform Setup Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if Go is installed
$goInstalled = Get-Command go -ErrorAction SilentlyContinue
if (-not $goInstalled) {
    Write-Host "Go is not installed. Please install Go first:" -ForegroundColor Yellow
    Write-Host "1. Visit https://golang.org/dl/" -ForegroundColor Cyan
    Write-Host "2. Download Go for Windows" -ForegroundColor Cyan
    Write-Host "3. Run the installer" -ForegroundColor Cyan
    Write-Host "4. Restart PowerShell/Terminal" -ForegroundColor Cyan
    Write-Host "5. Run this script again" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: Install using Chocolatey (if you have it):" -ForegroundColor Yellow
    Write-Host "choco install golang" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Alternative: Install using winget:" -ForegroundColor Yellow
    Write-Host "winget install GoLang.Go" -ForegroundColor Cyan
    
    # Try to install using winget
    $wingetInstalled = Get-Command winget -ErrorAction SilentlyContinue
    if ($wingetInstalled) {
        $response = Read-Host "Would you like to try installing Go using winget? (y/N)"
        if ($response -eq "y" -or $response -eq "Y") {
            Write-Host "Installing Go using winget..." -ForegroundColor Yellow
            winget install GoLang.Go
            Write-Host "Please restart your terminal and run this script again." -ForegroundColor Yellow
        }
    }
    exit 1
}

Write-Host "Go is installed! Version:" -ForegroundColor Green
go version

# Change to project directory
Set-Location "d:\VS new healthy1"

Write-Host "Installing dependencies..." -ForegroundColor Yellow
go mod tidy

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Starting Nutrition Platform API server..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Once running, you can access:" -ForegroundColor Cyan
    Write-Host "- API Documentation: http://localhost:8080/api" -ForegroundColor Cyan
    Write-Host "- Health Check: http://localhost:8080/health" -ForegroundColor Cyan
    Write-Host "- Default Admin: username=admin, password=admin123" -ForegroundColor Cyan
    Write-Host ""
    
    # Run the server
    go run main.go
} else {
    Write-Host "Failed to install dependencies. Please check the error messages above." -ForegroundColor Red
}
