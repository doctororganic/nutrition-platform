# 🏋️ Workout Management & 🏥 Disease Management Systems

## Overview

This document describes the implementation of two comprehensive management systems for the Doctorhealthy1 platform:

1. **Workout Management System** - Personalized workout planning with injury and complaint management
2. **Disease Management System** - Comprehensive disease management with medication interactions

## 🏋️ Workout Management System

### Features

#### **1. Personalized Workout Planning**
- **Client Data Collection**: Name, weight, height, gender, activity level, workout goal, workout type (gym/home)
- **Goal Support**: Muscle gain, weight loss, strength building, general fitness, endurance
- **Injury Management**: Automatic exercise filtering based on client injuries
- **Complaint Solutions**: Health complaint management with nutritional and supplement advice
- **Equipment-Based Filtering**: Gym equipment vs. home/bodyweight exercises

#### **2. Exercise Management**
- **Exercise Types**: Strength, cardio, flexibility, HIIT, functional training
- **Muscle Group Targeting**: Chest, back, legs, shoulders, arms, core, full body
- **Difficulty Levels**: Beginner, intermediate, advanced
- **Equipment Types**: Gym, home, bodyweight, resistance bands, free weights
- **Exercise Alternatives**: Multiple options for each exercise to prevent boredom

#### **3. Weekly Schedule Generation**
- **Smart Scheduling**: Based on workout goals and client capabilities
- **Rest Day Management**: Automatic rest day placement
- **Progressive Overload**: Gradually increasing intensity
- **Variety**: Different focus areas each day (push/pull/legs, etc.)

#### **4. Injury & Complaint Management**
- **Injury Database**: Comprehensive injury information with treatment plans
- **Exercise Compatibility**: Safe exercises for specific injuries
- **Complaint Solutions**: Nutritional advice and supplement recommendations
- **Medical Disclaimers**: Automatic disclaimer generation for health conditions

### API Endpoints

#### **Core Workout Management**
```
POST /api/workout-management/generate          # Generate personalized workout plan
GET  /api/workout-management/exercise-types    # Get available exercise types
GET  /api/workout-management/goals             # Get available workout goals
GET  /api/workout-management/equipment-types   # Get available equipment types
GET  /api/workout-management/muscle-groups     # Get available muscle groups
GET  /api/workout-management/difficulty-levels # Get available difficulty levels
POST /api/workout-management/validate          # Validate workout request
GET  /api/workout-management/statistics        # Get system statistics
```

#### **Injury Management**
```
GET  /api/workout-management/injuries          # Get available injuries
GET  /api/workout-management/injuries/:injuryID # Get detailed injury information
```

#### **Complaint Management**
```
GET  /api/workout-management/complaints        # Get available complaints
GET  /api/workout-management/complaints/:complaintID # Get detailed complaint information
```

#### **Exercise Filtering**
```
GET  /api/workout-management/exercises/by-goal      # Get exercises by goal
GET  /api/workout-management/exercises/by-equipment # Get exercises by equipment
```

### Data Models

#### **WorkoutClientData**
```go
type WorkoutClientData struct {
    Name         string   `json:"name"`
    Weight       float64  `json:"weight"`
    Height       float64  `json:"height"`
    Gender       string   `json:"gender"`
    ActivityLevel string  `json:"activity_level"`
    WorkoutGoal  string   `json:"workout_goal"`
    WorkoutType  string   `json:"workout_type"` // gym/home
    Injuries     []string `json:"injuries"`
    Complaints   []string `json:"complaints"`
    Age          int      `json:"age"`
}
```

#### **WorkoutPlan**
```go
type WorkoutPlan struct {
    ID              string       `json:"id"`
    ClientData      WorkoutClientData `json:"client_data"`
    Goal            string       `json:"goal"`
    WorkoutType     string       `json:"workout_type"`
    Duration        string       `json:"duration"`
    Frequency       string       `json:"frequency"`
    WeeklySchedule  []DayPlan    `json:"weekly_schedule"`
    Exercises       []Exercise   `json:"exercises"`
    Alternatives    []Exercise   `json:"alternatives"`
    InjuryAdvice    []Injury     `json:"injury_advice"`
    ComplaintAdvice []Complaint  `json:"complaint_advice"`
    CreatedAt       time.Time    `json:"created_at"`
}
```

