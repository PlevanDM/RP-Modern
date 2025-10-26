#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         ПРОВЕРКА BACKEND И API ФУНКЦИОНАЛА                   ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "🔌 1. ПРОВЕРКА API ENDPOINTS:"
echo "═══════════════════════════════════════════════════════════════"

# Проверка на наличие API роутов в коде
echo "API routes в коде:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "api\|fetch\|axios\|http" | wc -l

echo ""
echo "Network requests:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "fetch\|axios" | paste -sd+ | bc

echo ""
echo "📊 2. ПРОВЕРКА STORE ФУНКЦИОНАЛА:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.ts" -path "*/store/*" -exec echo "Store: {}" \; -exec head -5 {} \;

echo ""
echo "🔄 3. ПРОВЕРКА STATE MANAGEMENT:"
echo "═══════════════════════════════════════════════════════════════"
echo "Zustand stores:"
find src -name "*.ts" -path "*/store/*" | xargs grep -l "create<" | wc -l

echo ""
echo "Actions/functions:"
find src -name "*.ts" -path "*/store/*" | xargs grep -c "export.*=" | paste -sd+ | bc

echo ""
echo "🎯 4. ПРОВЕРКА АУТЕНТИФИКАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "auth\|login\|logout\|token" | wc -l

echo ""
echo "Auth functions:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -A 2 -B 2 "login\|logout" | grep -v "^--" | head -20

echo ""
echo "🔐 5. ПРОВЕРКА БЕЗОПАСНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"
echo "API keys в коде:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "API_KEY\|SECRET\|TOKEN\|PASSWORD" | paste -sd+ | bc

echo ""
echo "Environment variables:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "process.env\|import.meta.env" | paste -sd+ | bc

echo ""
echo "📝 6. ПРОВЕРКА ВАЛИДАЦИИ ДАННЫХ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "validate\|schema\|joi\|zod" | wc -l

echo ""
echo "Validation functions:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -A 1 -B 1 "validate\|schema" | head -10

echo ""
echo "💾 7. ПРОВЕРКА ДАННЫХ И ТИПОВ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.ts" -path "*/types/*" -exec echo "Types: {}" \; -exec head -10 {} \;

echo ""
echo "🔧 8. ПРОВЕРКА УТИЛИТ И ХЕЛПЕРОВ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.ts" -path "*/utils/*" -exec echo "Utils: {}" \; -exec head -5 {} \;

echo ""
echo "📱 9. ПРОВЕРКА МОБИЛЬНОЙ АДАПТИВНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "mobile\|responsive\|md:\|lg:" | paste -sd+ | bc

echo ""
echo "🌐 10. ПРОВЕРКА ИНТЕРНАЦИОНАЛИЗАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.json" -path "*/i18n/*" | wc -l

echo ""
echo "Translation keys:"
find src -name "*.json" -path "*/i18n/*" | xargs grep -c '"[^"]*"' | paste -sd+ | bc

echo ""
echo "⚡ 11. ПРОВЕРКА ПРОИЗВОДИТЕЛЬНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"
echo "useMemo/useCallback usage:"
find src -name "*.tsx" | xargs grep -c "useMemo\|useCallback" | paste -sd+ | bc

echo ""
echo "useEffect dependencies:"
find src -name "*.tsx" | xargs grep -c "useEffect" | paste -sd+ | bc

echo ""
echo "🔍 12. ПРОВЕРКА ОБРАБОТКИ ОШИБОК:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "try\|catch\|ErrorBoundary" | wc -l

echo ""
echo "Error handling:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -A 1 -B 1 "catch\|Error" | head -10

echo ""
echo "🎨 13. ПРОВЕРКА UI/UX КОМПОНЕНТОВ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Modal/Dialog components:"
find src -name "*.tsx" | xargs grep -l "Modal\|Dialog" | wc -l

echo ""
echo "Form components:"
find src -name "*.tsx" | xargs grep -l "Form\|Input\|Button" | wc -l

echo ""
echo "Navigation components:"
find src -name "*.tsx" | xargs grep -l "Nav\|Menu\|Sidebar" | wc -l

echo ""
echo "📊 14. ПРОВЕРКА ДАННЫХ И МОДЕЛЕЙ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.ts" | xargs grep -l "interface\|type.*=" | wc -l

echo ""
echo "Mock data:"
find src -name "*.ts" | xargs grep -l "mock\|MOCK" | wc -l

echo ""
echo "🎯 15. АНАЛИЗ НЕДОРАБОТАННЫХ ФУНКЦИЙ:"
echo "═══════════════════════════════════════════════════════════════"

echo "TODO/FIXME comments:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "TODO\|FIXME\|HACK" | paste -sd+ | bc

echo ""
echo "Not implemented functions:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "throw new Error\|not implemented" | paste -sd+ | bc

echo ""
echo "Empty functions:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "{\s*}" | paste -sd+ | bc

echo ""
echo "🔧 16. РЕКОМЕНДАЦИИ ПО УЛУЧШЕНИЮ:"
echo "═══════════════════════════════════════════════════════════════"

# Анализ качества
TODO_COUNT=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "TODO\|FIXME" | paste -sd+ | bc)
EMPTY_FUNCTIONS=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "{\s*}" | paste -sd+ | bc)

echo "📊 Анализ качества:"
echo "   - TODO/FIXME комментариев: $TODO_COUNT"
echo "   - Пустых функций: $EMPTY_FUNCTIONS"

if [ "$TODO_COUNT" -gt 10 ]; then
    echo "⚠️  Рекомендация: Разобрать TODO комментарии"
    find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "TODO\|FIXME" | head -5
fi

if [ "$EMPTY_FUNCTIONS" -gt 5 ]; then
    echo "⚠️  Рекомендация: Реализовать пустые функции"
    find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "{\s*}" | head -3
fi

echo ""
echo "🔍 Функции требующие реализации:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "not implemented\|throw new Error" | head -5

echo ""
echo "📦 Рекомендации по backend:"
if [ -f "src/utils/mockData.ts" ]; then
    echo "   - Заменить mock данные на реальные API"
fi

echo "   - Настроить error logging"
echo "   - Добавить unit tests"
echo "   - Настроить API documentation"

echo ""
echo "✅ BACKEND АУДИТ ЗАВЕРШЕН!"
