# Auto deployment via SSH
$ErrorActionPreference = "Stop"
$serverIP = "70.34.252.148"

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "            AUTO DEPLOYMENT VIA SSH" -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Connecting to server: $serverIP" -ForegroundColor Green
Write-Host ""

# Commands to execute
$commands = @"
cd /root/repair-hub-pro
echo 'Step 1: Fetching latest code...'
git fetch origin
echo 'Step 2: Resetting to latest version...'
git reset --hard origin/eploy
echo 'Step 3: Cleaning files...'
git clean -fd
echo 'Step 4: Stopping containers...'
docker compose down -v
echo 'Step 5: Building fresh images...'
docker compose build --no-cache
echo 'Step 6: Starting containers...'
docker compose up -d
echo 'Step 7: Waiting 60 seconds...'
sleep 60
echo 'Step 8: Checking status...'
docker compose ps
echo 'Step 9: Showing logs...'
docker logs repair-hub-pro --tail=50
exit
"@

# Save commands to file
$tempFile = [System.IO.Path]::GetTempFileName()
$commands | Out-File -FilePath $tempFile -Encoding ASCII -NoNewline

Write-Host "Executing deployment commands..." -ForegroundColor Yellow
Write-Host ""

try {
    # Get SSH location
    $sshPath = Get-Command ssh -ErrorAction SilentlyContinue
    if (-not $sshPath) {
        Write-Host "SSH not found. Install OpenSSH client." -ForegroundColor Red
        exit
    }

    # Execute via SSH
    $output = & cat $tempFile | ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30 root@$serverIP
    Write-Host $output
    
    Write-Host ""
    Write-Host "Deployment completed!" -ForegroundColor Green
    
} catch {
    Write-Host "SSH connection failed: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please use VNC Console instead and run:" -ForegroundColor Yellow
    Write-Host $commands -ForegroundColor Cyan
}

# Cleanup
Remove-Item $tempFile -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Checking server status..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

try {
    $response = Invoke-WebRequest -Uri "http://$serverIP:3000" -TimeoutSec 10 -UseBasicParsing
    Write-Host "Server is UP! Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Server check: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Test: http://repairhub.one" -ForegroundColor Cyan
Write-Host ""

