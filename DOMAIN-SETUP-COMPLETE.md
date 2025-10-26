# 🎯 ПОВНА ІНСТРУКЦІЯ ДЛЯ ДОМЕНУ

## 📋 Ваші дані:
- Zone ID: bc3e0824de83432604e6e81961632071
- Account ID: ad170d773e79a037e28f4530fd5305a5
- IP: 70.34.252.148
- Domain: repairhub.com

## 🚀 КРОК 1: Створіть API Token

1. Зайдіть: https://dash.cloudflare.com
2. My Profile → API Tokens
3. Create Token → Use template "Edit zone DNS"
4. Permissions:
   - Zone → DNS → Edit
5. Zone Resources:
   - Include → Specific zone → repairhub.com
6. Continue to summary → Create Token
7. **СКОПІЮЙТЕ TOKEN!**

## 🚀 КРОК 2: Додайте DNS Records

### Варіант А: Через скрипт (найпростіше)

**Windows (PowerShell):**
```powershell
# Скопіюйте файл ADD-DNS-RECORDS.sh на сервер
scp ADD-DNS-RECORDS.sh root@70.34.252.148:/root/

# Зайдіть на сервер
ssh root@70.34.252.148

# Запустіть скрипт
cd /root
chmod +x ADD-DNS-RECORDS.sh
bash ADD-DNS-RECORDS.sh
# Введіть ваш API Token коли попросить
```

**Linux/Mac:**
```bash
# На локальній машині (якщо є bash)
chmod +x ADD-DNS-RECORDS.sh
bash ADD-DNS-RECORDS.sh
# Введіть API Token
```

### Варіант Б: Вручну через curl

```bash
# Замініть YOUR_TOKEN на ваш API token
export CF_TOKEN="YOUR_TOKEN_HERE"
ZONE_ID="bc3e0824de83432604e6e81961632071"
IP="70.34.252.148"

# Додати A record для @
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"A\",\"name\":\"@\",\"content\":\"$IP\",\"proxied\":false,\"ttl\":1}"

# Додати A record для www
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"A\",\"name\":\"www\",\"content\":\"$IP\",\"proxied\":false,\"ttl\":1}"
```

### Варіант В: Через веб-інтерфейс (найпростіше!)

1. Зайдіть: https://dash.cloudflare.com → Zones → repairhub.com
2. DNS → Add record (два рази)
3. Заповніть як показано в SIMPLE-INSTRUCTIONS.txt

## 🚀 КРОК 3: Оновіть сервер

```bash
ssh root@70.34.252.148
cd /root/repair-hub-pro

# Запустіть скрипт
bash SETUP-DOMAIN.sh
```

АБО вручну:

```bash
ssh root@70.34.252.148
cd /root/repair-hub-pro
git pull origin eploy
nano nginx.conf
# Змініть: listen 3000; → listen 80;
docker compose down
docker compose build --no-cache
docker compose up -d
```

## ✅ КРОК 4: Чекайте та перевірте

Чекайте 5-30 хвилин, потім:

```bash
# Перевірка DNS
nslookup repairhub.com

# Або
ping repairhub.com
```

Відкрийте в браузері:
**http://repairhub.com**

## 🔒 БОНУС: HTTPS

Після того як http працює:

```bash
ssh root@70.34.252.148

apt update
apt install -y certbot python3-certbot-nginx

certbot --nginx -d repairhub.com -d www.repairhub.com
```

Потім: **https://repairhub.com** 🔒

## 📊 Чеклист:

- [ ] Створити API Token
- [ ] Додати DNS records (через API або веб)
- [ ] Оновити сервер (nginx port 80)
- [ ] Чекати 5-30 хвилин
- [ ] Перевірити http://repairhub.com
- [ ] (Опціонально) Додати SSL

## ⏱️ Timeline:

- Створення API Token: 2 хвилини
- Додавання DNS records: 1 хвилина
- Оновлення сервера: 5 хвилин
- DNS propagation: 5-30 хвилин
- **Всього: 15-40 хвилин**

