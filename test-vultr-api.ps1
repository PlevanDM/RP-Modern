# Vultr API Testing and Deployment
$VULTR_API_KEY = "GB7CORFU7GCRIJ4KVZQ4LLUFILIQFYVMZC6A"
$SERVER_IP = "70.34.252.148"

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "            VULTR API TESTING" -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

# Headers
$headers = @{
    "Authorization" = "Bearer $VULTR_API_KEY"
    "Content-Type" = "application/json"
}

Write-Host "1. Checking API access..." -ForegroundColor Green
try {
    $response = Invoke-RestMethod -Uri "https://api.vultr.com/v2/account" -Method GET -Headers $headers
    Write-Host "✓ API Connected!" -ForegroundColor Green
    Write-Host "   Account: $($response.account.name)" -ForegroundColor White
    Write-Host "   Email: $($response.account.email)" -ForegroundColor White
} catch {
    Write-Host "✗ API Error: $_" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "2. Finding server..." -ForegroundColor Green
try {
    $servers = Invoke-RestMethod -Uri "https://api.vultr.com/v2/instances" -Method GET -Headers $headers
    
    $server = $servers.instances | Where-Object { $_.main_ip -eq $SERVER_IP } | Select-Object -First 1
    
    if ($server) {
        Write-Host "✓ Server found!" -ForegroundColor Green
        Write-Host "   ID: $($server.id)" -ForegroundColor White
        Write-Host "   IP: $($server.main_ip)" -ForegroundColor White
        Write-Host "   Status: $($server.server_status)" -ForegroundColor White
        Write-Host "   OS: $($server.os)" -ForegroundColor White
    } else {
        Write-Host "✗ Server not found" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Error finding server: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Testing server connection..." -ForegroundColor Green
try {
    $ping = Test-NetConnection -ComputerName $SERVER_IP -Port 22 -WarningAction SilentlyContinue
    if ($ping.TcpTestSucceeded) {
        Write-Host "✓ SSH port is open" -ForegroundColor Green
    } else {
        Write-Host "✗ SSH port is closed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Cannot connect to server" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. Checking server status..." -ForegroundColor Green
try {
    $response80 = Invoke-WebRequest -Uri "http://$SERVER_IP:80" -TimeoutSec 5 -UseBasicParsing -ErrorAction SilentlyContinue
    Write-Host "✓ Port 80 is UP - Status: $($response80.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "✗ Port 80 is DOWN" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT: Execute deployment via VNC Console" -ForegroundColor Yellow
Write-Host ""
Write-Host "Commands for VNC Console:" -ForegroundColor Green
Write-Host ""
Write-Host "cd /root/repair-hub-pro && docker compose ps" -ForegroundColor Cyan
Write-Host "docker logs repair-hub-pro --tail=50" -ForegroundColor Cyan
Write-Host "netstat -tlnp | grep :80" -ForegroundColor Cyan
Write-Host ""

