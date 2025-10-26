#!/bin/bash

echo "==================================================================="
echo "           FULL DEPLOYMENT SCRIPT"
echo "==================================================================="
echo ""

cd /root/repair-hub-pro

echo "1. Pulling latest code..."
git fetch origin
git reset --hard origin/eploy
git clean -fd

echo ""
echo "2. Stopping old containers..."
docker compose down -v

echo ""
echo "3. Building new containers..."
docker compose build --no-cache

echo ""
echo "4. Starting containers..."
docker compose up -d

echo ""
echo "5. Waiting for services..."
sleep 30

echo ""
echo "6. Checking status..."
docker compose ps

echo ""
echo "7. Checking logs..."
docker logs repair-hub-pro --tail=30

echo ""
echo "8. Testing endpoint..."
curl -I http://localhost:3000

echo ""
echo "9. Testing endpoint on port 80..."
curl -I http://localhost:80

echo ""
echo "10. Checking processes..."
ps aux | grep nginx | head -5

echo ""
echo "==================================================================="
echo "           DEPLOYMENT COMPLETE"
echo "==================================================================="
echo ""
echo "Check the output above for any errors."
echo ""
echo "If everything is UP, test:"
echo "  - http://70.34.252.148:3000"
echo "  - http://repairhub.one"
echo ""

