# Start Script for Abhiyantran (PowerShell)
# Launches both frontend and backend servers.

Write-Host "🚀 Starting Abhiyantran Application..." -ForegroundColor Green

# Start Backend
Write-Host "🐘 Starting Backend (PHP)..." -ForegroundColor Cyan
$backendProcess = Start-Process -FilePath "php" -ArgumentList "-S 127.0.0.1:8000", "-t", "backend" -PassThru -NoNewWindow
Write-Host "   Backend running on http://127.0.0.1:8000 (ID: $($backendProcess.Id))"

# Start Frontend
Write-Host "⚛️  Starting Frontend (Vite)..." -ForegroundColor Cyan
$frontendProcess = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -PassThru -NoNewWindow
Write-Host "   Frontend running (ID: $($frontendProcess.Id))"

Write-Host "`n🛑 Press Ctrl+C to stop servers..." -ForegroundColor Yellow

try {
    # Wait indefinitely
    while ($true) {
        Start-Sleep -Seconds 1
        if ($backendProcess.HasExited -or $frontendProcess.HasExited) {
            break
        }
    }
} finally {
    Write-Host "Stopping services..."
    Stop-Process -Id $backendProcess.Id -ErrorAction SilentlyContinue
    Stop-Process -Id $frontendProcess.Id -ErrorAction SilentlyContinue
}
