#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         ПОЛНАЯ ПРОВЕРКА ПРОЕКТА НА ОШИБКИ                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "📊 1. ПРОВЕРКА СТАТУСА СИСТЕМЫ:"
echo "═══════════════════════════════════════════════════════════════"
docker compose ps

echo ""
echo "🔍 2. ПРОВЕРКА NGINX КОНФИГУРАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"
docker exec repair-hub-pro nginx -t 2>&1 || echo "❌ Nginx configuration error!"

echo ""
echo "📝 3. АНАЛИЗ ДОСТУПНОСТИ ФАЙЛОВ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Frontend build files:"
docker exec repair-hub-pro ls -la /app/dist/ 2>/dev/null || echo "❌ Frontend build missing!"

echo ""
echo "Nginx configuration:"
docker exec repair-hub-pro ls -la /etc/nginx/http.d/ 2>/dev/null || echo "❌ Nginx config missing!"

echo ""
echo "🌐 4. ПРОВЕРКА ПОРТОВ:"
echo "═══════════════════════════════════════════════════════════════"
docker exec repair-hub-pro netstat -tlnp 2>/dev/null | grep :80 || echo "❌ Port 80 not listening!"

echo ""
echo "❌ 5. АНАЛИЗ ЛОГОВ НА ОШИБКИ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Docker container errors:"
docker logs repair-hub-pro 2>&1 | grep -i "error\|fail\|exception\|traceback" | head -20

echo ""
echo "Nginx access attempts:"
docker exec repair-hub-pro tail -50 /var/log/nginx/access.log 2>/dev/null || echo "❌ Nginx logs not accessible"

echo ""
echo "🔧 6. ПРОВЕРКА ПРОЦЕССОВ:"
echo "═══════════════════════════════════════════════════════════════"
docker exec repair-hub-pro ps aux | head -20

echo ""
echo "📦 7. ПРОВЕРКА РАЗМЕРА И РЕСУРСОВ:"
echo "═══════════════════════════════════════════════════════════════"
docker stats repair-hub-pro --no-stream

echo ""
echo "💾 8. ПРОВЕРКА ФАЙЛОВОЙ СИСТЕМЫ:"
echo "═══════════════════════════════════════════════════════════════"
docker exec repair-hub-pro df -h

echo ""
echo "🔍 9. ПРОВЕРКА СЕТЕВЫХ СОЕДИНЕНИЙ:"
echo "═══════════════════════════════════════════════════════════════"
docker exec repair-hub-pro netstat -tulnp 2>/dev/null || echo "❌ Network check failed"

echo ""
echo "📋 10. ПРОВЕРКА КОНФИГУРАЦИОННЫХ ФАЙЛОВ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Package.json dependencies:"
docker exec repair-hub-pro cat package.json 2>/dev/null | grep -A 50 '"dependencies"' | head -20

echo ""
echo "Dockerfile content:"
docker exec repair-hub-pro cat Dockerfile 2>/dev/null | head -10

echo ""
echo "🎯 11. ПРОВЕРКА БЕЗОПАСНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Security headers in nginx:"
docker exec repair-hub-pro cat /etc/nginx/http.d/default.conf 2>/dev/null | grep -i "security\|x-frame\|x-content\|x-xss"

echo ""
echo "🔐 12. ПРОВЕРКА ПЕРФОРМАНСА:"
echo "═══════════════════════════════════════════════════════════════"
echo "Memory usage:"
docker exec repair-hub-pro free -h 2>/dev/null || echo "❌ Memory check failed"

echo ""
echo "📊 13. ПРОВЕРКА ЛОГОВ ЗА ПОСЛЕДНИЕ 5 МИНУТ:"
echo "═══════════════════════════════════════════════════════════════"
docker logs repair-hub-pro --since 5m 2>&1 | tail -30

echo ""
echo "🔍 14. ПРОВЕРКА ЗАВИСИМОСТЕЙ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Node modules:"
docker exec repair-hub-pro ls -la node_modules/ 2>/dev/null | head -10 || echo "❌ Node modules missing"

echo ""
echo "✅ 15. ИТОГОВЫЕ РЕКОМЕНДАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"

# Анализ результатов
ERRORS=$(docker logs repair-hub-pro 2>&1 | grep -c -i "error\|fail\|exception")
WARNINGS=$(docker logs repair-hub-pro 2>&1 | grep -c -i "warn")

echo "📊 Найдено ошибок: $ERRORS"
echo "⚠️  Найдено предупреждений: $WARNINGS"

if [ "$ERRORS" -gt 0 ]; then
    echo "❌ ТРЕБУЮТ ВНИМАНИЯ:"
    docker logs repair-hub-pro 2>&1 | grep -i "error\|fail\|exception" | head -10
fi

if [ "$WARNINGS" -gt 0 ]; then
    echo "⚠️  ПРЕДУПРЕЖДЕНИЯ:"
    docker logs repair-hub-pro 2>&1 | grep -i "warn" | head -5
fi

echo ""
echo "🌐 СТАТУС САЙТА: Проверьте https://repairhub.one"

echo ""
echo "🎯 РЕКОМЕНДАЦИИ:"
if [ "$ERRORS" -gt 5 ]; then
    echo "   - Высокий уровень ошибок, требуется отладка"
    echo "   - Проверьте логи более детально"
    echo "   - Рассмотрите перезапуск контейнера"
else
    echo "   - Уровень ошибок в норме"
    echo "   - Продолжайте мониторинг"
fi

echo ""
echo "✅ АУДИТ ЗАВЕРШЕН!"
