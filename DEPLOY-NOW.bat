@echo off
REM Batch файл для автоматичного деплою з паролем

echo Connecting to server...
ssh root@70.34.252.148 "cd /root/repair-hub-pro && git pull origin eploy && docker compose down && docker compose build --no-cache && docker compose up -d && sleep 30 && docker compose ps && docker logs repair-hub-pro --tail=20"

echo.
echo Deployment complete!
echo.
echo Now add DNS records in Cloudflare:
echo 1. https://dash.cloudflare.com
echo 2. Zones -^> repairhub.one -^> DNS
echo 3. Add record (twice):
echo    Type: A, Name: @, Content: 70.34.252.148, Proxy: OFF
echo    Type: A, Name: www, Content: 70.34.252.148, Proxy: OFF
echo.
echo Then wait 5-30 min and open: http://repairhub.one
echo.
pause

