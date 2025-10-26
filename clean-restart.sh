#!/bin/bash

echo "================================================================"
echo "       CLEAN RESTART OF REPAIR-HUB-PRO"
echo "================================================================"
echo ""

# Navigate to project directory
cd /root/repair-hub-pro

echo "1. Fetching latest code..."
git fetch origin
echo ""

echo "2. Resetting to latest version..."
git reset --hard origin/eploy
echo ""

echo "3. Cleaning untracked files..."
git clean -fd
echo ""

echo "4. Stopping and removing all containers..."
docker compose down -v --remove-orphans
echo ""

echo "5. Cleaning Docker system..."
docker system prune -a -f --volumes
echo ""

echo "6. Building fresh images..."
docker compose build --no-cache
echo ""

echo "7. Starting containers..."
docker compose up -d
echo ""

echo "8. Waiting for services to start..."
sleep 60
echo ""

echo "9. Checking container status..."
docker compose ps
echo ""

echo "10. Recent logs..."
docker logs repair-hub-pro --tail=50
echo ""

echo "11. Testing port 3000..."
curl -I http://localhost:3000 || echo "Port 3000 not responding"
echo ""

echo "12. Testing port 80..."
curl -I http://localhost:80 || echo "Port 80 not responding"
echo ""

echo "================================================================"
echo "       CLEAN RESTART COMPLETE!"
echo "================================================================"
echo ""
echo "Test: http://repairhub.one"
echo ""

