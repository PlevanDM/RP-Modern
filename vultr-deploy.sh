#!/bin/bash

echo "🚀 Развертывание RepairHub Pro на Vultr..."
echo "🚀 Deploying RepairHub Pro on Vultr..."

# Обновляем систему
echo "📦 Обновляем систему..."
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# Устанавливаем Docker
echo "🐳 Устанавливаем Docker..."
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Устанавливаем Docker Compose
echo "🔧 Устанавливаем Docker Compose..."
echo "🔧 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Устанавливаем Node.js (для разработки)
echo "📦 Устанавливаем Node.js..."
echo "📦 Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Устанавливаем Git
echo "📦 Устанавливаем Git..."
echo "📦 Installing Git..."
sudo apt install -y git

# Клонируем репозиторий (если нужно)
echo "📥 Клонируем проект..."
echo "📥 Cloning project..."
if [ ! -d "repair-hub-pro" ]; then
    git clone https://github.com/your-username/repair-hub-pro.git
    cd repair-hub-pro
else
    cd repair-hub-pro
    git pull origin main
fi

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
echo "📦 Installing dependencies..."
npm install

# Собираем проект
echo "🔨 Собираем проект..."
echo "🔨 Building project..."
npm run build

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
echo "🛑 Stopping existing containers..."
docker-compose down

# Удаляем старые образы
echo "🗑️ Удаляем старые образы..."
echo "🗑️ Removing old images..."
docker rmi repair-hub-pro_repair-hub-pro 2>/dev/null || true

# Собираем новый образ
echo "🔨 Собираем Docker образ..."
echo "🔨 Building Docker image..."
docker-compose build --no-cache

# Запускаем контейнер
echo "🚀 Запускаем контейнер..."
echo "🚀 Starting container..."
docker-compose up -d

# Показываем статус
echo "📊 Статус контейнера:"
echo "📊 Container status:"
docker-compose ps

# Настраиваем firewall
echo "🔥 Настраиваем firewall..."
echo "🔥 Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 3000
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Устанавливаем Nginx (опционально)
echo "🌐 Устанавливаем Nginx..."
echo "🌐 Installing Nginx..."
sudo apt install -y nginx

# Создаем конфигурацию Nginx
echo "⚙️ Создаем конфигурацию Nginx..."
echo "⚙️ Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/repair-hub-pro > /dev/null <<EOF
server {
    listen 80;
    server_name _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Активируем сайт
sudo ln -sf /etc/nginx/sites-available/repair-hub-pro /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "✅ Проект успешно развернут на Vultr!"
echo "✅ Project successfully deployed on Vultr!"
echo ""
echo "🌐 Доступные URL:"
echo "🌐 Available URLs:"
echo "   - HTTP: http://$(curl -s ifconfig.me):80"
echo "   - Прямой доступ: http://$(curl -s ifconfig.me):3000"
echo ""
echo "📋 Полезные команды:"
echo "📋 Useful commands:"
echo "   - Просмотр логов: docker-compose logs -f"
echo "   - Остановка: docker-compose down"
echo "   - Перезапуск: docker-compose restart"
echo "   - Обновление: git pull && docker-compose build --no-cache && docker-compose up -d"
echo ""
echo "   - View logs: docker-compose logs -f"
echo "   - Stop: docker-compose down"
echo "   - Restart: docker-compose restart"
echo "   - Update: git pull && docker-compose build --no-cache && docker-compose up -d"
