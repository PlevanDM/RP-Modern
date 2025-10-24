@echo off
echo 🚀 Запуск RepairHub Pro...
echo.

echo 📦 Установка зависимостей...
call npm install

echo.
echo 🔧 Запуск dev сервера...
call npm run dev

pause
