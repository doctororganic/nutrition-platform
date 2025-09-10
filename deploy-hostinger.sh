#!/bin/bash

# DoctorHealthy1 Platform - Hostinger VPS Deployment Script
# Domain: ieltspass1.com
# Email: kHaledalzayat278@gmail.com

set -e

echo "🚀 Starting DoctorHealthy1 Platform Deployment to Hostinger VPS"
echo "Domain: ieltspass1.com"
echo "=========================================="

# Configuration
DOMAIN="ieltspass1.com"
APP_NAME="doctorhealthy1"
APP_DIR="/var/www/$APP_NAME"
SERVICE_NAME="doctorhealthy1"
NGINX_SITE="doctorhealthy1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
print_status "Installing required packages..."
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx ufw fail2ban htop

# Install Go
print_status "Installing Go..."
if ! command -v go &> /dev/null; then
    GO_VERSION="1.22.0"
    wget https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz
    sudo tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
    echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee -a /etc/profile
    export PATH=$PATH:/usr/local/go/bin
    rm go${GO_VERSION}.linux-amd64.tar.gz
    print_success "Go installed successfully"
else
    print_success "Go is already installed"
fi

# Create application directory
print_status "Creating application directory..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Copy application files
print_status "Copying application files..."
cp -r . $APP_DIR/
cd $APP_DIR

# Set up Go module
print_status "Setting up Go module..."
go mod tidy
go mod download

# Build the application
print_status "Building the application..."
CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Create systemd service
print_status "Creating systemd service..."
sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null <<EOF
[Unit]
Description=DoctorHealthy1 Platform
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
ExecStart=$APP_DIR/main
Restart=always
RestartSec=5
Environment=PORT=8080
Environment=ENV=production
Environment=CORS_ALLOWED_ORIGINS=https://$DOMAIN,https://www.$DOMAIN

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
EOF

# Create Nginx configuration
print_status "Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/$NGINX_SITE > /dev/null <<EOF
# DoctorHealthy1 Platform Nginx Configuration
upstream doctorhealthy1_backend {
    server 127.0.0.1:8080 max_fails=3 fail_timeout=30s;
    keepalive 32;
}

# Rate limiting
limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone \$binary_remote_addr zone=auth:10m rate=5r/s;

server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;
    
    # Static files
    location ~* \.(jpg|jpeg|png|gif|ico|svg|css|js|woff|woff2|ttf|eot)$ {
        root $APP_DIR/frontend;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
    }
    
    # PWA files
    location = /manifest.json {
        root $APP_DIR/frontend;
        expires 1d;
        add_header Cache-Control "public, max-age=86400";
        add_header Content-Type "application/manifest+json";
    }
    
    location = /sw.js {
        root $APP_DIR/frontend;
        expires 0;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Content-Type "application/javascript";
    }
    
    # API routes
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        
        proxy_pass http://doctorhealthy1_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 30s;
        proxy_connect_timeout 10s;
        proxy_send_timeout 30s;
    }
    
    # Health check
    location = /health {
        proxy_pass http://doctorhealthy1_backend;
        access_log off;
    }
    
    # Main application
    location / {
        root $APP_DIR/frontend;
        try_files \$uri \$uri/ /index.html;
        
        # HTML caching
        location ~* \.html$ {
            expires 1h;
            add_header Cache-Control "public, max-age=3600";
        }
    }
    
    # Deny access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # Logs
    access_log /var/log/nginx/doctorhealthy1-access.log;
    error_log /var/log/nginx/doctorhealthy1-error.log;
}
EOF

# Enable Nginx site
print_status "Enabling Nginx site..."
sudo ln -sf /etc/nginx/sites-available/$NGINX_SITE /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
print_status "Testing Nginx configuration..."
sudo nginx -t

# Configure firewall
print_status "Configuring firewall..."
sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 80
sudo ufw allow 443

# Start and enable services
print_status "Starting services..."
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME
sudo systemctl start $SERVICE_NAME
sudo systemctl enable nginx
sudo systemctl restart nginx

