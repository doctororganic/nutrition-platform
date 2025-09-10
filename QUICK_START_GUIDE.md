# Quick Start Guide - Testing New API Keys

## 🚀 Start the Server

```bash
go run main.go
```

The server will start on `http://localhost:8080`

## 🔑 Test API Keys

### 1. **Metabolism Specialist Key**
```bash
curl -H "Authorization: APIKey nhp_c3d648d12db097fe52e260f1a5c52ba8347be0870203e2e62aaf6bd39bea630b" \
     http://localhost:8080/api/metabolism
```

### 2. **Disease Management Expert Key**
```bash
curl -H "Authorization: APIKey nhp_639bec06a8cdc10ac54f5406577924843053ffe3d01bcb420310b42fac16c9a8" \
     http://localhost:8080/api/old-diseases
```

### 3. **Workout & Meal Planning Specialist Key**
```bash
curl -H "Authorization: APIKey nhp_7d4b1f72fc8e9a57ac5c975218b7138e999c5a0e20cea7f06542c4b2f1549e87" \
     http://localhost:8080/api/workout-techniques
```

### 4. **Nutrition & Supplements Expert Key**
```bash
curl -H "Authorization: APIKey nhp_6cc950499e9bf83eff426c100cbfb8f82d36c563c0a5e51ec90382186c477237" \
     http://localhost:8080/api/drug-nutrition
```

## 📊 Test All Endpoints

### Metabolism Data
```bash
# Get all metabolism data
curl -H "Authorization: APIKey nhp_c3d648d12db097fe52e260f1a5c52ba8347be0870203e2e62aaf6bd39bea630b" \
     http://localhost:8080/api/metabolism

# Search metabolism data
curl -H "Authorization: APIKey nhp_c3d648d12db097fe52e260f1a5c52ba8347be0870203e2e62aaf6bd39bea630b" \
     "http://localhost:8080/api/metabolism/search?q=exercise"
```

### Old Diseases Data
```bash
# Get all old diseases data
curl -H "Authorization: APIKey nhp_639bec06a8cdc10ac54f5406577924843053ffe3d01bcb420310b42fac16c9a8" \
     http://localhost:8080/api/old-diseases

# Search old diseases data
curl -H "Authorization: APIKey nhp_639bec06a8cdc10ac54f5406577924843053ffe3d01bcb420310b42fac16c9a8" \
     "http://localhost:8080/api/old-diseases/search?q=diabetes"
```

### Workout Techniques
```bash
# Get all workout techniques
curl -H "Authorization: APIKey nhp_7d4b1f72fc8e9a57ac5c975218b7138e999c5a0e20cea7f06542c4b2f1549e87" \
     http://localhost:8080/api/workout-techniques
```

### Meal Plans
```bash
# Get all meal plans
curl -H "Authorization: APIKey nhp_7d4b1f72fc8e9a57ac5c975218b7138e999c5a0e20cea7f06542c4b2f1549e87" \
     http://localhost:8080/api/meal-plans
```

### Calories
```bash
# Get all calories data
curl -H "Authorization: APIKey nhp_7d4b1f72fc8e9a57ac5c975218b7138e999c5a0e20cea7f06542c4b2f1549e87" \
     http://localhost:8080/api/calories
```

### Drug Nutrition Effects
```bash
# Get drug nutrition effects
curl -H "Authorization: APIKey nhp_6cc950499e9bf83eff426c100cbfb8f82d36c563c0a5e51ec90382186c477237" \
     http://localhost:8080/api/drug-nutrition
```

### Vitamins & Minerals
```bash
# Get all vitamins and minerals data
curl -H "Authorization: APIKey nhp_6cc950499e9bf83eff426c100cbfb8f82d36c563c0a5e51ec90382186c477237" \
     http://localhost:8080/api/vitamins-minerals
```

## 🔧 Admin Functions

### Get Available Data Types
```bash
curl http://localhost:8080/api/health-data/types
```

### Get Health Data Statistics (Admin Only)
```bash
curl -H "Authorization: APIKey nhp_d9337a3e303d6d23fe6126cd2f1466f98b056f3dddfbf5bfcacb7e1fc8c54f38" \
     http://localhost:8080/api/health-data/stats
```

### Reload Data Files (Admin Only)
```bash
curl -X POST -H "Authorization: APIKey nhp_d9337a3e303d6d23fe6126cd2f1466f98b056f3dddfbf5bfcacb7e1fc8c54f38" \
     http://localhost:8080/api/health-data/reload
```

## 📋 API Key Management

### List All API Keys (Admin Only)
```bash
curl -H "Authorization: APIKey nhp_d9337a3e303d6d23fe6126cd2f1466f98b056f3dddfbf5bfcacb7e1fc8c54f38" \
     http://localhost:8080/api/keys
```

### Create New API Key (Admin Only)
```bash
curl -X POST -H "Authorization: APIKey nhp_d9337a3e303d6d23fe6126cd2f1466f98b056f3dddfbf5bfcacb7e1fc8c54f38" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Custom Health Data Key",
       "permissions": ["metabolism:read", "old_diseases:read", "workout_techniques:read"],
       "rate_limit": 1000
     }' \
     http://localhost:8080/api/keys
```

### Validate API Key
```bash
curl -H "Authorization: APIKey nhp_c3d648d12db097fe52e260f1a5c52ba8347be0870203e2e62aaf6bd39bea630b" \
     http://localhost:8080/api/keys/validate
```

## 🎯 Expected Responses

### Successful Response Format
```json
{
  "success": true,
  "data": {
    // Your requested data here
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🔍 Troubleshooting

### Common Issues

1. **"API key not found"** - Check that the API key is correct
2. **"Permission denied"** - The API key doesn't have the required permission
3. **"Rate limit exceeded"** - Too many requests with this API key
4. **"File not found"** - Some JSON files need proper formatting

### Check Server Status
```bash
curl http://localhost:8080/health
```

### View API Documentation
```bash
curl http://localhost:8080/api
```

## ✅ Success Indicators

- All API endpoints return `200 OK` status
- JSON responses are properly formatted
- API keys work with their designated permissions
- Rate limiting is working correctly
- Admin functions require admin API keys

Your Doctorhealthy1 platform is now ready for testing with all the new API key features!
