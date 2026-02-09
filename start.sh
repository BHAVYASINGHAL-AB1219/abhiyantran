#!/bin/bash

# Start Script for Abhiyantran
# Launches both frontend and backend servers.

echo "🚀 Starting Abhiyantran Application..."

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Stopping services..."
    kill $(jobs -p) 2>/dev/null
}
trap cleanup EXIT

# Start Backend
echo "🐘 Starting Backend (PHP)..."
cd backend
php -S 127.0.0.1:8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "   Backend running on http://127.0.0.1:8000 (PID: $BACKEND_PID)"
cd ..

# Start Frontend
echo "⚛️  Starting Frontend (Vite)..."
npm run dev &
FRONTEND_PID=$!
echo "   Frontend running (PID: $FRONTEND_PID)"

# Wait for both processes
wait
