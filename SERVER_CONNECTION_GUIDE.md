# Инструкции по подключению к серверу Vultr

## 🖥️ Информация о сервере:
- **ID**: 1eb0e38a-6438-4a0e-b740-f5ea549db44f
- **IP**: 45.32.158.217
- **Пароль**: pH[7)MPXFXAajxvM
- **Статус**: Активен и работает
- **Регион**: Frankfurt (fra)

## 🔗 Способы подключения:

### 1. Веб-консоль Vultr (рекомендуется)
1. Войдите в панель управления Vultr: https://my.vultr.com
2. Найдите сервер "repair-hub-pro"
3. Нажмите на иконку консоли (терминал)
4. Войдите с паролем: `pH[7)MPXFXAajxvM`

### 2. SSH подключение (когда будет готово)
```bash
ssh root@45.32.158.217
# Пароль: pH[7)MPXFXAajxvM
```

### 3. Команды для развертывания приложения

После подключения к серверу выполните:

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker $USER

# Установка Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Установка дополнительных пакетов
apt install -y git nginx ufw

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

echo "✅ Приложение развернуто!"
echo "🌐 Доступно по адресу: http://45.32.158.217"
```

### 4. Проверка развертывания

```bash
# Проверка статуса контейнеров
docker-compose ps

# Просмотр логов
docker-compose logs -f

# Проверка доступности
curl -I http://localhost:3000
curl -I http://localhost
```

### 5. Автоматический скрипт развертывания

Альтернативно, можно использовать готовый скрипт:

```bash
# Скачать и запустить скрипт развертывания
wget -O vultr-deploy.sh https://raw.githubusercontent.com/PlevanDM/RP-Modern/24.10v3/vultr-deploy.sh
chmod +x vultr-deploy.sh
./vultr-deploy.sh
```

## 🌐 После развертывания приложение будет доступно:
- **HTTP**: http://45.32.158.217:3000
- **Через Nginx**: http://45.32.158.217

## 📋 Полезные команды для управления:

```bash
# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Обновление
git pull && docker-compose build --no-cache && docker-compose up -d
```

## ⚠️ Важные замечания:

1. **Безопасность**: После первого входа смените пароль root
2. **SSH ключи**: Настройте SSH ключи для безопасного доступа
3. **Firewall**: Убедитесь, что порты 22, 80, 443 открыты
4. **Мониторинг**: Регулярно проверяйте статус сервера и приложения

---

**Сервер готов к развертыванию!** 🚀
