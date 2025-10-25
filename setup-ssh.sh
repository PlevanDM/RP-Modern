#!/bin/sh

# Setup SSH key authorization for Vultr
# Replace "ssh-rsa AA... youremail@example.com" with your actual SSH public key

echo "[INFO] Настройка SSH авторизации..."

# Create .ssh directory if it doesn't exist
mkdir -p /root/.ssh
chmod 700 /root/.ssh

# Add your SSH public key
# IMPORTANT: Replace the key below with your actual public key
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPx37D1jO0djlrSl7HMoXM1VJNYCmV1UlwdPypGXXnbU eventbot" > /root/.ssh/authorized_keys

# Set proper permissions
chmod 600 /root/.ssh/authorized_keys

# Disable password authentication (optional, for security)
# sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
# systemctl restart sshd

echo "[OK] SSH ключ настроен!"
echo ""
echo "Теперь вы можете подключаться без пароля:"
echo "ssh root@64.176.72.139"
