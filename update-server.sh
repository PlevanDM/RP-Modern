#!/bin/bash
# Скрипт для оновлення Nginx на порт 80
# Виконайте на сервері після додавання DNS records в Cloudflare

echo "========================================="
echo "  Updating Nginx to Port 80"
echo "========================================="

cd /root/repair-hub-pro

# Backup current config
cp nginx.conf nginx.conf.backup

# Update nginx.conf to use port 80
sed -i 's/listen 3000;/listen 80;/g' nginx.conf

echo "✅ Nginx config updated to port 80"

# Restart containers
echo "Stopping containers..."
docker compose down

echo "Building new images..."
docker compose build --no-cache

echo "Starting containers..."
docker compose up -d

echo ""
echo "Waiting 30 seconds..."
sleep 30

echo ""
echo "Checking status..."
docker compose ps

echo ""
echo "Recent logs:"
docker logs repair-hub-pro --tail=30

echo ""
echo "========================================="
echo "✅ Done! Test: http://repairhub.com"
echo "========================================="
