#!/bin/bash

echo "=========================================="
echo "Starting Deployment Process"
echo "=========================================="

# Navigate to project directory
cd /root/repair-hub-pro || exit 1

echo ""
echo "1. Pulling latest changes from GitHub..."
git pull origin eploy

echo ""
echo "2. Stopping containers..."
docker compose down

echo ""
echo "3. Building new images..."
docker compose build --no-cache

echo ""
echo "4. Starting containers..."
docker compose up -d

echo ""
echo "5. Waiting for services to start..."
sleep 20

echo ""
echo "6. Checking container status..."
docker compose ps

echo ""
echo "7. Recent logs:"
docker logs repair-hub-pro --tail=30

echo ""
echo "8. Checking if port 3000 is listening..."
netstat -tulpn | grep :3000

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo "Website: http://70.34.252.148:3000"
echo "=========================================="

