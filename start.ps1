#!/usr/bin/env pwsh

Write-Host "🚀 Starting RP-Modern Development Server..." -ForegroundColor Green
Write-Host ""

# Add Node.js to PATH if needed
$nodePath = "$PSScriptRoot\..\nodejs-portable\node-v20.18.0-win-x64"
if (Test-Path $nodePath) {
    $env:Path = "$nodePath;$env:Path"
}

# Verify Node.js
Write-Host "📦 Checking Node.js version..." -ForegroundColor Cyan
node --version
npm --version
Write-Host ""

# Start the dev server
Write-Host "🌐 Starting Vite dev server on http://localhost:3000..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host ""

npm run dev


