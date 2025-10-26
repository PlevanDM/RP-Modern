# 🌐 Як купити домен і налаштувати з Vultr

## 🏪 Де купити домен:

### Рекомендовані провайдери:

1. **Namecheap** (https://www.namecheap.com)
   - Ціна: ~$10-15/рік
   - .com, .net, .org домени
   - Легкий інтерфейс

2. **Google Domains** (domains.google.com)
   - Ціна: ~$12/рік
   - Простий інтерфейс

3. **Cloudflare** (https://dash.cloudflare.com)
   - Ціна: без націнки (at-cost)
   - Найдешевший варіант
   - Безкоштовний DNS

4. **GoDaddy** (godaddy.com)
   - Популярний, але дорожче

## 🎯 Найкращі варіанти для України:

### Варіант 1: Cloudflare (НАЙКРАЩІЙ)
```
Переваги:
✅ Найдешевший (.com = $8.57/рік)
✅ Швидкий DNS propagation
✅ Безкоштовний CDN
✅ DDoS захист
✅ Легко налаштувати DNS
```

**Кроки:**
1. Зайдіть на cloudflare.com
2. Зареєструйтесь (безкоштовно)
3. Search → введіть "repairhub" → оберіть .com
4. Додайте в Cart та купіть

### Варіант 2: Namecheap
```
Ціна: ~$10-15/рік
Легкий інтерфейс
```

**Кроки:**
1. Зайдіть на namecheap.com
2. Шукайте "repairhub"
3. Виберіть домен
4. Купіть

## 🔧 Як налаштувати DNS з Vultr:

### Крок 1: В Vultr налаштування DNS

1. Зайдіть на Vultr.com
2. Dashboard → DNS
3. Create DNS Record
4. Додайте A records:

```
Type: A
Name: repairhub.com
Value: 70.34.252.148
TTL: 300
```

```
Type: A
Name: www.repairhub.com
Value: 70.34.252.148
TTL: 300
```

### Крок 2: В панелі домену (Cloudflare/Namecheap)

Якщо купили в Cloudflare:
1. Dashboard → Domain → DNS
2. Додайте A records:
   - repairhub.com → 70.34.252.148
   - www → 70.34.252.148

Якщо купили в Namecheap:
1. Domain List → Manage → Advanced DNS
2. Add new record:
   - Type: A Record
   - Host: @
   - Value: 70.34.252.148
   - TTL: Automatic
3. Ще один A Record:
   - Type: A Record
   - Host: www
   - Value: 70.34.252.148
   - TTL: Automatic

### Крок 3: Дочекайтесь DNS propagation

Зачекайте 5-30 хвилин (Cloudflare швидше)

Перевірити:
```bash
nslookup repairhub.com
```

### Крок 4: Оновіть Nginx конфігурацію

Вам треба змінити порт на 80 (HTTP) або налаштувати SSL (443).

Поточний конфіг використовує порт 3000. Для домену краще:
- Port 80 для HTTP
- Port 443 для HTTPS (з Let's Encrypt)

## 🔒 HTTPS (Рекомендовано):

Після налаштування DNS, додайте SSL:

```bash
ssh root@70.34.252.148
apt update
apt install -y certbot python3-certbot-nginx

# Оновіть nginx.conf для порту 80
# Потім:

certbot --nginx -d repairhub.com -d www.repairhub.com
```

Тоді сайт буде працювати на:
- https://repairhub.com
- https://www.repairhub.com

## 💰 Порівняння цін:

```
Cloudflare:  $8.57/рік (.com)
Namecheap:   $10.98/рік (.com)
Google:      $12.00/рік (.com)
GoDaddy:     $14.99/рік (.com) - часто є купони
```

## 🎯 Моя рекомендація:

**Купуйте в Cloudflare:**
1. Найдешевший
2. Швидкий DNS
3. Безкоштовний захист
4. Легко налаштувати

**Крок за кроком:**
1. cloudflare.com → Sign Up
2. Search "repairhub"
3. Add to cart → Checkout
4. DNS Management:
   - A record: @ → 70.34.252.148
   - A record: www → 70.34.252.148
5. Дочекайтесь 5-30 хв
6. http://repairhub.com:3000 працюватиме!

## ⚠️ Важливо:

Після купівлі домену оновіть `nginx.conf` на сервері:
- Змініть `listen 3000;` на `listen 80;` для HTTP
- Або налаштуйте SSL і використовуйте port 443 для HTTPS

