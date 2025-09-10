package services

import (
	"time"

	"doctorhealthy1/models"
)

// ConsultationService handles medical consultation processing
type ConsultationService struct {
	// In a real application, this would have database dependencies
}

// NewConsultationService creates a new consultation service
func NewConsultationService() *ConsultationService {
	return &ConsultationService{}
}

// ProcessConsultation processes a patient consultation request
func (cs *ConsultationService) ProcessConsultation(input *models.PatientConsultation) (*models.ConsultationResult, error) {
	// Calculate BMI
	bmi := input.Weight / ((input.Height / 100) * (input.Height / 100))
	
	// Generate recommendations based on primary disease
	recommendations := cs.generateRecommendations(input.PrimaryDisease, bmi, input.Age, input.Gender)
	
	// Generate warnings and precautions
	warnings := cs.generateWarnings(input.PrimaryDisease, input.Medications, bmi)
	
	// Generate follow-up recommendations
	followUp := cs.generateFollowUp(input.PrimaryDisease, input.Age)

	result := &models.ConsultationResult{
		UserID:         input.UserID,
		Recommendations: recommendations,
		Warnings:       warnings,
		FollowUp:       followUp,
		GeneratedAt:    time.Now(),
	}

	return result, nil
}

// generateRecommendations creates disease-specific recommendations
func (cs *ConsultationService) generateRecommendations(disease string, bmi float64, age int, gender string) map[string]interface{} {
	recommendations := make(map[string]interface{})

	switch disease {
	case "diabetes":
		recommendations = map[string]interface{}{
			"dietary": []string{
				"Monitor carbohydrate intake carefully",
				"Choose complex carbohydrates over simple sugars",
				"Include plenty of fiber-rich foods (vegetables, legumes, whole grains)",
				"Eat regular, balanced meals to maintain stable blood sugar",
				"Limit processed foods and sugary beverages",
				"Include lean proteins with each meal",
			},
			"lifestyle": []string{
				"Regular physical activity (150 minutes moderate exercise per week)",
				"Monitor blood glucose levels as recommended by your doctor",
				"Maintain a healthy weight",
				"Stay hydrated with water",
				"Get adequate sleep (7-9 hours per night)",
			},
			"supplements": []string{
				"Omega-3 fatty acids (consult doctor first)",
				"Vitamin D (if deficient)",
				"Chromium (under medical supervision)",
			},
		}

	case "hypertension":
		recommendations = map[string]interface{}{
			"dietary": []string{
				"Reduce sodium intake to less than 2300mg daily",
				"Increase potassium-rich foods (bananas, spinach, avocados)",
				"Follow DASH diet principles",
				"Limit processed and packaged foods",
				"Increase fruits and vegetables intake",
				"Choose whole grains over refined grains",
			},
			"lifestyle": []string{
				"Regular aerobic exercise (30 minutes most days)",
				"Maintain healthy weight",
				"Limit alcohol consumption",
				"Quit smoking if applicable",
				"Manage stress through relaxation techniques",
				"Monitor blood pressure regularly",
			},
			"supplements": []string{
				"Magnesium (consult doctor)",
				"Potassium (if recommended by doctor)",
				"Omega-3 fatty acids",
			},
		}

	case "heart_disease":
		recommendations = map[string]interface{}{
			"dietary": []string{
				"Follow heart-healthy diet low in saturated fats",
				"Include omega-3 rich foods (fish, nuts, seeds)",
				"Limit cholesterol intake",
				"Increase antioxidant-rich foods (berries, leafy greens)",
				"Choose lean proteins",
				"Limit trans fats completely",
			},
			"lifestyle": []string{
				"Regular moderate exercise as approved by cardiologist",
				"Maintain healthy weight",
				"Quit smoking immediately",
				"Limit alcohol consumption",
				"Manage stress effectively",
				"Take medications as prescribed",
			},
			"supplements": []string{
				"Omega-3 fatty acids (EPA/DHA)",
				"Coenzyme Q10 (consult cardiologist)",
				"Vitamin D (if deficient)",
			},
		}

	case "thyroid":
		recommendations = map[string]interface{}{
			"dietary": []string{
				"Ensure adequate iodine intake (if hypothyroid)",
				"Limit goitrogenic foods if hypothyroid",
				"Include selenium-rich foods (Brazil nuts, fish)",
				"Maintain regular meal times",
				"Avoid excessive soy products",
				"Include zinc-rich foods",
			},
			"lifestyle": []string{
				"Take thyroid medication on empty stomach",
				"Regular exercise to boost metabolism",
				"Manage stress levels",
				"Get adequate sleep",
				"Regular monitoring of thyroid levels",
			},
			"supplements": []string{
				"Selenium (consult doctor)",
				"Vitamin D (if deficient)",
				"B-complex vitamins",
			},
		}

	case "kidney":
		recommendations = map[string]interface{}{
			"dietary": []string{
				"Limit protein intake as advised by nephrologist",
				"Control sodium intake",
				"Monitor potassium and phosphorus intake",
				"Stay adequately hydrated (unless fluid restricted)",
				"Limit processed foods",
				"Control portion sizes",
			},
			"lifestyle": []string{
				"Monitor blood pressure regularly",
				"Manage diabetes if present",
				"Avoid NSAIDs unless prescribed",
				"Regular medical follow-ups",
				"Gentle exercise as tolerated",
			},
			"supplements": []string{
				"Only take supplements approved by nephrologist",
				"Avoid potassium supplements unless prescribed",
				"Monitor vitamin D levels",
			},
		}

	case "liver":
		recommendations = map[string]interface{}{
			"dietary": []string{
				"Avoid alcohol completely",
				"Limit saturated fats",
				"Include antioxidant-rich foods",
				"Maintain adequate protein intake",
				"Avoid processed foods",
				"Include fiber-rich foods",
			},
			"lifestyle": []string{
				"Maintain healthy weight",
				"Regular moderate exercise",
				"Avoid hepatotoxic medications",
				"Get vaccinated for hepatitis A and B",
				"Regular liver function monitoring",
			},
			"supplements": []string{
				"Milk thistle (consult doctor)",
				"Vitamin E (if recommended)",
				"Avoid excessive vitamin A",
			},
		}

	default:
		recommendations = map[string]interface{}{
			"general": []string{
				"Follow a balanced, nutritious diet",
				"Regular physical activity",
				"Adequate sleep and stress management",
				"Regular medical check-ups",
				"Maintain healthy weight",
			},
		}
	}

	// Add BMI-specific recommendations
	if bmi > 30 {
		recommendations["weight_management"] = []string{
			"Focus on gradual weight loss (1-2 lbs per week)",
			"Increase physical activity gradually",
			"Consider consulting a dietitian",
		}
	} else if bmi < 18.5 {
		recommendations["weight_management"] = []string{
			"Focus on healthy weight gain",
			"Increase calorie-dense, nutritious foods",
			"Consider strength training",
		}
	}

	return recommendations
}

