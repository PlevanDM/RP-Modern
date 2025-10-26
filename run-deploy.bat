@echo off
echo ================================================================================
echo            AUTO DEPLOYMENT TO VULTR SERVER
echo ================================================================================
echo.

echo Connecting to server...
echo.

plink -ssh root@70.34.252.148 -pw "8zU%)m9$eVu-$wHd" -batch ^
"cd /root/repair-hub-pro && git fetch origin && git reset --hard origin/eploy && git clean -fd && docker compose down -v && docker compose build --no-cache && docker compose up -d && sleep 30 && docker compose ps && docker logs repair-hub-pro --tail=50"

echo.
echo ================================================================================
echo.
echo Checking server status...
timeout /t 10 /nobreak > nul

curl -I http://70.34.252.148:3000

echo.
echo Done! Test: http://repairhub.one
echo.

