#!/bin/bash

# Abhiyantran Project Setup Script
# This script automates the setup of both frontend and backend.

echo "🚀 Starting Abhiyantran Setup..."

# Directory variables
PROJECT_ROOT=$(pwd)
BACKEND_DIR="$PROJECT_ROOT/backend"

# --- Frontend Setup ---
echo "\n📦 Setting up Frontend..."
if [ -f "package.json" ]; then
    echo "   Running npm install..."
    npm install
else
    echo "❌ Error: package.json not found in $PROJECT_ROOT"
    exit 1
fi

# --- Backend Setup ---
echo "\n🐘 Setting up Backend..."
if [ -d "$BACKEND_DIR" ]; then
    cd "$BACKEND_DIR"
    
    # Check for .env file
    if [ -f ".env" ]; then
        echo "   ✅ .env file found."
    else
        if [ -f ".env.example" ]; then
            echo "   ⚠️  .env file not found. Creating from .env.example..."
            cp .env.example .env
            echo "   ✅ Created .env. Please update it with your actual secrets if needed."
        else
            echo "   ⚠️  Warning: Neither .env nor .env.example found."
        fi
    fi

    # Install Composer dependencies
    echo "   Running composer install..."
    if command -v composer &> /dev/null; then
        composer install
    else
        echo "   ⚠️  Composer is not installed. Skipping 'composer install'. Please install Composer manually."
    fi
    
    cd "$PROJECT_ROOT"
else
    echo "❌ Error: backend directory not found at $BACKEND_DIR"
    exit 1
fi

echo "\n🎉 Setup Complete!"
echo "To start the application:"
echo "1. Run Frontend: npm run dev"
echo "2. Run Backend: cd backend && php -S 127.0.0.1:8000"
echo "   (Or use the start.sh script if available)"
