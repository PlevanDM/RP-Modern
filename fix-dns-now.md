# 🔧 Виправлення DNS в Cloudflare

## ❌ Проблема:
- A records мають GoDaddy IPs (13.248.243.5, 76.223.105.230)
- www CNAME проксуює (оранжева хмара)
- Має бути наш IP: 70.34.252.148

## ✅ Що треба зробити:

### 1. ВИДАЛИТИ старі A records:

В таблиці знайдіть:
- Type: A, Name: repairhub.one, Content: 13.248.243.5 → **DELETE**
- Type: A, Name: repairhub.one, Content: 76.223.105.230 → **DELETE**

### 2. ДОДАТИ новий A record:

Click "Add record"

```
Type: A
Name: repairhub.one
Content: 70.34.252.148
Proxy status: ⬛ DNS only (сіра хмара!)
TTL: Auto
```

Save

### 3. ВИМКНУТИ PROXY для www:

Знайдіть:
- Type: CNAME, Name: www, Content: repairhub.one (☁️ Proxied)

Click Edit → Змініть на ⬛ DNS only → Save

### 4. АБО видаліть www CNAME і створіть A record:

```
Type: A
Name: www
Content: 70.34.252.148
Proxy status: ⬛ DNS only
TTL: Auto
```

## 📋 Результат:

Після цих дій:
- repairhub.one → 70.34.252.148 (DNS only)
- www → 70.34.252.148 (DNS only)

Чекайте 1-5 хвилин і: **http://repairhub.one** працюватиме!

