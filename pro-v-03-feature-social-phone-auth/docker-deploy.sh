#!/bin/bash

echo "🐳 Запуск RepairHub Pro в Docker контейнері..."
echo "🐳 Starting RepairHub Pro in Docker container..."

# Зупиняємо існуючі контейнери
echo "🛑 Зупиняємо існуючі контейнери..."
echo "🛑 Stopping existing containers..."
docker-compose down

# Видаляємо старі образи
echo "🗑️ Видаляємо старі образи..."
echo "🗑️ Removing old images..."
docker rmi repair-master-prod_repair-hub-pro 2>/dev/null || true

# Збираємо новий образ
echo "🔨 Збираємо Docker образ..."
echo "🔨 Building Docker image..."
docker-compose build --no-cache

# Запускаємо контейнер
echo "🚀 Запускаємо контейнер..."
echo "🚀 Starting container..."
docker-compose up -d

# Показуємо статус
echo "📊 Статус контейнера:"
echo "📊 Container status:"
docker-compose ps

echo ""
echo "✅ Проект запущено!"
echo "✅ Project is running!"
echo ""
echo "🌐 Доступні URL:"
echo "🌐 Available URLs:"
echo "   - Локальний / Local: http://localhost:3000"
echo "   - Мережевий / Network: http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "📋 Корисні команди:"
echo "📋 Useful commands:"
echo "   - Переглянути логи: docker-compose logs -f"
echo "   - Зупинити: docker-compose down"
echo "   - Перезапустити: docker-compose restart"
echo ""
echo "   - View logs: docker-compose logs -f"
echo "   - Stop: docker-compose down"
echo "   - Restart: docker-compose restart"

