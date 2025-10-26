# 🔧 Налаштування Cloudflare - Поточний етап

## ✅ Що ви зробили:
- Купили домен (ймовірно через GoDaddy)
- Почали налаштування в Cloudflare

## 📝 Поточний крок - Nameservers:

### В GoDaddy:

1. **Зайдіть:** https://godaddy.com → My Account → Domains

2. **Вимкніть DNSSEC:**
   - Domain Settings → DNS → DNSSEC
   - Вимкніть (Off)

3. **Замініть Nameservers:**
   
   Go to: Domain → Manage DNS → Nameservers
   
   **ВИДАЛІТЬ:**
   ```
   ns1.eftydns.com
   ns2.eftydns.com
   ```
   
   **ДОДАЙТЕ Cloudflare nameservers:**
   ```
   adi.ns.cloudflare.com
   darwin.ns.cloudflare.com
   ```

4. **Save** (Збережіть)

### ⏳ Чекайте 5-30 хвилин

DNS propagation потрібен час. Перевірте:
```bash
nslookup repairhub.com
```

## 🔧 Наступні кроки (після propagation):

### 1. У Cloudflare Dashboard:

Go to: DNS → Records

**Додайте A Records:**

```
Type: A
Name: @
Content: 70.34.252.148
Proxy status: DNS only (сірим хмаркою)
TTL: Auto

Type: A
Name: www
Content: 70.34.252.148
Proxy status: DNS only
TTL: Auto
```

### 2. Оновіть Nginx на сервері:

```bash
ssh root@70.34.252.148

cd /root/repair-hub-pro

# Змініть порт в nginx.conf
nano nginx.conf
# Шукайте: listen 3000;
# Замініть на: listen 80;

# Перезапустіть
docker compose down
docker compose build --no-cache
docker compose up -d
```

### 3. Перевірка:

```bash
# Перевірте DNS
nslookup repairhub.com

# Відкрийте в браузері
http://repairhub.com
```

**⚠️ Може зайняти 5-30 хвилин!**

## 🔒 Після цього - HTTPS:

```bash
ssh root@70.34.252.148

apt update
apt install -y certbot python3-certbot-nginx

certbot --nginx -d repairhub.com -d www.repairhub.com
```

Тоді буде: **https://repairhub.com** 🔒

## 📊 Таймлайн:

1. ⏳ Зараз: Nameservers (5-30 хв)
2. ⏳ Потім: DNS records (5-30 хв)
3. ⏳ Оновлення Nginx (5 хв)
4. 🎯 Готово: http://repairhub.com

