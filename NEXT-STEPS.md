# ✅ Nameservers налаштовано! Що далі?

## ⏳ Поточний статус:
- Nameservers: Cloudflare ⏳ (очікую activation)
- Очікування: 5-30 хвилин (іноді до 24 годин)
- Email: Ви отримаєте коли домен активний

## 🎯 Після activation - швидкі кроки:

### Крок 1: Додайте DNS Records в Cloudflare

У Cloudflare Dashboard:
1. Go to: **DNS → Records**
2. Натисніть **"Add record"**

**Record 1:**
```
Type: A
Name: @
Content: 70.34.252.148
Proxy status: DNS only (сіра хмара, не оранжева)
TTL: Auto
```

**Record 2:**
```
Type: A  
Name: www
Content: 70.34.252.148
Proxy status: DNS only (сіра хмара)
TTL: Auto
```

⚠️ **ВАЖЛИВО:** Proxy status має бути **DNS only** (сіра хмара), а не proxied (оранжева).

### Крок 2: Оновіть Nginx на сервері

```bash
ssh root@70.34.252.148

cd /root/repair-hub-pro

# Змініть порт з 3000 на 80
nano nginx.conf

# Знайдіть: listen 3000;
# Замініть на: listen 80;
# Збережіть (Ctrl+X, Y, Enter)

# Rebuild
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Крок 3: Перевірка

Чекайте 5-30 хвилин після додавання DNS records, потім:

```bash
# Перевірка DNS
nslookup repairhub.com

# Відкрийте в браузері
http://repairhub.com
```

**🎉 Готово!** http://repairhub.com працюватиме (без порту 3000)

## 🔒 Бонус - HTTPS (після http працює):

```bash
ssh root@70.34.252.148

apt update && apt install -y certbot python3-certbot-nginx

certbot --nginx -d repairhub.com -d www.repairhub.com
```

Тоді буде: **https://repairhub.com** 🔒

## 📋 Чеклист:

- [x] Nameservers встановлено в GoDaddy
- [x] Cloudflare налаштовується
- [ ] **Зачекайте activation email** ⏳
- [ ] Додайте A records в Cloudflare
- [ ] Оновіть nginx.conf (port 80)
- [ ] Перевірте http://repairhub.com
- [ ] (Опціонально) Додайте SSL

## 💡 Tip:
Поки чекаєте - можете підготувати зміни nginx.conf заздалегідь! 

Бажано змінити port 3000 на 80 щоб не потрібно було додавати :3000.

