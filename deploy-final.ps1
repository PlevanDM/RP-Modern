# Скрипт для автоматического развертывания RepairHub Pro на Vultr

Write-Host "Starting RepairHub Pro deployment on Vultr..." -ForegroundColor Green

$SERVER_IP = "45.32.158.217"
$SERVER_PASSWORD = "pH[7)MPXFXAajxvM"

Write-Host ""
Write-Host "Server Information:" -ForegroundColor Cyan
Write-Host "  - IP: $SERVER_IP" -ForegroundColor White
Write-Host "  - Password: $SERVER_PASSWORD" -ForegroundColor White
Write-Host ""

Write-Host "Checking server availability..." -ForegroundColor Yellow

# Проверяем ping
try {
    $pingResult = Test-Connection -ComputerName $SERVER_IP -Count 1 -Quiet
    if ($pingResult) {
        Write-Host "Server is available (ping works)" -ForegroundColor Green
    } else {
        Write-Host "Server is not available" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Ping check error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Deployment Instructions:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open new terminal and connect to server:" -ForegroundColor White
Write-Host "   ssh root@$SERVER_IP" -ForegroundColor Blue
Write-Host "   Password: $SERVER_PASSWORD" -ForegroundColor Blue
Write-Host ""

Write-Host "2. Run commands step by step:" -ForegroundColor White
Write-Host ""

Write-Host "   Step 1: Update system" -ForegroundColor Yellow
Write-Host "   apt update && apt upgrade -y" -ForegroundColor Blue
Write-Host ""

Write-Host "   Step 2: Install packages" -ForegroundColor Yellow
Write-Host "   apt install -y curl wget git nginx ufw" -ForegroundColor Blue
Write-Host ""

Write-Host "   Step 3: Install Docker" -ForegroundColor Yellow
Write-Host "   curl -fsSL https://get.docker.com -o get-docker.sh" -ForegroundColor Blue
Write-Host "   sh get-docker.sh" -ForegroundColor Blue
Write-Host "   usermod -aG docker root" -ForegroundColor Blue
Write-Host ""

Write-Host "   Step 4: Install Docker Compose" -ForegroundColor Yellow
Write-Host "   curl -L `"https://github.com/docker/compose/releases/latest/download/docker-compose-`$(uname -s)-`$(uname -m)`" -o /usr/local/bin/docker-compose" -ForegroundColor Blue
Write-Host "   chmod +x /usr/local/bin/docker-compose" -ForegroundColor Blue
Write-Host ""

Write-Host "   Step 5: Clone project" -ForegroundColor Yellow
Write-Host "   git clone https://github.com/PlevanDM/RP-Modern.git" -ForegroundColor Blue
Write-Host "   cd RP-Modern" -ForegroundColor Blue
Write-Host "   git checkout 24.10v3" -ForegroundColor Blue
Write-Host ""

Write-Host "   Step 6: Build and run" -ForegroundColor Yellow
Write-Host "   docker-compose build" -ForegroundColor Blue
Write-Host "   docker-compose up -d" -ForegroundColor Blue
Write-Host ""

Write-Host "   Step 7: Check status" -ForegroundColor Yellow
Write-Host "   docker-compose ps" -ForegroundColor Blue
Write-Host ""

Write-Host "3. After completion, application will be available:" -ForegroundColor White
Write-Host "   - HTTP: http://$SERVER_IP:3000" -ForegroundColor Blue
Write-Host ""

Write-Host "4. For testing:" -ForegroundColor White
Write-Host "   curl -I http://localhost:3000" -ForegroundColor Blue
Write-Host "   curl -I http://$SERVER_IP:3000" -ForegroundColor Blue
Write-Host ""

Write-Host "Ready for deployment!" -ForegroundColor Green