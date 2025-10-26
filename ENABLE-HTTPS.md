# 🔒 ВІМКНЕННЯ HTTPS

## ⚠️ Зараз працює тільки HTTP

- ❌ https://repairhub.one - не працює
- ✅ http://repairhub.one - працює

---

## 🎯 РІШЕННЯ: Cloudflare SSL

Найпростіший спосіб - використати Cloudflare SSL.

### Крок 1: Відкрийте Cloudflare Dashboard
https://dash.cloudflare.com/ad170d773e79a037e28f4530fd5305a5/repairhub.one

### Крок 2: Включіть SSL
1. Перейдіть: **SSL/TLS** → **Overview**
2. Виберіть: **Full (strict)** або **Full**
3. Збережіть

### Крок 3: Перевірте SSL
Через 2-5 хвилин перевірте:
https://repairhub.one

---

## 🔧 АЛЬТЕРНАТИВА: Let's Encrypt на сервері

### Варіант 1: Через VNC Console

```bash
# Встановити certbot
apk add certbot certbot-nginx

# Отримати сертифікат
certbot --nginx -d repairhub.one -d www.repairhub.one

# Налаштувати auto-renewal
certbot renew --dry-run
```

### Варіант 2: Через Cloudflare (рекомендовано)

Просто включіть SSL в Cloudflare Dashboard - це найпростіше!

---

## 📝 ПОКИ ЩО

Використовуйте:
- ✅ http://repairhub.one
- ✅ http://70.34.252.148

---

## ✅ ПІСЛЯ ВКЛЮЧЕННЯ SSL

Буде працювати:
- ✅ https://repairhub.one
- ✅ http://repairhub.one (redirect на https)

