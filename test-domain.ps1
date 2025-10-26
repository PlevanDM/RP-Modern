# TEST DOMAIN STATUS
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "                TESTING DOMAIN: repairhub.one" -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Testing connection..." -ForegroundColor Yellow
Write-Host ""

# Test IP
Write-Host "1. IP: http://70.34.252.148:3000" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "http://70.34.252.148:3000" -Method GET -TimeoutSec 5 -UseBasicParsing
    Write-Host "   Status: $($response.StatusCode) OK" -ForegroundColor Green
} catch {
    Write-Host "   Status: ERROR" -ForegroundColor Red
}

Write-Host ""

# Test domain
Write-Host "2. Domain: http://repairhub.one" -ForegroundColor Yellow
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
Write-Host "Domain needs server restart via VNC Console" -ForegroundColor White
Write-Host ""
Write-Host "Use this command in VNC:" -ForegroundColor Green
Write-Host ""
Write-Host "cd /root/repair-hub-pro && git pull origin eploy && docker compose down -v && docker compose build --no-cache && docker compose up -d && sleep 20 && docker compose ps && docker logs repair-hub-pro --tail=50" -ForegroundColor Cyan
Write-Host ""

