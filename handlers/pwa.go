package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"doctorhealthy1/models"
	"doctorhealthy1/services"
)

type PWAHandler struct {
	pwaService *services.PWAService
}

func NewPWAHandler(pwaService *services.PWAService) *PWAHandler {
	return &PWAHandler{
		pwaService: pwaService,
	}
}

// GetManifest returns the PWA manifest
func (h *PWAHandler) GetManifest(c echo.Context) error {
	manifest := h.pwaService.GetManifest()
	
	// Set appropriate headers for manifest
	c.Response().Header().Set("Content-Type", "application/manifest+json")
	c.Response().Header().Set("Cache-Control", "public, max-age=86400") // 24 hours
	
	return c.JSON(http.StatusOK, manifest)
}

// GetInstallPrompt returns install prompt information
func (h *PWAHandler) GetInstallPrompt(c echo.Context) error {
	userAgent := c.Request().Header.Get("User-Agent")
	
	// Determine platform and install capability
	platform := determinePlatform(userAgent)
	canInstall := canInstallPWA(userAgent)
	
	installInfo := map[string]interface{}{
		"canInstall":    canInstall,
		"platform":      platform,
		"installMethod": getInstallMethod(platform),
		"benefits": []string{
			"Offline access to nutrition data",
			"Faster loading times",
			"Native app-like experience",
			"Home screen access",
			"Push notifications (coming soon)",
		},
		"requirements": map[string]interface{}{
			"https":           true,
			"serviceWorker":   true,
			"manifest":        true,
			"installPrompt":   canInstall,
		},
	}
	
	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    installInfo,
	})
}

// HandleInstall records PWA installation
func (h *PWAHandler) HandleInstall(c echo.Context) error {
	var req struct {
		Platform    string `json:"platform"`
		UserAgent   string `json:"userAgent"`
		InstallType string `json:"installType"` // "manual", "prompt", "automatic"
		Success     bool   `json:"success"`
	}

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, models.APIResponse{
			Success: false,
			Error:   "Invalid request body",
		})
	}

	// Record installation event
	installEvent := &services.PWAInstallEvent{
		UserAgent:   req.UserAgent,
		Platform:    req.Platform,
		Timestamp:   time.Now(),
		InstallType: req.InstallType,
		Success:     req.Success,
	}

	if err := h.pwaService.RecordInstallEvent(installEvent); err != nil {
		return c.JSON(http.StatusInternalServerError, models.APIResponse{
			Success: false,
			Error:   "Failed to record install event",
		})
	}

	response := map[string]interface{}{
		"message": "Installation recorded successfully",
		"installId": installEvent.Timestamp.Unix(),
		"nextSteps": []string{
			"Explore the offline nutrition database",
			"Set up your dietary preferences",
			"Create your first meal plan",
			"Enable location for local recommendations",
		},
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    response,
	})
}

// GetInstallStats returns installation statistics (admin only)
func (h *PWAHandler) GetInstallStats(c echo.Context) error {
	// Check if user has admin permissions
	apiKey, ok := c.Get("api_key").(*models.APIKey)
	if !ok {
		return c.JSON(http.StatusUnauthorized, models.APIResponse{
			Success: false,
			Error:   "API key not found in context",
		})
	}

	if !apiKey.HasPermission("admin:full") {
		return c.JSON(http.StatusForbidden, models.APIResponse{
			Success: false,
			Error:   "Admin permission required",
		})
	}

	stats := h.pwaService.GetInstallStats()

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    stats,
	})
}

// GetServiceWorker returns the service worker script
func (h *PWAHandler) GetServiceWorker(c echo.Context) error {
	serviceWorkerScript := h.pwaService.GenerateServiceWorker()
	
	// Set appropriate headers for service worker
	c.Response().Header().Set("Content-Type", "application/javascript")
	c.Response().Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	c.Response().Header().Set("Service-Worker-Allowed", "/")
	
	return c.String(http.StatusOK, serviceWorkerScript)
}

