# 🚀 Hostinger Deployment Checklist

## Pre-Deployment Checklist

### ✅ Local Environment
- [ ] Go 1.19+ installed and working
- [ ] Application builds successfully (`go build .`)
- [ ] All tests pass (`go test ./...`)
- [ ] Frontend files are ready in `frontend/` directory
- [ ] Environment configuration is set up (`js/config.js`)

### ✅ Server Preparation
- [ ] Hostinger VPS is provisioned
- [ ] SSH access is configured
- [ ] Domain name is purchased and configured
- [ ] DNS A record points to server IP
- [ ] Server has Ubuntu 20.04+ or compatible Linux distribution

### ✅ Required Server Access
- [ ] Root or sudo access available
- [ ] Server IP address confirmed
- [ ] SSH key or password authentication working
- [ ] Firewall allows SSH (port 22), HTTP (port 80), HTTPS (port 443)

## 🛠️ Deployment Steps

### Step 1: Build Application
```bash
# Navigate to project directory
cd "d:\VS new healthy1"

# Make scripts executable (if on Linux/WSL)
chmod +x deployment/*.sh

# Build application for production
./deployment/build.sh
```

### Step 2: Upload to Server
```bash
# Option A: Automated upload (recommended)
./deployment/upload.sh YOUR_SERVER_IP YOUR_USERNAME

# Option B: Manual upload
scp -r nutrition-platform frontend/ deployment/ user@server:/tmp/nutrition-deploy/
```

### Step 3: Server Deployment
```bash
# SSH to server
ssh user@your-server

# Run deployment script
cd /tmp/nutrition-deploy
sudo ./deployment/deploy.sh production
```

### Step 4: SSL Certificate Setup
```bash
# SSH to server
ssh user@your-server

# Install Let's Encrypt certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Verify auto-renewal
sudo certbot renew --dry-run
```

## 🔧 Post-Deployment Verification

### ✅ Service Status
- [ ] Application service is running: `sudo systemctl status nutrition-platform`
- [ ] nginx is running: `sudo systemctl status nginx`
- [ ] Services auto-start on boot: `sudo systemctl is-enabled nutrition-platform nginx`

### ✅ Network Connectivity
- [ ] Health check responds: `curl http://localhost:8080/health`
- [ ] API endpoints accessible: `curl https://your-domain.com/api/health`
- [ ] Frontend loads: `curl https://your-domain.com`
- [ ] HTTPS redirect works: `curl -I http://your-domain.com`

### ✅ SSL/TLS Configuration
- [ ] SSL certificate is valid: `openssl s_client -connect your-domain.com:443`
- [ ] SSL Labs test passes: https://www.ssllabs.com/ssltest/
- [ ] HSTS headers present: `curl -I https://your-domain.com`
- [ ] Mixed content warnings resolved

### ✅ Performance & Security
- [ ] Gzip/Brotli compression working: Check response headers
- [ ] Static file caching configured: Check `Cache-Control` headers
- [ ] Rate limiting functional: Test with multiple rapid requests
- [ ] Security headers present: Check CSP, X-Frame-Options, etc.

### ✅ Monitoring Setup
- [ ] Log rotation configured: Check `/etc/logrotate.d/nutrition-platform`
- [ ] Monitoring script works: `./deployment/monitor.sh check`
- [ ] Error alerting configured (optional)
- [ ] Uptime monitoring setup (optional)

## 🔍 Testing Checklist

### ✅ Frontend Testing
- [ ] Home page loads correctly
- [ ] Navigation works between sections
- [ ] Forms submit successfully
- [ ] PWA features work (offline, install prompt)
- [ ] Mobile responsiveness verified
- [ ] Both English and Arabic languages work

### ✅ Backend API Testing
- [ ] Health endpoint: `GET /health`
- [ ] Authentication endpoints work
- [ ] Diet calculation API functional
- [ ] Workout generation API functional
- [ ] Patient consultation API functional
- [ ] Error handling works properly

### ✅ Integration Testing
- [ ] Frontend-backend communication works
- [ ] CORS headers configured correctly
- [ ] File uploads work (if applicable)
- [ ] API rate limiting enforced
- [ ] Authentication flow complete

## 🚨 Troubleshooting Commands

### Service Issues
```bash
# Check service status
sudo systemctl status nutrition-platform
sudo journalctl -u nutrition-platform -f

# Restart services
sudo systemctl restart nutrition-platform
sudo systemctl reload nginx

# Check configuration
sudo nginx -t
./deployment/monitor.sh status
```

### Network Issues
```bash
# Check port usage
sudo netstat -tlpn | grep :8080
sudo lsof -i :8080

# Check firewall
sudo ufw status
sudo iptables -L

# Test connectivity
curl -v http://localhost:8080/health
curl -v https://your-domain.com/api/health
```

### SSL Issues
```bash
# Check certificate
sudo certbot certificates
openssl x509 -in /etc/ssl/certs/nutrition-site.com.pem -text -noout

# Renew certificate
sudo certbot renew
sudo systemctl reload nginx
```

## 📊 Performance Optimization

### ✅ After Deployment
- [ ] Enable CDN for static assets (optional)
- [ ] Set up database connection pooling (if using external DB)
- [ ] Configure log aggregation
- [ ] Set up automated backups
- [ ] Monitor application performance
- [ ] Optimize images and assets

### ✅ Security Hardening
- [ ] Change default passwords
- [ ] Disable unnecessary services
- [ ] Configure fail2ban (optional)
- [ ] Regular security updates
- [ ] Monitor security logs

## 🔄 Maintenance Tasks

### Daily
- [ ] Check application logs for errors
- [ ] Monitor disk space usage
- [ ] Verify SSL certificate validity

### Weekly
- [ ] Review access logs
- [ ] Check system updates
- [ ] Backup important data

### Monthly
- [ ] Security audit
- [ ] Performance review
- [ ] Update dependencies

## 📞 Emergency Contacts

### Important Information
- **Server IP**: ________________
- **Domain**: ________________
- **Hosting Provider**: Hostinger
- **SSL Provider**: Let's Encrypt
- **Deployment Date**: ________________

### Commands for Emergency
```bash
# Quick health check
./deployment/monitor.sh check

# Emergency restart
sudo ./deployment/monitor.sh restart

# Check all logs
./deployment/monitor.sh logs 100
```

---

**📝 Notes:**
- Replace `YOUR_SERVER_IP`, `YOUR_USERNAME`, and `your-domain.com` with actual values
- Keep this checklist updated with your specific configuration
- Document any custom modifications made to the deployment
- Save important passwords and credentials securely

**🎉 Congratulations!** 
Once all items are checked, your Nutrition Platform should be fully deployed and operational on Hostinger with nginx, SSL/TLS, and all optimizations configured!
