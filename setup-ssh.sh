#!/bin/bash

# ============================================================================
# SSH SETUP SCRIPT FOR VULTR
# ============================================================================
# This script sets up SSH key authorization for your Vultr server
# Use this script during initial Vultr server setup
# ============================================================================

set -e

echo "🔐 Setting up SSH key authorization..."
echo "🔐 Налаштування SSH ключа..."

# Configuration
SSH_DIR="/root/.ssh"
AUTHORIZED_KEYS="$SSH_DIR/authorized_keys"

# Create .ssh directory
mkdir -p "$SSH_DIR"
chmod 700 "$SSH_DIR"

# Add your SSH public key here
# Replace "YOUR_SSH_PUBLIC_KEY" with your actual SSH public key
# You can find your SSH public key with: cat ~/.ssh/id_rsa.pub (on your local machine)
SSH_PUBLIC_KEY="YOUR_SSH_PUBLIC_KEY_HERE"

# If no key is provided, display instructions
if [ "$SSH_PUBLIC_KEY" = "YOUR_SSH_PUBLIC_KEY_HERE" ]; then
    echo ""
    echo "⚠️  No SSH key provided!"
    echo "⚠️  SSH ключ не надано!"
    echo ""
    echo "To use this script:"
    echo "Щоб використовувати цей скрипт:"
    echo ""
    echo "1. Replace 'YOUR_SSH_PUBLIC_KEY_HERE' with your SSH public key"
    echo "   Замініть 'YOUR_SSH_PUBLIC_KEY_HERE' на ваш публічний SSH ключ"
    echo ""
    echo "2. Get your SSH public key by running on your local machine:"
    echo "   Отримайте ваш публічний SSH ключ, запустивши на локальній машині:"
    echo "   cat ~/.ssh/id_rsa.pub"
    echo ""
    echo "3. Or use the server setup script below:"
    echo "   Або використовуйте скрипт налаштування сервера нижче:"
    echo ""
    
    # Display example setup script for Vultr
    cat << 'EOF'

# Alternative: Use this in Vultr's startup script during server creation
# Альтернатива: Використовуйте це в стартовому скрипті Vultr під час створення сервера

#!/bin/sh

mkdir -p /root/.ssh
chmod 700 /root/.ssh
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC... your_email@example.com" > /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys

EOF
    
    exit 1
fi

# Add SSH key to authorized_keys
echo "$SSH_PUBLIC_KEY" > "$AUTHORIZED_KEYS"
chmod 600 "$AUTHORIZED_KEYS"

echo "✅ SSH key added successfully!"
echo "✅ SSH ключ додано успішно!"
echo ""
echo "Key location: $AUTHORIZED_KEYS"
echo "Розташування ключа: $AUTHORIZED_KEYS"

