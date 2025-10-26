#!/bin/bash
echo "=== DOCKER STATUS ==="
docker ps -a

echo ""
echo "=== PROJECT DIRECTORY ==="
ls -la /root/repair-hub-pro 2>/dev/null || echo "Not found"

echo ""
echo "=== CONTAINER LOGS (last 100 lines) ==="
cd /root/repair-hub-pro 2>/dev/null && docker compose logs --tail=100 || echo "Cannot read logs"

echo ""
echo "=== PORT 3000 STATUS ==="
netstat -tlnp 2>/dev/null | grep 3000 || ss -tlnp 2>/dev/null | grep 3000 || echo "Port 3000 not listening"

echo ""
echo "=== FIREWALL STATUS ==="
ufw status
