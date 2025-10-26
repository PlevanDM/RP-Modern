# ПОВНИЙ ПЕРЕЗАПУСК СЕРВЕРА

## Швидка інструкція

1. **Відкрийте VNC Console:**
   - https://my.vultr.com
   - Servers → View Console

2. **Скопіюйте і вставте цю команду:**
```bash
cd /root/repair-hub-pro && git pull origin eploy && docker compose down -v && docker compose build --no-cache && docker compose up -d && sleep 20 && docker compose ps && docker logs repair-hub-pro --tail=50
```

3. **Натисніть Enter і чекайте 3-5 хвилин**

4. **Перевірте сайт:**
   - http://repairhub.one

## Що робить команда?

- `cd /root/repair-hub-pro` - переходимо в директорію проекту
- `git pull origin eploy` - завантажуємо останні зміни з GitHub
- `docker compose down -v` - зупиняємо контейнери і видаляємо volumes
- `docker compose build --no-cache` - збираємо з чистого листа
- `docker compose up -d` - запускаємо в фоновому режимі
- `sleep 20` - чекаємо 20 секунд
- `docker compose ps` - показуємо статус контейнерів
- `docker logs repair-hub-pro --tail=50` - показуємо останні 50 рядків логів

## Статус

- **Поточний сайт:** http://70.34.252.148:3000
- **Після перезапуску:** http://repairhub.one