// generateWarnings creates disease-specific warnings
func (cs *ConsultationService) generateWarnings(disease string, medications []string, bmi float64) []string {
	warnings := []string{
		"⚠️ This is general guidance only - consult your healthcare provider for personalized medical advice",
		"Always follow your doctor's prescribed medication schedule",
		"Report any unusual symptoms to your healthcare provider immediately",
	}

	switch disease {
	case "diabetes":
		warnings = append(warnings,
			"Monitor blood sugar levels regularly",
			"Be aware of signs of hypoglycemia (shakiness, sweating, confusion)",
			"Check feet daily for cuts or infections",
		)

	case "hypertension":
		warnings = append(warnings,
			"Monitor blood pressure regularly",
			"Don't stop blood pressure medications suddenly",
			"Seek immediate care for severe headaches, chest pain, or vision changes",
		)

	case "heart_disease":
		warnings = append(warnings,
			"Seek immediate medical attention for chest pain, shortness of breath",
			"Don't skip heart medications",
			"Avoid strenuous exercise without medical clearance",
		)

	case "kidney":
		warnings = append(warnings,
			"Monitor fluid intake as advised",
			"Avoid NSAIDs (ibuprofen, naproxen) unless prescribed",
			"Report changes in urination or swelling",
		)

	case "liver":
		warnings = append(warnings,
			"Avoid alcohol completely",
			"Be cautious with over-the-counter medications",
			"Report yellowing of skin/eyes, dark urine, or abdominal pain",
		)
	}

	if len(medications) > 0 {
		warnings = append(warnings, "Check for drug interactions with new medications or supplements")
	}

	return warnings
}

// generateFollowUp creates follow-up recommendations
func (cs *ConsultationService) generateFollowUp(disease string, age int) string {
	baseFollowUp := "Schedule regular follow-up appointments with your healthcare provider. "

	switch disease {
	case "diabetes":
		return baseFollowUp + "Consider quarterly HbA1c tests and annual comprehensive exams including eye and foot checks."

	case "hypertension":
		return baseFollowUp + "Monitor blood pressure regularly and adjust medications as needed. Annual cardiovascular risk assessment recommended."

	case "heart_disease":
		return baseFollowUp + "Regular cardiology follow-ups, stress tests as recommended, and monitoring of cardiac risk factors."

	case "thyroid":
		return baseFollowUp + "Regular thyroid function tests (TSH, T3, T4) and medication adjustments as needed."

	case "kidney":
		return baseFollowUp + "Regular nephrology visits, kidney function tests, and monitoring of related conditions."

	case "liver":
		return baseFollowUp + "Regular liver function tests and monitoring for complications. Avoid hepatotoxic substances."

	default:
		return baseFollowUp + "Maintain regular health screenings appropriate for your age and condition."
	}
}

// GetUserConsultations retrieves consultation history for a user
func (cs *ConsultationService) GetUserConsultations(userID uint) ([]models.ConsultationResult, error) {
	// In a real application, this would query the database
	// For now, return empty slice
	return []models.ConsultationResult{}, nil
}
