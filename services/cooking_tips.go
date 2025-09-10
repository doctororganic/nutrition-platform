package services

import (
	"fmt"
	"strings"
)

// CookingTipsService handles cooking tips and techniques
type CookingTipsService struct {
	cookingTips map[string][]CookingTip
}

// CookingTip represents a cooking tip with details
type CookingTip struct {
	Title       string            `json:"title"`
	Description string            `json:"description"`
	ArabicTitle string            `json:"arabic_title"`
	ArabicDesc  string            `json:"arabic_desc"`
	Category    string            `json:"category"`
	Difficulty  string            `json:"difficulty"` // beginner, intermediate, advanced
	Tips        []string          `json:"tips"`
	Warnings    []string          `json:"warnings"`
	Equipment   []string          `json:"equipment"`
}

// NewCookingTipsService creates a new cooking tips service
func NewCookingTipsService() *CookingTipsService {
	service := &CookingTipsService{
		cookingTips: make(map[string][]CookingTip),
	}
	
	// Initialize cooking tips database
	service.initializeCookingTips()
	
	return service
}

// initializeCookingTips initializes the database of cooking tips
func (cts *CookingTipsService) initializeCookingTips() {
	// General cooking tips
	cts.cookingTips["general"] = []CookingTip{
		{
			Title:       "Proper Knife Handling",
			Description: "Learn the correct way to hold and use a knife for safe and efficient cutting",
			ArabicTitle: "التعامل الصحيح مع السكين",
			ArabicDesc:  "تعلم الطريقة الصحيحة لمسك واستخدام السكين للقطع الآمن والفعال",
			Category:    "general",
			Difficulty:  "beginner",
			Tips: []string{
				"Hold the knife with your dominant hand, thumb and index finger on the blade",
				"Keep your other hand in a claw position to guide the food",
				"Use a rocking motion for efficient chopping",
				"Keep your knife sharp for safer cutting",
			},
			Warnings: []string{
				"Never cut towards yourself",
				"Always use a stable cutting board",
				"Keep your fingers away from the blade",
			},
			Equipment: []string{"Chef's knife", "Cutting board"},
		},
		{
			Title:       "Temperature Control",
			Description: "Understanding and controlling cooking temperatures for better results",
			ArabicTitle: "التحكم في درجة الحرارة",
			ArabicDesc:  "فهم والتحكم في درجات حرارة الطهي للحصول على نتائج أفضل",
			Category:    "general",
			Difficulty:  "beginner",
			Tips: []string{
				"Preheat your oven before cooking",
				"Use medium heat for most cooking tasks",
				"Don't overcrowd the pan when frying",
				"Let meat rest after cooking",
			},
			Warnings: []string{
				"Never leave cooking food unattended",
				"Check food temperature with a thermometer",
				"Be careful with hot oil",
			},
			Equipment: []string{"Thermometer", "Timer"},
		},
	}
	
	// Meat cooking tips
	cts.cookingTips["meat"] = []CookingTip{
		{
			Title:       "Meat Marination",
			Description: "Proper marination techniques for tender and flavorful meat",
			ArabicTitle: "تتبيل اللحم",
			ArabicDesc:  "تقنيات التتبيل الصحيحة للحصول على لحم طري ومذاق جيد",
			Category:    "meat",
			Difficulty:  "beginner",
			Tips: []string{
				"Use acidic ingredients like lemon juice or vinegar",
				"Add herbs and spices for flavor",
				"Marinate in the refrigerator, not at room temperature",
				"Don't reuse marinade that touched raw meat",
			},
			Warnings: []string{
				"Never marinate meat at room temperature",
				"Discard used marinade",
				"Don't over-marinate as it can make meat mushy",
			},
			Equipment: []string{"Glass or plastic container", "Refrigerator"},
		},
		{
			Title:       "Meat Doneness",
			Description: "How to check if meat is cooked to the right temperature",
			ArabicTitle: "نضج اللحم",
			ArabicDesc:  "كيفية التحقق من طهي اللحم إلى درجة الحرارة المناسبة",
			Category:    "meat",
			Difficulty:  "intermediate",
			Tips: []string{
				"Use a meat thermometer for accurate readings",
				"Let meat rest for 5-10 minutes after cooking",
				"Check the thickest part of the meat",
				"Learn the touch test for doneness",
			},
			Warnings: []string{
				"Never eat undercooked meat",
				"Check temperature in multiple spots",
				"Be aware of safe minimum temperatures",
			},
			Equipment: []string{"Meat thermometer"},
		},
	}
	
	// Vegetable cooking tips
	cts.cookingTips["vegetables"] = []CookingTip{
		{
			Title:       "Vegetable Blanching",
			Description: "Quick blanching technique for crisp, colorful vegetables",
			ArabicTitle: "سلق الخضروات",
			ArabicDesc:  "تقنية السلق السريع للحصول على خضروات مقرمشة وملونة",
			Category:    "vegetables",
			Difficulty:  "beginner",
			Tips: []string{
				"Use plenty of boiling water",
				"Add salt to the water for flavor",
				"Shock vegetables in ice water to stop cooking",
				"Don't overcook - vegetables should be crisp-tender",
			},
			Warnings: []string{
				"Be careful with boiling water",
				"Don't leave vegetables in hot water too long",
				"Use tongs to handle hot vegetables",
			},
			Equipment: []string{"Large pot", "Ice bath", "Tongs"},
		},
		{
			Title:       "Roasting Vegetables",
			Description: "How to roast vegetables for maximum flavor and texture",
			ArabicTitle: "تحميص الخضروات",
			ArabicDesc:  "كيفية تحميص الخضروات للحصول على أقصى نكهة وقوام",
			Category:    "vegetables",
			Difficulty:  "beginner",
			Tips: []string{
				"Cut vegetables into similar sizes for even cooking",
				"Use high heat (400-450°F) for caramelization",
				"Don't overcrowd the pan",
				"Season with salt, pepper, and herbs",
			},
			Warnings: []string{
				"Watch for burning",
				"Check vegetables frequently",
				"Be careful when removing hot pan from oven",
			},
			Equipment: []string{"Baking sheet", "Oven mitts"},
		},
	}
	
	// Rice and grains tips
	cts.cookingTips["rice"] = []CookingTip{
		{
			Title:       "Perfect Rice Cooking",
			Description: "How to cook fluffy, separate rice grains",
			ArabicTitle: "طهي الأرز المثالي",
			ArabicDesc:  "كيفية طهي حبات الأرز المنفصلة والخفيفة",
			Category:    "rice",
			Difficulty:  "beginner",
			Tips: []string{
				"Rinse rice until water runs clear",
				"Use the right ratio of water to rice (usually 2:1)",
				"Don't stir rice while cooking",
				"Let rice rest for 10 minutes after cooking",
			},
			Warnings: []string{
				"Don't lift the lid while cooking",
				"Be careful with hot steam",
				"Don't overcook or rice will be mushy",
			},
			Equipment: []string{"Rice cooker or pot", "Measuring cup"},
		},
	}
	
	// Baking tips
	cts.cookingTips["baking"] = []CookingTip{
		{
			Title:       "Baking Measurements",
			Description: "Accurate measurement techniques for successful baking",
			ArabicTitle: "قياسات الخبز",
			ArabicDesc:  "تقنيات القياس الدقيقة للخبز الناجح",
			Category:    "baking",
			Difficulty:  "beginner",
			Tips: []string{
				"Use a kitchen scale for precise measurements",
				"Spoon flour into measuring cup, don't pack it",
				"Level off dry ingredients with a straight edge",
				"Use liquid measuring cups for liquids",
			},
			Warnings: []string{
				"Don't guess measurements",
				"Don't substitute ingredients without research",
				"Follow the recipe exactly for best results",
			},
			Equipment: []string{"Kitchen scale", "Measuring cups", "Measuring spoons"},
		},
		{
			Title:       "Oven Temperature",
			Description: "Understanding and maintaining correct oven temperature",
			ArabicTitle: "درجة حرارة الفرن",
			ArabicDesc:  "فهم والحفاظ على درجة حرارة الفرن الصحيحة",
			Category:    "baking",
			Difficulty:  "beginner",
			Tips: []string{
				"Preheat oven for at least 15 minutes",
				"Use an oven thermometer to verify temperature",
				"Don't open oven door frequently",
				"Rotate pans halfway through cooking",
			},
			Warnings: []string{
				"Be careful when opening hot oven",
				"Don't place items too close to heating elements",
				"Check for hot spots in your oven",
			},
			Equipment: []string{"Oven thermometer", "Oven mitts"},
		},
	}
}

