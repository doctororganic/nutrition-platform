package services

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

// PWAService handles Progressive Web App functionality
type PWAService struct {
	manifest *PWAManifest
	config   *PWAConfig
}

// PWAManifest represents the web app manifest
type PWAManifest struct {
	Name            string                 `json:"name"`
	ShortName       string                 `json:"short_name"`
	Description     string                 `json:"description"`
	StartURL        string                 `json:"start_url"`
	Scope           string                 `json:"scope"`
	Display         string                 `json:"display"`
	Orientation     string                 `json:"orientation"`
	ThemeColor      string                 `json:"theme_color"`
	BackgroundColor string                 `json:"background_color"`
	Icons           []PWAIcon              `json:"icons"`
	Categories      []string               `json:"categories"`
	Lang            string                 `json:"lang"`
	Dir             string                 `json:"dir"`
	Screenshots     []PWAScreenshot        `json:"screenshots,omitempty"`
	Shortcuts       []PWAShortcut          `json:"shortcuts,omitempty"`
	RelatedApps     []PWARelatedApp        `json:"related_applications,omitempty"`
	PreferRelated   bool                   `json:"prefer_related_applications,omitempty"`
}

// PWAIcon represents an app icon
type PWAIcon struct {
	Src     string `json:"src"`
	Sizes   string `json:"sizes"`
	Type    string `json:"type"`
	Purpose string `json:"purpose,omitempty"`
}

// PWAScreenshot represents app screenshots
type PWAScreenshot struct {
	Src      string `json:"src"`
	Sizes    string `json:"sizes"`
	Type     string `json:"type"`
	Platform string `json:"platform,omitempty"`
	Label    string `json:"label,omitempty"`
}

// PWAShortcut represents app shortcuts
type PWAShortcut struct {
	Name        string    `json:"name"`
	URL         string    `json:"url"`
	Description string    `json:"description,omitempty"`
	Icons       []PWAIcon `json:"icons,omitempty"`
}

// PWARelatedApp represents related applications
type PWARelatedApp struct {
	Platform string `json:"platform"`
	URL      string `json:"url"`
	ID       string `json:"id,omitempty"`
}

// PWAConfig holds PWA configuration
type PWAConfig struct {
	CacheName           string        `json:"cache_name"`
	CacheVersion        string        `json:"cache_version"`
	CacheExpiration     time.Duration `json:"cache_expiration"`
	OfflineStrategy     string        `json:"offline_strategy"`
	UpdateNotification  bool          `json:"update_notification"`
	BackgroundSync      bool          `json:"background_sync"`
	PushNotifications   bool          `json:"push_notifications"`
	InstallPrompt       bool          `json:"install_prompt"`
	NetworkFirst        []string      `json:"network_first"`
	CacheFirst          []string      `json:"cache_first"`
	StaleWhileRevalidate []string     `json:"stale_while_revalidate"`
}

// PWAInstallEvent represents installation events
type PWAInstallEvent struct {
	UserAgent   string    `json:"user_agent"`
	Platform    string    `json:"platform"`
	Timestamp   time.Time `json:"timestamp"`
	InstallType string    `json:"install_type"` // "automatic", "manual", "prompt"
	Success     bool      `json:"success"`
}

