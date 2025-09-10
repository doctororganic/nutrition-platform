package services

import (
	"strings"
)

// HalalFilterService handles Halal ingredient filtering and replacement
type HalalFilterService struct {
	haramIngredients map[string]HaramIngredient
}

// HaramIngredient represents a Haram or Mashbooh ingredient with alternatives
type HaramIngredient struct {
	Name         string            `json:"name"`
	ArabicName   string            `json:"arabic_name"`
	Category     string            `json:"category"` // "haram" or "mashbooh"
	Alternatives []HalalAlternative `json:"alternatives"`
}

// HalalAlternative represents a Halal alternative ingredient
type HalalAlternative struct {
	Name       string `json:"name"`
	ArabicName string `json:"arabic_name"`
	Notes      string `json:"notes"`
}

// NewHalalFilterService creates a new Halal filter service
func NewHalalFilterService() *HalalFilterService {
	service := &HalalFilterService{
		haramIngredients: make(map[string]HaramIngredient),
	}
	
	// Initialize Haram ingredients database
	service.initializeHaramIngredients()
	
	return service
}

// initializeHaramIngredients initializes the database of Haram and Mashbooh ingredients
func (hfs *HalalFilterService) initializeHaramIngredients() {
	// Explicitly Haram Ingredients (حرام)
	hfs.haramIngredients["pork"] = HaramIngredient{
		Name:       "Pork/Lard",
		ArabicName: "لحم الخنزير / شحم الخنزير",
		Category:   "haram",
		Alternatives: []HalalAlternative{
			{Name: "Beef fat (Halal)", ArabicName: "دهن البقر (حلال)", Notes: "Must be Zabiha slaughtered"},
			{Name: "Vegetable oil", ArabicName: "زيت نباتي", Notes: "Plant-based alternative"},
		},
	}
	
	hfs.haramIngredients["gelatin_pork"] = HaramIngredient{
		Name:       "Gelatin (Pork)",
		ArabicName: "جيلاتين (خنزير)",
		Category:   "haram",
		Alternatives: []HalalAlternative{
			{Name: "Fish gelatin", ArabicName: "جيلاتين السمك", Notes: "Halal fish gelatin"},
			{Name: "Agar-agar", ArabicName: "أجار أجار", Notes: "Plant-based gelatin substitute"},
		},
	}
	
	hfs.haramIngredients["blood"] = HaramIngredient{
		Name:       "Blood",
		ArabicName: "دم",
		Category:   "haram",
		Alternatives: []HalalAlternative{
			{Name: "Iron supplements (plant-based)", ArabicName: "مكملات الحديد (نباتية)", Notes: "Plant-based iron sources"},
		},
	}
	
	hfs.haramIngredients["alcohol"] = HaramIngredient{
		Name:       "Alcohol (Ethanol)",
		ArabicName: "كحول (إيثانول)",
		Category:   "haram",
		Alternatives: []HalalAlternative{
			{Name: "Fruit extracts", ArabicName: "مستخلصات الفاكهة", Notes: "Natural flavoring"},
			{Name: "Vinegar", ArabicName: "خل", Notes: "Fermented vinegar is Halal"},
		},
	}
	
	hfs.haramIngredients["carmine"] = HaramIngredient{
		Name:       "Carmine (E120)",
		ArabicName: "كارمين / قرمزي",
		Category:   "haram",
		Alternatives: []HalalAlternative{
			{Name: "Beetroot juice", ArabicName: "عصير الشمندر", Notes: "Natural red coloring"},
			{Name: "Anthocyanin", ArabicName: "أنثوسيانين", Notes: "Plant-based pigment"},
		},
	}
	
	hfs.haramIngredients["shellac"] = HaramIngredient{
		Name:       "Shellac (E904)",
		ArabicName: "شلاك",
		Category:   "haram",
		Alternatives: []HalalAlternative{
			{Name: "Carnauba wax", ArabicName: "شمع كارنوبا", Notes: "Plant-based wax"},
			{Name: "Synthetic glaze", ArabicName: "طلاء صناعي", Notes: "Synthetic alternative"},
		},
	}
	
	// Suspicious (Mashbooh - مشبوه) Ingredients
	hfs.haramIngredients["gelatin"] = HaramIngredient{
		Name:       "Gelatin (General)",
		ArabicName: "جيلاتين",
		Category:   "mashbooh",
		Alternatives: []HalalAlternative{
			{Name: "Fish gelatin", ArabicName: "جيلاتين السمك", Notes: "Must be Halal certified"},
			{Name: "Agar-agar", ArabicName: "أجار أجار", Notes: "Plant-based alternative"},
		},
	}
	
	hfs.haramIngredients["enzymes"] = HaramIngredient{
		Name:       "Enzymes (Animal)",
		ArabicName: "إنزيمات (حيوانية)",
		Category:   "mashbooh",
		Alternatives: []HalalAlternative{
			{Name: "Microbial enzymes", ArabicName: "إنزيمات ميكروبية", Notes: "Bacterial/fungal enzymes"},
			{Name: "Plant enzymes", ArabicName: "إنزيمات نباتية", Notes: "Plant-derived enzymes"},
		},
	}
	
	hfs.haramIngredients["glycerin"] = HaramIngredient{
		Name:       "Glycerin",
		ArabicName: "جليسرين",
		Category:   "mashbooh",
		Alternatives: []HalalAlternative{
			{Name: "Vegetable glycerin", ArabicName: "جليسرين نباتي", Notes: "Must specify vegetable source"},
		},
	}
	
	hfs.haramIngredients["mono_diglycerides"] = HaramIngredient{
		Name:       "Mono-Diglycerides (E471)",
		ArabicName: "أحاديث وثنائي الجليسريد",
		Category:   "mashbooh",
		Alternatives: []HalalAlternative{
			{Name: "Plant-based emulsifiers (e.g., soy)", ArabicName: "مستحلبات نباتية (مثل فول الصويا)", Notes: "Must be plant-derived"},
		},
	}
	
	hfs.haramIngredients["natural_flavors"] = HaramIngredient{
		Name:       "Natural Flavors",
		ArabicName: "نكهات طبيعية",
		Category:   "mashbooh",
		Alternatives: []HalalAlternative{
			{Name: "Plant extracts", ArabicName: "مستخلصات نباتية", Notes: "Must be Halal certified"},
			{Name: "Synthetic flavors", ArabicName: "نكهات صناعية", Notes: "Synthetic alternatives"},
		},
	}
	
	hfs.haramIngredients["l_cysteine"] = HaramIngredient{
		Name:       "L-Cysteine (E920)",
		ArabicName: "سيستئين",
		Category:   "mashbooh",
		Alternatives: []HalalAlternative{
			{Name: "Synthetic L-cysteine", ArabicName: "سيستئين صناعي", Notes: "Synthetic version"},
			{Name: "Plant-based", ArabicName: "مشتق من النباتات", Notes: "Plant-derived version"},
		},
	}
	
	hfs.haramIngredients["wine_vinegar"] = HaramIngredient{
		Name:       "Wine Vinegar",
		ArabicName: "خل النبيذ",
		Category:   "mashbooh",
		Alternatives: []HalalAlternative{
			{Name: "Apple cider vinegar", ArabicName: "خل التفاح", Notes: "Halal vinegar"},
			{Name: "Distilled vinegar", ArabicName: "الخل المقطر", Notes: "Distilled vinegar"},
		},
	}
	
	// Vanilla extract replacement
	hfs.haramIngredients["vanilla_extract"] = HaramIngredient{
		Name:       "Vanilla Extract",
		ArabicName: "مستخلص الفانيليا",
		Category:   "mashbooh",
		Alternatives: []HalalAlternative{
			{Name: "Vanilline powder", ArabicName: "بودرة الفانيلين", Notes: "Synthetic vanilla flavor"},
			{Name: "Vanilla bean powder", ArabicName: "بودرة حبوب الفانيليا", Notes: "Ground vanilla beans"},
		},
	}
}

