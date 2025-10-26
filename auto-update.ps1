# PowerShell script for server update

$password = "8zU%)m9$eVu-$wHd"
$server = "root@70.34.252.148"

Write-Host "Updating server via SSH..." -ForegroundColor Cyan

# Install plink if needed
if (!(Test-Path "$env:ProgramFiles\PuTTY\plink.exe")) {
    Write-Host "Plink not found. Installing..." -ForegroundColor Yellow
    # Try to use regular ssh
}

$commands = @"
cd /root/repair-hub-pro
git pull origin eploy
docker compose down
docker compose build --no-cache
docker compose up -d
sleep 20
docker compose ps
echo "DONE!"
"@

try {
    Write-Host "Executing commands..." -ForegroundColor Yellow
    echo y | ssh -o StrictHostKeyChecking=no $server "bash -c '$commands'"
    Write-Host "SUCCESS!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Use VNC Console at:" -ForegroundColor Yellow
    Write-Host "https://my.vultr.com" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "And execute these commands:" -ForegroundColor Yellow
    Write-Host $commands -ForegroundColor Gray
}