// NewPWAService creates a new PWA service
func NewPWAService() *PWAService {
	manifest := &PWAManifest{
		Name:            getEnvOrDefault("PWA_NAME", "NutriTracker Pro"),
		ShortName:       getEnvOrDefault("PWA_SHORT_NAME", "NutriTracker"),
		Description:     getEnvOrDefault("PWA_DESCRIPTION", "Professional Nutrition and Training Platform"),
		StartURL:        getEnvOrDefault("PWA_START_URL", "/"),
		Scope:           getEnvOrDefault("PWA_SCOPE", "/"),
		Display:         getEnvOrDefault("PWA_DISPLAY", "standalone"),
		Orientation:     getEnvOrDefault("PWA_ORIENTATION", "portrait"),
		ThemeColor:      getEnvOrDefault("PWA_THEME_COLOR", "#2196F3"),
		BackgroundColor: getEnvOrDefault("PWA_BACKGROUND_COLOR", "#FFFFFF"),
		Lang:            "en",
		Dir:             "ltr",
		Categories:      []string{"health", "fitness", "nutrition", "lifestyle"},
		Icons: []PWAIcon{
			{
				Src:     "/static/icons/icon-72x72.png",
				Sizes:   "72x72",
				Type:    "image/png",
				Purpose: "any",
			},
			{
				Src:     "/static/icons/icon-96x96.png",
				Sizes:   "96x96",
				Type:    "image/png",
				Purpose: "any",
			},
			{
				Src:     "/static/icons/icon-128x128.png",
				Sizes:   "128x128",
				Type:    "image/png",
				Purpose: "any",
			},
			{
				Src:     "/static/icons/icon-144x144.png",
				Sizes:   "144x144",
				Type:    "image/png",
				Purpose: "any",
			},
			{
				Src:     "/static/icons/icon-152x152.png",
				Sizes:   "152x152",
				Type:    "image/png",
				Purpose: "any",
			},
			{
				Src:     "/static/icons/icon-192x192.png",
				Sizes:   "192x192",
				Type:    "image/png",
				Purpose: "any maskable",
			},
			{
				Src:     "/static/icons/icon-384x384.png",
				Sizes:   "384x384",
				Type:    "image/png",
				Purpose: "any",
			},
			{
				Src:     "/static/icons/icon-512x512.png",
				Sizes:   "512x512",
				Type:    "image/png",
				Purpose: "any maskable",
			},
		},
		Shortcuts: []PWAShortcut{
			{
				Name:        "Diet Calculator",
				URL:         "/diet-calculator",
				Description: "Calculate personalized diet plan",
				Icons: []PWAIcon{
					{
						Src:   "/static/icons/shortcut-diet.png",
						Sizes: "96x96",
						Type:  "image/png",
					},
				},
			},
			{
				Name:        "Workout Planner",
				URL:         "/workout-planner",
				Description: "Generate workout plans",
				Icons: []PWAIcon{
					{
						Src:   "/static/icons/shortcut-workout.png",
						Sizes: "96x96",
						Type:  "image/png",
					},
				},
			},
			{
				Name:        "Progress Tracker",
				URL:         "/progress",
				Description: "Track your health progress",
				Icons: []PWAIcon{
					{
						Src:   "/static/icons/shortcut-progress.png",
						Sizes: "96x96",
						Type:  "image/png",
					},
				},
			},
		},
	}

	config := &PWAConfig{
		CacheName:           "nutritracker-v1",
		CacheVersion:        "1.0.0",
		CacheExpiration:     24 * time.Hour,
		OfflineStrategy:     "cache_first",
		UpdateNotification:  true,
		BackgroundSync:      true,
		PushNotifications:   false,
		InstallPrompt:       true,
		NetworkFirst:        []string{"/api/"},
		CacheFirst:          []string{"/static/", "/manifest.json"},
		StaleWhileRevalidate: []string{"/", "/offline.html"},
	}

	return &PWAService{
		manifest: manifest,
		config:   config,
	}
}

// GetManifest returns the PWA manifest
func (pwa *PWAService) GetManifest() *PWAManifest {
	return pwa.manifest
}

// GetConfig returns the PWA configuration
func (pwa *PWAService) GetConfig() *PWAConfig {
	return pwa.config
}

