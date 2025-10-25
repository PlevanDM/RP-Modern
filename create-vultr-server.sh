#!/bin/bash

# Скрипт для создания сервера на Vultr через API
# Vultr API Server Creation Script

echo "🚀 Создание сервера на Vultr..."
echo "🚀 Creating Vultr server..."

# Проверяем наличие API ключа
if [ -z "$VULTR_API_KEY" ]; then
    echo "❌ Ошибка: Не установлен VULTR_API_KEY"
    echo "❌ Error: VULTR_API_KEY not set"
    echo ""
    echo "Установите API ключ:"
    echo "Set API key:"
    echo "export VULTR_API_KEY='your_api_key_here'"
    echo ""
    echo "Получить API ключ можно на: https://my.vultr.com/settings/#settingsapi"
    echo "Get API key at: https://my.vultr.com/settings/#settingsapi"
    exit 1
fi

# Параметры сервера
SERVER_NAME="repair-hub-pro"
OS_ID="387"  # Ubuntu 22.04 LTS
PLAN_ID="vc2-1c-1gb"  # 1 CPU, 1GB RAM
REGION_ID="fra"  # Frankfurt (можно изменить)
SSH_KEY_ID=""  # Будет заполнено автоматически

echo "📋 Параметры сервера:"
echo "📋 Server parameters:"
echo "   - Название: $SERVER_NAME"
echo "   - OS: Ubuntu 22.04 LTS"
echo "   - План: $PLAN_ID"
echo "   - Регион: $REGION_ID"
echo ""

# Получаем список SSH ключей
echo "🔑 Получение SSH ключей..."
echo "🔑 Getting SSH keys..."
SSH_KEYS=$(curl -s -H "Authorization: Bearer $VULTR_API_KEY" \
    "https://api.vultr.com/v2/ssh-keys" | jq -r '.ssh_keys[] | .id')

if [ -z "$SSH_KEYS" ]; then
    echo "⚠️  SSH ключи не найдены. Создайте SSH ключ в панели Vultr"
    echo "⚠️  No SSH keys found. Create SSH key in Vultr panel"
    echo ""
    echo "Создание сервера без SSH ключа..."
    echo "Creating server without SSH key..."
    SSH_KEY_ID=""
else
    SSH_KEY_ID=$(echo $SSH_KEYS | head -n1)
    echo "✅ Используем SSH ключ: $SSH_KEY_ID"
    echo "✅ Using SSH key: $SSH_KEY_ID"
fi

# Создаем сервер
echo ""
echo "🔄 Создание сервера..."
echo "🔄 Creating server..."

CREATE_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $VULTR_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
        \"label\": \"$SERVER_NAME\",
        \"os_id\": $OS_ID,
        \"plan\": \"$PLAN_ID\",
        \"region\": \"$REGION_ID\",
        \"sshkey_id\": [\"$SSH_KEY_ID\"],
        \"enable_ipv6\": true,
        \"enable_private_network\": false,
        \"backups\": \"disabled\",
        \"ddos_protection\": false,
        \"activation_email\": false,
        \"hostname\": \"$SERVER_NAME\",
        \"tag\": \"repair-hub-pro\"
    }" \
    "https://api.vultr.com/v2/instances")

# Проверяем ответ
if echo "$CREATE_RESPONSE" | jq -e '.instance' > /dev/null; then
    INSTANCE_ID=$(echo "$CREATE_RESPONSE" | jq -r '.instance.id')
    echo "✅ Сервер создан успешно!"
    echo "✅ Server created successfully!"
    echo "   - ID: $INSTANCE_ID"
    echo ""
    
    # Ждем готовности сервера
    echo "⏳ Ожидание готовности сервера..."
    echo "⏳ Waiting for server to be ready..."
    
    while true; do
        STATUS_RESPONSE=$(curl -s -H "Authorization: Bearer $VULTR_API_KEY" \
            "https://api.vultr.com/v2/instances/$INSTANCE_ID")
        
        STATUS=$(echo "$STATUS_RESPONSE" | jq -r '.instance.server_status')
        POWER_STATUS=$(echo "$STATUS_RESPONSE" | jq -r '.instance.power_status')
        
        echo "   Статус: $STATUS, Питание: $POWER_STATUS"
        echo "   Status: $STATUS, Power: $POWER_STATUS"
        
        if [ "$STATUS" = "ok" ] && [ "$POWER_STATUS" = "running" ]; then
            break
        fi
        
        sleep 10
    done
    
    # Получаем IP адрес
    IP_RESPONSE=$(curl -s -H "Authorization: Bearer $VULTR_API_KEY" \
        "https://api.vultr.com/v2/instances/$INSTANCE_ID")
    
    MAIN_IP=$(echo "$IP_RESPONSE" | jq -r '.instance.main_ip')
    
    echo ""
    echo "🎉 Сервер готов!"
    echo "🎉 Server is ready!"
    echo "   - ID: $INSTANCE_ID"
    echo "   - IP: $MAIN_IP"
    echo ""
    
    # Сохраняем информацию в файл
    cat > server-info.txt << EOF
SERVER_ID=$INSTANCE_ID
SERVER_IP=$MAIN_IP
SERVER_NAME=$SERVER_NAME
CREATED_DATE=$(date)
EOF
    
    echo "📄 Информация о сервере сохранена в server-info.txt"
    echo "📄 Server info saved to server-info.txt"
    echo ""
    
    # Предлагаем подключиться
    echo "🔗 Подключение к серверу:"
    echo "🔗 Connect to server:"
    echo "   ssh root@$MAIN_IP"
    echo ""
    
    # Предлагаем развернуть приложение
    echo "🚀 Для развертывания приложения выполните:"
    echo "🚀 To deploy application run:"
    echo "   ssh root@$MAIN_IP 'wget -O vultr-deploy.sh https://raw.githubusercontent.com/PlevanDM/RP-Modern/24.10v3/vultr-deploy.sh && chmod +x vultr-deploy.sh && ./vultr-deploy.sh'"
    echo ""
    
else
    echo "❌ Ошибка создания сервера:"
    echo "❌ Server creation error:"
    echo "$CREATE_RESPONSE" | jq -r '.error.message // .'
    exit 1
fi
