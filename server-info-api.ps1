# Vultr API - Получение информации о сервере
# PowerShell скрипт для диагностики сервера c27acc98-d903-4c2e-b50c-2e1ca23451b0

Write-Host "🔍 Vultr API - Server Information" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Конфигурация
$API_KEY = "WQVRXDQWELSA5ZIE3HZWVHJTZQE7JX7IK5ZA"
$API_BASE = "https://api.vultr.com/v2"
$SERVER_ID = "c27acc98-d903-4c2e-b50c-2e1ca23451b0"

# Функция для API запросов
function Invoke-VultrAPI {
    param([string]$Method, [string]$Endpoint)

    $headers = @{
        "Authorization" = "Bearer $API_KEY"
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Method $Method -Uri "$API_BASE$Endpoint" -Headers $headers
        return $response
    } catch {
        Write-Host "❌ API Error: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

Write-Host "📡 Получение информации о сервере..." -ForegroundColor Yellow

try {
    $serverResponse = Invoke-VultrAPI -Method "GET" -Endpoint "/instances/$SERVER_ID"

    if ($serverResponse) {
        $server = $serverResponse.instance

        Write-Host "📋 Server Details:" -ForegroundColor Blue
        Write-Host "  Server ID: $($server.id)" -ForegroundColor White
        Write-Host "  Label: $($server.label)" -ForegroundColor White
        Write-Host "  Status: $($server.status)" -ForegroundColor White
        Write-Host "  IP Address: $($server.main_ip)" -ForegroundColor White
        Write-Host "  Region: $($server.region)" -ForegroundColor White
        Write-Host "  Plan: $($server.plan)" -ForegroundColor White
        Write-Host "  OS: $($server.os)" -ForegroundColor White
        Write-Host "  Created: $($server.date_created)" -ForegroundColor White

        $serverIp = $server.main_ip

        Write-Host ""
        Write-Host "🔗 Access URLs:" -ForegroundColor Blue
        Write-Host "  SSH: ssh root@$serverIp" -ForegroundColor White
        Write-Host "  Web: http://$serverIp" -ForegroundColor White
        Write-Host "  Vultr Console: https://my.vultr.com/subs/vps/novnc/?id=$SERVER_ID" -ForegroundColor White

        Write-Host ""
        Write-Host "🧪 Тестирование подключения..." -ForegroundColor Yellow

        # Тестирование SSH (может зависнуть, но попробуем)
        Write-Host "  SSH Connection..." -ForegroundColor Cyan
        $sshTest = Test-NetConnection -ComputerName $serverIp -Port 22 -WarningAction SilentlyContinue
        if ($sshTest.TcpTestSucceeded) {
            Write-Host "  ✅ SSH доступен" -ForegroundColor Green
        } else {
            Write-Host "  ❌ SSH не отвечает (возможно firewall или сервер не готов)" -ForegroundColor Red
        }

        # Тестирование HTTP
        Write-Host "  HTTP Connection..." -ForegroundColor Cyan
        try {
            $httpTest = Invoke-WebRequest -Uri "http://$serverIp" -TimeoutSec 10 -UseBasicParsing
            Write-Host "  ✅ HTTP доступен" -ForegroundColor Green
        } catch {
            Write-Host "  ❌ HTTP не отвечает: $($_.Exception.Message)" -ForegroundColor Red
        }

        Write-Host ""
        Write-Host "🚀 Следующие шаги:" -ForegroundColor Blue

        if ($server.status -eq "active") {
            Write-Host "1. Подключитесь к серверу:" -ForegroundColor White
            Write-Host "   ssh root@$serverIp" -ForegroundColor Gray

            Write-Host "2. Выполните деплой:" -ForegroundColor White
            Write-Host "   chmod +x api-server-setup.sh" -ForegroundColor Gray
            Write-Host "   ./api-server-setup.sh" -ForegroundColor Gray

            Write-Host "3. Или через веб-консоль:" -ForegroundColor White
            Write-Host "   Перейдите в Vultr -> Console" -ForegroundColor Gray
            Write-Host "   Выполните команды из api-server-setup.sh" -ForegroundColor Gray
        } else {
            Write-Host "1. Дождитесь полной загрузки сервера" -ForegroundColor Yellow
            Write-Host "2. Проверьте статус в Vultr панели" -ForegroundColor Yellow
            Write-Host "3. Затем выполните деплой" -ForegroundColor Yellow
        }

    } else {
        Write-Host "❌ Не удалось получить информацию о сервере" -ForegroundColor Red
    }

} catch {
    Write-Host "❌ Ошибка: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "📊 Если SSH не работает:" -ForegroundColor Blue
Write-Host "1. Используйте веб-консоль Vultr" -ForegroundColor White
Write-Host "2. Проверьте firewall: ufw status" -ForegroundColor White
Write-Host "3. Перезапустите SSH: systemctl restart ssh" -ForegroundColor White
Write-Host "4. Проверьте логи: journalctl -u ssh" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Ожидаемый результат:" -ForegroundColor Green
Write-Host "✅ Docker установлен и работает" -ForegroundColor White
Write-Host "✅ Приложение доступно по http://$serverIp" -ForegroundColor White
Write-Host "✅ Контейнеры запущены: docker-compose ps" -ForegroundColor White
