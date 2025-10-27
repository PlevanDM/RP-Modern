# 🚀 Завантаження на GitHub - Інструкція

## Що потрібно знати:

Ваш проект знаходиться за адресою:
```
C:\Users\Test\Desktop\LST\RP-Modern-pdate-fix2
```

## 📍 Ви бачите цю помилку?
```
bash: cd: RP-Modern-pdate-fix2: No such file or directory
```

**Причина:** Ви в домашній директорії (`~`), а проект знаходиться в іншій папці.

## ✅ Правильні кроки:

### Варіант 1: Через Git Bash

1. **Перейдіть в правильну директорію:**
```bash
cd /c/Users/Test/Desktop/LST/RP-Modern-pdate-fix2
```

2. **Запустіть скрипт:**
```bash
bash UPLOAD-NOW.sh
```

АБО виконайте команди вручну:
```bash
cd /c/Users/Test/Desktop/LST/RP-Modern-pdate-fix2

git init
git add .
git commit -m "Update: Clean deployment files"
git remote add origin https://github.com/PlevanDM/RP-Modern.git
git checkout -b pdate-fix2
git push -u origin pdate-fix2 --force
```

### Варіант 2: Через PowerShell

1. **Відкрийте PowerShell**
2. **Перейдіть в проект:**
```powershell
cd C:\Users\Test\Desktop\LST\RP-Modern-pdate-fix2
```

3. **Запустіть скрипт:**
```powershell
.\upload-to-github.bat
```

### Варіант 3: Через Windows Explorer

1. Відкрийте папку `C:\Users\Test\Desktop\LST\RP-Modern-pdate-fix2`
2. Подвійний клік на файл `DO-UPLOAD.bat`
3. Чекайте поки завершиться завантаження

---

## 🎯 Репозиторій для завантаження:

**URL:** https://github.com/PlevanDM/RP-Modern  
**Гілка:** `pdate-fix2`

## ✅ Що буде завантажено:

- ✅ Весь код проекту
- ✅ Конфігураційні файли
- ✅ Документацію
- ✅ Скрипти для деплою

**Видалено (не завантажиться):**
- ❌ node_modules (ігнорується .gitignore)
- ❌ Архіви .tar.gz, .zip
- ❌ Тимчасові файли

---

## 🔗 Перевірка результатів:

Після завантаження відкрийте:
https://github.com/PlevanDM/RP-Modern/tree/pdate-fix2

---

## 💡 Швидкі команди (скопіюйте і виконайте):

```bash
# Перейти в проект
cd /c/Users/Test/Desktop/LST/RP-Modern-pdate-fix2

# Запустити скрипт
bash UPLOAD-NOW.sh
```

АБО вручну:
```bash
cd /c/Users/Test/Desktop/LST/RP-Modern-pdate-fix2
git init
git add .
git commit -m "Update"
git remote add origin https://github.com/PlevanDM/RP-Modern.git
git checkout -b pdate-fix2
git push -u origin pdate-fix2 --force
```

---

**Підтримка:** Детальні інструкції в `SETUP-COMPLETE.md`

