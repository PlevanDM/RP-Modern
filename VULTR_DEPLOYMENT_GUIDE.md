# Инструкции по развертыванию RepairHub Pro на Vultr

## Подготовка сервера Vultr

### 1. Создание сервера
1. Зайдите на [vultr.com](https://vultr.com)
2. Создайте новый сервер:
   - **OS**: Ubuntu 22.04 LTS
   - **Plan**: Минимум 1GB RAM, 1 CPU (рекомендуется 2GB RAM)
   - **Location**: Выберите ближайший к вашим пользователям
   - **SSH Key**: Добавьте ваш SSH ключ

### 2. Подключение к серверу
```bash
ssh root@YOUR_SERVER_IP
```

### 3. Автоматическое развертывание
```bash
# Скачайте скрипт развертывания
wget https://raw.githubusercontent.com/your-username/repair-hub-pro/main/vultr-deploy.sh

# Сделайте его исполняемым
chmod +x vultr-deploy.sh

# Запустите развертывание
./vultr-deploy.sh
```

### 4. Ручное развертывание (альтернатива)

#### Обновление системы
```bash
apt update && apt upgrade -y
```

#### Установка Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker $USER
rm get-docker.sh
```

#### Установка Docker Compose
```bash
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### Установка Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

#### Клонирование проекта
```bash
git clone https://github.com/your-username/repair-hub-pro.git
cd repair-hub-pro
```

#### Сборка и запуск
```bash
npm install
npm run build
docker-compose build
docker-compose up -d
```

#### Настройка Nginx
```bash
apt install -y nginx
```

Создайте файл `/etc/nginx/sites-available/repair-hub-pro`:
```nginx
server {
    listen 80;
    server_name _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте сайт:
```bash
ln -sf /etc/nginx/sites-available/repair-hub-pro /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

#### Настройка firewall
```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 3000
ufw --force enable
```

## Проверка развертывания

### Проверка статуса контейнера
```bash
docker-compose ps
```

### Просмотр логов
```bash
docker-compose logs -f
```

### Проверка доступности
- HTTP: `http://YOUR_SERVER_IP`
- Прямой доступ: `http://YOUR_SERVER_IP:3000`

## Обновление приложения

### Автоматическое обновление
```bash
cd repair-hub-pro
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

### Ручное обновление
```bash
# Остановить контейнеры
docker-compose down

# Обновить код
git pull origin main

# Пересобрать образ
docker-compose build --no-cache

# Запустить заново
docker-compose up -d
```

## Мониторинг и обслуживание

### Просмотр использования ресурсов
```bash
docker stats
```

### Очистка неиспользуемых образов
```bash
docker system prune -a
```

### Резервное копирование
```bash
# Создать архив проекта
tar -czf repair-hub-pro-backup-$(date +%Y%m%d).tar.gz repair-hub-pro/
```

## Настройка домена (опционально)

### 1. Настройка DNS
- Добавьте A-запись для вашего домена, указывающую на IP сервера Vultr

### 2. Обновление конфигурации Nginx
```bash
nano /etc/nginx/sites-available/repair-hub-pro
```

Замените `server_name _;` на `server_name yourdomain.com;`

### 3. Установка SSL сертификата (Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

## Устранение неполадок

### Контейнер не запускается
```bash
docker-compose logs repair-hub-pro
```

### Проблемы с портами
```bash
netstat -tulpn | grep :3000
```

### Проблемы с правами доступа
```bash
chown -R $USER:$USER repair-hub-pro/
```

### Перезапуск всех сервисов
```bash
systemctl restart nginx
docker-compose restart
```

## Контакты и поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs -f`
2. Проверьте статус контейнеров: `docker-compose ps`
3. Проверьте использование ресурсов: `docker stats`
4. Обратитесь к документации проекта

---

**Примечание**: Замените `your-username` на ваш реальный GitHub username в командах git clone.
