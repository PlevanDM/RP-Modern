#!/bin/bash
# Додавання DNS records через Cloudflare API

CF_TOKEN="Qmc8mXVkxeEZk56kcSVmYReQ9RIddSe4Up8ajpp7"
ZONE_ID="bc3e0824de83432604e6e81961632071"
IP="70.34.252.148"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║      ДОДАВАННЯ DNS RECORDS ЧЕРЕЗ CLOUDFLARE API            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Zone ID: $ZONE_ID"
echo "IP: $IP"
echo ""

# Перевірка токена
echo "1. Перевіряю токен..."
TOKEN_CHECK=$(curl -s -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json")

echo "Response: $TOKEN_CHECK"
echo ""

# Додати A record для @
echo "2. Додаю A record для @ (root domain)..."
RECORD1=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"A\",\"name\":\"@\",\"content\":\"$IP\",\"proxied\":false,\"ttl\":1}")

echo "Response: $RECORD1"
echo ""

# Додати A record для www
echo "3. Додаю A record для www..."
RECORD2=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"A\",\"name\":\"www\",\"content\":\"$IP\",\"proxied\":false,\"ttl\":1}")

echo "Response: $RECORD2"
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✅ DNS RECORDS ДОДАНІ!                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Тепер виконайте на сервері:"
echo ""
echo "ssh root@70.34.252.148"
echo "cd /root/repair-hub-pro"
echo "git pull origin eploy"
echo "docker compose down"
echo "docker compose build --no-cache"
echo "docker compose up -d"
echo ""
echo "Після цього чекайте 5-30 хвилин і відкрийте:"
echo "  http://repairhub.one"
echo "═══════════════════════════════════════════════════════════════"
