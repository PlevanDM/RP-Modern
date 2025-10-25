# Скрипт для пошагового развертывания RepairHub Pro на Vultr

Write-Host "🚀 Пошаговое развертывание RepairHub Pro на Vultr" -ForegroundColor Green

$SERVER_IP = "45.32.158.217"
$SERVER_PASSWORD = "pH[7)MPXFXAajxvM"

Write-Host ""
Write-Host "📋 Информация о сервере:" -ForegroundColor Cyan
Write-Host "  - IP: $SERVER_IP" -ForegroundColor White
Write-Host "  - Пароль: $SERVER_PASSWORD" -ForegroundColor White
Write-Host "  - Статус: Сервер доступен (ping работает)" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 Инструкции для развертывания:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Откройте новый терминал и подключитесь к серверу:" -ForegroundColor White
Write-Host "   ssh root@$SERVER_IP" -ForegroundColor Blue
Write-Host "   Пароль: $SERVER_PASSWORD" -ForegroundColor Blue
Write-Host ""

Write-Host "2. Выполните команды по порядку:" -ForegroundColor White
Write-Host ""

Write-Host "   # Шаг 1: Обновление системы" -ForegroundColor Yellow
Write-Host "   apt update && apt upgrade -y" -ForegroundColor Blue
Write-Host ""

Write-Host "   # Шаг 2: Установка пакетов" -ForegroundColor Yellow
Write-Host "   apt install -y curl wget git nginx ufw" -ForegroundColor Blue
Write-Host ""

Write-Host "   # Шаг 3: Установка Docker" -ForegroundColor Yellow
Write-Host "   curl -fsSL https://get.docker.com -o get-docker.sh" -ForegroundColor Blue
Write-Host "   sh get-docker.sh" -ForegroundColor Blue
Write-Host "   usermod -aG docker root" -ForegroundColor Blue
Write-Host ""

Write-Host "   # Шаг 4: Установка Docker Compose" -ForegroundColor Yellow
Write-Host "   curl -L `"https://github.com/docker/compose/releases/latest/download/docker-compose-`$(uname -s)-`$(uname -m)`" -o /usr/local/bin/docker-compose" -ForegroundColor Blue
Write-Host "   chmod +x /usr/local/bin/docker-compose" -ForegroundColor Blue
Write-Host ""

Write-Host "   # Шаг 5: Клонирование проекта" -ForegroundColor Yellow
Write-Host "   git clone https://github.com/PlevanDM/RP-Modern.git" -ForegroundColor Blue
Write-Host "   cd RP-Modern" -ForegroundColor Blue
Write-Host "   git checkout 24.10v3" -ForegroundColor Blue
Write-Host ""

Write-Host "   # Шаг 6: Сборка и запуск" -ForegroundColor Yellow
Write-Host "   docker-compose build" -ForegroundColor Blue
Write-Host "   docker-compose up -d" -ForegroundColor Blue
Write-Host ""

Write-Host "   # Шаг 7: Проверка статуса" -ForegroundColor Yellow
Write-Host "   docker-compose ps" -ForegroundColor Blue
Write-Host ""

Write-Host "3. После завершения приложение будет доступно:" -ForegroundColor White
Write-Host "   - HTTP: http://$SERVER_IP:3000" -ForegroundColor Blue
Write-Host ""

Write-Host "4. Для проверки работы:" -ForegroundColor White
Write-Host "   curl -I http://localhost:3000" -ForegroundColor Blue
Write-Host "   curl -I http://$SERVER_IP:3000" -ForegroundColor Blue
Write-Host ""

Write-Host "✅ Готово к развертыванию!" -ForegroundColor Green
Write-Host "✅ Ready for deployment!" -ForegroundColor Green
