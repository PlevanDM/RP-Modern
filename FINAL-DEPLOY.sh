#!/bin/bash
# Automatic deployment for repairhub.one domain

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         FINAL DEPLOY FOR REPAIRHUB.ONE                    ║"
echo "╚════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo "1. Pulling latest changes..."
git pull origin eploy

echo ""
echo "2. Stopping containers..."
docker compose down

echo ""
echo "3. Building with no cache..."
docker compose build --no-cache

echo ""
echo "4. Starting containers..."
docker compose up -d

echo ""
echo "5. Waiting 30 seconds..."
sleep 30

echo ""
echo "6. Checking status..."
docker compose ps

echo ""
echo "7. Checking port 80..."
netstat -tulpn | grep :80

echo ""
echo "8. Recent logs:"
docker logs repair-hub-pro --tail=30

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                   ✅ DEPLOY COMPLETE!                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Додайте DNS records в Cloudflare:"
echo ""
echo "1. https://dash.cloudflare.com → Zones → repairhub.one"
echo "2. DNS → Add record (два рази):"
echo ""
echo "   Type: A"
echo "   Name: @"
echo "   Content: 70.34.252.148"
echo "   Proxy: OFF"
echo ""
echo "   Type: A"
echo "   Name: www"
echo "   Content: 70.34.252.148"
echo "   Proxy: OFF"
echo ""
echo "Після цього чекайте 5-30 хвилин і відкрийте:"
echo "  http://repairhub.one"
echo ""
echo "═══════════════════════════════════════════════════════════════"

