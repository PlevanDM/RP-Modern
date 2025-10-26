# 🔧 Що показує Cloudflare "Coming Soon"

## ❌ Проблема:
Cloudflare показує default "Coming Soon" сторінку замість вашого сайту

## ✅ Рішення: Вимкнути Cloudflare Proxy

### Варіант 1: Через Cloudflare Dashboard

1. Зайдіть: https://dash.cloudflare.com
2. Zones → **repairhub.one**
3. **DNS** → Records
4. Знайдіть A records (@ та www)
5. Натисніть на оранжеву хмару ☁️ (Proxy enabled)
6. Змініть на **сіру хмару** ⬛ (DNS only)
7. Save

### Варіант 2: Через API

```powershell
$cfToken = "Qmc8mXVkxeEZk56kcSVmYReQ9RIddSe4Up8ajpp7"
$zoneId = "bc3e0824de83432604e6e81961632071"

# Отримати list DNS records
$headers = @{'Authorization' = "Bearer $cfToken"}
$records = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records" -Headers $headers

# Знайти records
$atRecord = $records.result | Where-Object {$_.name -eq 'repairhub.one' -or $_.name -eq '@'}
$wwwRecord = $records.result | Where-Object {$_.name -eq 'www.repairhub.one' -or $_.name -eq 'www'}

# Вимкнути proxy (якщо включений)
if ($atRecord.proxied -eq $true) {
    $body = @{proxied = $false} | ConvertTo-Json
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$($atRecord.id)" -Method Patch -Headers $headers -Body $body
}

if ($wwwRecord.proxied -eq $true) {
    $body = @{proxied = $false} | ConvertTo-Json
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$($wwwRecord.id)" -Method Patch -Headers $headers -Body $body
}
```

### Варіант 3: Через налаштування в GoDaddy (якщо там)

Cloudflare може проксувати через кнопку "Connect Domain" яка була на скріншоті.

Перевірте:
1. GoDaddy → repairhub.one
2. Якщо є "Connect Domain" - НЕ натискайте
3. Використовуйте тільки DNS без проксі

## ⚡ Швидке рішення:

**В Cloudflare Dashboard:**
- Zones → repairhub.one → DNS → Records
- Клікніть на ☁️ оранжеву хмару
- Вибирайте ⬛ сіру хмару (DNS only)
- Збережіть обидва records (@ і www)

## 🔍 Як перевірити:

```bash
# Має показати ваш IP
nslookup repairhub.one

# Має показати A record без проксі
dig repairhub.one
```

## 🚀 Після цього:

Чекайте 1-5 хвилин і відкрийте:
**http://repairhub.one**

АБО (якщо працює прямий IP):
**http://70.34.252.148**

