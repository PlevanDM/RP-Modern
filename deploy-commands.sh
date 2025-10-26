#!/bin/bash
# Corrected deployment commands

echo "=========================================="
echo "  Connecting to server..."
echo "=========================================="

ssh root@70.34.252.148 << 'EOF'
echo "Connected to server"
cd /root/repair-hub-pro
echo "Current directory: $(pwd)"
echo ""
echo "Pulling latest changes..."
git pull origin eploy
echo ""
echo "Stopping containers..."
docker compose down
echo ""
echo "Building new images..."
docker compose build --no-cache
echo ""
echo "Starting containers..."
docker compose up -d
echo ""
echo "Waiting for services..."
sleep 20
echo ""
echo "Checking status..."
docker compose ps
echo ""
echo "Recent logs:"
docker logs repair-hub-pro --tail=30
echo ""
echo "=========================================="
echo "  Deployment complete!"
echo "=========================================="
echo "Visit: http://repairhub.com:3000"
echo "=========================================="
EOF

