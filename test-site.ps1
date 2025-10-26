# Quick site test script

Write-Host "Testing RepairHub Pro..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://70.34.252.148:3000" -TimeoutSec 10 -ErrorAction Stop
    
    Write-Host "✅ Site is accessible!" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Content Length: $($response.Content.Length) bytes" -ForegroundColor Green
    
    # Extract title
    if ($response.Content -match '<title>(.*?)</title>') {
        $title = $matches[1]
        Write-Host "Title: $title" -ForegroundColor Yellow
    }
    
    # Check for React
    if ($response.Content -match 'index-BOAV0-m9\.js') {
        Write-Host "✅ JavaScript file referenced" -ForegroundColor Green
    }
    
    # Test JS file
    try {
        $jsUrl = "http://70.34.252.148:3000/assets/index-BOAV0-m9.js"
        $jsResponse = Invoke-WebRequest -Uri $jsUrl -TimeoutSec 10
        Write-Host "✅ JavaScript file accessible: $($jsResponse.Content.Length) bytes" -ForegroundColor Green
    } catch {
        Write-Host "❌ JavaScript file not accessible: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Open in browser
    Write-Host "`nOpening in browser..." -ForegroundColor Cyan
    Start-Process "http://70.34.252.148:3000"
    
} catch {
    Write-Host "❌ Site is not accessible: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nPlease check:" -ForegroundColor Yellow
    Write-Host "1. Is container running? (docker compose ps)" -ForegroundColor Yellow
    Write-Host "2. Check logs (docker compose logs)" -ForegroundColor Yellow
    Write-Host "3. Try restarting (docker compose restart)" -ForegroundColor Yellow
}

