# 🌐 ПОВНА ІНСТРУКЦІЯ: Купити домен і налаштувати

## 📝 Коротко:

1. **Купити:** Cloudflare.com ($8.57/рік) або Namecheap ($10.98/рік)
2. **DNS:** A record → 70.34.252.148
3. **Nginx:** Змінити порт з 3000 на 80
4. **Готово:** http://repairhub.com (без порту)

## 🛒 Крок 1: Купити домен

### Варіант А: Cloudflare (НАЙКРАЩИЙ)

1. Зайдіть: https://cloudflare.com
2. Sign Up (безкоштовно)
3. Dashboard → Add a Site
4. Domains → Register Domains
5. Шукайте "repairhub"
6. Виберіть .com або .net
7. Add to Cart → Checkout
8. Після купівлі → DNS Management

**DNS Records:**
```
Type: A
Name: repairhub.com
Target: 70.34.252.148
Proxy: Off (спочатку)

Type: A  
Name: www
Target: 70.34.252.148
Proxy: Off
```

### Варіант Б: Namecheap

1. Зайдіть: https://namecheap.com
2. Domain → Search "repairhub"
3. Add to Cart → Checkout
4. Advanced DNS:

```
A Record:
Host: repairhub.com (@)
Target: 70.34.252.148
TTL: Automatic

A Record:
Host: www
Target: 70.34.252.148
TTL: Automatic
```

## 🔧 Крок 2: Оновити Nginx

**На сервері виконайте:**

```bash
ssh root@70.34.252.148

cd /root/repair-hub-pro

# Копіюйте новий nginx-80.conf
cp nginx-80.conf nginx.conf

# Або просто змініть порт
nano nginx.conf
# Змініть: listen 3000; на listen 80;

# Rebuild Docker
git pull origin eploy
docker compose down
docker compose build --no-cache
docker compose up -d
```

## ✅ Крок 3: Перевірка

Дочекайтесь 5-30 хвилин, потім:

```bash
# Перевірка DNS
nslookup repairhub.com

# Відкрийте в браузері
http://repairhub.com
```

**Чекайте 5-30 хвилин!** DNS потребує часу на propagation.

## 🔒 Бонус: HTTPS (наступний крок)

Після того як домен працює:

```bash
ssh root@70.34.252.148

apt update
apt install -y certbot python3-certbot-nginx

certbot --nginx -d repairhub.com -d www.repairhub.com
```

Потім сайт буде на https://repairhub.com (без порту і з іконкою замка 🔒)

## 💡 ПОКИ ЩО:

**Сайт працює:**
- http://70.34.252.148:3000 ✅

**Після купівлі домену:**
- http://repairhub.com ✅ (без порту)

**Після SSL:**
- https://repairhub.com ✅ (без порту і захищений)

## 📍 Моя рекомендація:

**Купуйте в Cloudflare:**
- Найдешевший
- Швидкий propagation
- Безкоштовний DDoS захист
- Додайте в портфоліо послуг

**Термін:** 5-10 хвилин на налаштування + 5-30 хв на DNS

