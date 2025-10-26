# PowerShell script for deployment

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Starting Deployment Process" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Git operations
Write-Host ""
Write-Host "1. Adding all changes..." -ForegroundColor Yellow
git add -A

Write-Host ""
Write-Host "2. Committing changes..." -ForegroundColor Yellow
$commitMessage = "Add error handling, form validation, mobile optimization, SEO, GDPR"
git commit -m $commitMessage

Write-Host ""
Write-Host "3. Pushing to GitHub..." -ForegroundColor Yellow
git push origin eploy

Write-Host ""
Write-Host "4. Connecting to server and deploying..." -ForegroundColor Yellow
ssh root@70.34.252.148 "cd /root/repair-hub-pro && git pull origin eploy && docker compose down && docker compose build --no-cache && docker compose up -d && sleep 20 && docker compose ps && docker logs repair-hub-pro --tail=20"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Visit: http://70.34.252.148:3000" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Green