// FilterIngredients filters and replaces Haram/Mashbooh ingredients with Halal alternatives
func (hfs *HalalFilterService) FilterIngredients(ingredients []string) ([]string, []IngredientReplacement) {
	var filteredIngredients []string
	var replacements []IngredientReplacement
	
	for _, ingredient := range ingredients {
		normalizedIngredient := strings.ToLower(strings.TrimSpace(ingredient))
		
		// Check if ingredient is Haram or Mashbooh
		if haramIngredient, exists := hfs.findHaramIngredient(normalizedIngredient); exists {
			// Replace with first available alternative
			if len(haramIngredient.Alternatives) > 0 {
				replacement := IngredientReplacement{
					Original:     ingredient,
					Replacement:  haramIngredient.Alternatives[0].Name,
					ArabicName:   haramIngredient.Alternatives[0].ArabicName,
					Category:     haramIngredient.Category,
					Notes:        haramIngredient.Alternatives[0].Notes,
				}
				replacements = append(replacements, replacement)
				filteredIngredients = append(filteredIngredients, haramIngredient.Alternatives[0].Name)
			}
		} else {
			// Ingredient is Halal, keep as is
			filteredIngredients = append(filteredIngredients, ingredient)
		}
	}
	
	return filteredIngredients, replacements
}

