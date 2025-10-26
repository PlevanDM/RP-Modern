# 🎯 ІНСТРУКЦІЇ ДЛЯ VNC CONSOLE

## Швидкий деплой за 2 хвилини:

### Варіант 1: Одна команда

1. Відкрийте: https://my.vultr.com → Servers → View Console
2. Копіюйте і вставте:
```bash
cd /root/repair-hub-pro && git pull origin eploy && docker compose down && docker compose build --no-cache && docker compose up -d && sleep 20 && docker compose ps && docker logs repair-hub-pro --tail=30
```
3. Enter
4. Чекайте 2 хвилини
5. Відкрийте: http://repairhub.one

### Варіант 2: Покроково

```bash
# 1. Перехід
cd /root/repair-hub-pro

# 2. Pull
git pull origin eploy

# 3. Stop
docker compose down

# 4. Build
docker compose build --no-cache

# 5. Start
docker compose up -d

# 6. Wait
sleep 20

# 7. Check
docker compose ps
docker logs repair-hub-pro --tail=30
```

## ✅ Після цього:

- http://repairhub.one ✅
- http://www.repairhub.one ✅

## 🔒 Опціонально - HTTPS:

```bash
ssh root@70.34.252.148
apt update
apt install -y certbot python3-certbot-nginx
certbot --nginx -d repairhub.one -d www.repairhub.one
```

Тоді: https://repairhub.one 🔒

