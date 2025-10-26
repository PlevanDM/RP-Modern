# 🚀 RepairHub Pro - Деплой на Vultr

## Українська

### Що це за скрипт?

Цей набір скриптів автоматизує розгортання RepairHub Pro на серверах Vultr.

### Використання

#### Варіант 1: Повне автоматичне розгортання (Рекомендовано)

1. **Створіть сервер на Vultr:**
   - Виберіть Ubuntu 22.04 або новіше
   - Виберіть тип сервера (Regular $6/місяць або більше)
   - У полі "Startup Script" вставте скрипт з `vultr-deploy.sh`

2. **Або після створення сервера:**
   ```bash
   # Завантажте скрипт на сервер
   scp vultr-deploy.sh root@YOUR_SERVER_IP:/root/
   
   # Підключіться до сервера
   ssh root@YOUR_SERVER_IP
   
   # Зробіть скрипт виконуваним
   chmod +x vultr-deploy.sh
   
   # Запустіть скрипт
   ./vultr-deploy.sh
   ```

#### Варіант 2: Крок за кроком

```bash
# 1. Оновлення системи
sudo apt update && sudo apt upgrade -y

# 2. Встановлення Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. Встановлення Docker Compose
sudo apt install -y docker-compose-plugin

# 4. Встановлення Git
sudo apt install -y git

# 5. Клонування репозиторію
cd /root
git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git repair-hub-pro

# 6. Запуск проекту
cd repair-hub-pro
docker compose build
docker compose up -d

# 7. Перевірка статусу
docker compose ps
docker compose logs -f
```

### Доступ до додатку

Після успішного розгортання додаток буде доступний за адресою:
```
http://YOUR_SERVER_IP:3000
```

### Корисні команди

```bash
# Перегляд логів
docker compose logs -f

# Зупинка контейнера
docker compose down

# Перезапуск контейнера
docker compose restart

# Видалення контейнера та об'ємів
docker compose down -v

# Оновлення до нової версії
cd /root/repair-hub-pro
git pull origin eploy
docker compose build
docker compose up -d
```

### Налаштування SSH

Для безпечного підключення до сервера налаштуйте SSH ключі:

1. **На вашому локальному комп'ютері:**
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   cat ~/.ssh/id_rsa.pub
   ```

2. **Скопіюйте виведений ключ та використайте `setup-ssh.sh`**

3. **Або вставте в Vultr Startup Script:**
   ```bash
   #!/bin/sh
   mkdir -p /root/.ssh
   chmod 700 /root/.ssh
   echo "YOUR_SSH_PUBLIC_KEY" > /root/.ssh/authorized_keys
   chmod 600 /root/.ssh/authorized_keys
   ```

### Налаштування файрволу

```bash
# Дозволити доступ до порту 3000
sudo ufw allow 3000/tcp

# Або відключити файрвол повністю (не рекомендовано)
sudo ufw disable
```

---

## English

### What is this script?

This set of scripts automates the deployment of RepairHub Pro on Vultr servers.

### Usage

#### Option 1: Full automatic deployment (Recommended)

1. **Create a server on Vultr:**
   - Select Ubuntu 22.04 or newer
   - Choose server type (Regular $6/month or more)
   - In the "Startup Script" field, paste the script from `vultr-deploy.sh`

2. **Or after creating the server:**
   ```bash
   # Upload script to server
   scp vultr-deploy.sh root@YOUR_SERVER_IP:/root/
   
   # Connect to server
   ssh root@YOUR_SERVER_IP
   
   # Make script executable
   chmod +x vultr-deploy.sh
   
   # Run script
   ./vultr-deploy.sh
   ```

#### Option 2: Step by step

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. Install Docker Compose
sudo apt install -y docker-compose-plugin

# 4. Install Git
sudo apt install -y git

# 5. Clone repository
cd /root
git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git repair-hub-pro

# 6. Run project
cd repair-hub-pro
docker compose build
docker compose up -d

# 7. Check status
docker compose ps
docker compose logs -f
```

### Application Access

After successful deployment, the application will be available at:
```
http://YOUR_SERVER_IP:3000
```

### Useful Commands

```bash
# View logs
docker compose logs -f

# Stop container
docker compose down

# Restart container
docker compose restart

# Remove container and volumes
docker compose down -v

# Update to new version
cd /root/repair-hub-pro
git pull origin eploy
docker compose build
docker compose up -d
```

### SSH Setup

To securely connect to the server, set up SSH keys:

1. **On your local computer:**
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   cat ~/.ssh/id_rsa.pub
   ```

2. **Copy the displayed key and use `setup-ssh.sh`**

3. **Or paste into Vultr Startup Script:**
   ```bash
   #!/bin/sh
   mkdir -p /root/.ssh
   chmod 700 /root/.ssh
   echo "YOUR_SSH_PUBLIC_KEY" > /root/.ssh/authorized_keys
   chmod 600 /root/.ssh/authorized_keys
   ```

### Firewall Configuration

```bash
# Allow access to port 3000
sudo ufw allow 3000/tcp

# Or completely disable firewall (not recommended)
sudo ufw disable
```

---

## Скрипти / Scripts

- **`vultr-deploy.sh`** - Основной скрипт розгортання / Main deployment script
- **`setup-ssh.sh`** - Налаштування SSH / SSH setup
- **`VULTR-DEPLOYMENT.md`** - Ця інструкція / This instruction

## Підтримка / Support

Якщо виникли проблеми:
If you encounter problems:

- Перевірте логи: `docker compose logs -f`
- Check logs: `docker compose logs -f`
- Перевірте статус контейнера: `docker compose ps`
- Check container status: `docker compose ps`

---

**Made with ❤️ by PlevanDM**

