#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         ПРОВЕРКА FRONTEND КОДА НА ОШИБКИ                      ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

cd /root/repair-hub-pro

echo ""
echo "📁 1. ПРОВЕРКА СТРУКТУРЫ ПРОЕКТА:"
echo "═══════════════════════════════════════════════════════════════"
find src -type f -name "*.tsx" -o -name "*.ts" | wc -l
echo "TypeScript/React файлов найдено"

echo ""
echo "🔍 2. ПРОВЕРКА ИМПОРТОВ И ЭКСПОРТОВ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Проверка на неиспользуемые импорты..."
docker exec repair-hub-pro npm run build 2>&1 | grep -i "warning\|error" || echo "Build completed"

echo ""
echo "📦 3. ПРОВЕРКА ЗАВИСИМОСТЕЙ:"
echo "═══════════════════════════════════════════════════════════════"
docker exec repair-hub-pro npm ls --depth=0 | head -20

echo ""
echo "🔧 4. ПРОВЕРКА КОНФИГУРАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"
echo "TypeScript config:"
docker exec repair-hub-pro cat tsconfig.json | grep -E "(strict|target|module)"

echo ""
echo "Vite config:"
docker exec repair-hub-pro cat vite.config.ts | head -10

echo ""
echo "🎨 5. ПРОВЕРКА КОМПОНЕНТОВ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Компоненты в src/components:"
find src/components -name "*.tsx" | wc -l

echo ""
echo "Pages:"
find src/components/pages -name "*.tsx" | wc -l

echo ""
echo "Features:"
find src/components/features -name "*.tsx" | wc -l

echo ""
echo "📱 6. ПРОВЕРКА ХУКОВ И STORE:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.ts" -path "*/store/*" | wc -l
find src -name "*.ts" -path "*/hooks/*" | wc -l

echo ""
echo "🌍 7. ПРОВЕРКА ИНТЕРНАЦИОНАЛИЗАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.json" -path "*/i18n/*" | wc -l

echo ""
echo "🎯 8. ПРОВЕРКА ТИПОВ И ИНТЕРФЕЙСОВ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.ts" -path "*/types/*" | wc -l

echo ""
echo "🔍 9. ПРОВЕРКА УТИЛИТ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.ts" -path "*/utils/*" | wc -l

echo ""
echo "⚡ 10. ПРОВЕРКА ПРОИЗВОДИТЕЛЬНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"
echo "Bundle size analysis:"
docker exec repair-hub-pro du -sh dist/ 2>/dev/null || echo "Build directory not found"

echo ""
echo "📊 11. ПРОВЕРКА ПЛАГИНОВ И ИНСТРУМЕНТОВ:"
echo "═══════════════════════════════════════════════════════════════"
echo "ESLint configuration:"
docker exec repair-hub-pro cat .eslintrc* 2>/dev/null | head -5 || echo "ESLint config not found"

echo ""
echo "Prettier configuration:"
docker exec repair-hub-pro cat .prettierrc* 2>/dev/null | head -5 || echo "Prettier config not found"

echo ""
echo "🔒 12. ПРОВЕРКА БЕЗОПАСНОСТИ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "console.log\|debugger\|TODO\|FIXME\|HACK" | wc -l

echo ""
echo "🎨 13. ПРОВЕРКА СТИЛЕЙ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.css" | wc -l

echo ""
echo "Tailwind config:"
docker exec repair-hub-pro cat tailwind.config.js | head -10 2>/dev/null || echo "Tailwind config not found"

echo ""
echo "📚 14. ПРОВЕРКА ДОКУМЕНТАЦИИ:"
echo "═══════════════════════════════════════════════════════════════"
find src -name "*.md" | wc -l

echo ""
echo "🔍 15. ПРОВЕРКА НЕДОРАБОТАННЫХ ФУНКЦИЙ:"
echo "═══════════════════════════════════════════════════════════════"

echo "Функции без реализации:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "throw new Error\|not implemented\|TODO\|FIXME" | wc -l

echo ""
echo "Консольные логи (debug):"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "console.log" | paste -sd+ | bc

echo ""
echo "🎯 16. РЕКОМЕНДАЦИИ ПО УЛУЧШЕНИЮ:"
echo "═══════════════════════════════════════════════════════════════"

# Анализ качества кода
TYPESCRIPT_FILES=$(find src -name "*.tsx" -o -name "*.ts" | wc -l)
CONSOLE_LOGS=$(find src -name "*.tsx" -o -name "*.ts" | xargs grep -c "console.log" | paste -sd+ | bc)

echo "📊 Статистика проекта:"
echo "   - TypeScript файлов: $TYPESCRIPT_FILES"
echo "   - Console.log вызовов: $CONSOLE_LOGS"

if [ "$CONSOLE_LOGS" -gt 20 ]; then
    echo "⚠️  Рекомендация: Удалить console.log из production кода"
    find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "console.log" | head -5
fi

echo ""
echo "🔧 Функции требующие доработки:"
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "not implemented\|TODO\|FIXME" | head -5

echo ""
echo "📦 Рекомендации по оптимизации:"
if [ -d "dist" ]; then
    echo "   - Проверить размер bundle"
    echo "   - Настроить code splitting"
    echo "   - Оптимизировать изображения"
else
    echo "   - Build не найден, запустить npm run build"
fi

echo ""
echo "✅ FRONTEND АУДИТ ЗАВЕРШЕН!"
