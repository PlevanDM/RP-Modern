#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         ВИПРАВЛЕННЯ ВСІХ ПОМИЛОК                              ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "📊 Поточний статус:"
docker compose ps

echo ""
echo "🔍 Перевірка nginx конфігурації:"
docker exec repair-hub-pro nginx -t

echo ""
echo "📝 Логи (помилки):"
docker logs repair-hub-pro 2>&1 | grep -i "error\|fail\|warn" | tail -20

echo ""
echo "🌐 Перевірка портів:"
docker exec repair-hub-pro netstat -tlnp 2>/dev/null | grep :80 || echo "Port 80 не прослуховується"

echo ""
echo "🔧 Перезапуск з виправленням..."
docker compose down

echo "🧹 Очистка..."
docker system prune -f --volumes

echo "🔨 Перебудова..."
docker compose build --no-cache

echo "🚀 Запуск..."
docker compose up -d

sleep 15

echo ""
echo "📊 Новий статус:"
docker compose ps

echo ""
echo "📝 Останні логи:"
docker logs repair-hub-pro --tail 100

echo ""
echo "✅ Готово! Перевірте: https://repairhub.one"
