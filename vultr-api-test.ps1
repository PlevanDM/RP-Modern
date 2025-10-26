$VULTR_API_KEY = "GB7CORFU7GCRIJ4KVZQ4LLUFILIQFYVMZC6A"
$SERVER_IP = "70.34.252.148"

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "            VULTR API TESTING" -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

$headers = @{
    'Authorization' = "Bearer $VULTR_API_KEY"
    'Content-Type' = 'application/json'
}

Write-Host "1. Testing API access..." -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri 'https://api.vultr.com/v2/account' -Method GET -Headers $headers
    Write-Host "API Connected!" -ForegroundColor Green
    Write-Host "Account: $($response.account.name)"
} catch {
    Write-Host "API Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. Finding server..." -ForegroundColor Green
try {
    $servers = Invoke-RestMethod -Uri 'https://api.vultr.com/v2/instances' -Method GET -Headers $headers
    $server = $servers.instances | Where-Object { $_.main_ip -eq $SERVER_IP } | Select-Object -First 1
    if ($server) {
        Write-Host "Server found!" -ForegroundColor Green
        Write-Host "Status: $($server.server_status)"
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Checking port 80..." -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "http://$SERVER_IP:80" -TimeoutSec 5 -UseBasicParsing -ErrorAction SilentlyContinue
    Write-Host "Port 80 is UP!" -ForegroundColor Green
} catch {
    Write-Host "Port 80 is DOWN" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Execute in VNC Console:" -ForegroundColor Yellow
Write-Host "docker compose ps && docker logs repair-hub-pro --tail=50" -ForegroundColor Cyan
Write-Host ""