// GenerateServiceWorker generates the service worker JavaScript
func (pwa *PWAService) GenerateServiceWorker() string {
	return fmt.Sprintf(`
// Service Worker for NutriTracker PWA
// Cache Version: %s
// Generated: %s

const CACHE_NAME = '%s';
const CACHE_VERSION = '%s';
const CURRENT_CACHE = CACHE_NAME + '-' + CACHE_VERSION;

// Files to cache for offline functionality
const STATIC_CACHE_FILES = [
    '/',
    '/offline.html',
    '/static/css/bootstrap.min.css',
    '/static/css/app.min.css',
    '/static/js/bootstrap.bundle.min.js',
    '/static/js/app.min.js',
    '/static/icons/icon-192x192.png',
    '/static/icons/icon-512x512.png',
    '/manifest.json'
];

// API cache configuration
const API_CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const NETWORK_TIMEOUT = 3000; // 3 seconds

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('[SW] Installing service worker');
    
    event.waitUntil(
        caches.open(CURRENT_CACHE)
            .then(cache => {
                console.log('[SW] Caching static files');
                return cache.addAll(STATIC_CACHE_FILES);
            })
            .then(() => {
                console.log('[SW] Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[SW] Failed to cache static files:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activating service worker');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName.startsWith(CACHE_NAME) && cacheName !== CURRENT_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Service worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // API requests - Network First with cache fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(handleAPIRequest(request));
        return;
    }
    
    // Static files - Cache First
    if (url.pathname.startsWith('/static/') || url.pathname === '/manifest.json') {
        event.respondWith(handleStaticRequest(request));
        return;
    }
    
    // HTML pages - Stale While Revalidate
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(handleHTMLRequest(request));
        return;
    }
    
    // Default - Network First
    event.respondWith(handleDefaultRequest(request));
});

// Handle API requests with network first strategy
async function handleAPIRequest(request) {
    try {
        // Try network first with timeout
        const networkResponse = await Promise.race([
            fetch(request.clone()),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Network timeout')), NETWORK_TIMEOUT)
            )
        ]);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(CURRENT_CACHE);
            cache.put(request.clone(), networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed for API request, trying cache:', request.url);
        
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return error response if no cache
        return new Response(
            JSON.stringify({
                success: false,
                error: 'Offline - Request failed and no cached data available',
                offline: true
            }),
            {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Handle static files with cache first strategy
async function handleStaticRequest(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CURRENT_CACHE);
            cache.put(request.clone(), networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[SW] Failed to fetch static file:', request.url);
        throw error;
    }
}

// Handle HTML requests with stale while revalidate
async function handleHTMLRequest(request) {
    const cache = await caches.open(CURRENT_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request.clone(), networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => {
        // Return offline page if available
        return caches.match('/offline.html');
    });
    
    // Return cached version immediately if available
    if (cachedResponse) {
        fetchPromise.catch(() => {}); // Update cache in background
        return cachedResponse;
    }
    
    // Wait for network if no cache
    return fetchPromise;
}

// Handle default requests
async function handleDefaultRequest(request) {
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    console.log('[SW] Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Handle background sync
async function doBackgroundSync() {
    try {
        // Process any offline data here
        console.log('[SW] Processing background sync');
        
        // Example: Send offline form data
        const offlineData = await getOfflineData();
        if (offlineData.length > 0) {
            for (const data of offlineData) {
                await syncData(data);
            }
            await clearOfflineData();
        }
    } catch (error) {
        console.error('[SW] Background sync failed:', error);
    }
}

// Get offline data from IndexedDB or localStorage
async function getOfflineData() {
    // Implementation depends on your offline storage strategy
    return [];
}

// Sync individual data item
async function syncData(data) {
    try {
        const response = await fetch(data.url, {
            method: data.method,
            headers: data.headers,
            body: data.body
        });
        
        if (!response.ok) {
            throw new Error('Sync failed');
        }
        
        console.log('[SW] Data synced successfully:', data.id);
    } catch (error) {
        console.error('[SW] Failed to sync data:', data.id, error);
        throw error;
    }
}

// Clear offline data after successful sync
async function clearOfflineData() {
    // Implementation depends on your offline storage strategy
    console.log('[SW] Offline data cleared');
}

// Handle push notifications (if enabled)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/static/icons/icon-192x192.png',
        badge: '/static/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: data.data,
        actions: data.actions || []
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            // Try to focus existing window
            for (const client of clientList) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            
            // Open new window
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

console.log('[SW] Service worker loaded successfully');
`,
		pwa.config.CacheVersion,
		time.Now().Format(time.RFC3339),
		pwa.config.CacheName,
		pwa.config.CacheVersion,
	)
}

// RecordInstallEvent records PWA installation events
func (pwa *PWAService) RecordInstallEvent(event *PWAInstallEvent) error {
	// In a real implementation, you would store this in a database
	// For now, we'll just log it
	eventJSON, _ := json.Marshal(event)
	fmt.Printf("PWA Install Event: %s\n", string(eventJSON))
	return nil
}

// GetInstallStats returns installation statistics
func (pwa *PWAService) GetInstallStats() map[string]interface{} {
	// In a real implementation, you would query the database
	return map[string]interface{}{
		"total_installs":     42,
		"installs_today":     5,
		"installs_this_week": 23,
		"platform_breakdown": map[string]int{
			"android": 25,
			"ios":     12,
			"desktop": 5,
		},
		"install_success_rate": 95.2,
		"last_updated":         time.Now(),
	}
}

// Helper function to get environment variable with default
func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
