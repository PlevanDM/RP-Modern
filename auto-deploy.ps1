# Auto deployment script for Vultr server
param(
    [string]$ServerIP = "70.34.252.148",
    [string]$Password = "8zU%)m9$eVu-$wHd"
)

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "           AUTO DEPLOYMENT TO VULTR SERVER" -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Connecting to server: $ServerIP" -ForegroundColor Green
Write-Host ""

# Try to connect via SSH
$commands = @"
cd /root/repair-hub-pro && 
git fetch origin && 
git reset --hard origin/eploy && 
git clean -fd && 
docker compose down -v && 
docker compose build --no-cache && 
docker compose up -d && 
sleep 30 && 
docker compose ps && 
docker logs repair-hub-pro --tail=50
"@

Write-Host "Executing commands on server..." -ForegroundColor Yellow
Write-Host ""

# Try SSH with password
$sshCommand = "ssh -o StrictHostKeyChecking=no root@$ServerIP"

# Create temporary script file
$tempScript = "deploy-temp.sh"
$commands | Out-File -FilePath $tempScript -Encoding ASCII

try {
    # Use plink if available
    if (Get-Command plink -ErrorAction SilentlyContinue) {
        Write-Host "Using plink..." -ForegroundColor Cyan
        Write-Host "$commands" | plink -ssh -pw $Password root@$ServerIP -batch -m $tempScript
        
        Write-Host ""
        Write-Host "Deployment completed!" -ForegroundColor Green
        Write-Host ""
        
        # Check server status
        Write-Host "Checking server status..." -ForegroundColor Yellow
        Start-Sleep -Seconds 10
        
        try {
            $response = Invoke-WebRequest -Uri "http://$ServerIP:3000" -TimeoutSec 10 -UseBasicParsing
            Write-Host "Server is UP! Status: $($response.StatusCode)" -ForegroundColor Green
        } catch {
            Write-Host "Server check failed. It may still be starting..." -ForegroundColor Yellow
        }
        
    } else {
        Write-Host "plink not found. Please install Putty or run commands manually in VNC Console." -ForegroundColor Red
        Write-Host ""
        Write-Host "Run this in VNC Console:" -ForegroundColor Yellow
        Write-Host $commands -ForegroundColor Cyan
    }
} catch {
    Write-Host "SSH connection failed. Please use VNC Console instead." -ForegroundColor Red
    Write-Host ""
    Write-Host "Run this in VNC Console:" -ForegroundColor Yellow
    Write-Host $commands -ForegroundColor Cyan
}

# Cleanup
if (Test-Path $tempScript) {
    Remove-Item $tempScript
}

Write-Host ""
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test site: http://$ServerIP:3000" -ForegroundColor Green
Write-Host "Test domain: http://repairhub.one" -ForegroundColor Green
Write-Host ""

