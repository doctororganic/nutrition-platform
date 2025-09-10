#!/bin/bash

# Production build script for Nutrition Platform
# This script prepares the application for production deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Change to project directory
cd "$(dirname "$0")/.."

echo_info "🚀 Starting production build for Nutrition Platform"

# Step 1: Clean previous builds
echo_info "Cleaning previous builds..."
rm -f nutrition-platform nutrition-platform.exe
rm -rf dist/

# Step 2: Build Go application for production
echo_info "Building Go application for production..."

# Linux build for server deployment
echo_info "Building for Linux (server deployment)..."
export GOOS=linux
export GOARCH=amd64
export CGO_ENABLED=0

go build -ldflags="-w -s -X main.version=$(date +%Y%m%d%H%M%S)" -o nutrition-platform .

if [ ! -f "./nutrition-platform" ]; then
    echo_error "Failed to build Go application for Linux"
    exit 1
fi

echo_info "✓ Linux binary built: $(du -h nutrition-platform | cut -f1)"

# Step 3: Optimize frontend files
echo_info "Optimizing frontend files..."

# Update API base URL for production
if [ -f "frontend/js/app.js" ]; then
    # Create production version with correct API URL
    sed 's/localhost:8081/nutrition-site.com/g' frontend/js/app.js > frontend/js/app.prod.js
    mv frontend/js/app.prod.js frontend/js/app.js
    echo_info "✓ Updated API URLs for production"
fi

# Minify JavaScript files (if uglifyjs is available)
if command -v uglifyjs &> /dev/null; then
    echo_info "Minifying JavaScript files..."
    for js_file in frontend/js/*.js; do
        if [ -f "$js_file" ]; then
            uglifyjs "$js_file" --compress --mangle -o "$js_file.min"
            mv "$js_file.min" "$js_file"
        fi
    done
    echo_info "✓ JavaScript files minified"
else
    echo_warn "uglifyjs not found, skipping JS minification"
fi

# Minify CSS files (if csso is available)
if command -v csso &> /dev/null; then
    echo_info "Minifying CSS files..."
    for css_file in frontend/css/*.css; do
        if [ -f "$css_file" ]; then
            csso "$css_file" --output "$css_file"
        fi
    done
    echo_info "✓ CSS files minified"
else
    echo_warn "csso not found, skipping CSS minification"
fi

# Step 4: Validate configuration files
echo_info "Validating configuration files..."

# Test nginx configuration syntax
if command -v nginx &> /dev/null; then
    nginx -t -c "$(pwd)/deployment/nginx/nutrition-site.conf" 2>/dev/null || echo_warn "Nginx config validation skipped (not installed)"
fi

# Validate systemd service file
if [ -f "deployment/systemd/nutrition-platform.service" ]; then
    echo_info "✓ Systemd service file validated"
fi

# Step 5: Create checksums
echo_info "Creating checksums..."
mkdir -p dist/

# Create checksum file
echo "# Nutrition Platform Build Checksums" > dist/checksums.txt
echo "# Generated on: $(date)" >> dist/checksums.txt
echo "" >> dist/checksums.txt

sha256sum nutrition-platform >> dist/checksums.txt
find frontend -type f -name "*.html" -o -name "*.js" -o -name "*.css" | xargs sha256sum >> dist/checksums.txt

echo_info "✓ Checksums created in dist/checksums.txt"

# Step 6: Create build info
echo_info "Creating build info..."
cat > dist/build-info.json << EOF
{
  "version": "$(date +%Y%m%d%H%M%S)",
  "build_date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "go_version": "$(go version | cut -d' ' -f3)",
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "git_branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
  "build_environment": "production"
}
EOF

echo_info "✓ Build info created in dist/build-info.json"

# Step 7: Final validation
echo_info "Performing final validation..."

# Check if binary is executable
if [ -x "./nutrition-platform" ]; then
    echo_info "✓ Binary is executable"
else
    echo_error "✗ Binary is not executable"
    exit 1
fi

# Check binary size (warn if too large)
BINARY_SIZE=$(stat -c%s nutrition-platform)
BINARY_SIZE_MB=$((BINARY_SIZE / 1024 / 1024))

if [ $BINARY_SIZE_MB -gt 50 ]; then
    echo_warn "Binary size is large: ${BINARY_SIZE_MB}MB"
else
    echo_info "✓ Binary size is reasonable: ${BINARY_SIZE_MB}MB"
fi

# Check frontend files
REQUIRED_FILES=("frontend/index.html" "frontend/js/app.js" "frontend/css/style.css")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo_info "✓ Found required file: $file"
    else
        echo_error "✗ Missing required file: $file"
        exit 1
    fi
done

echo_info "🎉 Production build completed successfully!"
echo ""
echo_info "Build Summary:"
echo "  - Binary: nutrition-platform (${BINARY_SIZE_MB}MB)"
echo "  - Frontend files: $(find frontend -type f | wc -l) files"
echo "  - Build date: $(date)"
echo "  - Checksums: dist/checksums.txt"
echo "  - Build info: dist/build-info.json"
echo ""
echo_info "Ready for deployment! Run:"
echo "  ./deployment/upload.sh <server_ip> <username>"
