#!/bin/bash
# Script for setting up domain

echo "========================================="
echo "  Setting up domain repairhub.com"
echo "========================================="

# Check if we need to add domain to /etc/hosts
if ! grep -q "70.34.252.148.*repairhub.com" /etc/hosts; then
    echo "Adding domain to /etc/hosts..."
    echo "70.34.252.148 repairhub.com www.repairhub.com" >> /etc/hosts
fi

# Check DNS resolution
echo ""
echo "Checking DNS resolution..."
dig +short repairhub.com || echo "DNS not propagated yet"

echo ""
echo "========================================="
echo "  Domain setup complete"
echo "========================================="
echo ""
echo "Site accessible at:"
echo "  - http://repairhub.com:3000"
echo "  - http://www.repairhub.com:3000"
echo "  - http://70.34.252.148:3000"
echo ""
echo "If DNS not propagated yet, add to hosts:"
echo "  Windows: C:\\Windows\\System32\\drivers\\etc\\hosts"
echo "  Linux/Mac: /etc/hosts"
echo ""
echo "Add this line:"
echo "  70.34.252.148 repairhub.com www.repairhub.com"
echo ""

