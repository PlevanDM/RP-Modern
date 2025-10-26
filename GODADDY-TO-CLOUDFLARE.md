# 🔧 Налаштування домену: GoDaddy → Cloudflare

## 📧 Ваші дані:
- Email: dmitro.plevan@gmail.com
- Customer #: 682202774

## ✅ Варіант 1: Якщо Cloudflare вже active

Якщо ви вже отримали email "Your domain is active":

### 1. Зайдіть в Cloudflare Dashboard:
https://dash.cloudflare.com

### 2. Виберіть домен repairhub.com

### 3. Go to: **DNS → Records**

### 4. Натисніть **"Add record"** (два рази):

**Запис 1:**
```
Type: A
Name: @
Content: 70.34.252.148
Proxy status: Click щоб була СІРА хмара (DNS only)
TTL: Auto
```

**Запис 2:**
```
Type: A
Name: www
Content: 70.34.252.148
Proxy status: Click щоб була СІРА хмара (DNS only)
TTL: Auto
```

⚠️ **ВАЖЛИВО:** Proxy status має бути **сірим** (DNS only), НЕ оранжевим!

### 5. Збережіть обидва записи

## ✅ Варіант 2: Якщо Cloudflare ще не active

Якщо досі бачите "Invalid nameservers":

### 1. Зайдіть в GoDaddy:
https://www.godaddy.com → Sign In → dmitro.plevan@gmail.com

### 2. My Products → Domains → repairhub.com

### 3. Manage DNS → Scroll down до Nameservers

### 4. Змініть на Cloudflare:

**CURRENT (зараз):**
```
ns1.eftydns.com
ns2.eftydns.com
```

**ЗМІНІТЬ НА:**
```
adi.ns.cloudflare.com
darwin.ns.cloudflare.com
```

### 5. Save

### 6. Чекайте email від Cloudflare (5-30 хв)

## 🚀 Після встановлення DNS records:

### Оновіть Nginx на сервері:

```bash
ssh root@70.34.252.148

cd /root/repair-hub-pro

nano nginx.conf

# Знайдіть: listen 3000;
# Змініть на: listen 80;
# Збережіть: Ctrl+X, Y, Enter

docker compose down
docker compose build --no-cache  
docker compose up -d
```

### Перевірка:

Чекайте 5-30 хвилин, потім:

```bash
nslookup repairhub.com
```

Відкрийте в браузері:
http://repairhub.com

**⚠️ Чекайте 5-30 хвилин!**

## 🔒 HTTPS (після http працює):

```bash
ssh root@70.34.252.148

apt update && apt install -y certbot python3-certbot-nginx

certbot --nginx -d repairhub.com -d www.repairhub.com
```

Тоді: https://repairhub.com 🔒

