# Cleanup temporary files and test files

Write-Host "🧹 Cleaning up temporary files..." -ForegroundColor Cyan

# Test files
$testFiles = @(
    "jest.config.cjs",
    "test-app.html",
    "test-login.html", 
    "test-site.html",
    "test-domain.ps1",
    "test-server.ps1",
    "test-site.ps1",
    "test-summary.md",
    "test-vultr-api.ps1",
    "vultr-api-test.ps1",
    "test-results"
)

foreach ($file in $testFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Recurse -Force
        Write-Host "  ❌ Deleted: $file" -ForegroundColor Red
    }
}

# Get all temporary files (not tracked in git)
$untracked = git status --porcelain | Where-Object { $_ -like '?? *' }
Write-Host "`n📋 Untracked files:" -ForegroundColor Yellow
$untracked | ForEach-Object { Write-Host "  $_" }

# Clean all untracked files
Write-Host "`n🧹 Cleaning untracked files..." -ForegroundColor Cyan
git clean -fd

Write-Host "`n✅ Cleanup complete!" -ForegroundColor Green
