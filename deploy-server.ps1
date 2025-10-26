# PowerShell deployment script

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         DEPLOYING TO SERVER                                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

$command = @"
cd /root/repair-hub-pro
git pull origin eploy
docker compose down
docker compose build --no-cache
docker compose up -d
sleep 30
docker compose ps
docker logs repair-hub-pro --tail=30
"@

Write-Host "Executing deployment on server..." -ForegroundColor Yellow
ssh root@70.34.252.148 $command

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              ✅ SERVER DEPLOYMENT COMPLETE                 ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next step - Add DNS records in Cloudflare:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://dash.cloudflare.com"
Write-Host "2. Zones → repairhub.one → DNS"
Write-Host "3. Add record (twice):"
Write-Host ""
Write-Host "   Record 1:" -ForegroundColor Cyan
Write-Host "   Type: A"
Write-Host "   Name: @"
Write-Host "   Content: 70.34.252.148"
Write-Host "   Proxy: OFF"
Write-Host ""
Write-Host "   Record 2:" -ForegroundColor Cyan
Write-Host "   Type: A"
Write-Host "   Name: www"
Write-Host "   Content: 70.34.252.148"
Write-Host "   Proxy: OFF"
Write-Host ""
Write-Host "After that, wait 5-30 minutes and open:"
Write-Host "  http://repairhub.one" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════"

