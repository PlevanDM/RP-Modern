@echo off
chcp 65001 >nul
echo === Завантаження на GitHub ===
echo.
echo Репозиторій: https://github.com/PlevanDM/RP-Modern
echo Гілка: pdate-fix2
echo.

cd /d "%~dp0"
echo Поточна директорія: %CD%
echo.

:: Перевірка git
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Помилка: Git не встановлено!
    pause
    exit /b 1
)

echo [1/5] Ініціалізація Git (якщо потрібно)...
if not exist ".git" (
    git init
    echo Git ініціалізовано
) else (
    echo Git вже ініціалізовано
)
echo.

echo [2/5] Додаємо файли...
git add .
echo Файли додано
echo.

echo [3/5] Створюємо коміт...
git commit -m "Update: Clean deployment files and improve project structure" --quiet 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Коміт створено
) else (
    echo Файли вже закомічені або немає змін
)
echo.

echo [4/5] Додаємо remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/PlevanDM/RP-Modern.git
echo Remote додано
echo.

echo [5/5] Створюємо/переходимо на гілку pdate-fix2...
git checkout -b pdate-fix2 2>nul
if %ERRORLEVEL% NEQ 0 (
    git branch -M pdate-fix2
    git checkout pdate-fix2 2>nul
)
echo.

echo Відправляємо на GitHub...
git push -u origin pdate-fix2 --force
echo.

if %ERRORLEVEL% EQU 0 (
    echo ==================================
    echo Успішно завантажено на GitHub!
    echo.
    echo Відкрийте: https://github.com/PlevanDM/RP-Modern/tree/pdate-fix2
    echo ==================================
) else (
    echo ==================================
    echo Помилка при завантаженні!
    echo.
    echo Можливо, потрібно авторизуватися:
    echo git push -u origin pdate-fix2 --force
    echo ==================================
)

echo.
pause

