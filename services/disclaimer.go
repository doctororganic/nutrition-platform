package services

import (
	"fmt"
	"strings"
)

// DisclaimerService handles medical and pharmaceutical disclaimers
type DisclaimerService struct {
	baseDisclaimer string
}

// NewDisclaimerService creates a new disclaimer service
func NewDisclaimerService() *DisclaimerService {
	return &DisclaimerService{
		baseDisclaimer: "This site is to update you with information and guide you to useful advice for the purpose of education and awareness and is not a substitute for a doctor's visit.",
	}
}

// CreateMedicalDisclaimer creates a medical disclaimer based on the type of information
func (ds *DisclaimerService) CreateMedicalDisclaimer(disclaimerType string, additionalInfo ...string) string {
	var disclaimer strings.Builder
	
	// Base disclaimer
	disclaimer.WriteString(ds.baseDisclaimer)
	disclaimer.WriteString(" ")
	
	// Type-specific disclaimers
	switch strings.ToLower(disclaimerType) {
	case "medication", "drug", "pharmaceutical":
		disclaimer.WriteString("Medical information provided is for educational purposes only and should not replace professional medical advice. ")
		disclaimer.WriteString("Always consult with a healthcare provider before starting, stopping, or changing any medication. ")
		disclaimer.WriteString("Drug interactions and side effects may vary between individuals. ")
		
	case "disease", "condition", "illness":
		disclaimer.WriteString("Disease information is provided for educational purposes and should not be used for self-diagnosis. ")
		disclaimer.WriteString("Always consult with a healthcare provider for proper diagnosis and treatment. ")
		disclaimer.WriteString("Individual symptoms and responses to treatment may vary. ")
		
	case "nutrition", "diet", "supplement":
		disclaimer.WriteString("Nutritional advice is provided for educational purposes and should not replace professional dietary guidance. ")
		disclaimer.WriteString("Individual nutritional needs may vary based on health conditions, medications, and personal circumstances. ")
		disclaimer.WriteString("Consult with a registered dietitian or healthcare provider for personalized nutrition advice. ")
		
	case "workout", "exercise", "fitness":
		disclaimer.WriteString("Exercise recommendations are provided for educational purposes and should not replace professional fitness guidance. ")
		disclaimer.WriteString("Always consult with a healthcare provider before starting a new exercise program, especially if you have health conditions. ")
		disclaimer.WriteString("Stop any exercise that causes pain or discomfort and consult with a healthcare provider. ")
		
	case "injury", "recovery":
		disclaimer.WriteString("Injury and recovery information is provided for educational purposes and should not replace professional medical care. ")
		disclaimer.WriteString("Always consult with a healthcare provider or physical therapist for proper injury assessment and treatment. ")
		disclaimer.WriteString("Individual recovery times and responses to treatment may vary. ")
		
	default:
		disclaimer.WriteString("This information is provided for educational purposes only and should not replace professional medical advice. ")
		disclaimer.WriteString("Always consult with appropriate healthcare professionals for personalized guidance. ")
	}
	
	// Add any additional information
	for _, info := range additionalInfo {
		if info != "" {
			disclaimer.WriteString(info)
			disclaimer.WriteString(" ")
		}
	}
	
	// Final warning
	disclaimer.WriteString("If you are experiencing a medical emergency, please seek immediate medical attention.")
	
	return disclaimer.String()
}

// CreateDrugInteractionDisclaimer creates a specific disclaimer for drug interactions
func (ds *DisclaimerService) CreateDrugInteractionDisclaimer(medications []string) string {
	var disclaimer strings.Builder
	
	disclaimer.WriteString(ds.baseDisclaimer)
	disclaimer.WriteString(" ")
	disclaimer.WriteString("Drug interaction information is provided for educational purposes only and should not replace professional medical advice. ")
	disclaimer.WriteString("Always consult with a healthcare provider or pharmacist about potential drug interactions. ")
	
	if len(medications) > 0 {
		disclaimer.WriteString(fmt.Sprintf("The following medications were analyzed: %s. ", strings.Join(medications, ", ")))
	}
	
	disclaimer.WriteString("Drug interactions can be complex and may vary based on individual factors such as age, weight, other medications, and health conditions. ")
	disclaimer.WriteString("This information should be used as a starting point for discussion with your healthcare provider. ")
	disclaimer.WriteString("Never stop, start, or change any medication without consulting your healthcare provider.")
	
	return disclaimer.String()
}