### Example Usage

#### **Generate Workout Plan**
```json
{
  "client_data": {
    "name": "Ahmed",
    "weight": 75.0,
    "height": 175.0,
    "gender": "male",
    "activity_level": "moderate",
    "workout_goal": "muscle_gain",
    "workout_type": "gym",
    "age": 28,
    "injuries": [],
    "complaints": []
  },
  "goal": "muscle_gain",
  "duration": "8 weeks",
  "frequency": "4 times per week"
}
```

## 🏥 Disease Management System

### Features

#### **1. Comprehensive Disease Management**
- **Disease Database**: Current and historical disease information
- **Medication Management**: Complete medication profiles with interactions
- **Treatment Planning**: Personalized treatment recommendations
- **Prevention Strategies**: Primary, secondary, and tertiary prevention

#### **2. Drug Interaction Checking**
- **Drug-Drug Interactions**: Automatic detection of medication conflicts
- **Drug-Food Interactions**: Food and supplement interaction warnings
- **Severity Assessment**: Mild, moderate, severe interaction classification
- **Recommendations**: Specific advice for managing interactions

#### **3. Personalized Treatment Plans**
- **Treatment Types**: Medication, therapy, surgery, lifestyle modifications
- **Dietary Advice**: Food recommendations and restrictions
- **Lifestyle Recommendations**: Exercise, sleep, stress management
- **Monitoring Plans**: Symptom tracking and medical follow-up

#### **4. Risk Assessment**
- **Age-Based Risk**: Different risk factors by age group
- **BMI Analysis**: Weight-related health risks
- **Medical History**: Impact of existing conditions
- **Medication Burden**: Risk assessment for multiple medications

### API Endpoints

#### **Core Disease Management**
```
POST /api/disease-management/generate          # Generate personalized disease plan
GET  /api/disease-management/diseases         # Get available diseases
GET  /api/disease-management/medications       # Get available medications
GET  /api/disease-management/categories       # Get disease categories
GET  /api/disease-management/severity-levels  # Get severity levels
GET  /api/disease-management/treatment-types  # Get treatment types
GET  /api/disease-management/prevention-types # Get prevention types
GET  /api/disease-management/monitoring-types # Get monitoring types
POST /api/disease-management/validate         # Validate disease request
GET  /api/disease-management/statistics        # Get system statistics
```

#### **Detailed Information**
```
GET  /api/disease-management/diseases/:diseaseID     # Get detailed disease information
GET  /api/disease-management/medications/:medicationID # Get detailed medication information
```

#### **Filtering**
```
GET  /api/disease-management/diseases/by-category    # Get diseases by category
GET  /api/disease-management/diseases/by-severity    # Get diseases by severity
GET  /api/disease-management/medications/by-category # Get medications by category
```

#### **Interaction Checking**
```
POST /api/disease-management/check-interactions # Check drug interactions
```

### Data Models

#### **DiseaseClientData**
```go
type DiseaseClientData struct {
    Name        string   `json:"name"`
    Age         int      `json:"age"`
    Weight      float64  `json:"weight"`
    Height      float64  `json:"height"`
    Gender      string   `json:"gender"`
    Complaints  []string `json:"complaints"`
    Diseases    []string `json:"diseases"`
    Medications []string `json:"medications"`
    Allergies   []string `json:"allergies"`
    Lifestyle   string   `json:"lifestyle"`
    Diet        string   `json:"diet"`
}
```

#### **DiseasePlan**
```go
type DiseasePlan struct {
    ID              string           `json:"id"`
    ClientData      DiseaseClientData `json:"client_data"`
    Diseases        []Disease        `json:"diseases"`
    Medications     []Medication     `json:"medications"`
    TreatmentPlan   []Treatment      `json:"treatment_plan"`
    DietaryAdvice   []DietaryAdvice  `json:"dietary_advice"`
    LifestyleAdvice []LifestyleAdvice `json:"lifestyle_advice"`
    Prevention      []Prevention     `json:"prevention"`
    Monitoring      []Monitoring     `json:"monitoring"`
    CreatedAt       time.Time        `json:"created_at"`
}
```

