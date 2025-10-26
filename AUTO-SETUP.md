# 🚀 Автоматичне налаштування repairhub.one

## ✅ Ваш Cloudflare API Token працює!

**Token:** `Qmc8mXVkxeEZk56kcSVmYReQ9RIddSe4Up8ajpp7`

## 🔧 КРОК 1: Додайте DNS Records вручну (найпростіше!)

1. Зайдіть: **https://dash.cloudflare.com**
2. Zones → **repairhub.one** → **DNS**
3. Натисніть **"Add record"** (ДВА РАЗИ):

### Запис 1:
```
Type: A
Name: @
Content: 70.34.252.148
Proxy status: DNS only (сіра хмара ⬛)
TTL: Auto
```
**Save**

### Запис 2:
```
Type: A
Name: www
Content: 70.34.252.148
Proxy status: DNS only (сіра хмара ⬛)
TTL: Auto
```
**Save**

## 🚀 КРОК 2: Оновіть сервер

```powershell
ssh root@70.34.252.148
```

**Пароль:** `8zU%)m9$eVu-$wHd`

**Після входу:**
```bash
cd /root/repair-hub-pro
git pull origin eploy
docker compose down
docker compose build --no-cache
docker compose up -d
docker compose ps
```

## ⏳ КРОК 3: Чекайте 5-30 хвилин

Потім відкрийте:
**http://repairhub.one** ✅

## 🔒 БОНУС: HTTPS

Після того як http працює:

```bash
ssh root@70.34.252.148

apt update
apt install -y certbot python3-certbot-nginx

certbot --nginx -d repairhub.one -d www.repairhub.one
```

Потім: **https://repairhub.one** 🔒

## 📋 Чеклист:

- [ ] Додати DNS records в Cloudflare ✅
- [ ] Оновити сервер (порт 80) ⏳
- [ ] Чекати DNS propagation (5-30 хв) ⏳
- [ ] Перевірити http://repairhub.one ✅
- [ ] (Опціонально) Додати SSL 🔒

