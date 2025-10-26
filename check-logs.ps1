# PowerShell script to check server logs
$server = "70.34.252.148"
$password = "8zU%)m9$eVu-$wHd"
$username = "root"

# Create SSH command file
$sshScript = @"
#!/bin/bash
echo "=== Checking Docker Containers ==="
docker ps -a

echo ""
echo "=== Checking Container Logs ==="
if [ -d "/root/repair-hub-pro" ]; then
    cd /root/repair-hub-pro
    docker compose logs --tail=100
else
    echo "Project directory not found"
fi

echo ""
echo "=== Checking Ports ==="
netstat -tlnp | grep 3000
ss -tlnp | grep 3000

echo ""
echo "=== Checking Firewall ==="
ufw status
"@

# Save script to temp file
$tempFile = [System.IO.Path]::GetTempFileName()
$sshScript | Out-File -FilePath $tempFile -Encoding UTF8

Write-Host "Connecting to server via SSH..."
Write-Host "Enter password when prompted: $password"

# Try using sshpass if available, otherwise manual
try {
    # Try with plink (from PuTTY suite)
    if (Get-Command plink.exe -ErrorAction SilentlyContinue) {
        echo y | plink.exe -ssh -pw $password $username@$server "bash -s" < $tempFile
    } else {
        Write-Host "Please install PuTTY tools or run this manually:"
        Write-Host "ssh root@70.34.252.148"
        Write-Host "Then run: cd /root/repair-hub-pro && docker compose logs --tail=100"
    }
} catch {
    Write-Host "Manual connection required. Run these commands on the server:"
    Write-Host ""
    Write-Host "ssh root@70.34.252.148"
    Write-Host "cd /root/repair-hub-pro"
    Write-Host "docker compose logs --tail=100"
}

Remove-Item $tempFile

