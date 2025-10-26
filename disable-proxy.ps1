# Disable Cloudflare Proxy for DNS records

$cfToken = "Qmc8mXVkxeEZk56kcSVmYReQ9RIddSe4Up8ajpp7"
$zoneId = "bc3e0824de83432604e6e81961632071"

$headers = @{
    'Authorization' = "Bearer $cfToken"
    'Content-Type' = 'application/json'
}

Write-Host "Getting DNS records..." -ForegroundColor Cyan

# Get all DNS records
try {
    $records = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records" -Headers $headers
    
    Write-Host "Found $($records.result.Count) records" -ForegroundColor Green
    
    # Find @ and www records
    $atRecord = $records.result | Where-Object {$_.name -eq 'repairhub.one' -or $_.name -eq '@'}
    $wwwRecord = $records.result | Where-Object {$_.name -eq 'www.repairhub.one' -or $_.name -eq 'www'}
    
    Write-Host ""
    Write-Host "@ record: proxied = $($atRecord.proxied)" -ForegroundColor Yellow
    Write-Host "www record: proxied = $($wwwRecord.proxied)" -ForegroundColor Yellow
    Write-Host ""
    
    # Disable proxy for @ record
    if ($atRecord -and $atRecord.proxied -eq $true) {
        Write-Host "Disabling proxy for @ record..." -ForegroundColor Cyan
        $body = @{
            proxied = $false
        } | ConvertTo-Json
        
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$($atRecord.id)" -Method Patch -Headers $headers -Body $body | Out-Null
        Write-Host "SUCCESS: @ record proxy disabled" -ForegroundColor Green
    } else {
        Write-Host "@ record already has DNS only (not proxied)" -ForegroundColor Green
    }
    
    # Disable proxy for www record
    if ($wwwRecord -and $wwwRecord.proxied -eq $true) {
        Write-Host "Disabling proxy for www record..." -ForegroundColor Cyan
        $body = @{
            proxied = $false
        } | ConvertTo-Json
        
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$($wwwRecord.id)" -Method Patch -Headers $headers -Body $body | Out-Null
        Write-Host "SUCCESS: www record proxy disabled" -ForegroundColor Green
    } else {
        Write-Host "www record already has DNS only (not proxied)" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "DONE! Wait 1-5 minutes and open: http://repairhub.one" -ForegroundColor Green
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host $_.Exception | Format-List
}

