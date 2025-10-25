# PowerShell скрипт для деплоя RepairHub Pro

Write-Host "🚀 Запуск деплоя RepairHub Pro..." -ForegroundColor Green

# Загружаем скрипт с GitHub
$deployScript = Invoke-WebRequest -Uri "https://raw.githubusercontent.com/PlevanDM/RP-Modern/24.10v3/deploy-server.sh" -UseBasicParsing

# Сохраняем во временный файл
$tempFile = "$env:TEMP\deploy-temp.sh"
$deployScript.Content | Out-File -FilePath $tempFile -Encoding UTF8

Write-Host "📥 Скрипт загружен. Выполните на сервере:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Подключитесь к серверу:" -ForegroundColor Cyan
Write-Host "   ssh root@64.176.72.139" -ForegroundColor White
Write-Host ""
Write-Host "2. Выполните команду:" -ForegroundColor Cyan
Write-Host "   bash <(curl -sSL https://raw.githubusercontent.com/PlevanDM/RP-Modern/24.10v3/deploy-server.sh)" -ForegroundColor White
Write-Host ""
Write-Host "Или скопируйте содержимое файла deploy-server.sh и выполните на сервере." -ForegroundColor Yellow
Write-Host ""

# Удаляем временный файл
Remove-Item $tempFile -ErrorAction SilentlyContinue

Write-Host "✨ Готово! Приложение будет доступно на http://64.176.72.139:3000" -ForegroundColor Green
