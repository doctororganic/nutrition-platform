# Nutrition Platform Deployment Guide

This guide provides step-by-step instructions for deploying the Nutrition Platform to Hostinger using nginx, systemd, and SSL/TLS.

## 🚀 Quick Deployment

### Prerequisites
- Hostinger VPS with Ubuntu 20.04+ or similar Linux distribution
- Domain name pointing to your server IP
- SSH access to your server
- Go 1.19+ installed locally for building

### 1. Build and Upload

```bash
# Make scripts executable
chmod +x deployment/*.sh

# Build for production
./deployment/build.sh

# Upload to server (replace with your details)
./deployment/upload.sh YOUR_SERVER_IP YOUR_USERNAME
```

### 2. Manual Deployment (if upload script doesn't work)

```bash
# Build the application
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o nutrition-platform .

# Create deployment package
tar -czf nutrition-platform-deploy.tar.gz \
    nutrition-platform \
    frontend/ \
    deployment/

# Upload to server
scp nutrition-platform-deploy.tar.gz user@your-server:/tmp/

# SSH to server and extract
ssh user@your-server
cd /tmp
tar -xzf nutrition-platform-deploy.tar.gz
sudo ./deployment/deploy.sh production
```

## 📋 Deployment Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                        Internet                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                ┌─────▼─────┐
                │   nginx   │ (Port 443/80)
                │ - SSL/TLS │
                │ - Brotli  │
                │ - Cache   │
                └─────┬─────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   ┌────▼────┐  ┌─────▼─────┐ ┌─────▼─────┐
   │  Static │  │    API    │ │  Health   │
   │  Files  │  │ Endpoints │ │   Check   │ 
   │ (PWA)   │  │           │ │           │
   └─────────┘  └─────┬─────┘ └───────────┘
                      │
                ┌─────▼─────┐
                │    Go     │ (Port 8080)
                │ Echo App  │
                │ systemd   │
                └───────────┘
```

### Directory Structure on Server

```
/opt/nutrition-platform/
├── nutrition-platform          # Go binary
└── logs/                      # Application logs

/var/www/nutrition-platform/
└── frontend/                  # PWA static files
    ├── index.html
    ├── js/
    ├── css/
    └── assets/

/etc/nginx/sites-available/
└── nutrition-site.conf        # nginx configuration

/etc/systemd/system/
└── nutrition-platform.service # systemd service
```

## ⚙️ Configuration Details

### nginx Configuration Features

- **SSL/TLS**: TLS 1.2/1.3 with modern cipher suites
- **HTTP/2**: Enabled for better performance
- **Brotli Compression**: For text assets (JS, CSS, HTML)
- **Rate Limiting**: 
  - Anonymous users: 100 requests/minute
  - Authenticated users: 500 requests/minute
- **Caching**: Far-future expires for static assets
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.
- **CORS**: Configured for API endpoints

### systemd Service Features

- **User**: Runs as `www-data` for security
- **Auto-restart**: Restarts on failure
- **Security**: Hardened with various protection settings
- **Resource Limits**: NOFILE and NPROC limits
- **Environment**: Production mode settings

### SSL/TLS Setup

The deployment script creates a self-signed certificate for testing. For production:

```bash
# Install Let's Encrypt certificate
sudo certbot --nginx -d nutrition-site.com -d www.nutrition-site.com

# Auto-renewal (already configured)
sudo crontab -l | grep -q certbot || echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

## 🔧 Management Commands

### Service Management

```bash
# Check status
sudo systemctl status nutrition-platform

# Start/stop/restart
sudo systemctl start nutrition-platform
sudo systemctl stop nutrition-platform
sudo systemctl restart nutrition-platform

# View logs
sudo journalctl -u nutrition-platform -f

# nginx
sudo systemctl reload nginx
sudo nginx -t  # test configuration
```

### Monitoring

```bash
# Use the monitoring script
./deployment/monitor.sh status    # Comprehensive status
./deployment/monitor.sh check     # Health checks only
./deployment/monitor.sh logs      # View logs
sudo ./deployment/monitor.sh restart  # Restart services
```

### Log Files

```bash
# Application logs
sudo journalctl -u nutrition-platform -f

# nginx logs
sudo tail -f /var/log/nginx/nutrition-site.access.log
sudo tail -f /var/log/nginx/nutrition-site.error.log

# System logs
sudo dmesg | tail
```

## 🔒 Security Features

### Application Security
- CORS properly configured
- Rate limiting by IP and user
- Security headers (HSTS, CSP, etc.)
- Input validation with validator v10
- JWT token authentication

### System Security
- Service runs as non-root user
- Firewall configured (UFW)
- SSL/TLS with modern ciphers
- File permissions properly set
- systemd security features enabled

### nginx Security Headers

```nginx
# Already included in configuration
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Frame-Options SAMEORIGIN always;
add_header X-Content-Type-Options nosniff always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "..." always;
```

## 📊 Performance Optimizations

### Compression
- Brotli compression for text assets
- Gzip fallback for older browsers
- Optimal compression levels

### Caching
```nginx
# Static assets - 1 year cache
expires 1y;
add_header Cache-Control "public, immutable";

# HTML files - 1 hour cache with revalidation
expires 1h;
add_header Cache-Control "public, must-revalidate";

# Service Worker - no cache
add_header Cache-Control "no-cache, no-store, must-revalidate";
```

### Connection Optimization
- HTTP/2 enabled
- Keep-alive connections
- Upstream connection pooling

## 🚨 Troubleshooting

### Common Issues

1. **Service won't start**
   ```bash
   sudo systemctl status nutrition-platform
   sudo journalctl -u nutrition-platform --no-pager
   ```

2. **nginx configuration errors**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **SSL certificate issues**
   ```bash
   sudo certbot certificates
   sudo certbot renew --dry-run
   ```

4. **Port conflicts**
   ```bash
   sudo netstat -tlpn | grep :8080
   sudo lsof -i :8080
   ```

5. **Permission issues**
   ```bash
   sudo chown -R www-data:www-data /opt/nutrition-platform
   sudo chown -R www-data:www-data /var/www/nutrition-platform
   ```

### Health Checks

```bash
# Application health
curl http://localhost:8080/health

# nginx status
curl -I https://nutrition-site.com

# SSL certificate
openssl s_client -connect nutrition-site.com:443 -servername nutrition-site.com
```

## 🔄 Updates and Maintenance

### Updating the Application

1. Build new version locally
2. Upload using the upload script
3. The deployment script will handle service restart

### Log Rotation

Automatic log rotation is configured for:
- Application logs in `/opt/nutrition-platform/logs/`
- nginx logs in `/var/log/nginx/`

### Backup Recommendations

- Database backups (if using external DB)
- SSL certificates
- Configuration files
- Application logs (if needed)

### Monitoring Setup

Consider setting up:
- Uptime monitoring (UptimeRobot, Pingdom)
- Log aggregation (ELK stack, Grafana)
- Performance monitoring (New Relic, DataDog)
- Alerting for critical issues

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review application and nginx logs
3. Use the monitoring script for diagnostics
4. Check firewall and network connectivity

---

**Note**: This deployment is production-ready but may need customization for specific requirements. Always test thoroughly before deploying to production.
