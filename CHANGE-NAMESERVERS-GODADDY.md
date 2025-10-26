# 🔄 Зміна Nameservers в GoDaddy

## ⚡ Швидкий спосіб:

### 1. Зайдіть в GoDaddy:
- URL: https://www.godaddy.com
- Email: dmitro.plevan@gmail.com

### 2. My Products → Domains → repairhub.one

### 3. Scroll down до "Nameservers" секції

### 4. Click "Change" або "Edit"

### 5. Змініть nameservers:

**ЗАМІСТЬ:**
```
ns1.eftydns.com
ns2.eftydns.com
```

**ВСТАВТЕ:**
```
adi.ns.cloudflare.com
darwin.ns.cloudflare.com
```

### 6. Save

### 7. Підтвердіть зміни

## ⏱️ Timeline:
- Nameservers: 2 хвилини
- DNS propagation: 5-30 хвилин
- **Total: 7-32 хвилини**

## ✅ Після цього:

1. Cloudflare автоматично активує домен
2. Оновіть сервер:
   ```bash
   ssh root@70.34.252.148
   cd /root/repair-hub-pro
   git pull origin eploy
   docker compose down
   docker compose build --no-cache
   docker compose up -d
   ```
3. Чекайте 5-30 хвилин
4. Відкрийте: **http://repairhub.one**

## 🔒 HTTPS (опціонально):

```bash
ssh root@70.34.252.148
apt update && apt install -y certbot python3-certbot-nginx
certbot --nginx -d repairhub.one -d www.repairhub.one
```

Тоді: **https://repairhub.one**

