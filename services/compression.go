package services

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/andybalholm/brotli"
)

// CompressionService handles file compression and optimization
type CompressionService struct {
	gzipLevel   int
	brotliLevel int
	enabled     bool
}

// CompressionStats represents compression statistics
type CompressionStats struct {
	OriginalSize   int64   `json:"originalSize"`
	CompressedSize int64   `json:"compressedSize"`
	CompressionType string `json:"compressionType"`
	Ratio          float64 `json:"ratio"`
	SavingsBytes   int64   `json:"savingsBytes"`
	SavingsPercent float64 `json:"savingsPercent"`
}

// NewCompressionService creates a new compression service
func NewCompressionService() *CompressionService {
	gzipLevel := 6
	brotliLevel := 6
	
	if level := os.Getenv("GZIP_COMPRESSION_LEVEL"); level != "" {
		if l, err := strconv.Atoi(level); err == nil && l >= 1 && l <= 9 {
			gzipLevel = l
		}
	}
	
	if level := os.Getenv("BROTLI_COMPRESSION_LEVEL"); level != "" {
		if l, err := strconv.Atoi(level); err == nil && l >= 1 && l <= 11 {
			brotliLevel = l
		}
	}

	return &CompressionService{
		gzipLevel:   gzipLevel,
		brotliLevel: brotliLevel,
		enabled:     true,
	}
}

// CompressGzip compresses data using gzip
func (cs *CompressionService) CompressGzip(data []byte) ([]byte, error) {
	if !cs.enabled {
		return data, nil
	}

	var buf bytes.Buffer
	writer, err := gzip.NewWriterLevel(&buf, cs.gzipLevel)
	if err != nil {
		return nil, fmt.Errorf("failed to create gzip writer: %v", err)
	}

	_, err = writer.Write(data)
	if err != nil {
		writer.Close()
		return nil, fmt.Errorf("failed to write gzip data: %v", err)
	}

	err = writer.Close()
	if err != nil {
		return nil, fmt.Errorf("failed to close gzip writer: %v", err)
	}

	return buf.Bytes(), nil
}

// CompressBrotli compresses data using brotli
func (cs *CompressionService) CompressBrotli(data []byte) ([]byte, error) {
	if !cs.enabled {
		return data, nil
	}

	var buf bytes.Buffer
	writer := brotli.NewWriterLevel(&buf, cs.brotliLevel)

	_, err := writer.Write(data)
	if err != nil {
		writer.Close()
		return nil, fmt.Errorf("failed to write brotli data: %v", err)
	}

	err = writer.Close()
	if err != nil {
		return nil, fmt.Errorf("failed to close brotli writer: %v", err)
	}

	return buf.Bytes(), nil
}

// DecompressGzip decompresses gzip data
func (cs *CompressionService) DecompressGzip(data []byte) ([]byte, error) {
	reader, err := gzip.NewReader(bytes.NewReader(data))
	if err != nil {
		return nil, fmt.Errorf("failed to create gzip reader: %v", err)
	}
	defer reader.Close()

	decompressed, err := io.ReadAll(reader)
	if err != nil {
		return nil, fmt.Errorf("failed to read gzip data: %v", err)
	}

	return decompressed, nil
}

// DecompressBrotli decompresses brotli data
func (cs *CompressionService) DecompressBrotli(data []byte) ([]byte, error) {
	reader := brotli.NewReader(bytes.NewReader(data))
	
	decompressed, err := io.ReadAll(reader)
	if err != nil {
		return nil, fmt.Errorf("failed to read brotli data: %v", err)
	}

	return decompressed, nil
}

// CompressJSON compresses JSON data with optimal settings
func (cs *CompressionService) CompressJSON(data interface{}) ([]byte, *CompressionStats, error) {
	// Marshal JSON with minimal formatting
	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to marshal JSON: %v", err)
	}

	originalSize := int64(len(jsonData))

	// Try both compression methods and choose the best
	gzipData, err := cs.CompressGzip(jsonData)
	if err != nil {
		return nil, nil, fmt.Errorf("gzip compression failed: %v", err)
	}

	brotliData, err := cs.CompressBrotli(jsonData)
	if err != nil {
		return nil, nil, fmt.Errorf("brotli compression failed: %v", err)
	}

	// Choose the better compression
	var compressedData []byte
	var compressionType string
	var compressedSize int64

	if len(brotliData) < len(gzipData) {
		compressedData = brotliData
		compressionType = "brotli"
		compressedSize = int64(len(brotliData))
	} else {
		compressedData = gzipData
		compressionType = "gzip"
		compressedSize = int64(len(gzipData))
	}

	stats := &CompressionStats{
		OriginalSize:    originalSize,
		CompressedSize:  compressedSize,
		CompressionType: compressionType,
		Ratio:           float64(compressedSize) / float64(originalSize),
		SavingsBytes:    originalSize - compressedSize,
		SavingsPercent:  (float64(originalSize-compressedSize) / float64(originalSize)) * 100,
	}

	return compressedData, stats, nil
}

