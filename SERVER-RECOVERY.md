# 🚨 Восстановление сервера после перезагрузки

## 📋 Ситуация:
SSH подключение зависает - сервер только что перезагружен/создан и проходит инициализацию.

## 🔧 Решение:

### **Способ 1: Дождаться полной загрузки**
```bash
# Подождать 5-10 минут после перезагрузки
# Затем попробовать подключиться
ssh root@70.34.252.148
```

### **Способ 2: Использовать скрипт деплоя**
```bash
# 1. Подключитесь к серверу через noVNC (веб-консоль в Vultr)
# 2. Выполните команды:

# Обновить систему
apt update && apt upgrade -y

# Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установить Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Запустить деплой
chmod +x server-check-and-deploy.sh
./server-check-and-deploy.sh
```

### **Способ 3: Через Vultr панель**
1. **Перейдите в Vultr панель:** https://my.vultr.com/subs/vps/novnc/?id=c27acc98-d903-4c2e-b50c-2e1ca23451b0
2. **Откройте веб-консоль** (noVNC)
3. **Выполните команды:**
   ```bash
   # Очистка и подготовка
   apt update
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh

   # Создание проекта
   mkdir -p /opt/repairhub-pro
   cd /opt/repairhub-pro

   # Копировать содержимое vultr-startup-simple.sh
   # Запустить скрипт
   chmod +x script.sh
   ./script.sh
   ```

---

## 🌐 **Проверка после деплоя:**

### **На сервере:**
```bash
docker-compose ps          # Статус контейнеров
docker-compose logs -f     # Логи
curl http://localhost:80   # Проверка доступности
```

### **Снаружи:**
```bash
curl http://70.34.252.148  # Проверка с интернета
```

---

## 🔍 **Если SSH всё ещё не работает:**

### **Проверьте в Vultr панели:**
1. **Server Status** - должен быть "Running"
2. **Console** - откройте и проверьте загрузку
3. **Firewall** - убедитесь что порт 22 открыт
4. **Network** - проверьте IP адрес

### **Восстановление через Console:**
```bash
# В веб-консоли Vultr выполните:
systemctl status ssh
systemctl restart ssh
netstat -tlnp | grep :22

# Если SSH не запускается:
apt install openssh-server
systemctl enable ssh
systemctl start ssh
```

---

## 📊 **Статус сервера:**

Из логов видно что сервер:
- ✅ Проводит инициализацию (cloud-init)
- ✅ Генерирует SSH ключи
- ✅ Проходит системные проверки

**⏳ Ожидайте 5-10 минут полной загрузки системы**

---

## 🚀 **После успешного подключения:**

```bash
# 1. Проверить систему
docker --version
docker-compose --version

# 2. Запустить деплой
cd /opt/repairhub-pro
chmod +x server-check-and-deploy.sh
./server-check-and-deploy.sh

# 3. Проверить работу
curl http://localhost:80
docker-compose ps
```

---

## 🎯 **Результат:**
После деплоя приложение будет доступно по:
- **http://70.34.252.148**
- **http://repairhub.one** (если домен настроен)

**🔧 Если проблемы продолжаются - используйте веб-консоль Vultr для диагностики!**
