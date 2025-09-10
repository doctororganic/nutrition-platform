package models

import "time"

// DiseaseClientData represents client data for disease management
type DiseaseClientData struct {
	Name        string   `json:"name" validate:"required"`
	Age         int      `json:"age" validate:"required,min=1,max=120"`
	Weight      float64  `json:"weight" validate:"required,min=10,max=300"`
	Height      float64  `json:"height" validate:"required,min=50,max=250"`
	Gender      string   `json:"gender" validate:"required,oneof=male female"`
	Complaints  []string `json:"complaints"`
	Diseases    []string `json:"diseases"`
	Medications []string `json:"medications"`
	Allergies   []string `json:"allergies"`
	Lifestyle   string   `json:"lifestyle"` // sedentary, active, very_active
	Diet        string   `json:"diet"`      // current diet type
}

// Disease represents disease information
type Disease struct {
	ID              string            `json:"id"`
	Name            map[string]string  `json:"name"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Category        string            `json:"category"`
	Severity        string            `json:"severity"`     // mild, moderate, severe, critical
	Causes          []map[string]string `json:"causes"`     // en/ar
	Symptoms        []map[string]string `json:"symptoms"`   // en/ar
	RiskFactors     []map[string]string `json:"risk_factors"` // en/ar
	Complications   []map[string]string `json:"complications"` // en/ar
	Treatment       []map[string]string `json:"treatment"` // en/ar
	Medications     []Medication       `json:"medications"`
	DietaryAdvice   []map[string]string `json:"dietary_advice"` // en/ar
	LifestyleAdvice []map[string]string `json:"lifestyle_advice"` // en/ar
	Prevention      []map[string]string `json:"prevention"` // en/ar
	WhenToSeeDoctor []map[string]string `json:"when_to_see_doctor"` // en/ar
	Contraindications []map[string]string `json:"contraindications"` // en/ar
}

// Medication represents medication information
type Medication struct {
	ID              string            `json:"id"`
	Name            map[string]string  `json:"name"`        // en/ar
	GenericName     map[string]string  `json:"generic_name"` // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Category        string            `json:"category"`
	Dosage          string            `json:"dosage"`
	Timing          string            `json:"timing"`
	Duration        string            `json:"duration"`
	SideEffects     []map[string]string `json:"side_effects"` // en/ar
	Interactions    []map[string]string `json:"interactions"` // en/ar
	Contraindications []map[string]string `json:"contraindications"` // en/ar
	Precautions     []map[string]string `json:"precautions"` // en/ar
	FoodInteractions []map[string]string `json:"food_interactions"` // en/ar
	Supplements     []Supplement       `json:"supplements"`
}

// DiseasePlan represents a disease management plan
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

// Treatment represents a treatment recommendation
type Treatment struct {
	Type            string            `json:"type"` // medication, therapy, surgery, lifestyle
	Name            map[string]string  `json:"name"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Duration        string            `json:"duration"`
	Instructions    []map[string]string `json:"instructions"` // en/ar
	SideEffects     []map[string]string `json:"side_effects"` // en/ar
	Precautions     []map[string]string `json:"precautions"` // en/ar
	FollowUp        string            `json:"follow_up"`
}

// DietaryAdvice represents dietary recommendations
type DietaryAdvice struct {
	Category        string            `json:"category"` // recommended, avoid, limit
	Foods           []map[string]string `json:"foods"`     // en/ar
	Reason          map[string]string  `json:"reason"`    // en/ar
	Instructions    []map[string]string `json:"instructions"` // en/ar
	Timing          string            `json:"timing"`
	Quantity        string            `json:"quantity"`
}

// LifestyleAdvice represents lifestyle recommendations
type LifestyleAdvice struct {
	Category        string            `json:"category"` // exercise, sleep, stress, habits
	Title           map[string]string  `json:"title"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Instructions    []map[string]string `json:"instructions"` // en/ar
	Frequency       string            `json:"frequency"`
	Duration        string            `json:"duration"`
	Benefits        []map[string]string `json:"benefits"`     // en/ar
}

// Prevention represents prevention strategies
type Prevention struct {
	Category        string            `json:"category"` // primary, secondary, tertiary
	Title           map[string]string  `json:"title"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Strategies      []map[string]string `json:"strategies"`  // en/ar
	Frequency       string            `json:"frequency"`
	Effectiveness   string            `json:"effectiveness"`
}

