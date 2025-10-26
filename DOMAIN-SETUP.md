# 🌐 Налаштування домену repairhub.com

## ✅ Що зроблено:

1. **Nginx конфігурація** - оновлено для підтримки домену
2. **Meta tags** - оновлено URL в Open Graph
3. **Server blocks** - додано server_name для домену
4. **Setup script** - створено скрипт для налаштування

## 📋 Що треба зробити:

### Варіант 1: DNS вже налаштовано (за 24-48 годин)

Якщо ви вже додали DNS записи (A record), просто дочекайтесь propagation.

### Варіант 2: Швидке тестування локально

**Windows:**
1. Відкрийте Notepad як Administrator
2. Відкрийте файл: `C:\Windows\System32\drivers\etc\hosts`
3. Додайте цей рядок:
```
70.34.252.148 repairhub.com www.repairhub.com
```
4. Збережіть файл
5. Відкрийте: http://repairhub.com:3000

**Linux/Mac:**
```bash
sudo nano /etc/hosts
# Додайте:
70.34.252.148 repairhub.com www.repairhub.com
# Збережіть (Ctrl+X, Y, Enter)
```

## 🔧 Як задеплоїти:

```bash
ssh root@70.34.252.148
cd /root/repair-hub-pro
git pull origin eploy
docker compose down
docker compose build --no-cache
docker compose up -d
```

## 🌍 DNS налаштування в провайдера (якщо ще не зроблено):

**A Record:**
- Host: @
- Value: 70.34.252.148

**CNAME Record:**
- Host: www
- Value: repairhub.com

**Або просто A Records:**
- repairhub.com → 70.34.252.148
- www.repairhub.com → 70.34.252.148

## ✅ Перевірка:

Після налаштування DNS або hosts:

```bash
# Linux/Mac
curl -I http://repairhub.com:3000

# Windows (PowerShell)
Invoke-WebRequest -Uri http://repairhub.com:3000 -Method Head
```

## 🔒 HTTPS (наступний крок):

Для HTTPS потрібно встановити certbot:

```bash
ssh root@70.34.252.148
apt update && apt install -y certbot python3-certbot-nginx
certbot --nginx -d repairhub.com -d www.repairhub.com
```

## 📝 Поточний статус:

- ✅ Nginx конфігурація готова
- ✅ Meta tags оновлені
- ⏳ Очікуємо DNS propagation або налаштування hosts

