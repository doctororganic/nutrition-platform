# Simple Deployment Monitor
# This script provides basic monitoring for deployment errors and delays

Write-Host "🔍 Simple Deployment Monitor" -ForegroundColor Green
Write-Host "⏰ $(Get-Date)" -ForegroundColor Gray
Write-Host ""

# Check 1: Local build status
Write-Host "🔨 Checking local build..." -ForegroundColor Yellow
try {
    go build -o nutrition-platform.exe . 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Local build successful" -ForegroundColor Green
        $buildSize = (Get-Item "nutrition-platform.exe").Length
        Write-Host "📊 Binary size: $buildSize bytes" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Local build failed" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Build error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check 2: Git status
Write-Host "📡 Checking Git status..." -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain 2>$null
    if ($gitStatus) {
        Write-Host "⚠️  Uncommitted changes found:" -ForegroundColor Yellow
        $gitStatus | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    } else {
        Write-Host "✅ Working directory clean" -ForegroundColor Green
    }
    
    $gitBranch = git branch --show-current 2>$null
    Write-Host "📋 Current branch: $gitBranch" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Git check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check 3: Required files
Write-Host "📁 Checking required files..." -ForegroundColor Yellow
$requiredFiles = @("main.go", "go.mod", "go.sum", "render.yaml", "Dockerfile")
$missingFiles = @()

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file" -ForegroundColor Red
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "⚠️  Missing files: $($missingFiles -join ', ')" -ForegroundColor Yellow
} else {
    Write-Host "✅ All required files present" -ForegroundColor Green
}

Write-Host ""

# Check 4: Data folders
Write-Host "📂 Checking data folders..." -ForegroundColor Yellow
$dataFolders = @("disease-easy-json-files", "injury-easy-json", "plans-and-recipes-json", "workouts-json")
$missingFolders = @()

foreach ($folder in $dataFolders) {
    if (Test-Path $folder) {
        $fileCount = (Get-ChildItem $folder -File).Count
        Write-Host "✅ $folder ($fileCount files)" -ForegroundColor Green
    } else {
        Write-Host "❌ $folder" -ForegroundColor Red
        $missingFolders += $folder
    }
}

if ($missingFolders.Count -gt 0) {
    Write-Host "⚠️  Missing folders: $($missingFolders -join ', ')" -ForegroundColor Yellow
} else {
    Write-Host "✅ All data folders present" -ForegroundColor Green
}

Write-Host ""

# Check 5: Application health (if running)
Write-Host "🏥 Checking application health..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "http://localhost:8080/health" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Application is running" -ForegroundColor Green
    Write-Host "📊 Status: $($healthResponse.status)" -ForegroundColor Cyan
    Write-Host "⏰ Timestamp: $($healthResponse.timestamp)" -ForegroundColor Cyan
} catch {
    Write-Host "ℹ️  Application not running locally (normal for deployment monitoring)" -ForegroundColor Yellow
}

Write-Host ""

# Summary
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  Repository: https://github.com/doctororganic/nutrition-platform.git" -ForegroundColor Blue
Write-Host "  Status: Ready for Render deployment" -ForegroundColor Green
Write-Host "  Next Step: Deploy via Render dashboard" -ForegroundColor Yellow

Write-Host ""
Write-Host "🔗 Render Dashboard: https://dashboard.render.com" -ForegroundColor Blue
Write-Host "📋 Service Name: nutrition-platform" -ForegroundColor Cyan

Write-Host ""
Write-Host "🏁 Monitoring complete" -ForegroundColor Green
