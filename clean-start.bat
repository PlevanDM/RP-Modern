@echo off
echo 🚀 RepairHub Pro - Чистый запуск
echo ================================
echo.

echo 🔄 Остановка всех процессов...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM npm.exe >nul 2>&1

echo 🧹 Очистка кэша...
npm cache clean --force >nul 2>&1

echo 📦 Установка зависимостей...
npm install

echo.
echo 🎯 Запуск dev сервера...
echo Откроется на http://localhost:3001 или другом свободном порту
echo.
echo 🧪 Для тестирования:
echo 1. Откройте F12 (Developer Tools)
echo 2. В консоли выполните: testAllServices()
echo 3. Проверьте localStorage: Object.keys(localStorage)
echo.

npm run dev

pause
