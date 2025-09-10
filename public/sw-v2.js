// Enhanced Service Worker with Workbox-style Strategies
// Version: 2.0.0 - RFC 7807 Compliant

const CACHE_NAME = 'nutrition-pwa-v2';
const OFFLINE_PAGE = '/offline.html';
const API_BASE = '/api/v1';

// App Shell Resources (Cache First Strategy)
const APP_SHELL_RESOURCES = [
  '/',
  '/static/css/app.min.css',
  '/static/js/app.min.js',
  '/static/js/carb-cycling-calculator.js',
  '/manifest.json',
  '/offline.html'
];

// API Cache Strategy Configuration
const API_CACHE_CONFIG = {
  cacheName: 'api-cache-v1',
  maxEntries: 50,
  maxAgeSeconds: 5 * 60, // 5 minutes
  purgeOnQuotaError: true
};

// Network Timeout Configuration
const NETWORK_TIMEOUT = 3000; // 3 seconds

// Install Event - Cache App Shell
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker v2.0.0');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell resources');
        return cache.addAll(APP_SHELL_RESOURCES);
      })
      .then(() => {
        console.log('[SW] App shell cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Failed to cache app shell:', error);
      })
  );
});

// Activate Event - Clean Old Caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker v2.0.0');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== CACHE_NAME && 
              cacheName !== API_CACHE_CONFIG.cacheName
            )
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch Event - Handle different request types
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle different types of requests with appropriate strategies
  if (url.pathname.startsWith(API_BASE)) {
    // API Requests - Network First with RFC 7807 error responses
    event.respondWith(handleAPIRequest(request));
  } else if (APP_SHELL_RESOURCES.includes(url.pathname)) {
    // App Shell - Cache First
    event.respondWith(handleCacheFirst(request));
  } else if (request.destination === 'image') {
    // Images - Cache First with Network Fallback
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'document') {
    // Navigation - Network First with Offline Fallback
    event.respondWith(handleNavigationRequest(request));
  } else {
    // Other Resources - Stale While Revalidate
    event.respondWith(handleStaleWhileRevalidate(request));
  }
});

// Strategy: Network First for API requests with RFC 7807 compliance
async function handleAPIRequest(request) {
  const cache = await caches.open(API_CACHE_CONFIG.cacheName);
  
  try {
    // Try network first with timeout
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), NETWORK_TIMEOUT)
      )
    ]);

    if (networkResponse.ok) {
      // Cache successful responses
      if (request.method === 'GET') {
        const responseClone = networkResponse.clone();
        await cache.put(request, responseClone);
        await enforceMaxEntries(cache, API_CACHE_CONFIG.maxEntries);
      }
      return networkResponse;
    }
    
    throw new Error(`HTTP ${networkResponse.status}`);
  } catch (error) {
    console.log('[SW] API network failed, trying cache:', error.message);
    
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      // Check if cached response is still fresh
      const cachedDate = new Date(cachedResponse.headers.get('date'));
      const now = new Date();
      const age = (now - cachedDate) / 1000; // seconds
      
      if (age < API_CACHE_CONFIG.maxAgeSeconds) {
        console.log('[SW] Serving fresh cached API response');
        return cachedResponse;
      }
    }
    
    // Return RFC 7807 compliant error response
    const problemDetails = {
      type: 'https://api.nutrition-platform.com/problems/service-unavailable',
      title: 'Service Unavailable',
      status: 503,
      detail: 'The API is currently unavailable. Please check your network connection and try again.',
      instance: request.url
    };
    
    return new Response(
      JSON.stringify(problemDetails),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/problem+json'
        }
      }
    );
  }
}

// Strategy: Cache First for app shell
async function handleCacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('[SW] Serving from cache:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    throw error;
  }
}

// Strategy: Cache First for images with fallback
async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    return networkResponse;
  } catch (error) {
    // Return placeholder image
    return new Response(
      '<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="#999">Image Unavailable</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Strategy: Network First for navigation with offline page
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.log('[SW] Navigation request failed, serving offline page');
    const cache = await caches.open(CACHE_NAME);
    const offlineResponse = await cache.match(OFFLINE_PAGE);
    return offlineResponse || new Response('Offline', { status: 503 });
  }
}

// Strategy: Stale While Revalidate
async function handleStaleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Start fetch in background
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        const responseClone = networkResponse.clone();
        cache.put(request, responseClone);
      }
      return networkResponse;
    })
    .catch(error => {
      console.log('[SW] Stale while revalidate fetch failed:', error);
      return null;
    });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cache
  return fetchPromise;
}

// Utility: Enforce cache size limits
async function enforceMaxEntries(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    const oldestKeys = keys.slice(0, keys.length - maxEntries);
    await Promise.all(oldestKeys.map(key => cache.delete(key)));
  }
}

// Background Sync for failed API requests (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
      console.log('[SW] Background sync triggered');
      event.waitUntil(doBackgroundSync());
    }
  });
}

async function doBackgroundSync() {
  console.log('[SW] Performing background sync');
}

// Error Handling
self.addEventListener('error', event => {
  console.error('[SW] Service worker error:', event.error);
});

// Unhandled Promise Rejection
self.addEventListener('unhandledrejection', event => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

console.log('[SW] Service worker script loaded successfully');
