# 🔧 Налаштування DNS через Cloudflare API

## 📚 Documentation:
https://developers.cloudflare.com/api/

## 🚀 Швидкий старт:

### Крок 1: Створіть API Token

1. Зайдіть: https://dash.cloudflare.com
2. My Profile → API Tokens
3. Create Token → Use template "Edit zone DNS"
4. Zone Resources → Include → repairhub.com
5. Create Token
6. Скопіюйте token!

### Крок 2: Отримайте Zone ID

```bash
# У Cloudflare Dashboard:
# Zones → repairhub.com
# Праворуч: Zone ID
# Скопіюйте його
```

### Крок 3: Додайте DNS Records через API

```bash
# Встановіть curl (якщо немає)
# Windows: Скачайте з curl.se
# Linux/Mac: sudo apt install curl

# Виконайте ці команди (замініть YOUR_TOKEN і YOUR_ZONE_ID):

export CF_TOKEN="your_api_token_here"
export ZONE_ID="your_zone_id_here"

# Додайте A record для @
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "A",
    "name": "@",
    "content": "70.34.252.148",
    "proxied": false
  }'

# Додайте A record для www
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "A",
    "name": "www",
    "content": "70.34.252.148",
    "proxied": false
  }'
```

## 🎯 Найпростіший спосіб (Web UI):

Якщо не хочете використовувати API:

### Зайдіть в Cloudflare:
https://dash.cloudflare.com → Zones → repairhub.com → DNS

### Додайте записи вручну:

**Запис 1:**
```
Type: A
Name: @
Content: 70.34.252.148
Proxy status: DNS only (OFF)
TTL: Auto
```

**Запис 2:**
```
Type: A
Name: www
Content: 70.34.252.148
Proxy status: DNS only (OFF)
TTL: Auto
```

## ✅ Після додавання DNS:

```bash
# SSH на сервер
ssh root@70.34.252.148

cd /root/repair-hub-pro

# Pull останні зміни
git pull origin eploy

# Змініть port 3000 → 80
nano nginx.conf
# Знайдіть: listen 3000;
# Замініть на: listen 80;
# Збережіть: Ctrl+X, Y, Enter

# Rebuild
docker compose down
docker compose build --no-cache
docker compose up -d

# Чекайте 20 секунд
sleep 20

# Перевірте
docker logs repair-hub-pro --tail=20
```

## 🔍 Перевірка:

Чекайте 5-30 хвилин, потім:

```bash
# Перевірте DNS
nslookup repairhub.com

# Або в PowerShell
Resolve-DnsName repairhub.com
```

Відкрийте в браузері:
http://repairhub.com

## 📝 API Documentation:

https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-create-dns-record

## ⚡ Швидке рішення:

**АБО просто використайте веб-інтерфейс** - найпростіше!

1. https://dash.cloudflare.com
2. Zones → repairhub.com
3. DNS → Add record (два рази)
4. Заповніть як вище ⬆️

