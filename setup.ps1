# Abhiyantran Project Setup Script (PowerShell)
# This script automates the setup of both frontend and backend on Windows.

Write-Host "🚀 Starting Abhiyantran Setup..." -ForegroundColor Green

$projectRoot = Get-Location
$backendDir = Join-Path $projectRoot "backend"

# --- Frontend Setup ---
Write-Host "`n📦 Setting up Frontend..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    Write-Host "   Running npm install..."
    npm install
} else {
    Write-Error "❌ Error: package.json not found in $projectRoot"
    exit 1
}

# --- Backend Setup ---
Write-Host "`n🐘 Setting up Backend..." -ForegroundColor Cyan
if (Test-Path $backendDir) {
    Set-Location $backendDir
    
    # Check for .env file
    if (Test-Path ".env") {
        Write-Host "   ✅ .env file found." -ForegroundColor Green
    } else {
        if (Test-Path ".env.example") {
            Write-Host "   ⚠️  .env file not found. Creating from .env.example..." -ForegroundColor Yellow
            Copy-Item ".env.example" ".env"
            Write-Host "   ✅ Created .env. Please update it with your actual secrets if needed." -ForegroundColor Green
        } else {
            Write-Warning "   ⚠️  Warning: Neither .env nor .env.example found."
        }
    }

    # Install Composer dependencies
    Write-Host "   Running composer install..."
    if (Get-Command composer -ErrorAction SilentlyContinue) {
        composer install
    } else {
        Write-Warning "   ⚠️  Composer is not installed. Skipping 'composer install'. Please install Composer manually."
    }
    
    Set-Location $projectRoot
} else {
    Write-Error "❌ Error: backend directory not found at $backendDir"
    exit 1
}

Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "To start the application:"
Write-Host "1. Run Frontend: npm run dev"
Write-Host "2. Run Backend: cd backend; php -S 127.0.0.1:8000"
Write-Host "   (Or use the start.ps1 script)"
