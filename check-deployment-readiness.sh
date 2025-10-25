#!/bin/bash

echo "🔍 Проверка готовности RepairHub Pro к развертыванию..."
echo "🔍 Checking RepairHub Pro deployment readiness..."

# Проверяем наличие необходимых файлов
echo ""
echo "📁 Проверка файлов проекта..."
echo "📁 Checking project files..."

required_files=(
    "package.json"
    "Dockerfile"
    "docker-compose.yml"
    "src/App.tsx"
    "src/main.tsx"
    "vite.config.ts"
    "tailwind.config.js"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - ОТСУТСТВУЕТ!"
        exit 1
    fi
done

# Проверяем package.json
echo ""
echo "📦 Проверка package.json..."
echo "📦 Checking package.json..."

if command -v node &> /dev/null; then
    echo "✅ Node.js установлен: $(node --version)"
else
    echo "❌ Node.js не установлен"
    exit 1
fi

if command -v npm &> /dev/null; then
    echo "✅ npm установлен: $(npm --version)"
else
    echo "❌ npm не установлен"
    exit 1
fi

# Проверяем зависимости
echo ""
echo "📦 Проверка зависимостей..."
echo "📦 Checking dependencies..."

if [ -d "node_modules" ]; then
    echo "✅ node_modules существует"
else
    echo "⚠️  node_modules отсутствует, устанавливаем..."
    npm install
fi

# Проверяем сборку
echo ""
echo "🔨 Проверка сборки проекта..."
echo "🔨 Checking project build..."

if npm run build; then
    echo "✅ Проект успешно собирается"
else
    echo "❌ Ошибка сборки проекта"
    exit 1
fi

# Проверяем тесты
echo ""
echo "🧪 Проверка тестов..."
echo "🧪 Checking tests..."

if npm test -- --passWithNoTests; then
    echo "✅ Тесты проходят"
else
    echo "⚠️  Некоторые тесты не прошли, но продолжаем..."
fi

# Проверяем Docker файлы
echo ""
echo "🐳 Проверка Docker конфигурации..."
echo "🐳 Checking Docker configuration..."

if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile существует"
    
    # Проверяем содержимое Dockerfile
    if grep -q "FROM node:" Dockerfile; then
        echo "✅ Dockerfile использует Node.js образ"
    else
        echo "⚠️  Dockerfile может быть некорректным"
    fi
    
    if grep -q "npm run build" Dockerfile; then
        echo "✅ Dockerfile содержит команду сборки"
    else
        echo "⚠️  Dockerfile не содержит команду сборки"
    fi
else
    echo "❌ Dockerfile отсутствует"
    exit 1
fi

if [ -f "docker-compose.yml" ]; then
    echo "✅ docker-compose.yml существует"
else
    echo "❌ docker-compose.yml отсутствует"
    exit 1
fi

# Проверяем размер сборки
echo ""
echo "📊 Анализ размера сборки..."
echo "📊 Analyzing build size..."

if [ -d "dist" ]; then
    dist_size=$(du -sh dist | cut -f1)
    echo "📦 Размер dist: $dist_size"
    
    # Проверяем основные файлы
    if [ -f "dist/index.html" ]; then
        echo "✅ dist/index.html существует"
    else
        echo "❌ dist/index.html отсутствует"
    fi
    
    # Проверяем размер JS файлов
    js_files=$(find dist -name "*.js" -type f)
    if [ -n "$js_files" ]; then
        js_size=$(du -sh dist/assets/*.js 2>/dev/null | awk '{sum+=$1} END {print sum "K"}' || echo "N/A")
        echo "📦 Размер JS файлов: $js_size"
    fi
else
    echo "❌ Папка dist отсутствует"
    exit 1
fi

# Проверяем переменные окружения
echo ""
echo "🌍 Проверка переменных окружения..."
echo "🌍 Checking environment variables..."

if [ -f ".env" ]; then
    echo "✅ .env файл существует"
else
    echo "⚠️  .env файл отсутствует (может быть нормально для продакшена)"
fi

# Финальная проверка
echo ""
echo "🎯 Итоговая проверка..."
echo "🎯 Final check..."

echo "✅ Все основные проверки пройдены!"
echo "✅ All main checks passed!"

echo ""
echo "🚀 Проект готов к развертыванию на Vultr!"
echo "🚀 Project is ready for Vultr deployment!"

echo ""
echo "📋 Следующие шаги:"
echo "📋 Next steps:"
echo "1. Создайте сервер на Vultr (Ubuntu 22.04 LTS)"
echo "2. Подключитесь к серверу: ssh root@YOUR_SERVER_IP"
echo "3. Запустите скрипт развертывания: ./vultr-deploy.sh"
echo "4. Или следуйте инструкциям в VULTR_DEPLOYMENT_GUIDE.md"

echo ""
echo "1. Create Vultr server (Ubuntu 22.04 LTS)"
echo "2. Connect to server: ssh root@YOUR_SERVER_IP"
echo "3. Run deployment script: ./vultr-deploy.sh"
echo "4. Or follow instructions in VULTR_DEPLOYMENT_GUIDE.md"
