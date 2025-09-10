#!/bin/bash

# Monitoring script for Nutrition Platform
# Usage: ./monitor.sh [check|status|logs|restart]

set -e

# Configuration
SERVICE_NAME="nutrition-platform"
NGINX_SERVICE="nginx"
APP_PORT="8080"
HEALTH_ENDPOINT="http://localhost:$APP_PORT/health"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

echo_status() {
    echo -e "${BLUE}[STATUS]${NC} $1"
}

# Function to check service status
check_service() {
    local service=$1
    if systemctl is-active --quiet $service; then
        echo_info "✓ $service is running"
        return 0
    else
        echo_error "✗ $service is not running"
        return 1
    fi
}

# Function to check application health
check_health() {
    if curl -s --max-time 5 $HEALTH_ENDPOINT > /dev/null 2>&1; then
        echo_info "✓ Application health check passed"
        return 0
    else
        echo_error "✗ Application health check failed"
        return 1
    fi
}

# Function to check disk space
check_disk_space() {
    local usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ $usage -gt 90 ]; then
        echo_error "✗ Disk space critical: ${usage}% used"
        return 1
    elif [ $usage -gt 80 ]; then
        echo_warn "⚠ Disk space warning: ${usage}% used"
        return 0
    else
        echo_info "✓ Disk space OK: ${usage}% used"
        return 0
    fi
}

# Function to check memory usage
check_memory() {
    local memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ $memory_usage -gt 90 ]; then
        echo_error "✗ Memory usage critical: ${memory_usage}%"
        return 1
    elif [ $memory_usage -gt 80 ]; then
        echo_warn "⚠ Memory usage warning: ${memory_usage}%"
        return 0
    else
        echo_info "✓ Memory usage OK: ${memory_usage}%"
        return 0
    fi
}

# Function to check SSL certificate
check_ssl() {
    local domain="nutrition-site.com"
    local cert_file="/etc/ssl/certs/nutrition-site.com.pem"
    
    if [ -f "$cert_file" ]; then
        local expiry=$(openssl x509 -enddate -noout -in "$cert_file" | cut -d= -f2)
        local expiry_epoch=$(date -d "$expiry" +%s)
        local current_epoch=$(date +%s)
        local days_left=$(( (expiry_epoch - current_epoch) / 86400 ))
        
        if [ $days_left -lt 7 ]; then
            echo_error "✗ SSL certificate expires in $days_left days"
            return 1
        elif [ $days_left -lt 30 ]; then
            echo_warn "⚠ SSL certificate expires in $days_left days"
            return 0
        else
            echo_info "✓ SSL certificate valid for $days_left days"
            return 0
        fi
    else
        echo_warn "⚠ SSL certificate file not found"
        return 0
    fi
}

# Function to show comprehensive status
show_status() {
    echo_status "=== Nutrition Platform Status ==="
    echo ""
    
    echo_status "Services:"
    check_service $SERVICE_NAME
    check_service $NGINX_SERVICE
    
    echo ""
    echo_status "Application Health:"
    check_health
    
    echo ""
    echo_status "System Resources:"
    check_disk_space
    check_memory
    
    echo ""
    echo_status "SSL Certificate:"
    check_ssl
    
    echo ""
    echo_status "Service Details:"
    systemctl status $SERVICE_NAME --no-pager -l
    
    echo ""
    echo_status "Recent Application Logs:"
    journalctl -u $SERVICE_NAME --no-pager -n 10
    
    echo ""
    echo_status "Nginx Status:"
    systemctl status $NGINX_SERVICE --no-pager -l
}

# Function to perform health checks
perform_checks() {
    echo_status "=== Health Checks ==="
    
    local checks_passed=0
    local total_checks=5
    
    check_service $SERVICE_NAME && ((checks_passed++)) || true
    check_service $NGINX_SERVICE && ((checks_passed++)) || true
    check_health && ((checks_passed++)) || true
    check_disk_space && ((checks_passed++)) || true
    check_memory && ((checks_passed++)) || true
    
    echo ""
    echo_status "Health Check Summary: $checks_passed/$total_checks checks passed"
    
    if [ $checks_passed -eq $total_checks ]; then
        echo_info "🎉 All health checks passed!"
        exit 0
    elif [ $checks_passed -ge 3 ]; then
        echo_warn "⚠ Some health checks failed, but system is functional"
        exit 1
    else
        echo_error "💥 Critical health check failures detected!"
        exit 2
    fi
}

# Function to show logs
show_logs() {
    local lines=${1:-50}
    echo_status "=== Application Logs (last $lines lines) ==="
    journalctl -u $SERVICE_NAME --no-pager -n $lines
    
    echo ""
    echo_status "=== Nginx Access Logs (last $lines lines) ==="
    tail -n $lines /var/log/nginx/nutrition-site.access.log 2>/dev/null || echo_warn "Access log not found"
    
    echo ""
    echo_status "=== Nginx Error Logs (last $lines lines) ==="
    tail -n $lines /var/log/nginx/nutrition-site.error.log 2>/dev/null || echo_warn "Error log not found"
}

# Function to restart services
restart_services() {
    echo_info "Restarting Nutrition Platform services..."
    
    echo_info "Stopping application service..."
    systemctl stop $SERVICE_NAME
    
    echo_info "Starting application service..."
    systemctl start $SERVICE_NAME
    
    echo_info "Reloading nginx..."
    systemctl reload $NGINX_SERVICE
    
    sleep 3
    
    echo_info "Verifying services..."
    if check_service $SERVICE_NAME && check_service $NGINX_SERVICE; then
        echo_info "✓ Services restarted successfully"
        check_health
    else
        echo_error "✗ Service restart failed"
        exit 1
    fi
}

# Main script logic
case "${1:-status}" in
    "check")
        perform_checks
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs ${2:-50}
        ;;
    "restart")
        if [[ $EUID -ne 0 ]]; then
            echo_error "Restart requires root privileges (use sudo)"
            exit 1
        fi
        restart_services
        ;;
    *)
        echo "Usage: $0 [check|status|logs|restart]"
        echo ""
        echo "Commands:"
        echo "  check   - Perform health checks and exit with status code"
        echo "  status  - Show comprehensive system status"
        echo "  logs    - Show recent logs (optional: specify number of lines)"
        echo "  restart - Restart services (requires sudo)"
        echo ""
        echo "Examples:"
        echo "  $0 check"
        echo "  $0 status"
        echo "  $0 logs 100"
        echo "  sudo $0 restart"
        exit 1
        ;;
esac
