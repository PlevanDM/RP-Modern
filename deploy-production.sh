#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         PRODUCTION DEPLOYMENT - RepairHub Pro               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

echo ""
echo "📥 Оновлення коду з GitHub..."
cd /root/repair-hub-pro
git pull

echo ""
echo "🛑 Зупинка старого контейнера..."
docker compose down

echo ""
echo "🧹 Очистка старого образу..."
docker rmi repair-hub-pro-repair-hub-pro 2>/dev/null || true

echo ""
echo "🔨 Будівництво нового production образу..."
docker compose build --no-cache

echo ""
echo "🚀 Запуск production контейнера..."
docker compose up -d

echo ""
echo "⏳ Очікування готовності (10 секунд)..."
sleep 10

echo ""
echo "📊 Статус контейнерів:"
docker compose ps

echo ""
echo "📝 Останні 30 рядків логів:"
echo "═══════════════════════════════════════════════════════════════"
docker logs repair-hub-pro --tail 30

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "📋 Корисні команди:"
echo "   • Логи: docker logs repair-hub-pro -f"
echo "   • Статус: docker compose ps"
echo "   • Health: docker inspect repair-hub-pro | grep Health"
echo ""
echo "🌐 Сайт: https://repairhub.one"
echo "═══════════════════════════════════════════════════════════════"
