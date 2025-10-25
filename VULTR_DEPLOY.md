# Деплой RepairHub Pro на Vultr

## 📋 Инструкция

### 1. Подключение к серверу

```bash
ssh root@64.176.72.139
```

Пароль: введите пароль от вашего аккаунта Vultr

### 2. Запуск автоматического деплоя

Выполните одну из команд:

**Вариант 1 - С GitHub:**
```bash
bash <(curl -sSL https://raw.githubusercontent.com/PlevanDM/RP-Modern/24.10v3/deploy-vultr.sh)
```

**Вариант 2 - Прямая команда:**
```bash
curl -sSL https://raw.githubusercontent.com/PlevanDM/RP-Modern/24.10v3/deploy-vultr.sh | bash
```

**Вариант 3 - Через git clone:**
```bash
cd /root
git clone -b 24.10v3 https://github.com/PlevanDM/RP-Modern.git temp-deploy
cd temp-deploy
bash deploy-vultr.sh
```

### 3. Ожидание завершения

Скрипт выполнит:
- ✅ Обновление системы
- ✅ Установку Node.js 20.x
- ✅ Установку PM2
- ✅ Клонирование репозитория
- ✅ Установку зависимостей
- ✅ Сборку проекта
- ✅ Настройку и запуск через PM2
- ✅ Настройку файрвола

### 4. Доступ к приложению

После успешного деплоя приложение будет доступно по адресу:

**http://64.176.72.139:3000**

---

## 📝 Управление приложением

### Просмотр логов
```bash
pm2 logs repairhub
```

### Перезапуск
```bash
pm2 restart repairhub
```

### Остановка
```bash
pm2 stop repairhub
```

### Статус
```bash
pm2 status
```

---

## 🔄 Обновление приложения

Для обновления выполните:

```bash
cd /root/repairhub
git pull origin 24.10v3
npm install
npm run build
pm2 restart repairhub
```

---

## 🐛 Troubleshooting

### Порт 3000 недоступен
```bash
# Проверка файрвола
ufw status

# Открытие порта
ufw allow 3000/tcp

# Проверка что приложение запущено
pm2 status
```

### Приложение не запускается
```bash
# Просмотр логов ошибок
pm2 logs repairhub --err

# Проверка сборки
ls -la /root/repairhub/dist/
```

### Полный перезапуск
```bash
cd /root/repairhub
pm2 delete repairhub
pm2 start npm --name "repairhub" -- start -- --host 0.0.0.0 --port 3000
pm2 save
```

---

## 📞 Поддержка

При возникновении проблем проверьте:
1. Логи PM2: `pm2 logs repairhub`
2. Статус приложения: `pm2 status`
3. Доступность порта: `netstat -tulpn | grep 3000`
4. Версию Node.js: `node --version`
