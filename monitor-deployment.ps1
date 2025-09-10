# Comprehensive Deployment Monitoring Script
# This script monitors deployment status, errors, and performance

param(
    [string]$GitHubRepo = "https://github.com/doctororganic/nutrition-platform.git",
    [string]$RenderService = "nutrition-platform",
    [int]$CheckInterval = 30,
    [int]$MaxRetries = 10
)

Write-Host "🔍 Starting Deployment Monitoring System" -ForegroundColor Green
Write-Host "📊 Repository: $GitHubRepo" -ForegroundColor Cyan
Write-Host "⏱️  Check Interval: $CheckInterval seconds" -ForegroundColor Cyan
Write-Host "🔄 Max Retries: $MaxRetries" -ForegroundColor Cyan
Write-Host ""

# Function to check local build status
function Test-LocalBuild {
    Write-Host "🔨 Testing local build..." -ForegroundColor Yellow
    
    try {
        # Clean previous build
        if (Test-Path "nutrition-platform.exe") {
            Remove-Item "nutrition-platform.exe" -Force
        }
        
        # Build the application
        $buildResult = go build -o nutrition-platform.exe . 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Local build successful" -ForegroundColor Green
            
        # Test if binary runs
        try {
            $testResult = Start-Process -FilePath ".\nutrition-platform.exe" -ArgumentList "--help" -Wait -PassThru -RedirectStandardOutput "test-output.txt" -RedirectStandardError "test-error.txt"
            
            if ($testResult.ExitCode -eq 0) {
                Write-Host "✅ Binary execution test passed" -ForegroundColor Green
            } else {
                Write-Host "⚠️  Binary execution test failed" -ForegroundColor Yellow
                Get-Content "test-error.txt" | Write-Host -ForegroundColor Red
            }
            
            # Cleanup test files
            Remove-Item "test-output.txt", "test-error.txt" -ErrorAction SilentlyContinue
        } catch {
            Write-Host "⚠️  Could not test binary execution: $($_.Exception.Message)" -ForegroundColor Yellow
        }
        } else {
            Write-Host "❌ Local build failed" -ForegroundColor Red
            Write-Host $buildResult -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ Build error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    
    return $true
}

# Function to check GitHub repository status
function Test-GitHubStatus {
    Write-Host "📡 Checking GitHub repository status..." -ForegroundColor Yellow
    
    try {
        # Check if we can fetch from remote
        $fetchResult = git fetch origin 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ GitHub connection successful" -ForegroundColor Green
            
            # Check for unpushed commits
            $statusResult = git status -uno 2>&1
            if ($statusResult -match "Your branch is up to date") {
                Write-Host "✅ All changes pushed to GitHub" -ForegroundColor Green
            } else {
                Write-Host "⚠️  There may be unpushed changes" -ForegroundColor Yellow
                Write-Host $statusResult -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ GitHub connection failed" -ForegroundColor Red
            Write-Host $fetchResult -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ GitHub check error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    
    return $true
}

# Function to check application health
function Test-ApplicationHealth {
    param([string]$BaseUrl = "http://localhost:8080")
    
    Write-Host "🏥 Checking application health..." -ForegroundColor Yellow
    
    try {
        # Test health endpoint
        $healthResponse = Invoke-RestMethod -Uri "$BaseUrl/health" -Method GET -TimeoutSec 10 -ErrorAction Stop
        
        if ($healthResponse.status -eq "healthy") {
            Write-Host "✅ Application health check passed" -ForegroundColor Green
            Write-Host "📊 Status: $($healthResponse.status)" -ForegroundColor Cyan
            Write-Host "⏰ Timestamp: $($healthResponse.timestamp)" -ForegroundColor Cyan
            
            if ($healthResponse.services) {
                Write-Host "🔧 Services Status:" -ForegroundColor Cyan
                $healthResponse.services.PSObject.Properties | ForEach-Object {
                    Write-Host "  - $($_.Name): $($_.Value)" -ForegroundColor $(if ($_.Value -eq "healthy") { "Green" } else { "Red" })
                }
            }
            
            return $true
        } else {
            Write-Host "❌ Application health check failed" -ForegroundColor Red
            Write-Host "📊 Status: $($healthResponse.status)" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ Health check error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to check for common deployment issues
function Test-DeploymentIssues {
    Write-Host "🔍 Checking for common deployment issues..." -ForegroundColor Yellow
    
    $issues = @()
    
    # Check for missing environment variables
    $requiredEnvVars = @("JWT_SECRET", "API_KEY_SECRET", "PORT", "HOST")
    foreach ($var in $requiredEnvVars) {
        if (-not (Get-Item "env:$var" -ErrorAction SilentlyContinue)) {
            $issues += "Missing environment variable: $var"
        }
    }
    
    # Check for missing data files
    $requiredFolders = @("disease-easy-json-files", "injury-easy-json", "plans-and-recipes-json", "workouts-json")
    foreach ($folder in $requiredFolders) {
        if (-not (Test-Path $folder)) {
            $issues += "Missing data folder: $folder"
        }
    }
    
    # Check for Go module issues
    if (-not (Test-Path "go.mod")) {
        $issues += "Missing go.mod file"
    }
    
    if (-not (Test-Path "go.sum")) {
        $issues += "Missing go.sum file"
    }
    
    if ($issues.Count -gt 0) {
        Write-Host "❌ Found $($issues.Count) potential issues:" -ForegroundColor Red
        foreach ($issue in $issues) {
            Write-Host "  - $issue" -ForegroundColor Red
        }
        return $false
    } else {
        Write-Host "✅ No common deployment issues found" -ForegroundColor Green
        return $true
    }
}

# Function to generate deployment report
function New-DeploymentReport {
    param([string]$OutputFile = "deployment-report.txt")
    
    Write-Host "📋 Generating deployment report..." -ForegroundColor Yellow
    
    $report = @"
# Deployment Monitoring Report
Generated: $(Get-Date)

## System Information
OS: $($env:OS)
PowerShell Version: $($PSVersionTable.PSVersion)
Go Version: $(go version 2>$null)

## Repository Information
Repository: $GitHubRepo
Branch: $(git branch --show-current 2>$null)
Last Commit: $(git log -1 --oneline 2>$null)

## Build Status
Local Build: $(if (Test-Path "nutrition-platform.exe") { "✅ Success" } else { "❌ Failed" })
Binary Size: $(if (Test-Path "nutrition-platform.exe") { "$((Get-Item "nutrition-platform.exe").Length) bytes" } else { "N/A" })

## Health Check Results
Application Health: $(try { $health = Invoke-RestMethod -Uri "http://localhost:8080/health" -TimeoutSec 5; $health.status } catch { "❌ Unavailable" })

## Recommendations
1. Ensure all environment variables are set in Render
2. Monitor application logs for errors
3. Check Render dashboard for deployment status
4. Verify all data files are properly copied

## Next Steps
1. Deploy to Render using the dashboard
2. Monitor the deployment logs
3. Test the deployed application
4. Set up continuous monitoring
"@

    $report | Out-File -FilePath $OutputFile -Encoding UTF8
    Write-Host "📄 Report saved to: $OutputFile" -ForegroundColor Green
}

# Main monitoring loop
function Start-Monitoring {
    $retryCount = 0
    $lastStatus = $null
    
    while ($retryCount -lt $MaxRetries) {
        Write-Host "`n🔄 Monitoring Cycle #$($retryCount + 1)" -ForegroundColor Cyan
        Write-Host "⏰ $(Get-Date)" -ForegroundColor Gray
        
        # Run all checks
        $buildStatus = Test-LocalBuild
        $githubStatus = Test-GitHubStatus
        $deploymentIssues = Test-DeploymentIssues
        
        # Check if application is running locally
        $healthStatus = $false
        try {
            $healthStatus = Test-ApplicationHealth
        } catch {
            Write-Host "ℹ️  Application not running locally (this is normal for deployment monitoring)" -ForegroundColor Yellow
        }
        
        # Generate status summary
        $overallStatus = if ($buildStatus -and $githubStatus -and $deploymentIssues) { "✅ Ready for Deployment" } else { "❌ Issues Found" }
        
        Write-Host "`n📊 Status Summary:" -ForegroundColor Cyan
        Write-Host "  Build Status: $(if ($buildStatus) { '✅ Pass' } else { '❌ Fail' })" -ForegroundColor $(if ($buildStatus) { "Green" } else { "Red" })
        Write-Host "  GitHub Status: $(if ($githubStatus) { '✅ Pass' } else { '❌ Fail' })" -ForegroundColor $(if ($githubStatus) { "Green" } else { "Red" })
        Write-Host "  Deployment Check: $(if ($deploymentIssues) { '✅ Pass' } else { '❌ Fail' })" -ForegroundColor $(if ($deploymentIssues) { "Green" } else { "Red" })
        Write-Host "  Overall Status: $overallStatus" -ForegroundColor $(if ($overallStatus -like "✅*") { "Green" } else { "Red" })
        
        # Check if status changed
        if ($lastStatus -ne $overallStatus) {
            Write-Host "🔄 Status changed: $lastStatus → $overallStatus" -ForegroundColor Yellow
            $lastStatus = $overallStatus
        }
        
        # Generate report if this is the last check
        if ($retryCount -eq $MaxRetries - 1) {
            New-DeploymentReport
        }
        
        $retryCount++
        
        if ($retryCount -lt $MaxRetries) {
            Write-Host "`n⏳ Waiting $CheckInterval seconds before next check..." -ForegroundColor Gray
            Start-Sleep -Seconds $CheckInterval
        }
    }
    
    Write-Host "`n🏁 Monitoring completed after $MaxRetries cycles" -ForegroundColor Green
}

# Start monitoring
Start-Monitoring
