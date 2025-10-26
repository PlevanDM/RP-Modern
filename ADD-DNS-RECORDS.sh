#!/bin/bash
# Скрипт для додавання DNS records через Cloudflare API

# Ваші дані:
ZONE_ID="bc3e0824de83432604e6e81961632071"
ACCOUNT_ID="ad170d773e79a037e28f4530fd5305a5"
IP_ADDRESS="70.34.252.148"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║    ДОДАВАННЯ DNS RECORDS ЧЕРЕЗ CLOUDFLARE API              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Zone ID: $ZONE_ID"
echo "Account ID: $ACCOUNT_ID"
echo "IP Address: $IP_ADDRESS"
echo ""
echo "⚠️  ВАЖЛИВО: Спочатку створіть API Token!"
echo ""
echo "1. Зайдіть: https://dash.cloudflare.com"
echo "2. My Profile → API Tokens"
echo "3. Create Token → Edit zone DNS template"
echo "4. Permissions: Zone → DNS → Edit"
echo "5. Zone Resources: Include → repairhub.com"
echo "6. Create Token і скопіюйте"
echo ""
echo "═══════════════════════════════════════════════════════════════"
read -p "Введіть ваш API Token: " CF_TOKEN
echo ""
echo "Додаю DNS records..."
echo ""

# Додати A record для @ (root)
echo "Додаю A record для @..."
RESPONSE1=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{
    \"type\": \"A\",
    \"name\": \"@\",
    \"content\": \"$IP_ADDRESS\",
    \"proxied\": false,
    \"ttl\": 1
  }")

echo "Response 1: $RESPONSE1"
echo ""

# Додати A record для www
echo "Додаю A record для www..."
RESPONSE2=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{
    \"type\": \"A\",
    \"name\": \"www\",
    \"content\": \"$IP_ADDRESS\",
    \"proxied\": false,
    \"ttl\": 1
  }")

echo "Response 2: $RESPONSE2"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ DNS Records додані!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Тепер оновіть сервер:"
echo "  ssh root@70.34.252.148"
echo "  cd /root/repair-hub-pro"
echo "  bash SETUP-DOMAIN.sh"
echo ""
echo "Після цього чекайте 5-30 хвилин і відкрийте:"
echo "  http://repairhub.com"
echo "═══════════════════════════════════════════════════════════════"

