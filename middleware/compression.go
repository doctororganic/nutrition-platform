package middleware

import (
	"bytes"
	"compress/gzip"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/andybalholm/brotli"
	"github.com/labstack/echo/v4"
	"doctorhealthy1/services"
)

// CompressionMiddleware provides dynamic compression for responses
func CompressionMiddleware(compressionService *services.CompressionService) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			res := c.Response()

			// Skip compression for certain content types
			if shouldSkipCompression(req) {
				return next(c)
			}

			// Determine best compression method
			acceptEncoding := req.Header.Get("Accept-Encoding")
			var compressor io.WriteCloser
			var encoding string

			if strings.Contains(acceptEncoding, "br") {
				// Brotli compression
				res.Header().Set("Content-Encoding", "br")
				res.Header().Set("Vary", "Accept-Encoding")
				compressor = brotli.NewWriterLevel(res.Writer, 6)
				encoding = "br"
			} else if strings.Contains(acceptEncoding, "gzip") {
				// Gzip compression
				res.Header().Set("Content-Encoding", "gzip")
				res.Header().Set("Vary", "Accept-Encoding")
				compressor, _ = gzip.NewWriterLevel(res.Writer, 6)
				encoding = "gzip"
			}

			if compressor != nil {
				defer compressor.Close()
				
				// Wrap the response writer
				res.Writer = &compressionWriter{
					Writer:     compressor,
					Response:   res,
					encoding:   encoding,
				}
			}

			return next(c)
		}
	}
}

// CacheMiddleware provides intelligent caching for responses
func CacheMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			res := c.Response()
			path := req.URL.Path

			// Set cache headers based on content type
			if isStaticAsset(path) {
				// Static assets - long cache
				res.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
				res.Header().Set("Expires", time.Now().AddDate(1, 0, 0).Format(http.TimeFormat))
			} else if isAPIEndpoint(path) {
				// API endpoints - short cache with validation
				res.Header().Set("Cache-Control", "public, max-age=300, must-revalidate")
				res.Header().Set("ETag", generateETag(path))
			} else if isHTMLPage(path) {
				// HTML pages - moderate cache
				res.Header().Set("Cache-Control", "public, max-age=3600, must-revalidate")
			} else {
				// Default - no cache
				res.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
				res.Header().Set("Pragma", "no-cache")
				res.Header().Set("Expires", "0")
			}

			// Add Vary header for better caching
			res.Header().Set("Vary", "Accept-Encoding, Accept-Language")

			return next(c)
		}
	}
}

// OptimizationMiddleware provides response optimization
func OptimizationMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			res := c.Response()

			// Add performance headers
			res.Header().Set("X-Content-Type-Options", "nosniff")
			res.Header().Set("X-Frame-Options", "SAMEORIGIN")
			res.Header().Set("X-XSS-Protection", "1; mode=block")

			// Add timing headers for debugging
			start := time.Now()
			
			err := next(c)
			
			duration := time.Since(start)
			res.Header().Set("X-Response-Time", duration.String())
			res.Header().Set("X-Served-By", "NutriTracker-PWA")

			// Add resource hints for better performance
			if isHTMLPage(req.URL.Path) {
				res.Header().Set("Link", `</static/css/bootstrap.min.css>; rel=preload; as=style, </static/js/app.min.js>; rel=preload; as=script`)
			}

			return err
		}
	}
}

// compressionWriter wraps the response writer for compression
type compressionWriter struct {
	io.Writer
	*echo.Response
	encoding string
}

func (cw *compressionWriter) Write(b []byte) (int, error) {
	return cw.Writer.Write(b)
}

func (cw *compressionWriter) WriteHeader(code int) {
	// Remove Content-Length header as it will be incorrect after compression
	cw.Response.Header().Del("Content-Length")
	cw.Response.WriteHeader(code)
}

// Helper functions

func shouldSkipCompression(req *http.Request) bool {
	contentType := req.Header.Get("Content-Type")
	
	// Skip compression for already compressed content
	skipTypes := []string{
		"image/",
		"video/",
		"audio/",
		"application/zip",
		"application/gzip",
		"application/x-rar-compressed",
		"application/pdf",
	}
	
	for _, skipType := range skipTypes {
		if strings.HasPrefix(contentType, skipType) {
			return true
		}
	}
	
	return false
}

