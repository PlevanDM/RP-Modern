#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         PRODUCTION DEPLOYMENT - RepairHub Pro               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "📥 Updating code from GitHub..."
git pull

echo ""
echo "🛑 Stopping container..."
docker compose down

echo ""
echo "🔨 Building new image..."
docker compose build --no-cache

echo ""
echo "🚀 Starting container..."
docker compose up -d

sleep 10

echo ""
echo "📊 Status:"
docker compose ps

echo ""
echo "📝 Logs:"
docker logs repair-hub-pro --tail 50
