# Скрипт для развертывания RepairHub Pro через веб-консоль Vultr

Write-Host "Starting RepairHub Pro deployment via Vultr web console..." -ForegroundColor Green

$SERVER_IP = "45.32.158.217"
$SERVER_PASSWORD = "pH[7)MPXFXAajxvM"
$SERVER_ID = "1eb0e38a-6438-4a0e-b740-f5ea549db44f"

Write-Host ""
Write-Host "Server Information:" -ForegroundColor Cyan
Write-Host "  - IP: $SERVER_IP" -ForegroundColor White
Write-Host "  - Password: $SERVER_PASSWORD" -ForegroundColor White
Write-Host "  - Server ID: $SERVER_ID" -ForegroundColor White
Write-Host ""

Write-Host "Deployment Options:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Web Console (Recommended)" -ForegroundColor Yellow
Write-Host "1. Go to: https://my.vultr.com" -ForegroundColor Blue
Write-Host "2. Find server 'repair-hub-pro'" -ForegroundColor Blue
Write-Host "3. Click console icon" -ForegroundColor Blue
Write-Host "4. Login with password: $SERVER_PASSWORD" -ForegroundColor Blue
Write-Host ""

Write-Host "Option 2: SSH Connection" -ForegroundColor Yellow
Write-Host "1. Open terminal" -ForegroundColor Blue
Write-Host "2. Run: ssh root@$SERVER_IP" -ForegroundColor Blue
Write-Host "3. Enter password: $SERVER_PASSWORD" -ForegroundColor Blue
Write-Host ""

Write-Host "Commands to run on server:" -ForegroundColor Cyan
Write-Host ""

$commands = @"
# Step 1: Update system
apt update && apt upgrade -y

# Step 2: Install packages
apt install -y curl wget git nginx ufw

# Step 3: Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Step 4: Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Step 5: Clone project
git clone https://github.com/PlevanDM/RP-Modern.git
cd RP-Modern
git checkout 24.10v3

# Step 6: Build and run
docker-compose build
docker-compose up -d

# Step 7: Check status
docker-compose ps

# Step 8: Test application
curl -I http://localhost:3000
"@

Write-Host $commands -ForegroundColor Blue

Write-Host ""
Write-Host "After deployment, application will be available at:" -ForegroundColor Cyan
Write-Host "  - HTTP: http://$SERVER_IP:3000" -ForegroundColor Blue
Write-Host ""

Write-Host "Testing commands:" -ForegroundColor Cyan
Write-Host "  curl -I http://$SERVER_IP:3000" -ForegroundColor Blue
Write-Host "  curl -I http://localhost:3000" -ForegroundColor Blue
Write-Host ""

Write-Host "Ready for deployment!" -ForegroundColor Green