// findHaramIngredient finds if an ingredient is Haram or Mashbooh
func (hfs *HalalFilterService) findHaramIngredient(ingredient string) (HaramIngredient, bool) {
	// Direct match
	if haramIngredient, exists := hfs.haramIngredients[ingredient]; exists {
		return haramIngredient, true
	}
	
	// Partial match
	for key, haramIngredient := range hfs.haramIngredients {
		if strings.Contains(ingredient, key) || strings.Contains(key, ingredient) {
			return haramIngredient, true
		}
	}
	
	// Check for common variations
	variations := map[string]string{
		"vanilla": "vanilla_extract",
		"gelatin": "gelatin",
		"glycerin": "glycerin",
		"alcohol": "alcohol",
		"carmine": "carmine",
		"shellac": "shellac",
		"enzymes": "enzymes",
		"mono": "mono_diglycerides",
		"diglycerides": "mono_diglycerides",
		"natural flavor": "natural_flavors",
		"natural flavours": "natural_flavors",
		"l-cysteine": "l_cysteine",
		"lcysteine": "l_cysteine",
		"wine vinegar": "wine_vinegar",
	}
	
	for variation, key := range variations {
		if strings.Contains(ingredient, variation) {
			if haramIngredient, exists := hfs.haramIngredients[key]; exists {
				return haramIngredient, true
			}
		}
	}
	
	return HaramIngredient{}, false
}

// IngredientReplacement represents a replacement made for Haram/Mashbooh ingredients
type IngredientReplacement struct {
	Original     string `json:"original"`
	Replacement  string `json:"replacement"`
	ArabicName   string `json:"arabic_name"`
	Category     string `json:"category"`
	Notes        string `json:"notes"`
}

// GetHalalAlternatives returns all available Halal alternatives for a given ingredient
func (hfs *HalalFilterService) GetHalalAlternatives(ingredient string) ([]HalalAlternative, bool) {
	normalizedIngredient := strings.ToLower(strings.TrimSpace(ingredient))
	
	if haramIngredient, exists := hfs.findHaramIngredient(normalizedIngredient); exists {
		return haramIngredient.Alternatives, true
	}
	
	return nil, false
}

// IsIngredientHalal checks if an ingredient is Halal
func (hfs *HalalFilterService) IsIngredientHalal(ingredient string) bool {
	_, isHaram := hfs.findHaramIngredient(strings.ToLower(strings.TrimSpace(ingredient)))
	return !isHaram
}

// GetHaramIngredientsList returns a list of all Haram and Mashbooh ingredients
func (hfs *HalalFilterService) GetHaramIngredientsList() map[string]HaramIngredient {
	return hfs.haramIngredients
}

// CreateHalalDisclaimer creates a disclaimer for Halal filtering
func (hfs *HalalFilterService) CreateHalalDisclaimer() string {
	return "This meal plan has been filtered to exclude Haram (حرام) and Mashbooh (مشبوه) ingredients and replace them with Halal alternatives. " +
		"However, it is recommended to verify the Halal certification of all ingredients and consult with a qualified Islamic scholar for specific dietary requirements. " +
		"Individual Halal standards may vary based on personal or regional interpretations."
}
