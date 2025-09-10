# Script to rename folders to be Docker-compatible
# This script renames folders with spaces to use hyphens instead

Write-Host "🔄 Renaming folders to be Docker-compatible..." -ForegroundColor Yellow

# Check if we're in the right directory
if (-not (Test-Path "main.go")) {
    Write-Host "❌ Error: main.go not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Rename folders
$folders = @(
    @{Old = "disease easy json files"; New = "disease-easy-json-files"},
    @{Old = "injury easy json"; New = "injury-easy-json"},
    @{Old = "plans and recipes json"; New = "plans-and-recipes-json"},
    @{Old = "workouts json"; New = "workouts-json"}
)

foreach ($folder in $folders) {
    if (Test-Path $folder.Old) {
        Write-Host "📁 Renaming '$($folder.Old)' to '$($folder.New)'..." -ForegroundColor Cyan
        Rename-Item -Path $folder.Old -NewName $folder.New
        Write-Host "✅ Successfully renamed '$($folder.Old)' to '$($folder.New)'" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Folder '$($folder.Old)' not found, skipping..." -ForegroundColor Yellow
    }
}

Write-Host "🎉 Folder renaming complete!" -ForegroundColor Green
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Test the application locally" -ForegroundColor White
Write-Host "2. Commit the changes" -ForegroundColor White
Write-Host "3. Push to GitHub" -ForegroundColor White
Write-Host "4. Deploy to Render" -ForegroundColor White
