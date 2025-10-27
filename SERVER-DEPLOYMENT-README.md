# 🚀 Чистый деплой RepairHub Pro на сервер

## 📋 Подготовлено для вас:

✅ **Очистка Docker** - скрипт для удаления всех старых контейнеров и образов
✅ **Новый деплой** - полная настройка проекта с нуля
✅ **Архив проекта** - готовый к загрузке
✅ **Автоматическая настройка** - Docker + Nginx + все зависимости

---

## 🔑 Доступ к серверу:

**IP:** 70.34.252.148
**Username:** root
**Password:** {6Aj5ujyYVWYC,-p

---

## 🧹 ШАГ 1: Очистка старых Docker проектов

Подключитесь к серверу и выполните очистку:

```bash
# Подключение к серверу
ssh root@70.34.252.148

# Выполнение очистки
chmod +x server-cleanup.sh
./server-cleanup.sh
```

### Что делает скрипт очистки:
- ⏹️ Останавливает все контейнеры
- 🗑️ Удаляет все контейнеры
- 🖼️ Удаляет все Docker образы
- 🧽 Очищает Docker систему (volumes, networks)
- 📊 Показывает текущее состояние

---

## 📤 ШАГ 2: Загрузка проекта на сервер

### Вариант A: Через SCP (с вашего компьютера)
```bash
# Загрузка архива проекта
scp repairhub-pro-server.tar.gz root@70.34.252.148:/tmp/

# Или загрузка через WinSCP/FTP в /tmp/
```

### Вариант B: Через curl/wget (если есть внешний доступ)
```bash
# Скачать архив проекта
wget https://your-domain.com/repairhub-pro-server.tar.gz -O /tmp/repairhub-pro-server.tar.gz
```

---

## 🚀 ШАГ 3: Деплой проекта

```bash
# Распаковка проекта
cd /opt
tar -xzf /tmp/repairhub-pro-server.tar.gz
cd repairhub-pro

# Запуск деплоя
chmod +x deploy-to-server.sh
./deploy-to-server.sh
```

### Что делает скрипт деплоя:
- 🔄 Обновляет систему
- 🐳 Устанавливает Docker и Docker Compose
- 📁 Создает структуру проекта
- 🏗️ Собирает и запускает приложение
- 🌐 Настраивает Nginx с оптимизациями

---

## 🌐 ШАГ 4: Проверка работы

После деплоя проверьте:

```bash
# Статус контейнеров
docker-compose ps

# Логи приложения
docker-compose logs -f

# Тестирование доступности
curl http://localhost:80
```

**Приложение будет доступно по:**
- 🌐 http://70.34.252.148
- 🌐 http://repairhub.one (если настроен домен)

---

## 🛠️ Управление после деплоя

### Проверка состояния:
```bash
docker-compose ps          # Статус контейнеров
docker-compose logs -f     # Просмотр логов
docker stats               # Использование ресурсов
```

### Перезапуск:
```bash
docker-compose restart     # Перезапуск приложения
docker-compose down        # Остановка
docker-compose up -d       # Запуск в фоне
```

### Обновление:
```bash
# Обновление кода и пересборка
docker-compose up -d --build --force-recreate
```

---

## 🔍 Возможные проблемы и решения:

### Приложение не отвечает:
```bash
# Проверить логи
docker-compose logs -f repairhub-pro

# Перезапустить
docker-compose restart repairhub-pro

# Проверить ресурсы
docker stats
```

### Ошибки сборки:
```bash
# Проверить Docker
systemctl status docker

# Пересоздать контейнер
docker-compose up -d --build --force-recreate

# Очистить и начать заново
docker-compose down -v
docker system prune -a
./deploy-to-server.sh
```

### SSH проблемы:
```bash
# Проверить подключение
ssh -v root@70.34.252.148

# Если ключ не работает - использовать пароль
ssh root@70.34.252.148
# Пароль: {6Aj5ujyYVWYC,-p
```

---

## 📊 Мониторинг и логи:

### Системные логи:
```bash
# Docker логи
journalctl -u docker.service -f

# Системные логи
tail -f /var/log/syslog

# Nginx логи (после деплоя)
docker-compose logs -f repairhub-pro
```

### Проверка производительности:
```bash
# CPU и память
top

# Дисковое пространство
df -h

# Docker ресурсы
docker stats
```

---

## ✨ Что установлено:

### 🐳 Docker & Docker Compose
- Полная изоляция приложения
- Автоматический перезапуск
- Health checks каждые 30 секунд

### 🌐 Nginx конфигурация
- Gzip сжатие
- Кеширование статических файлов
- Заголовки безопасности
- SPA routing

### ⚛️ React приложение
- TypeScript + Vite
- Tailwind CSS
- Zustand для state management
- Полная PWA поддержка

---

## 🎯 Следующие шаги:

1. **Тестирование** - проверьте все функции приложения
2. **Домен** - настройте repairhub.one на IP 70.34.252.148
3. **SSL** - установите Let's Encrypt сертификат
4. **Мониторинг** - настройте логи и алерты
5. **Бэкапы** - настройте резервное копирование

---

**🎉 Ваш RepairHub Pro готов к работе!**

Если возникнут проблемы, проверьте логи и статус служб. Все скрипты готовы к использованию! 🔧
