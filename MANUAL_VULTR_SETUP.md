# Инструкции по созданию сервера на Vultr вручную

## 🌐 Создание сервера через веб-интерфейс Vultr

### 1. Вход в панель управления
- Перейдите на [vultr.com](https://vultr.com)
- Войдите в свою учетную запись
- Нажмите "Deploy New Server"

### 2. Выбор конфигурации сервера

#### Сервер:
- **Server Type**: Cloud Compute
- **CPU & Storage Technology**: Regular Performance

#### Операционная система:
- **Operating System**: Ubuntu
- **Version**: Ubuntu 22.04 LTS x64

#### План сервера:
- **Server Size**: 
  - Минимум: 1 vCPU, 1GB RAM, 25GB SSD ($6/месяц)
  - Рекомендуется: 1 vCPU, 2GB RAM, 55GB SSD ($12/месяц)
  - Для продакшена: 2 vCPU, 4GB RAM, 80GB SSD ($24/месяц)

#### Регион:
- Выберите ближайший к вашим пользователям регион
- Рекомендуемые: Amsterdam (AMS), Frankfurt (FRA), London (LHR)

### 3. Дополнительные настройки

#### SSH Keys:
- Добавьте ваш SSH ключ для безопасного доступа
- Если нет SSH ключа, создайте его:
  ```bash
  ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  cat ~/.ssh/id_rsa.pub
  ```

#### Server Details:
- **Server Hostname**: repair-hub-pro
- **Server Label**: RepairHub Pro Production
- **Enable IPv6**: Да (рекомендуется)
- **Enable Private Networking**: Нет (для простоты)

#### Startup Script (опционально):
```bash
#!/bin/bash
# Автоматическая установка Docker и зависимостей
apt update && apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
apt install -y git nginx
```

### 4. Создание сервера
- Нажмите "Deploy Now"
- Дождитесь создания сервера (обычно 2-5 минут)
- Запишите IP адрес сервера

### 5. Подключение к серверу
```bash
ssh root@YOUR_SERVER_IP
```

### 6. Быстрое развертывание приложения
После подключения к серверу выполните:

```bash
# Скачать и запустить скрипт развертывания
wget -O vultr-deploy.sh https://raw.githubusercontent.com/PlevanDM/RP-Modern/24.10v3/vultr-deploy.sh
chmod +x vultr-deploy.sh
./vultr-deploy.sh
```

### 7. Альтернативное развертывание вручную

Если автоматический скрипт не работает:

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
echo "🌐 Доступно по адресу: http://$(curl -s ifconfig.me)"
```

### 8. Проверка развертывания

```bash
# Проверка статуса контейнеров
docker-compose ps

# Просмотр логов
docker-compose logs -f

# Проверка доступности
curl -I http://localhost:3000
curl -I http://localhost
```

### 9. Настройка домена (опционально)

Если у вас есть домен:

1. **DNS настройки**: Добавьте A-запись, указывающую на IP сервера
2. **SSL сертификат**:
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d yourdomain.com
   ```

### 10. Мониторинг и обслуживание

```bash
# Просмотр использования ресурсов
docker stats

# Обновление приложения
cd RP-Modern
git pull origin 24.10v3
docker-compose build --no-cache
docker-compose up -d

# Очистка неиспользуемых образов
docker system prune -a
```

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs -f`
2. Проверьте статус: `docker-compose ps`
3. Проверьте ресурсы: `docker stats`
4. Проверьте сеть: `netstat -tulpn | grep :3000`

**Успешного развертывания!** 🚀
