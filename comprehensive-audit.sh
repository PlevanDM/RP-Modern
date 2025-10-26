#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         КОМПЛЕКСНАЯ ПРОВЕРКА ПРОЕКТА                         ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "🚀 НАЧАЛО КОМПЛЕКСНОГО АУДИТА"
echo "═══════════════════════════════════════════════════════════════"

echo ""
echo "📊 1. ПРОВЕРКА СИСТЕМЫ И ИНФРАСТРУКТУРЫ:"
echo "═══════════════════════════════════════════════════════════════"
bash audit-project.sh

echo ""
echo "🎨 2. ПРОВЕРКА FRONTEND КОДА:"
echo "═══════════════════════════════════════════════════════════════"
bash check-frontend.sh

echo ""
echo "🔧 3. ПРОВЕРКА BACKEND И API:"
echo "═══════════════════════════════════════════════════════════════"
bash check-backend.sh

echo ""
echo "🔐 4. ПРОВЕРКА БЕЗОПАСНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"
bash security-audit.sh

echo ""
echo "🎯 5. ИТОГОВЫЕ РЕКОМЕНДАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"

# Сбор статистики
TOTAL_ERRORS=$(docker logs repair-hub-pro 2>&1 | grep -c -i "error\|fail\|exception")
TODO_COUNT=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "TODO\|FIXME" | paste -sd+ | bc)
SECURITY_ISSUES=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "eval\|innerHTML\|API_KEY\|SECRET" | paste -sd+ | bc)

echo "📊 ОБЩАЯ СТАТИСТИКА:"
echo "   - Ошибок в логах: $TOTAL_ERRORS"
echo "   - TODO/FIXME в коде: $TODO_COUNT"
echo "   - Потенциальных уязвимостей: $SECURITY_ISSUES"

echo ""
echo "🔧 ПРИОРИТЕТНЫЕ ЗАДАЧИ:"
if [ "$TOTAL_ERRORS" -gt 10 ]; then
    echo "   🔴 КРИТИЧНО: Разобрать системные ошибки"
fi

if [ "$TODO_COUNT" -gt 20 ]; then
    echo "   🟡 ВАЖНО: Реализовать TODO функции"
fi

if [ "$SECURITY_ISSUES" -gt 0 ]; then
    echo "   🔴 КРИТИЧНО: Исправить уязвимости безопасности"
fi

echo ""
echo "📋 СЛЕДУЮЩИЕ ШАГИ:"
echo "   1. Исправить критические ошибки"
echo "   2. Реализовать TODO функции"
echo "   3. Улучшить безопасность"
echo "   4. Оптимизировать производительность"
echo "   5. Добавить тесты"
echo "   6. Настроить мониторинг"

echo ""
echo "🌐 СТАТУС ПРОЕКТА:"
if [ "$TOTAL_ERRORS" -gt 20 ] || [ "$SECURITY_ISSUES" -gt 5 ]; then
    echo "   ❌ Требует серьезной доработки"
elif [ "$TODO_COUNT" -gt 30 ]; then
    echo "   ⚠️  Требует доработки функций"
else
    echo "   ✅ Готов к production с небольшими улучшениями"
fi

echo ""
echo "📊 ДЕТАЛЬНЫЙ ОТЧЕТ СОХРАНЕН В ЛОГАХ"

echo ""
echo "🎯 РЕКОМЕНДАЦИИ ПО РАЗВИТИЮ:"
echo "   - Настроить CI/CD pipeline"
echo "   - Добавить automated testing"
echo "   - Настроить monitoring и alerting"
echo "   - Создать documentation"
echo "   - Оптимизировать performance"

echo ""
echo "✅ КОМПЛЕКСНЫЙ АУДИТ ЗАВЕРШЕН!"

echo ""
echo "📋 ДЛЯ ПОВТОРНОГО АУДИТА ЗАПУСТИТЕ:"
echo "   bash comprehensive-audit.sh"

echo ""
echo "🌐 ПРОВЕРЬТЕ РАБОТУ: https://repairhub.one"
