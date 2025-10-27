#!/bin/bash

# Pure ASCII Deploy Script for Vultr
# Only ASCII characters - Latin1 compatible

echo "RepairHub Pro Deployment"
echo "========================"

# Check root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

echo "Step 1: Update system"
apt update
apt upgrade -y

echo "Step 2: Install Docker"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

echo "Step 3: Install Docker Compose"
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

echo "Step 4: Start Docker"
systemctl enable docker
systemctl start docker

echo "Step 5: Clean old deployments"
docker stop $(docker ps -aq) 2>/dev/null || echo "No containers"
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers"
docker rmi $(docker images -q) 2>/dev/null || echo "No images"
docker system prune -a --volumes -f

echo "Step 6: Create project"
mkdir -p /opt/repairhub
cd /opt/repairhub

echo "Step 7: Create docker-compose.yml"
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    container_name: repairhub
EOF

echo "Step 8: Create Dockerfile"
cat > Dockerfile << 'EOF'
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

echo "Step 9: Create nginx.conf"
cat > nginx.conf << 'EOF'
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

echo "Step 10: Create package.json"
cat > package.json << 'EOF'
{
  "name": "repairhub-pro",
  "version": "1.0.0",
  "scripts": {
    "build": "echo 'Build complete'"
  }
}
EOF

echo "Step 11: Create HTML"
mkdir -p dist
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>RepairHub Pro</title>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea, #764ba2);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 3rem;
            border-radius: 15px;
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .status {
            font-size: 1.2rem;
            padding: 0.5rem 1rem;
            background: rgba(40, 167, 69, 0.2);
            border-radius: 25px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>RepairHub Pro</h1>
        <div class="status">Successfully Deployed!</div>
        <p>Server: $(hostname)</p>
        <p>IP: $(hostname -I | awk '{print $1}')</p>
        <p>Time: $(date)</p>
    </div>
</body>
</html>
EOF

echo "Step 12: Wait for Docker"
sleep 15

echo "Step 13: Build and start"
docker-compose up -d --build

echo ""
echo "Status:"
docker-compose ps

echo ""
echo "Testing:"
if curl -s http://localhost:80 > /dev/null 2>&1; then
    echo "SUCCESS! Access at: http://$(hostname -I | awk '{print $1}')"
else
    echo "Starting... Check: docker-compose logs -f"
fi

echo ""
echo "Done! Commands: docker-compose ps/logs/restart/down"
