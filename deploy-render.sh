#!/bin/bash

# Deploy script for Render.com
# This script ensures proper deployment configuration

echo "🚀 Starting deployment to Render..."

# Check if we're in the right directory
if [ ! -f "main.go" ]; then
    echo "❌ Error: main.go not found. Please run this script from the project root."
    exit 1
fi

# Check if go.mod exists
if [ ! -f "go.mod" ]; then
    echo "❌ Error: go.mod not found. Please run this script from the project root."
    exit 1
fi

# Verify Go installation
if ! command -v go &> /dev/null; then
    echo "❌ Error: Go is not installed or not in PATH."
    exit 1
fi

# Check Go version
GO_VERSION=$(go version | cut -d' ' -f3 | cut -d'o' -f2)
echo "✅ Go version: $GO_VERSION"

# Download dependencies
echo "📦 Downloading dependencies..."
go mod download

# Verify dependencies
echo "🔍 Verifying dependencies..."
go mod verify

# Run tests (if any)
echo "🧪 Running tests..."
go test ./... || echo "⚠️  Warning: Some tests failed, but continuing deployment..."

# Build the application
echo "🔨 Building application..."
CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o nutrition-platform .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Check if binary was created
if [ -f "nutrition-platform" ]; then
    echo "✅ Binary created successfully"
    ls -la nutrition-platform
else
    echo "❌ Binary not found after build"
    exit 1
fi

# Verify health endpoint exists
echo "🏥 Verifying health endpoint configuration..."
if grep -q "health" main.go; then
    echo "✅ Health endpoint found in main.go"
else
    echo "⚠️  Warning: Health endpoint not found in main.go"
fi

# Check render.yaml
if [ -f "render.yaml" ]; then
    echo "✅ render.yaml found"
else
    echo "⚠️  Warning: render.yaml not found"
fi

echo "🎉 Deployment preparation complete!"
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your GitHub repository to Render"
echo "3. Render will automatically deploy using render.yaml configuration"
echo ""
echo "🔗 Your GitHub repository: https://github.com/doctororganic/nutrition-platform.git"
echo "🌐 Render dashboard: https://dashboard.render.com"
