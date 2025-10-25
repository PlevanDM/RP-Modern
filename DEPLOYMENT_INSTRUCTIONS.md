# Инструкции по развертыванию RepairHub Pro на Vultr

## Информация о сервере:
- IP: 45.32.158.217
- Пароль: pH[7)MPXFXAajxvM
- Статус: Активен и работает

## Инструкции для развертывания:

### 1. Подключение к серверу:
```bash
ssh root@45.32.158.217
# Пароль: pH[7)MPXFXAajxvM
```

### 2. Выполнение команд установки:
Скопируйте и выполните команды из файла vultr-install-commands.txt:

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка пакетов
apt install -y curl wget git nginx ufw

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Установка Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Клонирование проекта
git clone https://github.com/PlevanDM/RP-Modern.git
cd RP-Modern
git checkout 24.10v3

# Сборка и запуск
docker-compose build
docker-compose up -d

# Настройка Nginx
cat > /etc/nginx/sites-available/repair-hub-pro << 'EOF'
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
EOF

# Активация сайта
ln -sf /etc/nginx/sites-available/repair-hub-pro /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Настройка firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 3000
ufw --force enable

# Проверка статуса
docker-compose ps
```

### 3. Проверка работы:
После завершения установки приложение будет доступно по адресам:
- HTTP: http://45.32.158.217:3000
- Nginx: http://45.32.158.217

### 4. Полезные команды:
```bash
# Просмотр логов
docker-compose logs -f

# Статус контейнеров
docker-compose ps

# Перезапуск
docker-compose restart

# Обновление
git pull && docker-compose build --no-cache && docker-compose up -d
```

## Готово к развертыванию!
