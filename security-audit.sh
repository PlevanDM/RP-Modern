#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         ПРОВЕРКА БЕЗОПАСНОСТИ ПРОЕКТА                        ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "🔐 1. ПРОВЕРКА АУТЕНТИФИКАЦИИ И АВТОРИЗАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Auth components:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "auth\|login\|register" | wc -l

echo ""
echo "JWT/Passport usage:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "jwt\|passport\|session" | paste -sd+ | bc

echo ""
echo "Password handling:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "password\|bcrypt\|hash" | paste -sd+ | bc

echo ""
echo "🛡️ 2. ПРОВЕРКА ВВОДА ДАННЫХ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Input validation:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "validate\|sanitize" | paste -sd+ | bc

echo ""
echo "XSS protection:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "dangerouslySetInnerHTML\|innerHTML" | paste -sd+ | bc

echo ""
echo "SQL injection protection:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "sql\|query" | paste -sd+ | bc

echo ""
echo "🌐 3. ПРОВЕРКА СЕТЕВОЙ БЕЗОПАСНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"

echo "CORS configuration:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "cors\|origin" | paste -sd+ | bc

echo ""
echo "HTTPS enforcement:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "https\|ssl\|tls" | paste -sd+ | bc

echo ""
echo "🔑 4. ПРОВЕРКА СЕКРЕТОВ И КЛЮЧЕЙ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Hardcoded secrets:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "API_KEY\|SECRET\|TOKEN\|PASSWORD" | paste -sd+ | bc

echo ""
echo "Environment variables:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "process.env\|import.meta.env" | paste -sd+ | bc

echo ""
echo "📁 5. ПРОВЕРКА ФАЙЛОВОЙ БЕЗОПАСНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"

echo "File upload handling:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "upload\|file\|image" | paste -sd+ | bc

echo ""
echo "Path traversal protection:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "\.\.\/\|path\.join\|path\.resolve" | paste -sd+ | bc

echo ""
echo "⚡ 6. ПРОВЕРКА ЗАЩИТЫ ОТ АТАК:"
echo "═══════════════════════════════════════════════════════════════"

echo "Rate limiting:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "rate\|limit" | paste -sd+ | bc

echo ""
echo "CSRF protection:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "csrf\|token" | paste -sd+ | bc

echo ""
echo "🔒 7. ПРОВЕРКА ЗАГОЛОВКОВ БЕЗОПАСНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Security headers in nginx:"
docker exec repair-hub-pro cat /etc/nginx/http.d/default.conf 2>/dev/null | grep -i "security\|x-frame\|x-content\|x-xss\|csp" | wc -l

echo ""
echo "Content Security Policy:"
docker exec repair-hub-pro cat /etc/nginx/http.d/default.conf 2>/dev/null | grep -i "content-security-policy" | wc -l

echo ""
echo "🎯 8. ПРОВЕРКА АВТОРИЗАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Role-based access:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "role\|admin\|master\|client" | paste -sd+ | bc

echo ""
echo "Permission checks:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "permission\|access\|auth" | paste -sd+ | bc

echo ""
echo "📊 9. ПРОВЕРКА МОНИТОРИНГА И ЛОГИРОВАНИЯ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Error logging:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "console.error\|logger\|log.error" | paste -sd+ | bc

echo ""
echo "Security events:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "audit\|security\|suspicious" | paste -sd+ | bc

echo ""
echo "🔍 10. ПРОВЕРКА УЯЗВИМОСТЕЙ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Dangerous functions:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "eval\|Function\|setTimeout.*string\|setInterval.*string" | paste -sd+ | bc

echo ""
echo "Insecure random:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "Math.random" | paste -sd+ | bc

echo ""
echo "📋 11. ПРОВЕРКА GDPR И ПРИВАТНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Data collection:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "analytics\|tracking\|cookie" | paste -sd+ | bc

echo ""
echo "Privacy compliance:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "privacy\|gdpr\|consent" | paste -sd+ | bc

echo ""
echo "⚠️ 12. НАЙДЕННЫЕ УЯЗВИМОСТИ:"
echo "═══════════════════════════════════════════════════════════════"

# Критические уязвимости
CRITICAL_ISSUES=0

echo "🔴 Критические проблемы:"
if [ $(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "eval\|Function" | paste -sd+ | bc) -gt 0 ]; then
    echo "   - Найден eval() или Function() - критическая уязвимость!"
    CRITICAL_ISSUES=$((CRITICAL_ISSUES + 1))
fi

if [ $(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "innerHTML" | paste -sd+ | bc) -gt 0 ]; then
    echo "   - Найден dangerouslySetInnerHTML без санитизации"
    CRITICAL_ISSUES=$((CRITICAL_ISSUES + 1))
fi

if [ $(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "API_KEY\|SECRET\|PASSWORD" | paste -sd+ | bc) -gt 0 ]; then
    echo "   - Найдены hardcoded секреты в коде!"
    find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "API_KEY\|SECRET\|PASSWORD" | head -3
    CRITICAL_ISSUES=$((CRITICAL_ISSUES + 1))
fi

echo ""
echo "🟡 Предупреждения:"
if [ $(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "console.log" | paste -sd+ | bc) -gt 20 ]; then
    echo "   - Много console.log в коде"
fi

if [ $(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "TODO\|FIXME" | paste -sd+ | bc) -gt 10 ]; then
    echo "   - Много нерешенных TODO/FIXME"
fi

echo ""
echo "✅ Рекомендации по безопасности:"
echo "═══════════════════════════════════════════════════════════════"

if [ "$CRITICAL_ISSUES" -gt 0 ]; then
    echo "🔴 ТРЕБУЕТ НЕМЕДЛЕННОГО ВНИМАНИЯ: $CRITICAL_ISSUES критических проблем"
else
    echo "🟢 Критических уязвимостей не найдено"
fi

echo ""
echo "🛡️  Рекомендуемые улучшения:"
echo "   - Настроить HTTPS и HSTS"
echo "   - Добавить rate limiting"
echo "   - Настроить security headers"
echo "   - Удалить console.log из production"
echo "   - Добавить input validation"
echo "   - Настроить error logging"
echo "   - Добавить CSRF protection"
echo "   - Настроить audit logging"

echo ""
echo "📊 Сводка безопасности:"
echo "   - Критических проблем: $CRITICAL_ISSUES"
echo "   - Предупреждений: $(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "TODO\|FIXME\|console.log" | paste -sd+ | bc)"

echo ""
echo "✅ SECURITY AUDIT ЗАВЕРШЕН!"
