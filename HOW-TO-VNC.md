# 🖥️ ЯК ВИКОРИСТАТИ VNC CONSOLE

## ⚠️ ВАЖЛИВО!

Команда `cd /root/repair-hub-pro...` має виконуватися **НА СЕРВЕРІ**, а не у вашому PowerShell!

У PowerShell ви побачите помилку:
```
Cannot find path 'C:\root\repair-hub-pro'
```
Це нормально — ця команда для Linux сервера, а не Windows.

---

## 🎯 ШАГИ

### 1️⃣ Відкрийте VNC Console
1. Йдіть: https://my.vultr.com
2. Натисніть **"Servers"**
3. Знайдіть сервер з IP: `70.34.252.148`
4. Натисніть **"View Console"** (VNC)

### 2️⃣ У VNC Console
1. У нижній частині VNC є **поле для вводу команд**
2. Скопіюйте цю команду (весь текст):
```bash
cd /root/repair-hub-pro && git pull origin eploy && docker compose down -v && docker compose build --no-cache && docker compose up -d && sleep 20 && docker compose ps && docker logs repair-hub-pro --tail=50
```
3. Натисніть у поле VNC і **вставте** (Ctrl+V)
4. Натисніть **Enter**

### 3️⃣ Чекайте 3-5 хвилин
Буде бачити процес збирання Docker

### 4️⃣ Перевірте
Відкрийте: http://repairhub.one

---

## 📸 Де знаходиться поле вводу у VNC?

```
┌─────────────────────────────────────────┐
│  VNC Viewer                              │
├─────────────────────────────────────────┤
│  (серверний екран)                      │
│  [root@vultr ~]#                        │
│  _                                        │
├─────────────────────────────────────────┤
│  >>> [ТУТ БУДЕ ВАША КОМАНДА] <<<     │  ← ТУТ!
└─────────────────────────────────────────┘
```

---

## ✅ Перевірка після виконання

Якщо все OK, побачите:
```
NAME              STATUS
repair-hub-pro    Up
```

Якщо є помилки — повідомте мене.