// Monitoring represents monitoring recommendations
type Monitoring struct {
	Type            string            `json:"type"` // symptoms, tests, appointments
	Title           map[string]string  `json:"title"`        // en/ar
	Description     map[string]string  `json:"description"` // en/ar
	Frequency       string            `json:"frequency"`
	Parameters      []map[string]string `json:"parameters"`   // en/ar
	NormalRange     string            `json:"normal_range"`
	WarningSigns    []map[string]string `json:"warning_signs"` // en/ar
}

// DiseaseRequest represents a disease management request
type DiseaseRequest struct {
	ClientData DiseaseClientData `json:"client_data" validate:"required"`
	Focus      string           `json:"focus"` // primary_disease, medication_management, prevention
}

// DiseaseResponse represents a disease management response
type DiseaseResponse struct {
	Success         bool         `json:"success"`
	Message         string       `json:"message"`
	DiseasePlan     *DiseasePlan `json:"disease_plan,omitempty"`
	Medications     []Medication `json:"medications,omitempty"`
	Interactions    []Interaction `json:"interactions,omitempty"`
	Disclaimer      string       `json:"disclaimer,omitempty"`
}

// Interaction represents drug-drug or drug-food interactions
type Interaction struct {
	Type            string            `json:"type"` // drug_drug, drug_food, drug_supplement
	Drug1           string            `json:"drug1"`
	Drug2           string            `json:"drug2,omitempty"`
	Food            string            `json:"food,omitempty"`
	Supplement      string            `json:"supplement,omitempty"`
	Severity        string            `json:"severity"` // mild, moderate, severe
	Description     map[string]string  `json:"description"` // en/ar
	Mechanism       map[string]string  `json:"mechanism"`   // en/ar
	Recommendation  map[string]string  `json:"recommendation"` // en/ar
}

// AvailableDiseases represents available diseases
type AvailableDiseases struct {
	Diseases []Disease `json:"diseases"`
	Count    int       `json:"count"`
}

// AvailableMedications represents available medications
type AvailableMedications struct {
	Medications []Medication `json:"medications"`
	Count       int          `json:"count"`
}

// DiseaseStatistics represents disease management system statistics
type DiseaseStatistics struct {
	TotalDiseases    int                    `json:"total_diseases"`
	TotalMedications int                    `json:"total_medications"`
	Categories        []string               `json:"categories"`
	SeverityLevels    []string               `json:"severity_levels"`
	Interactions      int                    `json:"interactions"`
	TreatmentTypes    []string               `json:"treatment_types"`
	PreventionTypes   []string               `json:"prevention_types"`
	MonitoringTypes   []string               `json:"monitoring_types"`
}

// Methods for DiseaseClientData
func (d *DiseaseClientData) CalculateBMI() float64 {
	heightInMeters := d.Height / 100
	return d.Weight / (heightInMeters * heightInMeters)
}

func (d *DiseaseClientData) GetBMICategory() string {
	bmi := d.CalculateBMI()
	switch {
	case bmi < 18.5:
		return "underweight"
	case bmi < 25:
		return "normal"
	case bmi < 30:
		return "overweight"
	default:
		return "obese"
	}
}

func (d *DiseaseClientData) GetAgeGroup() string {
	switch {
	case d.Age < 18:
		return "child"
	case d.Age < 30:
		return "young_adult"
	case d.Age < 50:
		return "adult"
	case d.Age < 65:
		return "middle_age"
	default:
		return "elderly"
	}
}

func (d *DiseaseClientData) HasMedicalConditions() bool {
	return len(d.Diseases) > 0 || len(d.Medications) > 0
}

func (d *DiseaseClientData) GetRiskLevel() string {
	riskFactors := 0
	
	// Age risk
	if d.Age > 65 {
		riskFactors++
	}
	
	// BMI risk
	bmi := d.CalculateBMI()
	if bmi > 30 || bmi < 18.5 {
		riskFactors++
	}
	
	// Medical conditions
	if len(d.Diseases) > 0 {
		riskFactors += len(d.Diseases)
	}
	
	// Medications
	if len(d.Medications) > 2 {
		riskFactors++
	}
	
	switch {
	case riskFactors <= 1:
		return "low"
	case riskFactors <= 3:
		return "moderate"
	default:
		return "high"
	}
}
