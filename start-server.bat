@echo off
echo ========================================
echo  Nutrition Platform API Server
echo ========================================
echo.

REM Refresh environment variables to pick up Go installation
call refreshenv.cmd 2>nul

REM Check if Go is available
go version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Go is not found in PATH
    echo Please ensure Go is installed and restart your terminal
    echo Or run: winget install GoLang.Go
    pause
    exit /b 1
)

echo Go version:
go version
echo.

echo Building application...
go build -o nutrition-platform.exe .
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo Starting Nutrition Platform API server...
echo.
echo Server will be available at:
echo - Health Check: http://localhost:8081/health
echo - API Docs: http://localhost:8081/api
echo - Default Admin: username=admin, password=admin123
echo.
echo Press Ctrl+C to stop the server
echo.

nutrition-platform.exe
