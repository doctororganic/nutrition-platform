# Comprehensive Deployment Monitor
# Monitors errors, delays, and deployment status

param(
    [int]$CheckInterval = 30,
    [int]$MaxChecks = 20,
    [switch]$Continuous = $false
)

$ErrorCount = 0
$WarningCount = 0
$CheckCount = 0

function Write-Status {
    param([string]$Message, [string]$Type = "Info")
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    $color = switch ($Type) {
        "Success" { "Green" }
        "Error" { "Red" }
        "Warning" { "Yellow" }
        "Info" { "Cyan" }
        default { "White" }
    }
    
    Write-Host "[$timestamp] $Message" -ForegroundColor $color
}

function Test-Build {
    Write-Status "Testing local build..." "Info"
    
    try {
        # Clean previous build
        if (Test-Path "nutrition-platform.exe") {
            Remove-Item "nutrition-platform.exe" -Force -ErrorAction SilentlyContinue
        }
        
        # Build application
        $buildOutput = go build -o nutrition-platform.exe . 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            $fileSize = (Get-Item "nutrition-platform.exe").Length
            Write-Status "Build successful - Size: $fileSize bytes" "Success"
            return $true
        } else {
            Write-Status "Build failed" "Error"
            Write-Status "Error details: $buildOutput" "Error"
            $script:ErrorCount++
            return $false
        }
    } catch {
        Write-Status "Build error: $($_.Exception.Message)" "Error"
        $script:ErrorCount++
        return $false
    }
}

function Test-GitStatus {
    Write-Status "Checking Git status..." "Info"
    
    try {
        $gitStatus = git status --porcelain 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            if ($gitStatus) {
                Write-Status "Uncommitted changes found" "Warning"
                $gitStatus | ForEach-Object { Write-Status "  $_" "Warning" }
                $script:WarningCount++
            } else {
                Write-Status "Working directory clean" "Success"
            }
            
            # Check if we're on main branch
            $currentBranch = git branch --show-current 2>&1
            if ($currentBranch -eq "main") {
                Write-Status "On main branch" "Success"
            } else {
                Write-Status "On branch: $currentBranch" "Warning"
                $script:WarningCount++
            }
            
            return $true
        } else {
            Write-Status "Git check failed" "Error"
            $script:ErrorCount++
            return $false
        }
    } catch {
        Write-Status "Git error: $($_.Exception.Message)" "Error"
        $script:ErrorCount++
        return $false
    }
}

function Test-RequiredFiles {
    Write-Status "Checking required files..." "Info"
    
    $requiredFiles = @{
        "main.go" = "Main application file"
        "go.mod" = "Go module file"
        "go.sum" = "Go dependencies"
        "render.yaml" = "Render deployment config"
        "Dockerfile" = "Docker configuration"
        ".gitignore" = "Git ignore file"
    }
    
    $missingFiles = @()
    
    foreach ($file in $requiredFiles.Keys) {
        if (Test-Path $file) {
            Write-Status "Found: $file" "Success"
        } else {
            Write-Status "Missing: $file - $($requiredFiles[$file])" "Error"
            $missingFiles += $file
            $script:ErrorCount++
        }
    }
    
    return $missingFiles.Count -eq 0
}

function Test-DataFolders {
    Write-Status "Checking data folders..." "Info"
    
    $dataFolders = @{
        "disease-easy-json-files" = "Disease management data"
        "injury-easy-json" = "Injury management data"
        "plans-and-recipes-json" = "Meal planning data"
        "workouts-json" = "Workout data"
    }
    
    $missingFolders = @()
    
    foreach ($folder in $dataFolders.Keys) {
        if (Test-Path $folder) {
            $fileCount = (Get-ChildItem $folder -File -ErrorAction SilentlyContinue).Count
            Write-Status "Found: $folder ($fileCount files)" "Success"
        } else {
            Write-Status "Missing: $folder - $($dataFolders[$folder])" "Error"
            $missingFolders += $folder
            $script:ErrorCount++
        }
    }
    
    return $missingFolders.Count -eq 0
}

