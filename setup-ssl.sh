#!/bin/bash

# Setup SSL for Full Strict mode
echo "=========================================="
echo "  SETUP SSL FOR FULL STRICT"
echo "=========================================="
echo ""

# Install certbot
echo "1. Installing certbot..."
apk add --no-cache certbot certbot-nginx

# Get SSL certificate
echo ""
echo "2. Getting SSL certificate..."
echo "Note: This requires proper DNS to be set up first!"
echo ""

certbot certonly --standalone \
  -d repairhub.one \
  -d www.repairhub.one \
  --non-interactive \
  --agree-tos \
  --email admin@repairhub.one

if [ $? -eq 0 ]; then
    echo ""
    echo "3. Certificate obtained successfully!"
    echo ""
    echo "Certificate location: /etc/letsencrypt/live/repairhub.one/"
    echo ""
    echo "4. Update nginx configuration to use SSL..."
    echo "5. Update docker-compose.yml to mount certificates..."
    echo ""
else
    echo ""
    echo "Failed to obtain certificate. Check DNS settings."
    echo ""
fi

echo "=========================================="

