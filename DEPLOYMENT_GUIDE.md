# 🚀 Deployment Guide - Nutrition Platform

This guide will help you deploy your AI-powered nutrition and health management platform to Render.com.

## 📋 Prerequisites

- ✅ GitHub repository: [https://github.com/doctororganic/nutrition-platform.git](https://github.com/doctororganic/nutrition-platform.git)
- ✅ Render.com account
- ✅ Go 1.22+ installed locally

## 🔧 Configuration Files

### 1. render.yaml
- **Purpose**: Render.com deployment configuration
- **Location**: Project root
- **Features**:
  - Auto-deployment from GitHub
  - Environment variables setup
  - Health check configuration
  - Free tier optimization

### 2. validation_schema.json
- **Purpose**: API validation schema
- **Location**: Project root
- **Features**:
  - Complete API response validation
  - Health check schema
  - User management validation
  - Nutrition and workout plan validation

### 3. Dockerfile
- **Purpose**: Container configuration
- **Location**: Project root
- **Features**:
  - Multi-stage build
  - Alpine Linux base
  - All data files included
  - Port 8080 exposed

## 🚀 Deployment Steps

### Step 1: Verify Local Setup
```powershell
# Run the deployment verification script
.\deploy-render.ps1
```

### Step 2: Push to GitHub
```powershell
# Add all files
git add .

# Commit changes
git commit -m "Add Render deployment configuration"

# Push to GitHub
git push origin main
```

### Step 3: Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect GitHub Repository**:
   - Select "Build and deploy from a Git repository"
   - Choose "doctororganic/nutrition-platform"
4. **Configure Service**:
   - **Name**: `nutrition-platform`
   - **Environment**: `Go`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty (uses project root)
   - **Build Command**: `go mod download && go build -o nutrition-platform .`
   - **Start Command**: `./nutrition-platform`
5. **Environment Variables**:
   - `ENVIRONMENT`: `production`
   - `PORT`: `10000`
   - `HOST`: `0.0.0.0`
   - `JWT_SECRET`: (Generate random string)
   - `API_KEY_SECRET`: (Generate random string)
   - `CORS_ORIGIN`: `*`
6. **Click "Create Web Service"**

## 🔍 Health Check Configuration

The application includes multiple health check endpoints:

- **Primary**: `GET /health`
- **API Health**: `GET /api/v1/health`
- **Detailed Health**: Returns service status, timestamp, and version

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Go version (requires 1.22+)
   - Verify all dependencies in go.mod
   - Check for syntax errors

2. **Health Check Fails**
   - Verify PORT environment variable
   - Check if application starts successfully
   - Review logs in Render dashboard

3. **Connection Issues**
   - Ensure CORS_ORIGIN is set correctly
   - Check if all required environment variables are set
   - Verify the application binds to 0.0.0.0

### Debug Commands

```powershell
# Test local build
go build -o nutrition-platform.exe .

# Test local run
.\nutrition-platform.exe

# Check health endpoint
curl http://localhost:8080/health
```

## 📊 Monitoring

### Render Dashboard
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, and response time
- **Health**: Service health status

### Application Health
- **Endpoint**: `https://your-app.onrender.com/health`
- **Response**: JSON with status and service health

## 🔐 Security Considerations

1. **Environment Variables**:
   - Never commit secrets to GitHub
   - Use Render's environment variable management
   - Generate strong JWT secrets

2. **CORS Configuration**:
   - Set specific origins in production
   - Avoid using `*` for CORS_ORIGIN in production

3. **API Keys**:
   - Implement proper API key validation
   - Use rate limiting for public endpoints

## 📈 Performance Optimization

1. **Build Optimization**:
   - CGO_ENABLED=0 for static binary
   - Alpine Linux for smaller image size
   - Multi-stage Docker build

2. **Runtime Optimization**:
   - Connection pooling
   - Response compression
   - Proper timeout settings

## 🆘 Support

If you encounter issues:

1. **Check Render Logs**: Dashboard → Your Service → Logs
2. **Verify Configuration**: Ensure all environment variables are set
3. **Test Locally**: Run the application locally first
4. **Review Documentation**: Check Go and Echo framework docs

## 🎉 Success!

Once deployed, your application will be available at:
`https://your-app-name.onrender.com`

### Key Endpoints:
- **Health Check**: `/health`
- **API Documentation**: `/api/v1/docs`
- **Frontend**: `/` (serves the PWA)

---

**Last Updated**: $(Get-Date)
**Version**: 1.0.0