### Example Usage

#### **Generate Disease Plan**
```json
{
  "client_data": {
    "name": "Sarah",
    "age": 45,
    "weight": 65.0,
    "height": 160.0,
    "gender": "female",
    "complaints": [],
    "diseases": [],
    "medications": [],
    "allergies": [],
    "lifestyle": "moderate",
    "diet": "balanced"
  },
  "focus": "prevention"
}
```

#### **Check Drug Interactions**
```json
{
  "medications": ["med_001", "med_002", "med_003"]
}
```

## 🔐 Security & Permissions

### API Key Permissions

#### **Workout Management**
- `workout_management:read` - Access workout planning features
- `workout_management:write` - Create and modify workout plans

#### **Disease Management**
- `disease_management:read` - Access disease management features
- `disease_management:write` - Create and modify disease plans

### Default API Keys

#### **Workout & Meal Planning Specialist**
- Permissions: `workout_techniques:read/write`, `meal_plans:read/write`, `workout_management:read/write`
- Rate Limit: 1400 requests/hour

#### **Disease Management Specialist**
- Permissions: `disease_management:read/write`, `old_diseases:read`, `drug_nutrition:read`
- Rate Limit: 1200 requests/hour

## 📊 System Statistics

### Workout Management Statistics
- Total Exercise Types
- Total Exercises
- Total Injuries
- Total Complaints
- Goals Supported
- Equipment Types
- Muscle Groups
- Difficulty Levels

### Disease Management Statistics
- Total Diseases
- Total Medications
- Categories
- Severity Levels
- Interactions
- Treatment Types
- Prevention Types
- Monitoring Types

## 🚀 Performance Features

### Data Caching
- All exercise and disease data preloaded into memory
- Fast response times for data retrieval
- Efficient filtering and search capabilities

### Error Handling
- Comprehensive validation of client data
- Graceful handling of missing or invalid data
- Detailed error messages for debugging

### Medical Disclaimers
- Automatic disclaimer generation for health conditions
- Professional medical advice reminders
- Liability protection for the platform

## 🧪 Testing

### Demo Program
Run the demo program to test both systems:

```bash
go run workout_disease_demo.go
```

### Test Coverage
- Workout plan generation
- Disease plan generation
- Data retrieval and filtering
- API key validation
- Error handling

## 📈 Future Enhancements

### Workout Management
- AI-powered exercise recommendations
- Video demonstration integration
- Progress tracking and analytics
- Social features and challenges

### Disease Management
- Machine learning for risk prediction
- Integration with electronic health records
- Real-time medication updates
- Telemedicine consultation support

## 🔧 Technical Implementation

### File Structure
```
models/
├── workout_management.go    # Workout data models
├── disease_management.go     # Disease data models
└── apikey.go               # Updated permissions

services/
├── workout_management.go    # Workout business logic
├── disease_management.go    # Disease business logic
└── apikey.go               # Updated API key service

handlers/
├── workout_management.go    # Workout HTTP handlers
├── disease_management.go    # Disease HTTP handlers
└── main.go                 # Updated routes

main.go                     # Updated with new routes
workout_disease_demo.go     # Demo program
```

### Dependencies
- Echo framework for HTTP handling
- JWT for authentication
- API key system for authorization
- JSON data files for exercise and disease information

## 📝 API Documentation

Complete API documentation is available at:
```
GET /api
```

This endpoint provides detailed information about all available endpoints, authentication methods, and usage examples.

## ⚠️ Medical Disclaimer

**Important**: Both systems are designed for informational purposes only and should not replace professional medical advice. Users with medical conditions should consult with healthcare providers before following any recommendations.

The systems automatically generate appropriate medical disclaimers when health conditions or medications are involved.
