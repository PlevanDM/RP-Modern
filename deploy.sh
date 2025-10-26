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
echo "📊 Container status:"
docker compose ps

echo ""
echo "📝 Last 50 lines of logs:"
docker logs repair-hub-pro --tail 50

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🌐 Test: https://repairhub.one"
echo "═══════════════════════════════════════════════════════════════"