#!/bin/bash

# Nutrition Platform Deployment Script for Hostinger
# Usage: ./deploy.sh [production|staging]

set -e

# Configuration
ENVIRONMENT=${1:-production}
APP_NAME="nutrition-platform"
DEPLOY_USER="www-data"
DEPLOY_PATH="/opt/nutrition-platform"
FRONTEND_PATH="/var/www/nutrition-platform"
SERVICE_NAME="nutrition-platform"

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

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo_error "This script must be run as root (use sudo)"
   exit 1
fi

echo_info "Starting deployment for environment: $ENVIRONMENT"

# Step 1: Create application user and directories
echo_info "Setting up application directories..."
useradd -r -s /bin/false $DEPLOY_USER 2>/dev/null || echo_warn "User $DEPLOY_USER already exists"

mkdir -p $DEPLOY_PATH
mkdir -p $DEPLOY_PATH/logs
mkdir -p $FRONTEND_PATH/frontend
mkdir -p /etc/nginx/sites-available
mkdir -p /etc/nginx/sites-enabled

# Step 2: Stop existing service if running
echo_info "Stopping existing service..."
systemctl stop $SERVICE_NAME 2>/dev/null || echo_warn "Service $SERVICE_NAME not running"

# Step 3: Copy application binary
echo_info "Copying application binary..."
if [ ! -f "./nutrition-platform" ]; then
    echo_error "Application binary './nutrition-platform' not found. Please build it first."
    exit 1
fi

cp ./nutrition-platform $DEPLOY_PATH/
chmod +x $DEPLOY_PATH/nutrition-platform
chown -R $DEPLOY_USER:$DEPLOY_USER $DEPLOY_PATH

# Step 4: Copy frontend files
echo_info "Copying frontend files..."
if [ -d "./frontend" ]; then
    cp -r ./frontend/* $FRONTEND_PATH/frontend/
    chown -R $DEPLOY_USER:$DEPLOY_USER $FRONTEND_PATH
else
    echo_error "Frontend directory not found"
    exit 1
fi

# Step 5: Install and configure systemd service
echo_info "Installing systemd service..."
cp ./deployment/systemd/nutrition-platform.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable $SERVICE_NAME

# Step 6: Configure nginx
echo_info "Configuring nginx..."

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo_info "Installing nginx..."
    apt update
    apt install -y nginx
fi

# Install brotli module if not present
if ! nginx -V 2>&1 | grep -q "brotli"; then
    echo_info "Installing nginx brotli module..."
    apt install -y nginx-module-brotli
    
    # Add brotli module to nginx.conf if not already present
    if ! grep -q "load_module.*brotli" /etc/nginx/nginx.conf; then
        sed -i '1i load_module modules/ngx_http_brotli_filter_module.so;' /etc/nginx/nginx.conf
        sed -i '2i load_module modules/ngx_http_brotli_static_module.so;' /etc/nginx/nginx.conf
    fi
fi

# Copy nginx configuration
cp ./deployment/nginx/nutrition-site.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/nutrition-site.conf /etc/nginx/sites-enabled/

# Remove default nginx site
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t
if [ $? -ne 0 ]; then
    echo_error "Nginx configuration test failed"
    exit 1
fi

# Step 7: Setup SSL certificates (Let's Encrypt)
echo_info "Setting up SSL certificates..."
if ! command -v certbot &> /dev/null; then
    echo_info "Installing certbot..."
    apt install -y certbot python3-certbot-nginx
fi

# Create certificate directories
mkdir -p /etc/ssl/certs /etc/ssl/private

# Generate self-signed certificate for testing (replace with real certificate)
if [ ! -f "/etc/ssl/certs/nutrition-site.com.pem" ]; then
    echo_info "Generating self-signed certificate for testing..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/nutrition-site.com.key \
        -out /etc/ssl/certs/nutrition-site.com.pem \
        -subj "/C=US/ST=State/L=City/O=Organization/CN=nutrition-site.com"
    
    echo_warn "Self-signed certificate generated. Replace with real certificate in production."
    echo_warn "Use: certbot --nginx -d nutrition-site.com -d www.nutrition-site.com"
fi

# Step 8: Setup log rotation
echo_info "Setting up log rotation..."
cat > /etc/logrotate.d/nutrition-platform << EOF
$DEPLOY_PATH/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    notifempty
    create 644 $DEPLOY_USER $DEPLOY_USER
    postrotate
        systemctl reload $SERVICE_NAME > /dev/null 2>&1 || true
    endscript
}

/var/log/nginx/nutrition-site.*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data adm
    postrotate
        systemctl reload nginx > /dev/null 2>&1 || true
    endscript
}
EOF

# Step 9: Configure firewall
echo_info "Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
fi

# Step 10: Start services
echo_info "Starting services..."
systemctl start $SERVICE_NAME
systemctl reload nginx

# Step 11: Verify deployment
echo_info "Verifying deployment..."
sleep 3

# Check if application is running
if systemctl is-active --quiet $SERVICE_NAME; then
    echo_info "✓ Application service is running"
else
    echo_error "✗ Application service failed to start"
    systemctl status $SERVICE_NAME
    exit 1
fi

# Check if nginx is running
if systemctl is-active --quiet nginx; then
    echo_info "✓ Nginx is running"
else
    echo_error "✗ Nginx failed to start"
    systemctl status nginx
    exit 1
fi

# Check if application is responding
if curl -s http://localhost:8080/health > /dev/null; then
    echo_info "✓ Application health check passed"
else
    echo_error "✗ Application health check failed"
    exit 1
fi

echo_info "Deployment completed successfully!"
echo_info "Application Status:"
echo "  - Backend: http://localhost:8080"
echo "  - Frontend: https://nutrition-site.com"
echo "  - Health Check: http://localhost:8080/health"
echo "  - Service Status: systemctl status $SERVICE_NAME"
echo "  - Logs: journalctl -u $SERVICE_NAME -f"

echo_warn "Next steps:"
echo "  1. Update DNS to point to this server"
echo "  2. Replace self-signed certificate with Let's Encrypt:"
echo "     certbot --nginx -d nutrition-site.com -d www.nutrition-site.com"
echo "  3. Test the application thoroughly"
echo "  4. Set up monitoring and backups"
