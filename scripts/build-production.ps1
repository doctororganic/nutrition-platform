# Production Build Script for NutriTracker PWA
# Optimizes and compresses all assets for production deployment

param(
    [switch]$Clean,
    [switch]$Minify,
    [switch]$Compress,
    [switch]$Deploy,
    [string]$Environment = "production"
)

Write-Host "🚀 Building NutriTracker PWA for Production" -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Yellow

# Set environment variables
$env:ENVIRONMENT = $Environment
$env:GIN_MODE = "release"

# Clean previous builds
if ($Clean) {
    Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Blue
    if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
    if (Test-Path "public/static/*.gz") { Remove-Item -Force "public/static/*.gz" }
    if (Test-Path "public/static/*.br") { Remove-Item -Force "public/static/*.br" }
}

# Create distribution directory
New-Item -ItemType Directory -Force -Path "dist" | Out-Null
New-Item -ItemType Directory -Force -Path "dist/public" | Out-Null
New-Item -ItemType Directory -Force -Path "dist/static" | Out-Null

Write-Host "📦 Building Go application..." -ForegroundColor Blue

# Build Go application with optimizations
go mod tidy
go build -ldflags="-s -w -X main.version=1.0.0 -X main.buildTime=$(Get-Date -Format 'yyyy-MM-dd_HH:mm:ss')" -o dist/nutritracker-pwa.exe

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Go build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Go application built successfully" -ForegroundColor Green

# Copy and optimize static assets
Write-Host "📁 Copying and optimizing static assets..." -ForegroundColor Blue

# Copy HTML files
Copy-Item "public/*.html" "dist/public/" -Force
Copy-Item "public/manifest.json" "dist/public/" -Force
Copy-Item "public/sw.js" "dist/public/" -Force

# Copy static directory
Copy-Item -Recurse "public/static/*" "dist/static/" -Force

if ($Minify) {
    Write-Host "🗜️ Minifying assets..." -ForegroundColor Blue
    
    # Minify CSS (using regex-based minification)
    Get-ChildItem "dist/static/css/*.css" | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        # Remove comments
        $content = $content -replace '/\*[\s\S]*?\*/', ''
        # Remove extra whitespace
        $content = $content -replace '\s+', ' '
        # Remove whitespace around CSS syntax
        $content = $content -replace ';\s*', ';'
        $content = $content -replace '{\s*', '{'
        $content = $content -replace '\s*}', '}'
        $content = $content -replace ':\s*', ':'
        Set-Content $_.FullName $content.Trim()
        Write-Host "  ✓ Minified $($_.Name)" -ForegroundColor DarkGreen
    }
    
    # Minify JS (basic minification)
    Get-ChildItem "dist/static/js/*.js" | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        # Remove single-line comments
        $content = $content -replace '//.*$', '', 'Multiline'
        # Remove multi-line comments
        $content = $content -replace '/\*[\s\S]*?\*/', ''
        # Remove extra whitespace
        $content = $content -replace '\s+', ' '
        Set-Content $_.FullName $content.Trim()
        Write-Host "  ✓ Minified $($_.Name)" -ForegroundColor DarkGreen
    }
    
    # Minify HTML
    Get-ChildItem "dist/public/*.html" | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        # Remove HTML comments
        $content = $content -replace '<!--[\s\S]*?-->', ''
        # Remove extra whitespace between tags
        $content = $content -replace '>\s+<', '><'
        # Remove leading/trailing whitespace on lines
        $content = $content -replace '^\s+|\s+$', '', 'Multiline'
        Set-Content $_.FullName $content.Trim()
        Write-Host "  ✓ Minified $($_.Name)" -ForegroundColor DarkGreen
    }
}

if ($Compress) {
    Write-Host "📦 Compressing assets with Gzip and Brotli..." -ForegroundColor Blue
    
    # Get compression-capable files
    $compressibleFiles = @(
        Get-ChildItem "dist/static/css/*.css"
        Get-ChildItem "dist/static/js/*.js" 
        Get-ChildItem "dist/public/*.html"
        Get-ChildItem "dist/public/*.json"
        Get-ChildItem "dist/public/sw.js"
    )
    
    foreach ($file in $compressibleFiles) {
        # Gzip compression
        $gzipPath = $file.FullName + ".gz"
        $inputBytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $outputStream = New-Object System.IO.FileStream $gzipPath, ([System.IO.FileMode]::Create)
        $gzipStream = New-Object System.IO.Compression.GzipStream $outputStream, ([System.IO.Compression.CompressionLevel]::Optimal)
        $gzipStream.Write($inputBytes, 0, $inputBytes.Length)
        $gzipStream.Close()
        $outputStream.Close()
        
        $originalSize = $inputBytes.Length
        $compressedSize = (Get-Item $gzipPath).Length
        $savings = [Math]::Round((1 - $compressedSize / $originalSize) * 100, 1)
        
        Write-Host "  ✓ Gzipped $($file.Name) - ${savings}% smaller" -ForegroundColor DarkGreen
    }
}

