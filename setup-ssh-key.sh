#!/bin/bash
# Скрипт для налаштування SSH без пароля

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       Налаштування SSH Key для root@70.34.252.148         ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Пароль від сервера
SERVER_PASSWORD="8zU%)m9$eVu-$wHd"
SERVER_USER="root"
SERVER_IP="70.34.252.148"

echo "1. Генерую SSH ключ (якщо немає)..."
if [ ! -f ~/.ssh/id_rsa ]; then
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
    echo "✅ SSH ключ створено"
else
    echo "✅ SSH ключ вже існує"
fi

echo ""
echo "2. Копіюю ключ на сервер..."
echo "Пароль: $SERVER_PASSWORD"

# Використаємо sshpass якщо є, або expect
if command -v sshpass &> /dev/null; then
    sshpass -p "$SERVER_PASSWORD" ssh-copy-id -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP"
elif command -v expect &> /dev/null; then
    expect << EOF
spawn ssh-copy-id $SERVER_USER@$SERVER_IP
expect "password:"
send "$SERVER_PASSWORD\r"
expect eof
EOF
else
    echo "⚠️  Встановіть sshpass або expect для автоматизації"
    echo "Або копіюйте ключ вручну:"
    echo "ssh-copy-id $SERVER_USER@$SERVER_IP"
    exit 1
fi

echo ""
echo "3. Тестування з'єднання..."
ssh -o BatchMode=yes "$SERVER_USER@$SERVER_IP" "echo '✅ SSH працює без пароля!'" && echo "✅ Успіх!" || echo "❌ Помилка"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✅ SSH KEY НАЛАШТОВАНО                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Тепер можна заходити без пароля:"
echo "ssh $SERVER_USER@$SERVER_IP"
echo "═══════════════════════════════════════════════════════════════"

