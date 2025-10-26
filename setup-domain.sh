#!/bin/bash
# Оновлення Nginx на порт 80 для домену

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         ОНОВЛЕННЯ NGINX ДЛЯ ДОМЕНУ                        ║"
echo "╚════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo "1. Pulling latest changes..."
git pull origin eploy

echo "2. Updating nginx.conf..."
# Backup
cp nginx.conf nginx.conf.backup-$(date +%Y%m%d-%H%M%S)

# Update to port 80
sed -i 's/listen 3000;/listen 80;/g' nginx.conf

# Also update CSP if needed
sed -i 's|http://70.34.252.148:\*|http://repairhub.com:*|g' nginx.conf

echo "✅ nginx.conf updated to port 80"

echo ""
echo "3. Stopping containers..."
docker compose down

echo ""
echo "4. Building new images..."
docker compose build --no-cache

echo ""
echo "5. Starting containers..."
docker compose up -d

echo ""
echo "6. Waiting for services to start..."
sleep 30

echo ""
echo "7. Checking status..."
docker compose ps

echo ""
echo "8. Recent logs:"
docker logs repair-hub-pro --tail=30

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                 ✅ ГОТОВО!                                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Чекайте 5-30 хвилин і відкрийте:"
echo "  http://repairhub.com"
echo "  http://www.repairhub.com"
echo ""
echo "Для HTTPS (після http працює):"
echo "  apt install certbot python3-certbot-nginx"
echo "  certbot --nginx -d repairhub.com -d www.repairhub.com"
echo "═══════════════════════════════════════════════════════════════"
