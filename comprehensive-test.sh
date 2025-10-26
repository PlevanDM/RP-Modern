#!/bin/bash

echo "================================================"
echo "🔍 COMPREHENSIVE REPAIRHUB TEST"
echo "================================================"

cd /root/repair-hub-pro

echo ""
echo "1. CHECKING GIT REPOSITORY..."
git log --oneline -3
echo ""

echo "2. CHECKING CONTAINER STATUS..."
docker compose ps
echo ""

echo "3. CHECKING RECENT LOGS..."
docker compose logs --tail=30
echo ""

echo "4. CHECKING IF BUILD FILES EXIST..."
docker exec repair-hub-pro ls -la /app/dist/ 2>&1 || echo "Cannot access container"
echo ""

echo "5. CHECKING HTML CONTENT..."
docker exec repair-hub-pro cat /app/dist/index.html | head -20
echo ""

echo "6. CHECKING ASSETS..."
docker exec repair-hub-pro ls -la /app/dist/assets/ 2>&1 | head -10
echo ""

echo "7. TESTING FROM INSIDE CONTAINER..."
docker exec repair-hub-pro wget -q -O - http://localhost:3000 2>&1 | head -10 || echo "Wget not available"
echo ""

echo "8. NETWORK CHECK..."
netstat -tlnp 2>/dev/null | grep 3000 || ss -tlnp 2>/dev/null | grep 3000
echo ""

echo "9. FIREWALL STATUS..."
ufw status | grep 3000
echo ""

echo "10. RECONSTRUCTION TEST..."
echo "Rebuilding container..."
docker compose down
docker compose build --no-cache
docker compose up -d
sleep 10
docker compose ps
docker compose logs --tail=20

echo ""
echo "================================================"
echo "✅ Test completed!"
echo "================================================"