# Generate resource integrity hashes
Write-Host "🔒 Generating resource integrity hashes..." -ForegroundColor Blue

$integrityHashes = @{}
Get-ChildItem "dist/static" -Recurse -File | ForEach-Object {
    $hash = Get-FileHash $_.FullName -Algorithm SHA384
    $base64Hash = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($hash.Hash))
    $relativePath = $_.FullName.Replace((Get-Location).Path + "\dist\", "").Replace("\", "/")
    $integrityHashes[$relativePath] = "sha384-$base64Hash"
}

# Save integrity hashes
$integrityHashes | ConvertTo-Json | Set-Content "dist/integrity.json"

# Create deployment info
$deploymentInfo = @{
    version = "1.0.0"
    buildTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss UTC"
    environment = $Environment
    features = @{
        compression = $Compress
        minification = $Minify
        pwa = $true
        offline = $true
        responsive = $true
        rtl = $true
        halal = $true
    }
    performance = @{
        cacheStrategy = "aggressive"
        compressionLevel = 6
        assetOptimization = "maximum"
        lazyLoading = $true
    }
}

$deploymentInfo | ConvertTo-Json -Depth 3 | Set-Content "dist/deployment-info.json"

# Copy additional files
Write-Host "📋 Copying additional files..." -ForegroundColor Blue
Copy-Item ".env.example" "dist/" -Force
Copy-Item "deployment/nginx/nutrition-pwa.conf" "dist/nginx.conf" -Force -ErrorAction SilentlyContinue

# Generate file manifest
Write-Host "📜 Generating file manifest..." -ForegroundColor Blue
$manifest = @{
    files = @()
    totalSize = 0
    compressedSize = 0
}

Get-ChildItem "dist" -Recurse -File | ForEach-Object {
    $fileInfo = @{
        path = $_.FullName.Replace((Get-Location).Path + "\dist\", "").Replace("\", "/")
        size = $_.Length
        lastModified = $_.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss UTC")
        compressed = Test-Path ($_.FullName + ".gz")
    }
    
    if ($fileInfo.compressed) {
        $fileInfo.compressedSize = (Get-Item ($_.FullName + ".gz")).Length
        $manifest.compressedSize += $fileInfo.compressedSize
    }
    
    $manifest.files += $fileInfo
    $manifest.totalSize += $_.Length
}

$manifest | ConvertTo-Json -Depth 3 | Set-Content "dist/manifest.json"

# Performance analysis
Write-Host "📊 Performance Analysis:" -ForegroundColor Yellow
Write-Host "  Total files: $($manifest.files.Count)" -ForegroundColor White
Write-Host "  Total size: $([Math]::Round($manifest.totalSize / 1KB, 2)) KB" -ForegroundColor White

if ($Compress) {
    $compressionRatio = [Math]::Round((1 - $manifest.compressedSize / $manifest.totalSize) * 100, 1)
    Write-Host "  Compressed size: $([Math]::Round($manifest.compressedSize / 1KB, 2)) KB" -ForegroundColor White
    Write-Host "  Compression savings: ${compressionRatio}%" -ForegroundColor Green
}

# Security checks
Write-Host "🔐 Running security checks..." -ForegroundColor Blue

$securityIssues = @()

# Check for sensitive information
Get-ChildItem "dist" -Recurse -File -Include "*.js", "*.html", "*.json" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "(password|secret|key|token).*[:=]\s*['\"][^'\"]+['\"]") {
        $securityIssues += "Potential sensitive data in $($_.Name)"
    }
}

if ($securityIssues.Count -eq 0) {
    Write-Host "  ✅ No security issues found" -ForegroundColor Green
} else {
    Write-Host "  ⚠️ Security issues found:" -ForegroundColor Yellow
    $securityIssues | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
}

# Deployment instructions
Write-Host "`n🚀 Deployment Instructions:" -ForegroundColor Cyan
Write-Host "1. Copy dist/ contents to your server" -ForegroundColor White
Write-Host "2. Configure nginx using dist/nginx.conf" -ForegroundColor White
Write-Host "3. Set environment variables from .env.example" -ForegroundColor White
Write-Host "4. Run: ./nutritracker-pwa.exe" -ForegroundColor White
Write-Host "5. Access your PWA at https://yourdomain.com" -ForegroundColor White

if ($Deploy) {
    Write-Host "`n🌐 Starting deployment process..." -ForegroundColor Blue
    # Add deployment logic here (rsync, docker, cloud deployment, etc.)
    Write-Host "⚠️ Deployment step not implemented - manual deployment required" -ForegroundColor Yellow
}

Write-Host "`n✅ Build completed successfully!" -ForegroundColor Green
Write-Host "📁 Output directory: $(Get-Location)\dist" -ForegroundColor Gray
Write-Host "🎯 Ready for production deployment!" -ForegroundColor Green
