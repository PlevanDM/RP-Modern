# ⚡ RepairHub Pro - Швидкий старт на Vultr

## 🇺🇦 Українська

### Варіант 1: Автоматичне розгортання (Найпростіше) ⭐

#### Під час створення сервера в Vultr:

1. **Створіть новий сервер в Vultr**
2. **Виберіть:**
   - Ubuntu 22.04 LTS (або новіше)
   - Мінімальні вимоги: Regular Performance ($6/місяць)
   - Регіон близький до вас
3. **У полі "Startup Script" вставте:**

```bash
#!/bin/sh
cd /root
git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git repair-hub-pro
cd repair-hub-pro
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
apt-get install -y docker-compose-plugin
docker compose build
docker compose up -d
ufw allow 3000/tcp
echo "✅ RepairHub Pro запущено! Доступ: http://$(curl -s ifconfig.me):3000"
```

4. **Збережіть та створіть сервер**
5. **Через 5-10 хвилин відкрийте:** `http://YOUR_SERVER_IP:3000`

### Варіант 2: Ручне розгортання

```bash
# 1. Підключіться до сервера
ssh root@YOUR_SERVER_IP

# 2. Запустіть цей скрипт
wget -qO- https://raw.githubusercontent.com/PlevanDM/RP-Modern/eploy/vultr-deploy.sh | bash

# 3. Доступ до додатку
# http://YOUR_SERVER_IP:3000
```

### Варіант 3: Крок за кроком

```bash
# Підключіться до сервера
ssh root@YOUR_SERVER_IP

# Встановіть Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Встановіть Docker Compose
apt-get install -y docker-compose-plugin git

# Клонуйте репозиторій
git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git /root/repair-hub-pro
cd /root/repair-hub-pro

# Запустіть
docker compose up -d

# Налаштуйте файрвол
ufw allow 3000/tcp

# Перевірте статус
docker compose logs -f
```

---

## 🇬🇧 English

### Option 1: Automatic deployment (Easiest) ⭐

#### When creating server in Vultr:

1. **Create a new server in Vultr**
2. **Select:**
   - Ubuntu 22.04 LTS (or newer)
   - Minimum requirements: Regular Performance ($6/month)
   - Region close to you
3. **In the "Startup Script" field, paste:**

```bash
#!/bin/sh
cd /root
git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git repair-hub-pro
cd repair-hub-pro
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
apt-get install -y docker-compose-plugin
docker compose build
docker compose up -d
ufw allow 3000/tcp
echo "✅ RepairHub Pro is running! Access: http://$(curl -s ifconfig.me):3000"
```

4. **Save and create server**
5. **After 5-10 minutes, open:** `http://YOUR_SERVER_IP:3000`

### Option 2: Manual deployment

```bash
# 1. Connect to server
ssh root@YOUR_SERVER_IP

# 2. Run this script
wget -qO- https://raw.githubusercontent.com/PlevanDM/RP-Modern/eploy/vultr-deploy.sh | bash

# 3. Access application
# http://YOUR_SERVER_IP:3000
```

### Option 3: Step by step

```bash
# Connect to server
ssh root@YOUR_SERVER_IP

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Install Docker Compose
apt-get install -y docker-compose-plugin git

# Clone repository
git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git /root/repair-hub-pro
cd /root/repair-hub-pro

# Run
docker compose up -d

# Configure firewall
ufw allow 3000/tcp

# Check status
docker compose logs -f
```

---

## 📝 Корисні команди / Useful Commands

```bash
# Перегляд логів / View logs
docker compose logs -f

# Статус контейнера / Container status
docker compose ps

# Перезапуск / Restart
docker compose restart

# Зупинка / Stop
docker compose down

# Оновлення / Update
cd /root/repair-hub-pro
git pull origin eploy
docker compose build
docker compose up -d
```

---

## 🔐 Тестові аккаунти / Test Accounts

### Клієнт / Client
- **Email:** client@example.com
- **Role:** client

### Майстер / Master
- **Email:** master@example.com
- **Role:** master

### Адміністратор / Admin
- **Email:** admin@example.com
- **Role:** admin

---

## 🆘 Вирішення проблем / Troubleshooting

### Додаток не відкривається / Application won't open

```bash
# Перевірте чи працює контейнер / Check if container is running
docker ps

# Перевірте логи / Check logs
docker compose logs

# Перевірте файрвол / Check firewall
ufw status
```

### Помилка "Permission denied" / "Permission denied" error

```bash
# Додайте користувача до групи docker / Add user to docker group
usermod -aG docker $USER
```

### Контейнер не запускається / Container won't start

```bash
# Перевірте логи / Check logs
docker compose logs repair-hub-pro

# Видаліть та створіть заново / Remove and recreate
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

---

## 📞 Підтримка / Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/PlevanDM/RP-Modern/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/PlevanDM/RP-Modern/discussions)

---

**Made with ❤️ by PlevanDM**

⭐ Якщо подобається, поставте зірочку! / If you like it, give it a star!