// GetCookingTips returns cooking tips for a specific category
func (cts *CookingTipsService) GetCookingTips(category string) []CookingTip {
	if tips, exists := cts.cookingTips[strings.ToLower(category)]; exists {
		return tips
	}
	return []CookingTip{}
}

// GetCookingTipsForMeal returns relevant cooking tips for a specific meal
func (cts *CookingTipsService) GetCookingTipsForMeal(mealName string, ingredients []string) []CookingTip {
	var relevantTips []CookingTip
	
	// Add general tips
	relevantTips = append(relevantTips, cts.cookingTips["general"]...)
	
	// Analyze ingredients to determine relevant categories
	for _, ingredient := range ingredients {
		ingredientLower := strings.ToLower(ingredient)
		
		// Check for meat
		if strings.Contains(ingredientLower, "chicken") || strings.Contains(ingredientLower, "beef") ||
		   strings.Contains(ingredientLower, "lamb") || strings.Contains(ingredientLower, "fish") ||
		   strings.Contains(ingredientLower, "meat") {
			relevantTips = append(relevantTips, cts.cookingTips["meat"]...)
		}
		
		// Check for vegetables
		if strings.Contains(ingredientLower, "carrot") || strings.Contains(ingredientLower, "onion") ||
		   strings.Contains(ingredientLower, "tomato") || strings.Contains(ingredientLower, "potato") ||
		   strings.Contains(ingredientLower, "vegetable") {
			relevantTips = append(relevantTips, cts.cookingTips["vegetables"]...)
		}
		
		// Check for rice
		if strings.Contains(ingredientLower, "rice") || strings.Contains(ingredientLower, "quinoa") ||
		   strings.Contains(ingredientLower, "couscous") {
			relevantTips = append(relevantTips, cts.cookingTips["rice"]...)
		}
		
		// Check for baking ingredients
		if strings.Contains(ingredientLower, "flour") || strings.Contains(ingredientLower, "sugar") ||
		   strings.Contains(ingredientLower, "butter") || strings.Contains(ingredientLower, "egg") {
			relevantTips = append(relevantTips, cts.cookingTips["baking"]...)
		}
	}
	
	// Remove duplicates
	return cts.removeDuplicateTips(relevantTips)
}

