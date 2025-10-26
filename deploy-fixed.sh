#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         DEPLOYMENT WITH FIXES - React Error Fixed             ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "📥 1. Updating code from GitHub..."
git pull origin eploy

echo ""
echo "🔧 2. Installing dependencies..."
npm ci

echo ""
echo "🏗️ 3. Building project..."
npm run build

echo ""
echo "📦 4. Build completed. Checking files..."
ls -la dist/

echo ""
echo "🌐 5. Stopping old container..."
docker compose down

echo ""
echo "🧹 6. Cleaning up..."
docker system prune -f

echo ""
echo "🏗️ 7. Rebuilding container..."
docker compose build --no-cache

echo ""
echo "🚀 8. Starting new container..."
docker compose up -d

sleep 20

echo ""
echo "📊 9. Container status:"
docker compose ps

echo ""
echo "📝 10. Recent logs:"
docker logs repair-hub-pro --tail 50

echo ""
echo "🔍 11. Nginx configuration test:"
docker exec repair-hub-pro nginx -t

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🌐 Check: https://repairhub.one"
echo ""
echo "📋 If still not working, check:"
echo "   - docker logs repair-hub-pro -f"
echo "   - docker exec repair-hub-pro tail -f /var/log/nginx/error.log"
echo ""
echo "🔧 Next steps:"
echo "   - Clear browser cache"
echo "   - Check if JavaScript is enabled"
echo "   - Verify all files are loaded correctly"
echo ""
echo "═══════════════════════════════════════════════════════════════"
