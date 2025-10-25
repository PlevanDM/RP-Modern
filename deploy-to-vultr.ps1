# PowerShell скрипт для развертывания RepairHub Pro на Vultr
# PowerShell script for RepairHub Pro deployment on Vultr

Write-Host "🚀 Начинаем развертывание RepairHub Pro на Vultr..." -ForegroundColor Green
Write-Host "🚀 Starting RepairHub Pro deployment on Vultr..." -ForegroundColor Green

# Параметры сервера
$SERVER_ID = "1eb0e38a-6438-4a0e-b740-f5ea549db44f"
$SERVER_IP = "45.32.158.217"
$API_KEY = "AEXHK6GE2OSB2YIVHD7XYHMF2BC4VYRAR7HQ"

Write-Host ""
Write-Host "📋 Информация о сервере:" -ForegroundColor Cyan
Write-Host "📋 Server information:" -ForegroundColor Cyan
Write-Host "   - ID: $SERVER_ID" -ForegroundColor White
Write-Host "   - IP: $SERVER_IP" -ForegroundColor White
Write-Host ""

# Проверяем статус сервера
Write-Host "🔍 Проверяем статус сервера..." -ForegroundColor Yellow
Write-Host "🔍 Checking server status..." -ForegroundColor Yellow

try {
    $headers = @{
        'Authorization' = "Bearer $API_KEY"
    }
    
    $statusResponse = Invoke-RestMethod -Uri "https://api.vultr.com/v2/instances/$SERVER_ID" -Headers $headers
    
    $powerStatus = $statusResponse.instance.power_status
    $serverStatus = $statusResponse.instance.server_status
    
    Write-Host "   Статус питания: $powerStatus" -ForegroundColor White
    Write-Host "   Статус сервера: $serverStatus" -ForegroundColor White
    Write-Host "   Power status: $powerStatus" -ForegroundColor White
    Write-Host "   Server status: $serverStatus" -ForegroundColor White
    
    Write-Host ""
    Write-Host "🎯 Инструкции для развертывания:" -ForegroundColor Cyan
    Write-Host "🎯 Deployment instructions:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Подключитесь к серверу через веб-консоль Vultr:" -ForegroundColor White
    Write-Host "1. Connect to server via Vultr web console:" -ForegroundColor White
    Write-Host "   https://my.vultr.com" -ForegroundColor Blue
    Write-Host ""
    Write-Host "2. Найдите сервер 'repair-hub-pro' и откройте консоль" -ForegroundColor White
    Write-Host "2. Find server 'repair-hub-pro' and open console" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Войдите с паролем: pH[7)MPXFXAajxvM" -ForegroundColor White
    Write-Host "3. Login with password: pH[7)MPXFXAajxvM" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Выполните команды установки:" -ForegroundColor White
    Write-Host "4. Run installation commands:" -ForegroundColor White
    Write-Host ""
    
    # Создаем файл с командами
    $commands = @"
# Обновление системы
apt update && apt upgrade -y

# Установка необходимых пакетов
apt install -y curl wget git nginx ufw

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Установка Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-`$(uname -s)-`$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Клонирование проекта
git clone https://github.com/PlevanDM/RP-Modern.git
cd RP-Modern
git checkout 24.10v3

# Сборка и запуск
docker-compose build
docker-compose up -d

# Настройка Nginx
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
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 3000
ufw --force enable

# Проверка статуса
docker-compose ps

echo "✅ Установка завершена!"
echo "🌐 Приложение доступно по адресу:"
echo "   - HTTP: http://$SERVER_IP:3000"
echo "   - Nginx: http://$SERVER_IP"
"@
    
    $commands | Out-File -FilePath "vultr-install-commands.txt" -Encoding UTF8
    
    Write-Host "📄 Команды сохранены в файл: vultr-install-commands.txt" -ForegroundColor Green
    Write-Host "📄 Commands saved to file: vultr-install-commands.txt" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "🌐 После завершения приложение будет доступно по адресу:" -ForegroundColor Cyan
    Write-Host "🌐 After completion, application will be available at:" -ForegroundColor Cyan
    Write-Host "   http://$SERVER_IP:3000" -ForegroundColor Blue
    Write-Host "   http://$SERVER_IP (через Nginx)" -ForegroundColor Blue
    Write-Host ""
    
    Write-Host "✅ Скрипт развертывания готов!" -ForegroundColor Green
    Write-Host "✅ Deployment script is ready!" -ForegroundColor Green
    
}
catch {
    Write-Host "❌ Ошибка при работе с API Vultr" -ForegroundColor Red
    Write-Host "❌ Error working with Vultr API" -ForegroundColor Red
}