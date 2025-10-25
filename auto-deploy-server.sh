#!/bin/bash

# Автоматический скрипт развертывания RepairHub Pro на Vultr
# Automatic deployment script for RepairHub Pro on Vultr

SERVER_IP="45.32.158.217"
SERVER_PASSWORD="pH[7)MPXFXAajxvM"

echo "🚀 Начинаем автоматическое развертывание RepairHub Pro на Vultr..."
echo "🚀 Starting automatic deployment of RepairHub Pro on Vultr..."

echo ""
echo "📋 Информация о сервере:"
echo "📋 Server information:"
echo "  - IP: $SERVER_IP"
echo "  - Пароль: $SERVER_PASSWORD"
echo ""

# Проверяем наличие sshpass
if ! command -v sshpass &> /dev/null; then
    echo "⚠️  sshpass не установлен. Устанавливаем..."
    echo "⚠️  sshpass not installed. Installing..."
    
    # Для Windows с WSL или Git Bash
    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y sshpass
    elif command -v brew &> /dev/null; then
        brew install hudochenkov/sshpass/sshpass
    else
        echo "❌ Не удалось установить sshpass автоматически"
        echo "❌ Could not install sshpass automatically"
        echo "Установите sshpass вручную или используйте интерактивный SSH"
        echo "Install sshpass manually or use interactive SSH"
        exit 1
    fi
fi

echo "🔧 Создаем скрипт установки на сервере..."
echo "🔧 Creating installation script on server..."

# Создаем скрипт установки
INSTALL_SCRIPT='#!/bin/bash

echo "🚀 Начинаем установку RepairHub Pro..."
echo "🚀 Starting RepairHub Pro installation..."

# Обновление системы
echo "📦 Обновляем систему..."
echo "📦 Updating system..."
apt update && apt upgrade -y

# Установка необходимых пакетов
echo "📦 Устанавливаем пакеты..."
echo "📦 Installing packages..."
apt install -y curl wget git nginx ufw

# Установка Docker
echo "🐳 Устанавливаем Docker..."
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Установка Docker Compose
echo "🔧 Устанавливаем Docker Compose..."
echo "🔧 Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Клонирование проекта
echo "📥 Клонируем проект..."
echo "📥 Cloning project..."
git clone https://github.com/PlevanDM/RP-Modern.git
cd RP-Modern
git checkout 24.10v3

# Сборка и запуск
echo "🔨 Собираем и запускаем приложение..."
echo "🔨 Building and starting application..."
docker-compose build
docker-compose up -d

# Настройка Nginx
echo "🌐 Настраиваем Nginx..."
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/repair-hub-pro << "EOF"
server {
    listen 80;
    server_name _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Активация сайта
ln -sf /etc/nginx/sites-available/repair-hub-pro /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Настройка firewall
echo "🔥 Настраиваем firewall..."
echo "🔥 Configuring firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 3000
ufw --force enable

# Проверка статуса
echo "📊 Проверяем статус..."
echo "📊 Checking status..."
docker-compose ps

echo ""
echo "✅ Установка завершена!"
echo "✅ Installation completed!"
echo ""
echo "🌐 Приложение доступно по адресу:"
echo "🌐 Application is available at:"
echo "  - HTTP: http://'$SERVER_IP':3000"
echo "  - Nginx: http://'$SERVER_IP'"
echo ""
echo "📋 Полезные команды:"
echo "📋 Useful commands:"
echo "  - Логи: docker-compose logs -f"
echo "  - Статус: docker-compose ps"
echo "  - Перезапуск: docker-compose restart"
'

# Сохраняем скрипт локально
echo "$INSTALL_SCRIPT" > install-on-server.sh

echo "📄 Скрипт установки создан: install-on-server.sh"
echo "📄 Installation script created: install-on-server.sh"

echo ""
echo "🔄 Загружаем скрипт на сервер и запускаем..."
echo "🔄 Uploading script to server and running..."

# Загружаем скрипт на сервер
sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no install-on-server.sh root@$SERVER_IP:/root/

# Запускаем скрипт на сервере
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no root@$SERVER_IP "chmod +x /root/install-on-server.sh && /root/install-on-server.sh"

echo ""
echo "🎉 Развертывание завершено!"
echo "🎉 Deployment completed!"
echo ""
echo "🌐 Приложение доступно по адресу:"
echo "🌐 Application is available at:"
echo "  - HTTP: http://$SERVER_IP:3000"
echo "  - Nginx: http://$SERVER_IP"
echo ""
echo "📋 Для проверки статуса выполните:"
echo "📋 To check status run:"
echo "  sshpass -p '$SERVER_PASSWORD' ssh root@$SERVER_IP 'cd RP-Modern && docker-compose ps'"
echo ""
echo "📋 Для просмотра логов выполните:"
echo "📋 To view logs run:"
echo "  sshpass -p '$SERVER_PASSWORD' ssh root@$SERVER_IP 'cd RP-Modern && docker-compose logs -f'"
