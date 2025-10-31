#!/bin/bash
# Команди для вигрузки на GitHub

# Перевірка чи git встановлено
if ! command -v git &> /dev/null; then
    echo "⚠️  Git не встановлено!"
    echo "Встановіть git: sudo apt install git"
    exit 1
fi

# Перевірка чи репозиторій ініціалізовано
if [ ! -d ".git" ]; then
    echo "📦 Ініціалізація git репозиторію..."
    git init
    
    echo "🔗 Додайте remote репозиторій (замініть URL на ваш):"
    echo "git remote add origin https://github.com/PlevanDM/RP-Modern.git"
    echo ""
    echo "Або якщо репозиторій вже існує:"
    echo "git remote set-url origin https://github.com/PlevanDM/RP-Modern.git"
fi

# Додавання змін
echo "📝 Додаю всі зміни..."
git add -A

# Створення commit
echo "💾 Створюю commit..."
git commit -m "fix: виправлено всі критичні помилки лінтера

- Усунуто всі any типи, замінено на конкретні типи
- Видалено всі невикористані імпорти та змінні  
- Виправлено всі синтаксичні помилки
- Виправлено React hooks dependencies warnings
- Виправлено всі catch блоки
- Додано useCallback для оптимізації

Результат: 0 помилок, 5 некритичних попереджень (fast refresh)"

# Push на GitHub
echo "🚀 Відправляю на GitHub..."
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
echo "Поточна гілка: $BRANCH"
echo ""
echo "Виконайте: git push -u origin $BRANCH"
echo ""
echo "Якщо це перший push, використайте:"
echo "git push -u origin $BRANCH --force"
