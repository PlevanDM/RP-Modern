# Deploy via SSH using OpenSSH
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "            AUTOMATIC DEPLOYMENT TO VULTR SERVER" -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

$serverIP = "70.34.252.148"
$password = "8zU%)m9$eVu-$wHd"

Write-Host "Deploying to server: $serverIP" -ForegroundColor Green
Write-Host ""

# Create SSH key for automatic login
$sshKeyPath = "$env:USERPROFILE\.ssh\id_rsa"

if (-not (Test-Path $sshKeyPath)) {
    Write-Host "Creating SSH key..." -ForegroundColor Yellow
    ssh-keygen -t rsa -b 4096 -f $sshKeyPath -N '""' -q
}

# Copy commands to script
$commands = @"
cd /root/repair-hub-pro
git fetch origin
git reset --hard origin/eploy
git clean -fd
docker compose down -v
docker compose build --no-cache
docker compose up -d
sleep 30
docker compose ps
docker logs repair-hub-pro --tail=50
exit
"@

# Save commands to file
$tempFile = "deploy-script.sh"
$commands | Out-File -FilePath $tempFile -Encoding ASCII

Write-Host "Uploading and executing commands..." -ForegroundColor Yellow
Write-Host ""

try {
    # Try to connect and execute
    $command = "cat $tempFile | sshpass -p '$password' ssh -o StrictHostKeyChecking=no root@$serverIP 'bash -s'"
    Invoke-Expression $command
    
    Write-Host ""
    Write-Host "Deployment completed!" -ForegroundColor Green
} catch {
    Write-Host "Direct SSH failed. Using VNC Console method..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please run this in VNC Console:" -ForegroundColor Yellow
    Write-Host $commands -ForegroundColor Cyan
}

# Cleanup
if (Test-Path $tempFile) {
    Remove-Item $tempFile
}

Write-Host ""
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Checking server status..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

try {
    $response = Invoke-WebRequest -Uri "http://$serverIP:3000" -TimeoutSec 5 -UseBasicParsing
    Write-Host "Server is UP! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Server is still starting... please wait" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Test: http://repairhub.one" -ForegroundColor Cyan
Write-Host ""

