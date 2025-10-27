#!/bin/bash

echo "🧹 Начинаю очистку Docker проектов на сервере..."
echo "=============================================="

# Остановить все контейнеры
echo "⏹️  Остановка всех контейнеров..."
docker stop $(docker ps -aq) 2>/dev/null || echo "Нет активных контейнеров"

# Удалить все контейнеры
echo "🗑️  Удаление всех контейнеров..."
docker rm $(docker ps -aq) 2>/dev/null || echo "Нет контейнеров для удаления"

# Удалить все образы
echo "🖼️  Удаление всех образов..."
docker rmi $(docker images -q) 2>/dev/null || echo "Нет образов для удаления"

# Очистить Docker систему
echo "🧽 Очистка Docker системы..."
docker system prune -a --volumes -f

# Очистить неиспользуемые сети
echo "🌐 Очистка сетей..."
docker network prune -f

echo ""
echo "✅ Очистка завершена!"
echo "📊 Проверка состояния Docker:"
echo ""

# Показать статус
docker ps -a
echo ""
docker images
echo ""
df -h

echo ""
echo "🚀 Теперь можно загружать и запускать новый проект!"
echo "📁 Рекомендуется создать директорию: mkdir -p /opt/repairhub-pro"
echo "📤 Затем загрузить файлы проекта в эту директорию"
echo "🐳 И выполнить: docker-compose up -d --build"
