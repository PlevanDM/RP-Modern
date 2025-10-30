@echo off
echo Opening Windows Firewall for TakliHub Backend API (port 3001)...
echo This requires Administrator privileges.
echo.

netsh advfirewall firewall add rule name="RepairHub Backend API" dir=in action=allow protocol=TCP localport=3001

if %errorlevel% == 0 (
    echo.
    echo ✅ Firewall rule added successfully!
    echo Port 3001 is now open for incoming connections.
) else (
    echo.
    echo ❌ Failed to add firewall rule.
    echo Please run this script as Administrator.
)

pause

