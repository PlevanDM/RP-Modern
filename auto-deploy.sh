#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║      АВТОМАТИЧНИЙ DEPLOYMENT                                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "📥 Оновлення коду..."
git pull origin eploy

echo ""
echo "🛑 Зупинка контейнера..."
docker compose down

echo ""
echo "🔨 Будування..."
docker compose build --no-cache

echo ""
echo "🚀 Запуск..."
docker compose up -d

sleep 15

echo ""
echo "📊 Статус:"
docker compose ps

echo ""
echo "📝 Логи:"
docker logs repair-hub-pro --tail 50