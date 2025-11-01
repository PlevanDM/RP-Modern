# 📤 Інструкції для Push на GitHub

## Метод 1: Використання Personal Access Token (Рекомендується)

### Кроки:
1. Перейти на https://github.com/settings/tokens
2. Натиснути "Generate new token"
3. Вибрати scope: `repo`, `workflow`
4. Скопіювати токен

### Команда для push:
```bash
git push https://YOUR_GITHUB_USERNAME:YOUR_TOKEN@github.com/PlevanDM/RP-Modern.git pdate6
```

## Метод 2: Використання SSH

### Налаштування:
1. Скопіювати SSH ключ:
```bash
cat ~/.ssh/github_key.pub
```

2. Додати на https://github.com/settings/ssh/new
3. Налаштувати SSH конфіг:
```bash
cat >> ~/.ssh/config << 'CONFIG'
Host github.com
  IdentityFile ~/.ssh/github_key
  User git
CONFIG
```

4. Змінити remote URL:
```bash
git remote set-url origin git@github.com:PlevanDM/RP-Modern.git
git push -u origin pdate6
```

## Метод 3: gh CLI (Якщо встановлено)
```bash
gh auth login
gh repo sync PlevanDM/RP-Modern
```

---

**Ваш commit готовий на push:**
- Branch: pdate6
- Commit: 🔒 Security Update...
- Files Changed: 41
