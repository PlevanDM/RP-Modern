# Setup Git and push to GitHub
Write-Host "Перевірка Git репозиторію..." -ForegroundColor Green

# Перевіряємо чи існує .git
if (Test-Path -Path ".\.git") {
    Write-Host "Git репозиторій вже існує" -ForegroundColor Yellow
} else {
    Write-Host "Ініціалізація Git репозиторію..." -ForegroundColor Green
    git init
}

Write-Host "Додаємо всі файли до Git..." -ForegroundColor Green
git add .

Write-Host "Створюємо коміт..." -ForegroundColor Green
git commit -m "Initial commit: Repair Hub Pro Modern Update"

Write-Host "Вкажіть URL вашого GitHub репозиторію:" -ForegroundColor Cyan
$repoUrl = Read-Host

if ($repoUrl) {
    Write-Host "Додаємо віддалений репозиторій..." -ForegroundColor Green
    git remote remove origin 2>$null
    git remote add origin $repoUrl
    
    Write-Host "Відправляємо зміни на GitHub..." -ForegroundColor Green
    git push -u origin main
    if ($LASTEXITCODE -ne 0) {
        git push -u origin master
    }
    
    Write-Host "Готово! Файли відправлено на GitHub" -ForegroundColor Green
} else {
    Write-Host "Скрипт готовий. Для відправки на GitHub виконайте:" -ForegroundColor Yellow
    Write-Host "git remote add origin <URL репозиторію>" -ForegroundColor Cyan
    Write-Host "git push -u origin main" -ForegroundColor Cyan
}

