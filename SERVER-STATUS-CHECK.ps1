# Check server status
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "                CHECKING SERVER STATUS" -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Checking IP:3000..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://70.34.252.148:3000" -Method GET -TimeoutSec 5 -UseBasicParsing
    Write-Host "   Status: $($response.StatusCode) OK" -ForegroundColor Green
} catch {
    Write-Host "   Status: Connection refused or timeout" -ForegroundColor Red
}

Write-Host ""

Write-Host "2. Checking domain..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://repairhub.one" -Method GET -TimeoutSec 5 -UseBasicParsing
    Write-Host "   Status: $($response.StatusCode) OK" -ForegroundColor Green
} catch {
    Write-Host "   Status: Connection timeout" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "CONCLUSION:" -ForegroundColor Yellow
Write-Host ""
Write-Host "The server is likely rebuilding Docker containers." -ForegroundColor White
Write-Host "This takes 3-5 minutes." -ForegroundColor White
Write-Host ""
Write-Host "If server still doesn't respond after 10 minutes:" -ForegroundColor Yellow
Write-Host "1. Go to VNC Console" -ForegroundColor White
Write-Host "2. Check Docker status:" -ForegroundColor White
Write-Host "   docker compose ps" -ForegroundColor Cyan
Write-Host "3. Check logs:" -ForegroundColor White
Write-Host "   docker logs repair-hub-pro --tail=50" -ForegroundColor Cyan
Write-Host ""

