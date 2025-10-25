# Инструкции по развертыванию RepairHub Pro на Vultr
# Instructions for deploying RepairHub Pro on Vultr

Write-Host "🚀 Развертывание RepairHub Pro на Vultr" -ForegroundColor Green
Write-Host "🚀 Deploying RepairHub Pro on Vultr" -ForegroundColor Green

$SERVER_IP = "45.32.158.217"
$SERVER_PASSWORD = "pH[7)MPXFXAajxvM"

Write-Host ""
Write-Host "📋 Информация о сервере:" -ForegroundColor Cyan
Write-Host "📋 Server information:" -ForegroundColor Cyan
Write-Host "  - IP: $SERVER_IP" -ForegroundColor White
Write-Host "  - Пароль: $SERVER_PASSWORD" -ForegroundColor White
Write-Host "  - Статус: Активен и работает" -ForegroundColor White
Write-Host ""

Write-Host "🎯 Инструкции для развертывания:" -ForegroundColor Cyan
Write-Host "🎯 Deployment instructions:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Подключитесь к серверу через SSH:" -ForegroundColor White
Write-Host "1. Connect to server via SSH:" -ForegroundColor White
Write-Host "   ssh root@$SERVER_IP" -ForegroundColor Blue
Write-Host "   Пароль: $SERVER_PASSWORD" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Выполните команды установки:" -ForegroundColor White
Write-Host "2. Run installation commands:" -ForegroundColor White
Write-Host "   (Скопируйте команды из файла vultr-install-commands.txt)" -ForegroundColor Blue
Write-Host "   (Copy commands from vultr-install-commands.txt file)" -ForegroundColor Blue
Write-Host ""

Write-Host "🌐 После завершения приложение будет доступно:" -ForegroundColor Cyan
Write-Host "🌐 After completion, application will be available:" -ForegroundColor Cyan
Write-Host "  - HTTP: http://$SERVER_IP:3000" -ForegroundColor Blue
Write-Host "  - Nginx: http://$SERVER_IP" -ForegroundColor Blue
Write-Host ""

Write-Host "✅ Готово к развертыванию!" -ForegroundColor Green
Write-Host "✅ Ready for deployment!" -ForegroundColor Green
