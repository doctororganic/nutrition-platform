#!/bin/bash

# Upload script for Hostinger deployment
# Usage: ./upload.sh [server_ip] [username]

set -e

# Configuration
SERVER_IP=${1:-"YOUR_HOSTINGER_IP"}
USERNAME=${2:-"YOUR_USERNAME"}
REMOTE_PATH="/tmp/nutrition-platform-deploy"

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

# Validate parameters
if [ "$SERVER_IP" = "YOUR_HOSTINGER_IP" ] || [ "$USERNAME" = "YOUR_USERNAME" ]; then
    echo_error "Please provide server IP and username:"
    echo "Usage: $0 <server_ip> <username>"
    echo "Example: $0 192.168.1.100 myuser"
    exit 1
fi

echo_info "Preparing files for upload to $USERNAME@$SERVER_IP"

# Step 1: Build the Go application
echo_info "Building Go application..."
cd "$(dirname "$0")/.."

# Set Go environment for Linux
export GOOS=linux
export GOARCH=amd64
export CGO_ENABLED=0

go build -ldflags="-w -s" -o nutrition-platform .

if [ ! -f "./nutrition-platform" ]; then
    echo_error "Failed to build Go application"
    exit 1
fi

echo_info "✓ Go application built successfully"

# Step 2: Create deployment package
echo_info "Creating deployment package..."

# Create temporary directory
TEMP_DIR=$(mktemp -d)
PACKAGE_DIR="$TEMP_DIR/nutrition-platform-deploy"

mkdir -p "$PACKAGE_DIR"
mkdir -p "$PACKAGE_DIR/deployment/nginx"
mkdir -p "$PACKAGE_DIR/deployment/systemd"
mkdir -p "$PACKAGE_DIR/frontend"

# Copy files
cp ./nutrition-platform "$PACKAGE_DIR/"
cp -r ./frontend/* "$PACKAGE_DIR/frontend/"
cp ./deployment/nginx/nutrition-site.conf "$PACKAGE_DIR/deployment/nginx/"
cp ./deployment/systemd/nutrition-platform.service "$PACKAGE_DIR/deployment/systemd/"
cp ./deployment/deploy.sh "$PACKAGE_DIR/"

# Make scripts executable
chmod +x "$PACKAGE_DIR/deploy.sh"
chmod +x "$PACKAGE_DIR/nutrition-platform"

echo_info "✓ Deployment package created at $PACKAGE_DIR"

# Step 3: Upload to server
echo_info "Uploading files to server..."

# Create remote directory
ssh "$USERNAME@$SERVER_IP" "mkdir -p $REMOTE_PATH"

# Upload package
scp -r "$PACKAGE_DIR"/* "$USERNAME@$SERVER_IP:$REMOTE_PATH/"

echo_info "✓ Files uploaded successfully"

# Step 4: Execute deployment on server
echo_info "Executing deployment on server..."

ssh "$USERNAME@$SERVER_IP" << EOF
    cd $REMOTE_PATH
    sudo chmod +x deploy.sh
    sudo ./deploy.sh production
EOF

# Step 5: Cleanup
echo_info "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo_info "🚀 Deployment completed successfully!"
echo_info "Your application should be running at:"
echo "  - Backend API: http://$SERVER_IP:8080"
echo "  - Frontend: https://$SERVER_IP (after SSL setup)"
echo "  - Health Check: http://$SERVER_IP:8080/health"

echo_warn "Next steps:"
echo "  1. Update your domain DNS to point to $SERVER_IP"
echo "  2. SSH to server and run: sudo certbot --nginx -d your-domain.com"
echo "  3. Test the application thoroughly"
echo "  4. Set up monitoring and automated backups"

echo_info "To monitor the application:"
echo "  ssh $USERNAME@$SERVER_IP"
echo "  sudo systemctl status nutrition-platform"
echo "  sudo journalctl -u nutrition-platform -f"
