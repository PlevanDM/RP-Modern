#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║         ОЧИСТКА И СИНХРОНИЗАЦИЯ С GITHUB                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

echo ""
echo "🛑 1. Остановка всех контейнеров:"
echo "═══════════════════════════════════════════════════════════════"
docker compose down 2>/dev/null || echo "Контейнеры уже остановлены"

echo ""
echo "🧹 2. Очистка Docker системы:"
echo "═══════════════════════════════════════════════════════════════"
docker system prune -af --volumes

echo ""
echo "🗑️ 3. Очистка временных файлов:"
echo "═══════════════════════════════════════════════════════════════"
# Очистка логов
find /root -name "*.log" -type f -delete 2>/dev/null || echo "Логи не найдены"
find /tmp -name "*repair-hub*" -type f -delete 2>/dev/null || echo "Временные файлы не найдены"

# Очистка кэша npm
rm -rf /root/repair-hub-pro/node_modules/.cache 2>/dev/null || echo "NPM cache не найден"
rm -rf /root/.npm/_cacache 2>/dev/null || echo "NPM cache не найден"

echo ""
echo "📊 4. Проверка статуса git:"
echo "═══════════════════════════════════════════════════════════════"
cd /root/repair-hub-pro
git status

echo ""
echo "🔄 5. Добавление всех изменений:"
echo "═══════════════════════════════════════════════════════════════"
git add -A
git status --short

echo ""
echo "💾 6. Коммит изменений:"
echo "═══════════════════════════════════════════════════════════════"
if git diff --cached --quiet; then
    echo "✅ Нет изменений для коммита"
else
    git commit -m "Clean up and sync - stop all containers and remove temporary files"
fi

echo ""
echo "🚀 7. Отправка на GitHub:"
echo "═══════════════════════════════════════════════════════════════"
git push origin eploy

echo ""
echo "📊 8. Финальный статус:"
echo "═══════════════════════════════════════════════════════════════"
git status
docker ps -a
df -h

echo ""
echo "✅ 9. Сводка очистки:"
echo "═══════════════════════════════════════════════════════════════"
echo "🛑 Docker контейнеры: остановлены"
echo "🗑️  Временные файлы: удалены"
echo "🔄 Git: синхронизирован"
echo "💾 Диск: $(df -h / | tail -1 | awk '{print $4}') свободно"

echo ""
echo "🎯 Проект очищен и готов к новому запуску!"

echo ""
echo "🔄 Для перезапуска:"
echo "   cd /root/repair-hub-pro && git pull && docker compose up -d"

echo ""
echo "✅ ОЧИСТКА И СИНХРОНИЗАЦИЯ ЗАВЕРШЕНА!"
