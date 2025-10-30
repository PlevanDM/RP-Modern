# PowerShell script to open Windows Firewall for RepairHub Backend API
# Run as Administrator: Right-click -> Run as Administrator

Write-Host "Opening Windows Firewall for RepairHub Backend API (port 3001)..." -ForegroundColor Cyan
Write-Host "This requires Administrator privileges." -ForegroundColor Yellow
Write-Host ""

try {
    $rule = Get-NetFirewallRule -Name "RepairHub Backend API" -ErrorAction SilentlyContinue
    
    if ($rule) {
        Write-Host "Firewall rule already exists. Updating..." -ForegroundColor Yellow
        Remove-NetFirewallRule -Name "RepairHub Backend API" -ErrorAction SilentlyContinue
    }
    
    New-NetFirewallRule -Name "RepairHub Backend API" `
        -DisplayName "RepairHub Backend API" `
        -Direction Inbound `
        -Protocol TCP `
        -LocalPort 3001 `
        -Action Allow `
        -Enabled True `
        -Description "Allow incoming connections to RepairHub Pro Backend API on port 3001"
    
    Write-Host ""
    Write-Host "✅ Firewall rule added successfully!" -ForegroundColor Green
    Write-Host "Port 3001 is now open for incoming connections." -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now access the API from other devices in your network:" -ForegroundColor Cyan
    Write-Host "  - http://YOUR_IP:3001/api" -ForegroundColor White
    Write-Host "  - http://YOUR_IP:3001/api/health" -ForegroundColor White
}
catch {
    Write-Host ""
    Write-Host "❌ Failed to add firewall rule: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please run this script as Administrator." -ForegroundColor Yellow
}

Read-Host "Press Enter to exit"

