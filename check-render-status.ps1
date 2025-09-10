# Render Deployment Status Checker
# This script checks the status of your Render deployment

param(
    [string]$ServiceName = "nutrition-platform",
    [string]$RenderAPIKey = "",
    [int]$CheckInterval = 60,
    [switch]$Continuous = $false
)

Write-Host "🔍 Render Deployment Status Checker" -ForegroundColor Green
Write-Host "📊 Service: $ServiceName" -ForegroundColor Cyan
Write-Host "⏱️  Check Interval: $CheckInterval seconds" -ForegroundColor Cyan
Write-Host "🔄 Continuous Mode: $Continuous" -ForegroundColor Cyan
Write-Host ""

# Function to check if Render CLI is installed
function Test-RenderCLI {
    try {
        $renderVersion = render --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Render CLI found: $renderVersion" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Render CLI not found or not working" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ Render CLI not installed" -ForegroundColor Red
        Write-Host "💡 Install with: npm install -g @render/cli" -ForegroundColor Yellow
        return $false
    }
}

# Function to check deployment status via Render CLI
function Get-RenderStatus {
    if (-not (Test-RenderCLI)) {
        return $null
    }
    
    try {
        Write-Host "📡 Checking Render service status..." -ForegroundColor Yellow
        
        # Get service status
        $serviceStatus = render services list --format json 2>$null | ConvertFrom-Json
        
        if ($serviceStatus) {
            $ourService = $serviceStatus | Where-Object { $_.name -eq $ServiceName }
            
            if ($ourService) {
                Write-Host "✅ Service found: $($ourService.name)" -ForegroundColor Green
                Write-Host "📊 Status: $($ourService.status)" -ForegroundColor Cyan
                Write-Host "🌐 URL: $($ourService.url)" -ForegroundColor Cyan
                Write-Host "⏰ Created: $($ourService.createdAt)" -ForegroundColor Gray
                Write-Host "🔄 Updated: $($ourService.updatedAt)" -ForegroundColor Gray
                
                return $ourService
            } else {
                Write-Host "❌ Service '$ServiceName' not found" -ForegroundColor Red
                Write-Host "📋 Available services:" -ForegroundColor Yellow
                $serviceStatus | ForEach-Object { Write-Host "  - $($_.name) ($($_.status))" -ForegroundColor Gray }
                return $null
            }
        } else {
            Write-Host "❌ Failed to get service list" -ForegroundColor Red
            return $null
        }
    } catch {
        Write-Host "❌ Error checking Render status: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Function to check service health via HTTP
function Test-ServiceHealth {
    param([string]$ServiceUrl)
    
    if (-not $ServiceUrl) {
        Write-Host "⚠️  No service URL provided" -ForegroundColor Yellow
        return $false
    }
    
    try {
        Write-Host "🏥 Testing service health at: $ServiceUrl" -ForegroundColor Yellow
        
        # Test health endpoint
        $healthResponse = Invoke-RestMethod -Uri "$ServiceUrl/health" -Method GET -TimeoutSec 10 -ErrorAction Stop
        
        if ($healthResponse.status -eq "healthy") {
            Write-Host "✅ Service health check passed" -ForegroundColor Green
            Write-Host "📊 Status: $($healthResponse.status)" -ForegroundColor Cyan
            Write-Host "⏰ Timestamp: $($healthResponse.timestamp)" -ForegroundColor Cyan
            
            if ($healthResponse.services) {
                Write-Host "🔧 Services Status:" -ForegroundColor Cyan
                $healthResponse.services.PSObject.Properties | ForEach-Object {
                    $statusColor = if ($_.Value -eq "healthy") { "Green" } else { "Red" }
                    Write-Host "  - $($_.Name): $($_.Value)" -ForegroundColor $statusColor
                }
            }
            
            return $true
        } else {
            Write-Host "❌ Service health check failed" -ForegroundColor Red
            Write-Host "📊 Status: $($healthResponse.status)" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ Health check error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to get service logs
function Get-ServiceLogs {
    param([string]$ServiceId)
    
    if (-not $ServiceId) {
        Write-Host "⚠️  No service ID provided" -ForegroundColor Yellow
        return
    }
    
    try {
        Write-Host "📋 Getting service logs..." -ForegroundColor Yellow
        
        # Get recent logs (last 50 lines)
        $logs = render logs $ServiceId --tail 50 2>$null
        
        if ($logs) {
            Write-Host "📄 Recent logs:" -ForegroundColor Cyan
            $logs | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
        } else {
            Write-Host "⚠️  No logs available" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Error getting logs: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Function to check for common deployment issues
function Test-DeploymentIssues {
    param([object]$Service)
    
    if (-not $Service) {
        return
    }
    
    Write-Host "🔍 Checking for deployment issues..." -ForegroundColor Yellow
    
    $issues = @()
    
    # Check service status
    if ($Service.status -ne "live") {
        $issues += "Service status is '$($Service.status)' instead of 'live'"
    }
    
    # Check if service has URL
    if (-not $Service.url) {
        $issues += "Service has no URL assigned"
    }
    
    # Check service age (if it's very new, it might still be deploying)
    $createdAt = [DateTime]::Parse($Service.createdAt)
    $age = (Get-Date) - $createdAt
    if ($age.TotalMinutes -lt 5) {
        $issues += "Service is very new ($([math]::Round($age.TotalMinutes, 1)) minutes old) - may still be deploying"
    }
    
    if ($issues.Count -gt 0) {
        Write-Host "⚠️  Found $($issues.Count) potential issues:" -ForegroundColor Yellow
        foreach ($issue in $issues) {
            Write-Host "  - $issue" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✅ No deployment issues detected" -ForegroundColor Green
    }
}

# Function to generate deployment report
function New-DeploymentReport {
    param([object]$Service, [string]$OutputFile = "render-deployment-report.txt")
    
    Write-Host "📋 Generating deployment report..." -ForegroundColor Yellow
    
    $report = @"
# Render Deployment Report
Generated: $(Get-Date)

## Service Information
- Name: $($Service.name)
- Status: $($Service.status)
- URL: $($Service.url)
- Created: $($Service.createdAt)
- Updated: $($Service.updatedAt)

## Health Check Results
- Health Endpoint: $(if ($Service.url) { "$($Service.url)/health" } else { "N/A" })
- Health Status: $(try { $health = Invoke-RestMethod -Uri "$($Service.url)/health" -TimeoutSec 5; $health.status } catch { "❌ Unavailable" })

## Recommendations
1. Monitor the service logs for any errors
2. Check the Render dashboard for detailed metrics
3. Verify all environment variables are set correctly
4. Test all API endpoints thoroughly

## Next Steps
1. If status is not 'live', wait for deployment to complete
2. If health check fails, check logs for errors
3. If service is live but slow, check Render metrics
4. Consider upgrading to a paid plan for better performance
"@

    $report | Out-File -FilePath $OutputFile -Encoding UTF8
    Write-Host "📄 Report saved to: $OutputFile" -ForegroundColor Green
}

# Main monitoring function
function Start-RenderMonitoring {
    do {
        Write-Host "`n🔄 Checking Render deployment status..." -ForegroundColor Cyan
        Write-Host "⏰ $(Get-Date)" -ForegroundColor Gray
        
        # Get service status
        $service = Get-RenderStatus
        
        if ($service) {
            # Test service health
            $healthStatus = Test-ServiceHealth -ServiceUrl $service.url
            
            # Check for deployment issues
            Test-DeploymentIssues -Service $service
            
            # Generate report
            New-DeploymentReport -Service $service
            
            # Show overall status
            $overallStatus = if ($service.status -eq "live" -and $healthStatus) { "✅ Fully Operational" } elseif ($service.status -eq "live") { "⚠️  Live but Health Issues" } else { "❌ Not Ready" }
            
            Write-Host "`n📊 Overall Status: $overallStatus" -ForegroundColor $(if ($overallStatus -like "✅*") { "Green" } elseif ($overallStatus -like "⚠️*") { "Yellow" } else { "Red" })
        } else {
            Write-Host "❌ Could not retrieve service status" -ForegroundColor Red
        }
        
        if ($Continuous) {
            Write-Host "`n⏳ Waiting $CheckInterval seconds before next check..." -ForegroundColor Gray
            Start-Sleep -Seconds $CheckInterval
        }
    } while ($Continuous)
}

# Check if Render CLI is available
if (-not (Test-RenderCLI)) {
    Write-Host "`n💡 Alternative: Check your Render dashboard manually:" -ForegroundColor Yellow
    Write-Host "   https://dashboard.render.com" -ForegroundColor Cyan
    Write-Host "`n🔍 Look for service: $ServiceName" -ForegroundColor Cyan
    Write-Host "📊 Check status, logs, and metrics" -ForegroundColor Cyan
} else {
    # Start monitoring
    Start-RenderMonitoring
}

Write-Host "`n🏁 Monitoring completed" -ForegroundColor Green
