# 🚀 Правильный деплой RepairHub Pro на Vultr

## 📋 Что мы имеем:

### ✅ **Готовые файлы:**
- `vultr-startup-script.sh` - startup script для Vultr
- `repairhub-pro-production.tar.gz` - готовый архив проекта
- `auto-deploy-server.sh` - скрипт для деплоя на существующем сервере

### 🔑 **Серверные credentials:**
- **IP:** 70.34.252.148
- **Username:** root
- **Password:** {6Aj5ujyYVWYC,-p

---

## 🎯 **Вариант 1: Создание нового сервера с startup script (РЕКОМЕНДУЕТСЯ)**

### **Шаги в Vultr панели:**

1. **Создать новый сервер:**
   - Region: Frankfurt (или Warsaw)
   - Plan: 1 CPU, 1GB RAM (vc2-1c-1gb)
   - OS: Ubuntu 22.04 LTS

2. **В разделе "Startup Script":**
   - Выберите "Custom"
   - Вставьте содержимое `vultr-startup-script.sh`
   - Или создайте новый script с этим содержимым

3. **Дождитесь создания сервера (3-5 минут)**

4. **Проверьте работу:**
   ```bash
   curl http://[NEW_SERVER_IP]
   docker-compose ps
   ```

---

## 🛠️ **Вариант 2: Деплой на существующий сервер**

### **Шаг 1: Подключение к серверу**
```bash
ssh root@70.34.252.148
# Пароль: {6Aj5ujyYVWYC,-p
```

### **Шаг 2: Очистка старых проектов**
```bash
# Остановить все контейнеры
docker stop $(docker ps -aq) 2>/dev/null || echo "Нет активных контейнеров"

# Удалить контейнеры
docker rm $(docker ps -aq) 2>/dev/null || echo "Нет контейнеров"

# Удалить образы
docker rmi $(docker images -q) 2>/dev/null || echo "Нет образов"

# Очистить систему
docker system prune -a --volumes -f
docker network prune -f
```

### **Шаг 3: Загрузка проекта**
```bash
# Создать директорию
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Загрузить архив (используйте scp, WinSCP или wget)
# scp repairhub-pro-production.tar.gz root@70.34.252.148:/tmp/
# Или загрузить через WinSCP в /tmp/

# Распаковать
tar -xzf /tmp/repairhub-pro-production.tar.gz
```

### **Шаг 4: Деплой**
```bash
# Сделать скрипт исполняемым
chmod +x auto-deploy-server.sh

# Запустить деплой
./auto-deploy-server.sh
```

---

## 🌐 **Вариант 3: Через PowerShell скрипт (Windows)**

### **Шаги:**

1. **Откройте PowerShell как администратор**
2. **Запустите скрипт деплоя:**
   ```powershell
   .\start-deployment.ps1
   ```

3. **Или используйте BAT файл:**
   ```cmd
   START-DEPLOYMENT.bat
   ```

---

## 📊 **Проверка работы после деплоя:**

### **На сервере:**
```bash
# Статус контейнеров
docker-compose ps

# Логи приложения
docker-compose logs -f

# Проверка доступности
curl http://localhost:80

# Системные ресурсы
docker stats
top
```

### **Снаружи:**
```bash
# Проверка с вашего ПК
curl http://70.34.252.148
curl http://repairhub.one
```

---

## 🔧 **Управление сервером:**

### **Мониторинг:**
```bash
docker-compose ps          # Статус
docker-compose logs -f     # Логи
docker stats              # Ресурсы
top                       # CPU/Память
df -h                     # Диск
```

### **Управление:**
```bash
docker-compose restart    # Перезапуск
docker-compose up -d      # Запуск
docker-compose down       # Остановка
docker-compose down -v    # Остановка с удалением volumes
```

### **Обновление:**
```bash
# Обновить код
git pull origin server-deploy

# Пересобрать
docker-compose up -d --build --force-recreate
```

---

## 🚨 **Если что-то не работает:**

### **Проблема: SSH не подключается**
```bash
# Проверить статус сервера в Vultr панели
# Подождать 5-10 минут после создания
# Использовать пароль вместо ключа
```

### **Проблема: Приложение не отвечает**
```bash
# Проверить статус
docker-compose ps

# Посмотреть логи
docker-compose logs -f repairhub-pro

# Перезапустить
docker-compose restart repairhub-pro
```

### **Проблема: Ошибки сборки**
```bash
# Очистить и пересоздать
docker-compose down -v
docker system prune -a
docker-compose up -d --build --force-recreate
```

---

## 🎯 **Результат:**

После успешного деплоя у вас будет:
- ✅ **React + TypeScript** приложение
- ✅ **Docker контейнеризация**
- ✅ **Nginx веб-сервер**
- ✅ **Автоматический перезапуск**
- ✅ **Health checks**
- ✅ **Оптимизированные статические файлы**

**🌐 Доступ по адресу:** http://70.34.252.148

---

## 📞 **Следующие шаги:**

1. **Тестирование** - проверьте все функции
2. **Домен** - настройте repairhub.one
3. **SSL** - установите HTTPS сертификат
4. **Мониторинг** - настройте логи и алерты
5. **Бэкапы** - настройте резервное копирование

---

**🎉 Готово к продакшену!**
