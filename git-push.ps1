# PowerShell script для завантаження на GitHub
Write-Host "=== Завантаження на GitHub ===" -ForegroundColor Green
Write-Host ""

# Перейдіть в директорію проекту
Set-Location -Path $PSScriptRoot

Write-Host "Поточна директорія: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Перевірка чи існує git
if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "Git знайдено" -ForegroundColor Green
} else {
    Write-Host "Помилка: Git не встановлено!" -ForegroundColor Red
    exit 1
}

# Ініціалізація репозиторію (якщо потрібно)
if (-not (Test-Path ".\.git")) {
    Write-Host "Ініціалізація Git репозиторію..." -ForegroundColor Yellow
    git init
}

# Додати всі файли
Write-Host "Додаємо файли до git..." -ForegroundColor Yellow
git add .

# Створити коміт
Write-Host "Створюємо коміт..." -ForegroundColor Yellow
git commit -m "Update: Clean deployment files and improve project structure"

# Перевірити чи існує remote origin
$remoteExists = git remote | Select-String "origin" -Quiet

if ($remoteExists) {
    Write-Host "Remote 'origin' вже існує" -ForegroundColor Cyan
} else {
    Write-Host "Додаємо remote 'origin'..." -ForegroundColor Yellow
    git remote add origin https://github.com/PlevanDM/RP-Modern.git
}

# Fetch щоб отримати інформацію про гілки
Write-Host "Отримуємо інформацію про гілки..." -ForegroundColor Yellow
git fetch origin

# Перевіряємо чи існує гілка pdate-fix2
$branchExists = git ls-remote --heads origin pdate-fix2 | Select-String "pdate-fix2" -Quiet

if ($branchExists) {
    Write-Host "Гілка 'pdate-fix2' вже існує на GitHub" -ForegroundColor Cyan
    # Перемикаємося на гілку локально (якщо потрібно)
    git checkout -b pdate-fix2 2>$null
    git branch -M pdate-fix2
} else {
    Write-Host "Створюємо нову гілку 'pdate-fix2'..." -ForegroundColor Yellow
    git checkout -b pdate-fix2
}

# Push до GitHub
Write-Host ""
Write-Host "Відправляємо зміни на GitHub..." -ForegroundColor Green
Write-Host "URL: https://github.com/PlevanDM/RP-Modern.git" -ForegroundColor Cyan
Write-Host "Гілка: pdate-fix2" -ForegroundColor Cyan
Write-Host ""

# Спробувати push
$pushResult = git push -u origin pdate-fix2 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Успішно завантажено на GitHub!" -ForegroundColor Green
    Write-Host "Відкрийте: https://github.com/PlevanDM/RP-Modern/tree/pdate-fix2" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Помилка при завантаженні" -ForegroundColor Red
    Write-Host "Вихід: $pushResult" -ForegroundColor Yellow
    
    Write-Host ""
    Write-Host "Можливо, потрібно ввести credentials GitHub:" -ForegroundColor Yellow
    Write-Host "git push -u origin pdate-fix2" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Для завершення натисніть Enter..."
Read-Host