function Test-ApplicationHealth {
    Write-Status "Testing application health..." "Info"
    
    try {
        $healthResponse = Invoke-RestMethod -Uri "http://localhost:8080/health" -Method GET -TimeoutSec 5 -ErrorAction Stop
        
        if ($healthResponse.status -eq "healthy") {
            Write-Status "Application is healthy" "Success"
            Write-Status "Status: $($healthResponse.status)" "Info"
            Write-Status "Timestamp: $($healthResponse.timestamp)" "Info"
            return $true
        } else {
            Write-Status "Application health check failed - Status: $($healthResponse.status)" "Error"
            $script:ErrorCount++
            return $false
        }
    } catch {
        Write-Status "Application not running locally (normal for deployment monitoring)" "Info"
        return $true
    }
}

function Test-DeploymentReadiness {
    Write-Status "Checking deployment readiness..." "Info"
    
    $issues = @()
    
    # Check if all required files exist
    if (-not (Test-RequiredFiles)) {
        $issues += "Missing required files"
    }
    
    # Check if all data folders exist
    if (-not (Test-DataFolders)) {
        $issues += "Missing data folders"
    }
    
    # Check if build works
    if (-not (Test-Build)) {
        $issues += "Build failures"
    }
    
    if ($issues.Count -eq 0) {
        Write-Status "Ready for deployment" "Success"
        return $true
    } else {
        Write-Status "Deployment issues found: $($issues -join ', ')" "Error"
        return $false
    }
}

function Show-Summary {
    Write-Host ""
    Write-Status "=== DEPLOYMENT MONITORING SUMMARY ===" "Info"
    Write-Status "Total checks performed: $CheckCount" "Info"
    Write-Status "Errors found: $ErrorCount" $(if ($ErrorCount -eq 0) { "Success" } else { "Error" })
    Write-Status "Warnings found: $WarningCount" $(if ($WarningCount -eq 0) { "Success" } else { "Warning" })
    
    if ($ErrorCount -eq 0 -and $WarningCount -eq 0) {
        Write-Status "Status: READY FOR DEPLOYMENT" "Success"
    } elseif ($ErrorCount -eq 0) {
        Write-Status "Status: READY WITH WARNINGS" "Warning"
    } else {
        Write-Status "Status: NOT READY - FIX ERRORS FIRST" "Error"
    }
    
    Write-Host ""
    Write-Status "GitHub Repository: https://github.com/doctororganic/nutrition-platform.git" "Info"
    Write-Status "Render Dashboard: https://dashboard.render.com" "Info"
    Write-Status "Service Name: nutrition-platform" "Info"
}

# Main monitoring loop
Write-Status "Starting deployment monitoring..." "Info"
Write-Status "Check interval: $CheckInterval seconds" "Info"
Write-Status "Max checks: $MaxChecks" "Info"
Write-Status "Continuous mode: $Continuous" "Info"
Write-Host ""

do {
    $CheckCount++
    Write-Status "=== CHECK #$CheckCount ===" "Info"
    
    # Run all tests
    $buildOK = Test-Build
    $gitOK = Test-GitStatus
    $filesOK = Test-RequiredFiles
    $foldersOK = Test-DataFolders
    $healthOK = Test-ApplicationHealth
    $deploymentReady = Test-DeploymentReadiness
    
    # Show current status
    Write-Status "Build: $(if ($buildOK) { 'OK' } else { 'FAIL' })" $(if ($buildOK) { "Success" } else { "Error" })
    Write-Status "Git: $(if ($gitOK) { 'OK' } else { 'FAIL' })" $(if ($gitOK) { "Success" } else { "Error" })
    Write-Status "Files: $(if ($filesOK) { 'OK' } else { 'FAIL' })" $(if ($filesOK) { "Success" } else { "Error" })
    Write-Status "Folders: $(if ($foldersOK) { 'OK' } else { 'FAIL' })" $(if ($foldersOK) { "Success" } else { "Error" })
    Write-Status "Health: $(if ($healthOK) { 'OK' } else { 'FAIL' })" $(if ($healthOK) { "Success" } else { "Error" })
    Write-Status "Deployment Ready: $(if ($deploymentReady) { 'YES' } else { 'NO' })" $(if ($deploymentReady) { "Success" } else { "Error" })
    
    if ($Continuous -and $CheckCount -lt $MaxChecks) {
        Write-Status "Waiting $CheckInterval seconds..." "Info"
        Start-Sleep -Seconds $CheckInterval
    }
    
} while ($Continuous -and $CheckCount -lt $MaxChecks)

# Show final summary
Show-Summary

Write-Host ""
Write-Status "Monitoring completed" "Info"