// CompressFile compresses a file and saves compressed versions
func (cs *CompressionService) CompressFile(filePath string) (*CompressionStats, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %v", err)
	}

	originalSize := int64(len(data))

	// Compress with gzip
	gzipData, err := cs.CompressGzip(data)
	if err != nil {
		return nil, fmt.Errorf("gzip compression failed: %v", err)
	}

	// Compress with brotli
	brotliData, err := cs.CompressBrotli(data)
	if err != nil {
		return nil, fmt.Errorf("brotli compression failed: %v", err)
	}

	// Save compressed versions
	gzipPath := filePath + ".gz"
	if err := os.WriteFile(gzipPath, gzipData, 0644); err != nil {
		return nil, fmt.Errorf("failed to write gzip file: %v", err)
	}

	brotliPath := filePath + ".br"
	if err := os.WriteFile(brotliPath, brotliData, 0644); err != nil {
		return nil, fmt.Errorf("failed to write brotli file: %v", err)
	}

	// Return stats for the better compression
	var compressedSize int64
	var compressionType string

	if len(brotliData) < len(gzipData) {
		compressedSize = int64(len(brotliData))
		compressionType = "brotli"
	} else {
		compressedSize = int64(len(gzipData))
		compressionType = "gzip"
	}

	stats := &CompressionStats{
		OriginalSize:    originalSize,
		CompressedSize:  compressedSize,
		CompressionType: compressionType,
		Ratio:           float64(compressedSize) / float64(originalSize),
		SavingsBytes:    originalSize - compressedSize,
		SavingsPercent:  (float64(originalSize-compressedSize) / float64(originalSize)) * 100,
	}

	return stats, nil
}

// CompressDirectory compresses all files in a directory
func (cs *CompressionService) CompressDirectory(dirPath string, extensions []string) (map[string]*CompressionStats, error) {
	results := make(map[string]*CompressionStats)

	err := filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}

		// Check if file has target extension
		ext := strings.ToLower(filepath.Ext(path))
		shouldCompress := false
		for _, targetExt := range extensions {
			if ext == "."+strings.ToLower(targetExt) {
				shouldCompress = true
				break
			}
		}

		if !shouldCompress {
			return nil
		}

		stats, err := cs.CompressFile(path)
		if err != nil {
			return fmt.Errorf("failed to compress %s: %v", path, err)
		}

		relativePath, _ := filepath.Rel(dirPath, path)
		results[relativePath] = stats

		return nil
	})

	return results, err
}

// OptimizeJSON optimizes JSON files by removing unnecessary whitespace and compressing
func (cs *CompressionService) OptimizeJSON(data interface{}) ([]byte, error) {
	// Marshal with no indentation for minimal size
	optimized, err := json.Marshal(data)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal optimized JSON: %v", err)
	}

	return optimized, nil
}

// MinifyJSON removes all unnecessary whitespace from JSON
func (cs *CompressionService) MinifyJSON(jsonData []byte) ([]byte, error) {
	var obj interface{}
	if err := json.Unmarshal(jsonData, &obj); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %v", err)
	}

	minified, err := json.Marshal(obj)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal minified JSON: %v", err)
	}

	return minified, nil
}

// GetCompressionReport generates a comprehensive compression report
func (cs *CompressionService) GetCompressionReport(dirPath string) (map[string]interface{}, error) {
	report := map[string]interface{}{
		"timestamp":       time.Now(),
		"directory":       dirPath,
		"gzip_level":      cs.gzipLevel,
		"brotli_level":    cs.brotliLevel,
		"files_processed": 0,
		"total_original":  int64(0),
		"total_gzip":      int64(0),
		"total_brotli":    int64(0),
		"total_savings":   int64(0),
		"avg_compression": 0.0,
		"file_details":    make(map[string]*CompressionStats),
	}

	extensions := []string{"json", "js", "css", "html", "txt", "xml", "svg"}
	stats, err := cs.CompressDirectory(dirPath, extensions)
	if err != nil {
		return nil, err
	}

	totalOriginal := int64(0)
	totalCompressed := int64(0)
	filesProcessed := 0

	for file, stat := range stats {
		report["file_details"].(map[string]*CompressionStats)[file] = stat
		totalOriginal += stat.OriginalSize
		totalCompressed += stat.CompressedSize
		filesProcessed++
	}

	report["files_processed"] = filesProcessed
	report["total_original"] = totalOriginal
	report["total_compressed"] = totalCompressed
	report["total_savings"] = totalOriginal - totalCompressed

	if totalOriginal > 0 {
		report["avg_compression"] = float64(totalCompressed) / float64(totalOriginal)
		report["savings_percent"] = (float64(totalOriginal-totalCompressed) / float64(totalOriginal)) * 100
	}

	return report, nil
}
