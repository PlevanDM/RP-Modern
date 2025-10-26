# Continuous server check
Write-Host "Checking server status..." -ForegroundColor Cyan
Write-Host ""

$maxAttempts = 20
$attempt = 0

while ($attempt -lt $maxAttempts) {
    $attempt++
    Write-Host "Attempt $attempt/$maxAttempts..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri "http://70.34.252.148:3000" -Method GET -TimeoutSec 5 -UseBasicParsing
        Write-Host "SUCCESS! Server is UP - Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host ""
        Write-Host "Try opening:" -ForegroundColor Yellow
        Write-Host "http://70.34.252.148:3000" -ForegroundColor Cyan
        Write-Host "http://repairhub.one" -ForegroundColor Cyan
        break
    } catch {
        Write-Host "Server is still down... waiting 30 seconds" -ForegroundColor Red
        Start-Sleep -Seconds 30
    }
}

if ($attempt -eq $maxAttempts) {
    Write-Host ""
    Write-Host "Server is taking too long. Check VNC Console for errors." -ForegroundColor Red
}