// GetCookingTipsByDifficulty returns cooking tips filtered by difficulty level
func (cts *CookingTipsService) GetCookingTipsByDifficulty(difficulty string) []CookingTip {
	var filteredTips []CookingTip
	
	for _, tips := range cts.cookingTips {
		for _, tip := range tips {
			if strings.ToLower(tip.Difficulty) == strings.ToLower(difficulty) {
				filteredTips = append(filteredTips, tip)
			}
		}
	}
	
	return filteredTips
}

// GetCookingTipsByEquipment returns cooking tips that require specific equipment
func (cts *CookingTipsService) GetCookingTipsByEquipment(equipment string) []CookingTip {
	var filteredTips []CookingTip
	
	for _, tips := range cts.cookingTips {
		for _, tip := range tips {
			for _, tipEquipment := range tip.Equipment {
				if strings.Contains(strings.ToLower(tipEquipment), strings.ToLower(equipment)) {
					filteredTips = append(filteredTips, tip)
					break
				}
			}
		}
	}
	
	return filteredTips
}

// removeDuplicateTips removes duplicate tips from a slice
func (cts *CookingTipsService) removeDuplicateTips(tips []CookingTip) []CookingTip {
	seen := make(map[string]bool)
	var uniqueTips []CookingTip
	
	for _, tip := range tips {
		key := fmt.Sprintf("%s-%s", tip.Title, tip.Category)
		if !seen[key] {
			seen[key] = true
			uniqueTips = append(uniqueTips, tip)
		}
	}
	
	return uniqueTips
}

// CreateCookingTipsSummary creates a summary of cooking tips for a meal
func (cts *CookingTipsService) CreateCookingTipsSummary(mealName string, ingredients []string) map[string]interface{} {
	tips := cts.GetCookingTipsForMeal(mealName, ingredients)
	
	summary := map[string]interface{}{
		"meal_name":    mealName,
		"total_tips":   len(tips),
		"categories":   make(map[string]int),
		"difficulties": make(map[string]int),
		"tips":         tips,
	}
	
	// Count categories and difficulties
	for _, tip := range tips {
		summary["categories"].(map[string]int)[tip.Category]++
		summary["difficulties"].(map[string]int)[tip.Difficulty]++
	}
	
	return summary
}
