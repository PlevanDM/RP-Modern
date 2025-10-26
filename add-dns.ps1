$cfToken = "Qmc8mXVkxeEZk56kcSVmYReQ9RIddSe4Up8ajpp7"
$zoneId = "bc3e0824de83432604e6e81961632071"
$ip = "70.34.252.148"

$headers = @{
    'Authorization' = "Bearer $cfToken"
    'Content-Type' = 'application/json'
}

Write-Host "Adding DNS records..." -ForegroundColor Cyan

# Add @ record
Write-Host "Adding @ record..."
$body1 = @{
    type = "A"
    name = "@"
    content = $ip
    proxied = $false
    ttl = 1
} | ConvertTo-Json

try {
    $response1 = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records" -Method Post -Headers $headers -Body $body1
    Write-Host "SUCCESS: @ record added!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Record may already exist" -ForegroundColor Yellow
}

# Add www record
Write-Host "Adding www record..."
$body2 = @{
    type = "A"
    name = "www"
    content = $ip
    proxied = $false
    ttl = 1
} | ConvertTo-Json

try {
    $response2 = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records" -Method Post -Headers $headers -Body $body2
    Write-Host "SUCCESS: www record added!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Record may already exist" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "DNS records added! Now update server:" -ForegroundColor Green
Write-Host "ssh root@70.34.252.148" -ForegroundColor Cyan
Write-Host "cd /root/repair-hub-pro" -ForegroundColor Cyan
Write-Host "git pull origin eploy" -ForegroundColor Cyan
Write-Host "docker compose down" -ForegroundColor Cyan
Write-Host "docker compose build --no-cache" -ForegroundColor Cyan
Write-Host "docker compose up -d" -ForegroundColor Cyan
