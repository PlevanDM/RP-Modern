# 🚀 Production Deployment Guide

## ✅ Що налаштовано:

### 1. **Docker Compose** (`docker-compose.yml`)
- ✅ `restart: always` - контейнер автоматично перезапускається
- ✅ `logging` - обмеження логів до 10MB і 3 файлів
- ✅ Volumes для збереження логів та даних
- ✅ Health check кожні 30 секунд
- ✅ Конфігурація nginx монтується як read-only

### 2. **Nginx** (`nginx.conf`)
- ✅ Structured logging з `combined` format
- ✅ Rate limiting: 10 requests/second
- ✅ Безпека: security headers
- ✅ Gzip compression
- ✅ Cache management

### 3. **Dockerfile**
- ✅ Health check вбудований
- ✅ Startup script з перевіркою конфігурації
- ✅ Оптимізована послідовність збірки

---

## 📋 Команда для VNC Console:

```bash
cd /root/repair-hub-pro && \
git pull && \
docker compose down && \
docker compose build --no-cache && \
docker compose up -d && \
docker compose ps
```

---

## 🔍 Моніторинг:

### Перегляд логів:
```bash
# Docker logs
docker logs repair-hub-pro --tail 100 -f

# Nginx access log
docker exec repair-hub-pro tail -f /var/log/nginx/access.log

# Nginx error log
docker exec repair-hub-pro tail -f /var/log/nginx/error.log
```

### Статус контейнера:
```bash
docker compose ps
docker inspect repair-hub-pro | grep Health
```

### Статистика:
```bash
docker stats repair-hub-pro
```

---

## 🎯 Автоматичні перезапуски:
- ✅ У разі падіння контейнер автоматично перезапуститься
- ✅ У разі помилки nginx контейнер не запуститься (startup check)
- ✅ Health check автоматично перевіряє доступність кожні 30s

---

## 📊 Логування:
- Логи автоматично ротируються (макс 30MB = 3 файли × 10MB)
- Structured logging для аналізу
- Все зберігається в Docker volumes

---

## 🔒 Безпека:
- Rate limiting: до 10 req/s
- Security headers включені
- CSP (Content Security Policy) налаштований
- Read-only монтування nginx.conf

---

## ✅ Готово до production!

Запустіть команду вище в VNC Console і сайт буде працювати з правильним логуванням та автоматичними перезапусками.