// GetOfflinePage returns the offline fallback page
func (h *PWAHandler) GetOfflinePage(c echo.Context) error {
	offlineHTML := `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - NutriTracker Pro</title>
    <link href="/static/css/bootstrap.min.css" rel="stylesheet">
    <link href="/static/css/app.min.css" rel="stylesheet">
    <style>
        .offline-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .offline-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.8;
        }
        .offline-actions {
            margin-top: 2rem;
        }
        .btn-offline {
            margin: 0.5rem;
            border: 2px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
        }
        .btn-offline:hover {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.5);
        }
    </style>
</head>
<body>
    <div class="offline-container">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="offline-icon">📱</div>
                    <h1 class="mb-3">You're Offline</h1>
                    <p class="lead mb-4">
                        Don't worry! NutriTracker works offline too. 
                        You can still access your saved nutrition data and meal plans.
                    </p>
                    
                    <div class="offline-actions">
                        <button class="btn btn-light btn-offline" onclick="window.location.reload()">
                            🔄 Try Again
                        </button>
                        <button class="btn btn-light btn-offline" onclick="goToHome()">
                            🏠 Go Home
                        </button>
                        <button class="btn btn-light btn-offline" onclick="viewCachedData()">
                            📊 View Saved Data
                        </button>
                    </div>
                    
                    <div class="mt-4">
                        <small class="text-light">
                            Your data will sync automatically when you're back online.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function goToHome() {
            window.location.href = '/';
        }
        
        function viewCachedData() {
            // Try to load cached nutrition data
            if ('caches' in window) {
                caches.match('/api/nutrition-info').then(response => {
                    if (response) {
                        window.location.href = '/nutrition';
                    } else {
                        alert('No cached nutrition data available. Please try again when online.');
                    }
                });
            }
        }

        // Auto-retry connection every 30 seconds
        setInterval(() => {
            if (navigator.onLine) {
                window.location.reload();
            }
        }, 30000);

        // Listen for online event
        window.addEventListener('online', () => {
            window.location.reload();
        });
    </script>
</body>
</html>`

	c.Response().Header().Set("Content-Type", "text/html; charset=utf-8")
	c.Response().Header().Set("Cache-Control", "public, max-age=3600")
	
	return c.HTML(http.StatusOK, offlineHTML)
}

// GetPWAConfig returns PWA configuration for client-side use
func (h *PWAHandler) GetPWAConfig(c echo.Context) error {
	config := h.pwaService.GetConfig()
	
	// Create client-safe config (remove sensitive data)
	clientConfig := map[string]interface{}{
		"cacheName":           config.CacheName,
		"cacheVersion":        config.CacheVersion,
		"offlineStrategy":     config.OfflineStrategy,
		"updateNotification":  config.UpdateNotification,
		"installPrompt":       config.InstallPrompt,
		"features": map[string]bool{
			"backgroundSync":    config.BackgroundSync,
			"pushNotifications": config.PushNotifications,
			"offlineSupport":    true,
			"installable":       true,
		},
	}

	return c.JSON(http.StatusOK, models.APIResponse{
		Success: true,
		Data:    clientConfig,
	})
}

// Helper functions

func determinePlatform(userAgent string) string {
	switch {
	case contains(userAgent, "Android"):
		return "android"
	case contains(userAgent, "iPhone") || contains(userAgent, "iPad"):
		return "ios"
	case contains(userAgent, "Windows"):
		return "windows"
	case contains(userAgent, "Mac"):
		return "macos"
	case contains(userAgent, "Linux"):
		return "linux"
	default:
		return "unknown"
	}
}

func canInstallPWA(userAgent string) bool {
	// PWA installation is supported on most modern browsers
	// Chrome, Edge, Safari (iOS 14+), Firefox (with flag)
	unsupportedBrowsers := []string{
		"MSIE", "Trident", // Old Internet Explorer
	}
	
	for _, browser := range unsupportedBrowsers {
		if contains(userAgent, browser) {
			return false
		}
	}
	
	return true
}

func getInstallMethod(platform string) map[string]interface{} {
	methods := map[string]map[string]interface{}{
		"android": {
			"method": "Add to Home Screen",
			"steps": []string{
				"Tap the menu button (⋮) in your browser",
				"Select 'Add to Home screen' or 'Install app'",
				"Follow the prompts to install",
			},
		},
		"ios": {
			"method": "Add to Home Screen",
			"steps": []string{
				"Tap the Share button (□) in Safari",
				"Scroll down and tap 'Add to Home Screen'",
				"Tap 'Add' to confirm",
			},
		},
		"windows": {
			"method": "Install from Browser",
			"steps": []string{
				"Click the install button (⊕) in the address bar",
				"Or use Ctrl+Shift+I to open install prompt",
				"Click 'Install' to add to your desktop",
			},
		},
		"macos": {
			"method": "Install from Browser",
			"steps": []string{
				"Click the install button in the address bar",
				"Or use Cmd+Shift+I to open install prompt",
				"Click 'Install' to add to your Applications",
			},
		},
	}
	
	if method, exists := methods[platform]; exists {
		return method
	}
	
	return map[string]interface{}{
		"method": "Browser Install",
		"steps": []string{
			"Look for an install button in your browser",
			"Or check your browser's menu for 'Install' option",
			"Follow your browser's installation prompts",
		},
	}
}

func contains(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || 
		len(s) > len(substr) && 
		(s[:len(substr)] == substr || 
		 s[len(s)-len(substr):] == substr || 
		 containsSubstring(s, substr)))
}

func containsSubstring(s, substr string) bool {
	for i := 0; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}
