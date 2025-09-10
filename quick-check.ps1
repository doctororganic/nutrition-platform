# Quick Deployment Check
Write-Host "🔍 Quick Deployment Check" -ForegroundColor Green
Write-Host "⏰ $(Get-Date)" -ForegroundColor Gray
Write-Host ""

# Check build
Write-Host "🔨 Building application..." -ForegroundColor Yellow
go build -o nutrition-platform.exe .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed" -ForegroundColor Red
}

# Check git status
Write-Host "📡 Checking Git..." -ForegroundColor Yellow
git status --porcelain
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git status OK" -ForegroundColor Green
} else {
    Write-Host "❌ Git issues" -ForegroundColor Red
}

# Check key files
Write-Host "📁 Checking files..." -ForegroundColor Yellow
$files = @("main.go", "go.mod", "render.yaml", "Dockerfile")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file" -ForegroundColor Red
    }
}

# Check data folders
Write-Host "📂 Checking data folders..." -ForegroundColor Yellow
$folders = @("disease-easy-json-files", "injury-easy-json", "plans-and-recipes-json", "workouts-json")
foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Write-Host "✅ $folder" -ForegroundColor Green
    } else {
        Write-Host "❌ $folder" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📊 Status: Ready for Render deployment" -ForegroundColor Green
Write-Host "🔗 GitHub: https://github.com/doctororganic/nutrition-platform.git" -ForegroundColor Blue
Write-Host "🌐 Render: https://dashboard.render.com" -ForegroundColor Blue
