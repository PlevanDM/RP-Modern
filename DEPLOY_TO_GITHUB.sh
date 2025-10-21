#!/bin/bash

# 🚀 RepairHub Pro - GitHub Deployment Script
# Скрипт для загрузки проекта на GitHub

echo "🚀 RepairHub Pro - GitHub Deployment"
echo "===================================="
echo ""

# Проверка git конфига
echo "✅ Проверка git конфигурации..."
git config --get user.name > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Git не сконфигурирован!"
    echo "Выполните:"
    echo "  git config --global user.email 'ваш@email.com'"
    echo "  git config --global user.name 'Ваше имя'"
    exit 1
fi
echo "✅ Git конфигурирован"

# Проверка статуса
echo ""
echo "📊 Статус репозитория:"
git status --short | head -5

# Проверка remote
echo ""
echo "🔗 Проверка remote репозитория..."
git remote -v

if git remote | grep -q origin; then
    echo "✅ Remote 'origin' найден"
    echo ""
    echo "💾 Загружаю изменения на GitHub..."
    git push -u origin main
    if [ $? -eq 0 ]; then
        echo "✅ Успешно загружено на GitHub!"
    else
        echo "❌ Ошибка при загрузке!"
        exit 1
    fi
else
    echo "❌ Remote 'origin' не найден!"
    echo ""
    echo "Добавьте remote репозиторий:"
    echo "  git remote add origin https://github.com/ВАШ_НИКНЕЙМ/repair-hub-pro.git"
    echo "  git push -u origin main"
    exit 1
fi

echo ""
echo "🎉 Готово! Репозиторий загружен на GitHub"
echo "📍 Откройте: https://github.com/ВАШ_НИКНЕЙМ/repair-hub-pro"