# Wait for service to start
sleep 5

# Check service status
if sudo systemctl is-active --quiet $SERVICE_NAME; then
    print_success "DoctorHealthy1 service is running"
else
    print_error "DoctorHealthy1 service failed to start"
    sudo systemctl status $SERVICE_NAME
    exit 1
fi

if sudo systemctl is-active --quiet nginx; then
    print_success "Nginx is running"
else
    print_error "Nginx failed to start"
    sudo systemctl status nginx
    exit 1
fi

# Test application
print_status "Testing application..."
if curl -f http://localhost:8080/health > /dev/null 2>&1; then
    print_success "Application health check passed"
else
    print_error "Application health check failed"
    exit 1
fi

# Setup SSL with Let's Encrypt
print_status "Setting up SSL certificate..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email kHaledalzayat278@gmail.com

# Configure automatic SSL renewal
print_status "Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Setup log rotation
print_status "Setting up log rotation..."
sudo tee /etc/logrotate.d/doctorhealthy1 > /dev/null <<EOF
$APP_DIR/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        systemctl reload $SERVICE_NAME
    endscript
}
EOF

# Create monitoring script
print_status "Creating monitoring script..."
tee $APP_DIR/monitor.sh > /dev/null <<EOF
#!/bin/bash
# Monitor script for DoctorHealthy1 Platform

APP_NAME="$SERVICE_NAME"
LOG_FILE="$APP_DIR/monitor.log"

echo "\$(date): Checking $APP_NAME service..." >> \$LOG_FILE

if ! systemctl is-active --quiet \$APP_NAME; then
    echo "\$(date): Service is down, restarting..." >> \$LOG_FILE
    systemctl restart \$APP_NAME
    echo "\$(date): Service restarted" >> \$LOG_FILE
fi

if ! curl -f http://localhost:8080/health > /dev/null 2>&1; then
    echo "\$(date): Health check failed, restarting service..." >> \$LOG_FILE
    systemctl restart \$APP_NAME
    echo "\$(date): Service restarted after health check failure" >> \$LOG_FILE
fi
EOF

chmod +x $APP_DIR/monitor.sh

# Setup monitoring cron job
print_status "Setting up monitoring..."
(crontab -l 2>/dev/null; echo "*/5 * * * * $APP_DIR/monitor.sh") | crontab -

# Final status check
print_status "Performing final status check..."
sleep 10

if curl -f http://localhost:8080/health > /dev/null 2>&1; then
    print_success "✅ Application is running successfully"
else
    print_error "❌ Application health check failed"
    exit 1
fi

if curl -f http://localhost/api > /dev/null 2>&1; then
    print_success "✅ Nginx proxy is working"
else
    print_error "❌ Nginx proxy test failed"
    exit 1
fi

# Display final information
echo ""
echo "🎉 Deployment completed successfully!"
echo "=========================================="
echo "🌐 Application URL: https://$DOMAIN"
echo "📊 API Documentation: https://$DOMAIN/api"
echo "❤️  Health Check: https://$DOMAIN/health"
echo "📁 Application Directory: $APP_DIR"
echo "🔧 Service Name: $SERVICE_NAME"
echo ""
echo "📋 Useful commands:"
echo "  sudo systemctl status $SERVICE_NAME    # Check service status"
echo "  sudo systemctl restart $SERVICE_NAME   # Restart service"
echo "  sudo journalctl -u $SERVICE_NAME -f    # View logs"
echo "  sudo nginx -t                          # Test Nginx config"
echo "  sudo systemctl reload nginx            # Reload Nginx"
echo ""
echo "🔒 Security features enabled:"
echo "  - SSL/TLS encryption"
echo "  - Rate limiting"
echo "  - Firewall (UFW)"
echo "  - Fail2ban protection"
echo "  - Automatic SSL renewal"
echo "  - Log rotation"
echo "  - Service monitoring"
echo ""
print_success "🚀 DoctorHealthy1 Platform is now live at https://$DOMAIN"

