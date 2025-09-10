# Dockerfile for Doctorhealthy1 Platform
FROM golang:1.22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Final stage
FROM alpine:latest

# Install ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /app/main .

# Copy all data files
COPY --from=builder /app/*.js ./
COPY --from=builder /app/*.json ./
COPY --from=builder /app/disease-easy-json-files/ ./disease-easy-json-files/
COPY --from=builder /app/injury-easy-json/ ./injury-easy-json/
COPY --from=builder /app/plans-and-recipes-json/ ./plans-and-recipes-json/
COPY --from=builder /app/workouts-json/ ./workouts-json/
COPY --from=builder /app/frontend/ ./frontend/
COPY --from=builder /app/public/ ./public/

# Expose port
EXPOSE 8080

# Run the application
CMD ["./main"]
