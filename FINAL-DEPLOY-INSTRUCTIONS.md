# 🚀 ФІНАЛЬНА ІНСТРУКЦІЯ ДЛЯ ДЕПЛОЮ

## 📋 ЩО ПОТРІБНО ЗРОБИТИ

### 1️⃣ Перевірити статус у VNC Console

Відкрийте VNC Console і виконайте:

```bash
# Перевірка статусу Docker
docker compose ps

# Перевірка логів
docker logs repair-hub-pro --tail=100

# Перевірка порту
netstat -tlnp | grep :3000

# Перевірка файлів
ls -la /root/repair-hub-pro/dist/
```

### 2️⃣ Якщо сервер не запущений

Виконайте в VNC Console:

```bash
cd /root/repair-hub-pro
git pull origin eploy
docker compose down -v
docker compose build --no-cache
docker compose up -d
sleep 20
docker compose ps
docker logs repair-hub-pro --tail=50
```

### 3️⃣ Налаштування бази даних (НАСТУПНИЙ КРОК)

Після того як сервер запуститься, потрібно:

1. **Підключити PostgreSQL**
2. **Підключити Redis**
3. **Налаштувати міграції**
4. **Налаштувати індекси**

### 4️⃣ Налаштування домену

Перевірте DNS в Cloudflare:
- A record для @ → 70.34.252.148
- A record для www → 70.34.252.148
- Proxy: OFF (DNS Only)

---

## ⚠️ ПОТОЧНІ ПРОБЛЕМИ І РІШЕННЯ

### Проблема 1: Port 3000 заблокований
**Рішення:** Nginx має слухати порт 80, а не 3000

### Проблема 2: Docker контейнери не запускаються
**Рішення:** Перевірте логи через VNC Console

### Проблема 3: Домен не працює
**Рішення:** Перевірте Cloudflare DNS та firewall

---

## 📝 ПЛАН ДІЙ

1. ✅ Перевірити VNC Console
2. ✅ Запустити Docker контейнери
3. ⏳ Перевірити доступність по IP
4. ⏳ Перевірити доступність по домену
5. ⏳ Додати базу даних
6. ⏳ Налаштувати міграції
7. ⏳ Тестувати функціональність

---

## 🔍 КОМАНДИ ДЛЯ ВІДЛАДКИ

```bash
# Статус контейнерів
docker compose ps

# Логи додатку
docker logs repair-hub-pro --tail=100

# Логи nginx
docker logs repair-hub-pro | grep nginx

# Перезапуск
docker compose restart

# Повна перебудова
docker compose down -v && docker compose build --no-cache && docker compose up -d

# Перевірка портів
ss -tlnp | grep :80
ss -tlnp | grep :3000

# Перевірка файлів
ls -la /root/repair-hub-pro/dist/
ls -la /root/repair-hub-pro/nginx.conf

# Перевірка процесів
ps aux | grep nginx
ps aux | grep docker
```

