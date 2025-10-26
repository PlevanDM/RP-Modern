#!/bin/bash

echo "=========================================="
echo "  REPAIR-HUB-PRO AUTO START"
echo "=========================================="
echo ""

cd /root/repair-hub-pro

echo "Step 1: Checking git status..."
git fetch origin

echo ""
echo "Step 2: Resetting to latest..."
git reset --hard origin/eploy

echo ""
echo "Step 3: Stopping old containers..."
docker compose down -v

echo ""
echo "Step 4: Building fresh images..."
docker compose build --no-cache

echo ""
echo "Step 5: Starting containers..."
docker compose up -d

echo ""
echo "Step 6: Waiting 60 seconds..."
sleep 60

echo ""
echo "Step 7: Checking status..."
docker compose ps

echo ""
echo "Step 8: Checking logs..."
docker logs repair-hub-pro --tail=30

echo ""
echo "Step 9: Checking port 80..."
netstat -tlnp | grep :80 || echo "Port 80 not found"

echo ""
echo "Step 10: Checking nginx..."
docker exec repair-hub-pro ps aux | grep nginx || echo "Nginx not running"

echo ""
echo "=========================================="
echo "  DONE! Check http://repairhub.one"
echo "=========================================="

