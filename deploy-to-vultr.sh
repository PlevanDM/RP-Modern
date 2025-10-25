#!/bin/bash

# Скрипт для автоматического развертывания RepairHub Pro на Vultr
# Automatic deployment script for RepairHub Pro on Vultr

echo "🚀 Начинаем развертывание RepairHub Pro на Vultr..."
echo "🚀 Starting RepairHub Pro deployment on Vultr..."

# Параметры сервера
SERVER_ID="1eb0e38a-6438-4a0e-b740-f5ea549db44f"
SERVER_IP="45.32.158.217"
API_KEY="AEXHK6GE2OSB2YIVHD7XYHMF2BC4VYRAR7HQ"

echo "📋 Информация о сервере:"
echo "📋 Server information:"
echo "   - ID: $SERVER_ID"
echo "   - IP: $SERVER_IP"
echo ""

# Проверяем статус сервера
echo "🔍 Проверяем статус сервера..."
echo "🔍 Checking server status..."

STATUS_RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" \
    "https://api.vultr.com/v2/instances/$SERVER_ID")

POWER_STATUS=$(echo "$STATUS_RESPONSE" | grep -o '"power_status":"[^"]*"' | cut -d'"' -f4)
SERVER_STATUS=$(echo "$STATUS_RESPONSE" | grep -o '"server_status":"[^"]*"' | cut -d'"' -f4)

echo "   Статус питания: $POWER_STATUS"
echo "   Статус сервера: $SERVER_STATUS"
echo "   Power status: $POWER_STATUS"
echo "   Server status: $SERVER_STATUS"

# Если сервер не запущен, запускаем его
if [ "$POWER_STATUS" != "running" ]; then
    echo ""
    echo "🔄 Запускаем сервер..."
    echo "🔄 Starting server..."
    
    START_RESPONSE=$(curl -s -X POST \
        -H "Authorization: Bearer $API_KEY" \
        "https://api.vultr.com/v2/instances/$SERVER_ID/start")
    
    echo "   Ответ API: $START_RESPONSE"
    echo "   API response: $START_RESPONSE"
    
    # Ждем запуска
    echo "⏳ Ожидаем запуска сервера..."
    echo "⏳ Waiting for server to start..."
    
    for i in {1..12}; do
        sleep 10
        STATUS_RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" \
            "https://api.vultr.com/v2/instances/$SERVER_ID")
        
        POWER_STATUS=$(echo "$STATUS_RESPONSE" | grep -o '"power_status":"[^"]*"' | cut -d'"' -f4)
        echo "   Попытка $i/12: Статус питания = $POWER_STATUS"
        echo "   Attempt $i/12: Power status = $POWER_STATUS"
        
        if [ "$POWER_STATUS" = "running" ]; then
            echo "✅ Сервер запущен!"
            echo "✅ Server is running!"
            break
        fi
    done
fi

echo ""
echo "🔧 Создаем startup script для автоматической установки..."
echo "🔧 Creating startup script for automatic installation..."

STARTUP_SCRIPT='#!/bin/bash
# Автоматическая установка RepairHub Pro
# Automatic RepairHub Pro installation

echo "🚀 Начинаем установку RepairHub Pro..."
echo "🚀 Starting RepairHub Pro installation..."

# Обновление системы
echo "📦 Обновляем систему..."
echo "📦 Updating system..."
apt update && apt upgrade -y

# Установка необходимых пакетов
echo "📦 Устанавливаем необходимые пакеты..."
echo "📦 Installing required packages..."
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
echo "📊 Проверяем статус приложения..."
echo "📊 Checking application status..."
docker-compose ps

echo ""
echo "✅ Установка завершена!"
echo "✅ Installation completed!"
echo ""
echo "🌐 Приложение доступно по адресу:"
echo "🌐 Application is available at:"
echo "   - HTTP: http://'$SERVER_IP':3000"
echo "   - Nginx: http://'$SERVER_IP'"
echo ""
echo "📋 Полезные команды:"
echo "📋 Useful commands:"
echo "   - Логи: docker-compose logs -f"
echo "   - Статус: docker-compose ps"
echo "   - Перезапуск: docker-compose restart"
echo ""
echo "   - Logs: docker-compose logs -f"
echo "   - Status: docker-compose ps"
echo "   - Restart: docker-compose restart"
'

# Сохраняем startup script
echo "$STARTUP_SCRIPT" > startup-script.sh

echo "📄 Startup script создан: startup-script.sh"
echo "📄 Startup script created: startup-script.sh"

echo ""
echo "🎯 Следующие шаги:"
echo "🎯 Next steps:"
echo ""
echo "1. Подключитесь к серверу через веб-консоль Vultr:"
echo "1. Connect to server via Vultr web console:"
echo "   https://my.vultr.com"
echo ""
echo "2. Найдите сервер 'repair-hub-pro' и откройте консоль"
echo "2. Find server 'repair-hub-pro' and open console"
echo ""
echo "3. Войдите с паролем: pH[7)MPXFXAajxvM"
echo "3. Login with password: pH[7)MPXFXAajxvM"
echo ""
echo "4. Выполните команды установки:"
echo "4. Run installation commands:"
echo ""
echo "   # Обновление системы"
echo "   apt update && apt upgrade -y"
echo ""
echo "   # Установка Docker"
echo "   curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
echo ""
echo "   # Установка Docker Compose"
echo "   curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose"
echo ""
echo "   # Клонирование и запуск проекта"
echo "   git clone https://github.com/PlevanDM/RP-Modern.git && cd RP-Modern && git checkout 24.10v3 && docker-compose build && docker-compose up -d"
echo ""
echo "5. Настройте Nginx (опционально):"
echo "5. Configure Nginx (optional):"
echo "   apt install -y nginx"
echo "   # Затем следуйте инструкциям в SERVER_CONNECTION_GUIDE.md"
echo ""
echo "🌐 После завершения приложение будет доступно по адресу:"
echo "🌐 After completion, application will be available at:"
echo "   http://$SERVER_IP:3000"
echo ""

echo "✅ Скрипт развертывания готов!"
echo "✅ Deployment script is ready!"
