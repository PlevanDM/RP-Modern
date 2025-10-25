#!/bin/bash

echo "🚀 RepairHub Pro - Automated Deploy"
echo "===================================="
echo ""

# Обновление системы
echo "📦 Updating system..."
apt update -y
apt install -y curl git build-essential

# Установка Node.js
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

# Клонирование репозитория
cd /root
if [ -d "repairhub" ]; then
    echo "🔄 Updating repository..."
    cd repairhub
    git pull origin 24.10v3
else
    echo "📥 Cloning repository..."
    git clone -b 24.10v3 https://github.com/PlevanDM/RP-Modern.git repairhub
    cd repairhub
fi

# Установка зависимостей
echo "📦 Installing dependencies..."
npm install

# Сборка проекта
echo "🔨 Building project..."
npm run build

# Установка PM2
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Запуск приложения
echo "🚀 Starting application..."
pm2 delete repairhub 2>/dev/null || true
pm2 start npm --name "repairhub" -- start -- --host 0.0.0.0 --port 3000
pm2 save
pm2 startup systemd -u root --hp /root || true

echo ""
echo "✅ Deployment completed!"
echo "📊 Application status:"
pm2 status
echo ""
echo "🌐 Application available at: http://64.176.72.139:3000"