// CreateSupplementDisclaimer creates a specific disclaimer for supplements
func (ds *DisclaimerService) CreateSupplementDisclaimer(supplements []string) string {
	var disclaimer strings.Builder
	
	disclaimer.WriteString(ds.baseDisclaimer)
	disclaimer.WriteString(" ")
	disclaimer.WriteString("Supplement information is provided for educational purposes only and should not replace professional medical advice. ")
	disclaimer.WriteString("Always consult with a healthcare provider before starting any new supplement. ")
	
	if len(supplements) > 0 {
		disclaimer.WriteString(fmt.Sprintf("The following supplements were discussed: %s. ", strings.Join(supplements, ", ")))
	}
	
	disclaimer.WriteString("Supplements can interact with medications and may not be suitable for everyone. ")
	disclaimer.WriteString("Individual needs and responses to supplements may vary. ")
	disclaimer.WriteString("This information should be used as a starting point for discussion with your healthcare provider.")
	
	return disclaimer.String()
}

// CreateWorkoutDisclaimer creates a specific disclaimer for workout plans
func (ds *DisclaimerService) CreateWorkoutDisclaimer(injuries []string, complaints []string) string {
	var disclaimer strings.Builder
	
	disclaimer.WriteString(ds.baseDisclaimer)
	disclaimer.WriteString(" ")
	disclaimer.WriteString("Workout plans are provided for educational purposes only and should not replace professional fitness guidance. ")
	disclaimer.WriteString("Always consult with a healthcare provider or certified fitness professional before starting a new exercise program. ")
	
	if len(injuries) > 0 {
		disclaimer.WriteString(fmt.Sprintf("You have indicated the following injuries: %s. ", strings.Join(injuries, ", ")))
		disclaimer.WriteString("Please consult with a healthcare provider or physical therapist before starting any exercise program. ")
	}
	
	if len(complaints) > 0 {
		disclaimer.WriteString(fmt.Sprintf("You have indicated the following health complaints: %s. ", strings.Join(complaints, ", ")))
		disclaimer.WriteString("Please consult with a healthcare provider to ensure exercise is safe for your condition. ")
	}
	
	disclaimer.WriteString("Stop any exercise that causes pain or discomfort and consult with a healthcare provider. ")
	disclaimer.WriteString("Individual fitness needs and capabilities may vary. ")
	disclaimer.WriteString("This workout plan should be adjusted according to your specific requirements and capabilities.")
	
	return disclaimer.String()
}

// CreateHalalDisclaimer creates a specific disclaimer for Halal filtering
func (ds *DisclaimerService) CreateHalalDisclaimer() string {
	var disclaimer strings.Builder
	
	disclaimer.WriteString(ds.baseDisclaimer)
	disclaimer.WriteString(" ")
	disclaimer.WriteString("Halal filtering information is provided for educational purposes only. ")
	disclaimer.WriteString("While efforts are made to identify and replace Haram (حرام) and Mashbooh (مشبوه) ingredients with Halal alternatives, ")
	disclaimer.WriteString("it is recommended to verify the Halal certification of all ingredients and consult with a qualified Islamic scholar for specific dietary requirements. ")
	disclaimer.WriteString("Individual Halal standards may vary based on personal or regional interpretations. ")
	disclaimer.WriteString("Always check ingredient labels and consult with appropriate religious authorities for guidance on Halal dietary practices.")
	
	return disclaimer.String()
}

// CreateComprehensiveDisclaimer creates a comprehensive disclaimer for multiple types of information
func (ds *DisclaimerService) CreateComprehensiveDisclaimer(types []string, additionalInfo map[string]string) string {
	var disclaimer strings.Builder
	
	disclaimer.WriteString(ds.baseDisclaimer)
	disclaimer.WriteString(" ")
	disclaimer.WriteString("This comprehensive plan includes multiple types of health information. ")
	disclaimer.WriteString("All information provided is for educational purposes only and should not replace professional medical advice. ")
	
	for _, disclaimerType := range types {
		switch strings.ToLower(disclaimerType) {
		case "medication":
			disclaimer.WriteString("Medication information should be discussed with a healthcare provider. ")
		case "nutrition":
			disclaimer.WriteString("Nutritional advice should be discussed with a registered dietitian. ")
		case "workout":
			disclaimer.WriteString("Exercise recommendations should be discussed with a fitness professional. ")
		case "halal":
			disclaimer.WriteString("Halal filtering should be verified with appropriate religious authorities. ")
		}
	}
	
	// Add additional information
	for key, value := range additionalInfo {
		if value != "" {
			disclaimer.WriteString(fmt.Sprintf("%s: %s ", key, value))
		}
	}
	
	disclaimer.WriteString("Always consult with appropriate healthcare professionals for personalized guidance. ")
	disclaimer.WriteString("If you are experiencing a medical emergency, please seek immediate medical attention.")
	
	return disclaimer.String()
}
