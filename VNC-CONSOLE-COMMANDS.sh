#!/bin/bash
# Команди для VNC Console
# Скопіюйте і вставте в Vultr VNC Console

echo "Updating server..."

cd /root/repair-hub-pro

echo "1. Pulling latest changes..."
git pull origin eploy

echo "2. Stopping containers..."
docker compose down

echo "3. Building..."
docker compose build --no-cache

echo "4. Starting containers..."
docker compose up -d

echo "5. Waiting 20 seconds..."
sleep 20

echo "6. Checking status..."
docker compose ps

echo "7. Recent logs:"
docker logs repair-hub-pro --tail=30

echo ""
echo "✅ Server updated!"
echo ""
echo "Now wait 5-30 minutes for Cloudflare to activate domain."
echo "Then open: http://repairhub.one"

