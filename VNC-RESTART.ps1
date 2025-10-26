# VNC RESTART AUTOMATION
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "                FULL SERVER RESTART - VNC CONSOLE" -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Instructions
Write-Host "1. Open VNC Console:" -ForegroundColor Green
Write-Host "   https://my.vultr.com" -ForegroundColor White
Write-Host "   Servers > View Console" -ForegroundColor White
Write-Host ""

# Step 2: Command to copy
Write-Host "2. COPY and PASTE this command in VNC:" -ForegroundColor Yellow
Write-Host ""
Write-Host "cd /root/repair-hub-pro && git pull origin eploy && docker compose down -v && docker compose build --no-cache && docker compose up -d && sleep 20 && docker compose ps && docker logs repair-hub-pro --tail=50" -ForegroundColor Cyan
Write-Host ""

# Step 3: Wait time
Write-Host "3. Press Enter and wait 3-5 minutes" -ForegroundColor Green
Write-Host ""

# Step 4: Check
Write-Host "4. Check site:" -ForegroundColor Green
Write-Host "   http://repairhub.one" -ForegroundColor White
Write-Host ""

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

# Optional: Check current status
Write-Host "CURRENT SITE:" -ForegroundColor Yellow
Write-Host "http://70.34.252.148:3000" -ForegroundColor White
Write-Host ""
Write-Host "AFTER VNC:" -ForegroundColor Yellow
Write-Host "http://repairhub.one" -ForegroundColor White
Write-Host ""