func isStaticAsset(path string) bool {
	staticExtensions := []string{".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".woff", ".woff2", ".ttf", ".eot"}
	
	for _, ext := range staticExtensions {
		if strings.HasSuffix(path, ext) {
			return true
		}
	}
	
	return strings.HasPrefix(path, "/static/")
}

func isAPIEndpoint(path string) bool {
	return strings.HasPrefix(path, "/api/")
}

func isHTMLPage(path string) bool {
	return strings.HasSuffix(path, ".html") || 
		   path == "/" || 
		   (!strings.Contains(path, ".") && !strings.HasPrefix(path, "/api/"))
}

func generateETag(path string) string {
	// Simple ETag generation based on path and current time
	// In production, you'd use content hash or modification time
	hash := strconv.FormatInt(time.Now().Unix(), 36)
	return `"` + hash + `"`
}

// MinificationMiddleware provides HTML/CSS/JS minification
func MinificationMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Capture response
			rec := &minificationRecorder{
				ResponseWriter: c.Response().Writer,
				body:          &bytes.Buffer{},
			}
			c.Response().Writer = rec

			err := next(c)

			// Minify based on content type
			contentType := c.Response().Header().Get("Content-Type")
			
			if strings.Contains(contentType, "text/html") {
				minified := minifyHTML(rec.body.Bytes())
				c.Response().Header().Set("Content-Length", strconv.Itoa(len(minified)))
				rec.ResponseWriter.Write(minified)
			} else if strings.Contains(contentType, "text/css") {
				minified := minifyCSS(rec.body.Bytes())
				c.Response().Header().Set("Content-Length", strconv.Itoa(len(minified)))
				rec.ResponseWriter.Write(minified)
			} else if strings.Contains(contentType, "application/javascript") {
				minified := minifyJS(rec.body.Bytes())
				c.Response().Header().Set("Content-Length", strconv.Itoa(len(minified)))
				rec.ResponseWriter.Write(minified)
			} else {
				// No minification needed
				rec.ResponseWriter.Write(rec.body.Bytes())
			}

			return err
		}
	}
}

type minificationRecorder struct {
	http.ResponseWriter
	body *bytes.Buffer
}

func (r *minificationRecorder) Write(b []byte) (int, error) {
	return r.body.Write(b)
}

// Simple minification functions (in production, use proper minifiers)
func minifyHTML(data []byte) []byte {
	content := string(data)
	
	// Remove multiple spaces and newlines
	content = strings.ReplaceAll(content, "\n", " ")
	content = strings.ReplaceAll(content, "\r", "")
	content = strings.ReplaceAll(content, "\t", " ")
	
	// Remove multiple spaces
	for strings.Contains(content, "  ") {
		content = strings.ReplaceAll(content, "  ", " ")
	}
	
	// Remove spaces around HTML tags
	content = strings.ReplaceAll(content, "> <", "><")
	
	return []byte(strings.TrimSpace(content))
}

func minifyCSS(data []byte) []byte {
	content := string(data)
	
	// Remove comments
	content = strings.ReplaceAll(content, "/*", "")
	content = strings.ReplaceAll(content, "*/", "")
	
	// Remove whitespace
	content = strings.ReplaceAll(content, "\n", "")
	content = strings.ReplaceAll(content, "\r", "")
	content = strings.ReplaceAll(content, "\t", "")
	
	// Remove spaces around CSS syntax
	content = strings.ReplaceAll(content, ": ", ":")
	content = strings.ReplaceAll(content, "; ", ";")
	content = strings.ReplaceAll(content, "{ ", "{")
	content = strings.ReplaceAll(content, " }", "}")
	
	return []byte(strings.TrimSpace(content))
}

func minifyJS(data []byte) []byte {
	content := string(data)
	
	// Basic JS minification (remove comments and excess whitespace)
	lines := strings.Split(content, "\n")
	var minified []string
	
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if !strings.HasPrefix(line, "//") && line != "" {
			minified = append(minified, line)
		}
	}
	
	content = strings.Join(minified, " ")
	content = strings.ReplaceAll(content, "  ", " ")
	
	return []byte(strings.TrimSpace(content))
}
