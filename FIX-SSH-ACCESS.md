# 🔧 Відновлення SSH доступу до Vultr

## ⚠️ Проблема:
Permission denied - не можна зайти через SSH

## 🔑 Варіанти рішення:

### Варіант 1: VNC Console (найпростіший)

1. Зайдіть в Vultr Dashboard: https://my.vultr.com
2. Servers → ваш сервер
3. Click **"View Console"** (VNC Console)
4. Зайдіть через web-based console
5. Виконайте команди без SSH

### Варіант 2: Відновити root password

**Через VNC Console:**

```bash
# Відновити root password
passwd root

# Введіть новий пароль (двічі)
# Потім збережіть його!

# Перезапустіть SSH
systemctl restart sshd

# Або перезавантажте сервер
reboot
```

### Варіант 3: Створити нового користувача (якщо не можна root)

```bash
# Створити нового користувача
adduser deployer

# Додати в sudo
usermod -aG sudo deployer

# Змінити на root
su -
```

### Варіант 4: SSH через Vultr Dashboard

1. Vultr Dashboard → Servers → ваш сервер
2. Ніс: Settings → View Console
3. Відкриється VNC
4. Увійдіть як root з вашим паролем

## 🔐 Що робити зараз:

1. Зайдіть: https://my.vultr.com
2. Servers → виберіть сервер 70.34.252.148
3. Click **"Server Details"**
4. Ніс: **"View Console"** (ліворуч)
5. У web console увійдіть:
   - Username: `root`
   - Password: (ваш пароль з Vultr)
6. Виконайте команди:

```bash
cd /root/repair-hub-pro
git pull origin eploy
docker compose down
docker compose build --no-cache
docker compose up -d
```

## 📝 Альтернатива - Пароль змінився?

Якщо не пам'ятаєте пароль:

1. Vultr Dashboard → Servers
2. Виділіть сервер
3. Ніс: Settings → **Reinstall**
4. **АБО** More → **Reset Password** 
5. Отримаєте новий пароль на email

## ⚡ Швидке рішення через VNC:

1. https://my.vultr.com → Server → View Console
2. Увійдіть
3. Скопіюйте ці команди в console:

```bash
cd /root/repair-hub-pro && git pull origin eploy && docker compose down && docker compose build --no-cache && docker compose up -d && docker compose ps
```

Готово!

