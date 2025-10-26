# 🔐 Відновлення SSH доступу

## ❌ Проблема:
Password не працює для SSH

## ✅ Рішення 1: VNC Console (найпростіше)

1. Зайдіть в Vultr: https://my.vultr.com
2. Servers → Виділіть сервер 70.34.252.148
3. Click **"View Console"** (VNC Console кнопка)
4. Відкриється web-based console
5. Зайдіть прямо в console (без SSH!)
6. Виконайте команди:

```bash
cd /root/repair-hub-pro
git pull origin eploy
docker compose down
docker compose build --no-cache
docker compose up -d
docker compose ps
```

## ✅ Рішення 2: Змінити пароль

### Через VNC Console:

```bash
# Змінити root password
passwd root

# Введіть новий пароль (двічі)
# Примітка цей пароль!

# Restart SSH
systemctl restart sshd
```

### Або через Vultr Dashboard:

1. Vultr Dashboard → Servers
2. Виділіть сервер
3. Settings → **Reset Password**
4. Отримайте новий пароль на email
5. Спробуйте SSH з новим паролем

## ✅ Рішення 3: SSH Key авторизація

Якщо маєте приватний ключ від Vultr:

```bash
ssh -i "путь_до_ключа" root@70.34.252.148
```

## ⚡ Швидке рішення:

**Використайте VNC Console прямо зараз:**

1. https://my.vultr.com
2. Server → View Console
3. Виконайте команди вище в console

Це **НЕ** потребує SSH паролю!

