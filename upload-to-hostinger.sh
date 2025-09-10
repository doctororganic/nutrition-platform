#!/bin/bash

# Upload script for DoctorHealthy1 Platform to Hostinger VPS
# Usage: ./upload-to-hostinger.sh [VPS_IP_ADDRESS]

set -e

# Configuration
VPS_IP=${1:-"YOUR_VPS_IP"}
VPS_USER="root"
APP_NAME="doctorhealthy1"
REMOTE_DIR="/var/www/$APP_NAME"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

if [ "$VPS_IP" = "YOUR_VPS_IP" ]; then
    print_error "Please provide VPS IP address as argument"
    echo "Usage: $0 <VPS_IP_ADDRESS>"
    exit 1
fi

print_status "Uploading DoctorHealthy1 Platform to Hostinger VPS"
print_status "VPS IP: $VPS_IP"
print_status "Remote Directory: $REMOTE_DIR"

# Create remote directory
print_status "Creating remote directory..."
ssh $VPS_USER@$VPS_IP "mkdir -p $REMOTE_DIR"

# Upload application files (excluding unnecessary files)
print_status "Uploading application files..."
rsync -avz --progress \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='*.exe' \
    --exclude='*.bat' \
    --exclude='*.ps1' \
    --exclude='*.md' \
    --exclude='Dockerfile' \
    --exclude='fly.toml' \
    --exclude='vercel.json' \
    --exclude='package.json' \
    --exclude='package-lock.json' \
    --exclude='deploy-hostinger.sh' \
    --exclude='upload-to-hostinger.sh' \
    ./ $VPS_USER@$VPS_IP:$REMOTE_DIR/

# Upload deployment script
print_status "Uploading deployment script..."
scp deploy-hostinger.sh $VPS_USER@$VPS_IP:/tmp/

# Make deployment script executable
print_status "Making deployment script executable..."
ssh $VPS_USER@$VPS_IP "chmod +x /tmp/deploy-hostinger.sh"

print_success "Files uploaded successfully!"
echo ""
echo "Next steps:"
echo "1. SSH into your VPS: ssh $VPS_USER@$VPS_IP"
echo "2. Run the deployment script: /tmp/deploy-hostinger.sh"
echo "3. The script will automatically configure everything"
echo ""
echo "Your application will be available at: https://ieltspass1.com"

