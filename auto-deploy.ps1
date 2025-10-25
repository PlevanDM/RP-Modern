# Автоматический скрипт развертывания RepairHub Pro на Vultr
# Automatic deployment script for RepairHub Pro on Vultr

Write-Host "🚀 Автоматическое развертывание RepairHub Pro на Vultr" -ForegroundColor Green
Write-Host "🚀 Automatic deployment of RepairHub Pro on Vultr" -ForegroundColor Green

$SERVER_IP = "45.32.158.217"
$SERVER_PASSWORD = "pH[7)MPXFXAajxvM"

Write-Host ""
Write-Host "📋 Информация о сервере:" -ForegroundColor Cyan
Write-Host "📋 Server information:" -ForegroundColor Cyan
Write-Host "  - IP: $SERVER_IP" -ForegroundColor White
Write-Host "  - Статус: Активен и работает" -ForegroundColor White
Write-Host "  - Status: Active and running" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Создаем скрипт для автоматической установки..." -ForegroundColor Yellow
Write-Host "🔧 Creating automatic installation script..." -ForegroundColor Yellow

# Создаем скрипт установки
$installScript = @"
#!/bin/bash

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
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-`$(uname -s)-`$(uname -m)" -o /usr/local/bin/docker-compose
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
cat > /etc/nginx/sites-available/repair-hub-pro << 'EOF'
server {
    listen 80;
    server_name _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
        proxy_cache_bypass `$http_upgrade;
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
echo "  - HTTP: http://$SERVER_IP:3000"
echo "  - Nginx: http://$SERVER_IP"
echo ""
echo "📋 Полезные команды:"
echo "📋 Useful commands:"
echo "  - Логи: docker-compose logs -f"
echo "  - Статус: docker-compose ps"
echo "  - Перезапуск: docker-compose restart"
echo ""
echo "  - Logs: docker-compose logs -f"
echo "  - Status: docker-compose ps"
echo "  - Restart: docker-compose restart"
"@

# Сохраняем скрипт
$installScript | Out-File -FilePath "install-on-server.sh" -Encoding UTF8

Write-Host "📄 Скрипт установки создан: install-on-server.sh" -ForegroundColor Green
Write-Host "📄 Installation script created: install-on-server.sh" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 Инструкции для развертывания:" -ForegroundColor Cyan
Write-Host "🎯 Deployment instructions:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Подключитесь к серверу через SSH:" -ForegroundColor White
Write-Host "1. Connect to server via SSH:" -ForegroundColor White
Write-Host "   ssh root@$SERVER_IP" -ForegroundColor Blue
Write-Host "   Пароль: $SERVER_PASSWORD" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Загрузите и запустите скрипт установки:" -ForegroundColor White
Write-Host "2. Upload and run installation script:" -ForegroundColor White
Write-Host "   wget -O install.sh https://raw.githubusercontent.com/PlevanDM/RP-Modern/24.10v3/install-on-server.sh" -ForegroundColor Blue
Write-Host "   chmod +x install.sh" -ForegroundColor Blue
Write-Host "   ./install.sh" -ForegroundColor Blue
Write-Host ""
Write-Host "3. Или выполните команды вручную:" -ForegroundColor White
Write-Host "3. Or run commands manually:" -ForegroundColor White
Write-Host "   Скопируйте содержимое файла vultr-install-commands.txt" -ForegroundColor Blue
Write-Host "   Copy contents of vultr-install-commands.txt file" -ForegroundColor Blue
Write-Host ""

Write-Host "🌐 После завершения приложение будет доступно:" -ForegroundColor Cyan
Write-Host "🌐 After completion, application will be available:" -ForegroundColor Cyan
Write-Host "  - HTTP: http://$SERVER_IP:3000" -ForegroundColor Blue
Write-Host "  - Nginx: http://$SERVER_IP" -ForegroundColor Blue
Write-Host ""

Write-Host "✅ Готово к развертыванию!" -ForegroundColor Green
Write-Host "✅ Ready for deployment!" -ForegroundColor Green
