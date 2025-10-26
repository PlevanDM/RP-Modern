# 🌐 Налаштування repairhub.one

## 🎉 Ваш домен:
**repairhub.one** ✅

## 📋 Ваші дані Cloudflare:
- Zone ID: bc3e0824de83432604e6e81961632071
- Account ID: ad170d773e79a037e28f4530fd5305a5
- IP: 70.34.252.148
- Domain: **repairhub.one**

## 🚀 Швидке налаштування:

### КРОК 1: Додайте DNS Records в Cloudflare

Зайдіть: https://dash.cloudflare.com → Zones → repairhub.one → DNS → Add record

**Додайте 2 A records:**

**Запис 1:**
```
Type: A
Name: @
Content: 70.34.252.148
Proxy: OFF (сіра хмара)
TTL: Auto
```

**Запис 2:**
```
Type: A
Name: www
Content: 70.34.252.148
Proxy: OFF (сіра хмара)
TTL: Auto
```

### КРОК 2: Оновіть nginx.conf для нового домену

```bash
ssh root@70.34.252.148
cd /root/repair-hub-pro
nano nginx.conf
```

**Змініть server_name:**
```
# З цього:
server_name repairhub.com www.repairhub.com 70.34.252.148;

# На це:
server_name repairhub.one www.repairhub.one 70.34.252.148;
```

**Змініть listen:**
```
# З цього:
listen 3000;

# На це:
listen 80;
```

**Збережіть:** Ctrl+X, Y, Enter

### КРОК 3: Перезапустіть Docker

```bash
docker compose down
docker compose build --no-cache
docker compose up -d

# Чекайте
sleep 30

# Перевірте
docker compose ps
docker logs repair-hub-pro --tail=20
```

### КРОК 4: Перевірка

Чекайте 5-30 хвилин, потім:

```bash
nslookup repairhub.one
```

Відкрийте в браузері:
**http://repairhub.one**

## 🔒 HTTPS (після http працює):

```bash
ssh root@70.34.252.148

apt update
apt install -y certbot python3-certbot-nginx

certbot --nginx -d repairhub.one -d www.repairhub.one
```

Тоді: **https://repairhub.one** 🔒

## 📝 Оновіть index.html

Також оновіть meta tags в index.html для нового домену:

```html
<meta property="og:url" content="http://repairhub.one/" />
<meta property="og:image" content="http://repairhub.one/og-image.jpg" />
<meta name="twitter:url" content="http://repairhub.one/" />
<meta name="twitter:image" content="http://repairhub.one/og-image.jpg" />
```

## ✅ Все за 10 хвилин!

1. DNS records: 2 хв
2. Nginx config: 2 хв
3. Docker restart: 5 хв
4. DNS propagation: 5-30 хв
5. **http://repairhub.one** ✅

