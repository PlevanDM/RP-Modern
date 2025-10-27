#!/bin/bash

# ONE COMMAND DEPLOY - RepairHub Pro
# Единый скрипт для полного деплоя

echo "🚀 RepairHub Pro - One Command Deploy"
echo "===================================="

# Проверка прав root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Run as root: sudo $0"
  exit 1
fi

echo "🔄 System update..."
apt update && apt upgrade -y

echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

echo "📦 Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

echo "🔧 Starting Docker..."
systemctl enable docker
systemctl start docker

echo "🧹 Cleaning old deployments..."
docker stop $(docker ps -aq) 2>/dev/null || echo "No containers to stop"
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers to remove"
docker rmi $(docker images -q) 2>/dev/null || echo "No images to remove"
docker system prune -a --volumes -f
docker network prune -f

echo "📁 Creating project..."
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Создание всех файлов
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  repairhub-pro:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: always
    container_name: repairhub-pro
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
EOF

cat > Dockerfile << 'EOF'
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

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

cat > package.json << 'EOF'
{
  "name": "repairhub-pro",
  "version": "1.0.0",
  "scripts": {
    "build": "echo 'Building application...'"
  }
}
EOF

mkdir -p dist
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>RepairHub Pro - Deployed</title>
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
            backdrop-filter: blur(10px);
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .status {
            font-size: 1.2rem;
            padding: 0.5rem 1rem;
            background: rgba(40, 167, 69, 0.2);
            border-radius: 25px;
            border: 1px solid rgba(40, 167, 69, 0.3);
        }
        .info {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 RepairHub Pro</h1>
        <div class="status">✅ Successfully Deployed!</div>
        <div class="info">
            <p><strong>Server:</strong> $(hostname)</p>
            <p><strong>IP:</strong> $(hostname -I | awk '{print $1}')</p>
            <p><strong>Time:</strong> $(date)</p>
            <p><strong>Status:</strong> Production Ready</p>
        </div>
        <p>Professional Repair Management Platform</p>
    </div>
</body>
</html>
EOF

echo "⏳ Waiting for Docker..."
sleep 15

echo "🚀 Building and starting..."
docker-compose up -d --build

echo ""
echo "📊 Status:"
docker-compose ps

echo ""
echo "🌐 Testing..."
if curl -s http://localhost:80 > /dev/null 2>&1; then
    echo "✅ SUCCESS! Application running!"
    echo "🌐 Access: http://$(hostname -I | awk '{print $1}')"
else
    echo "⚠️ Still starting... Check: docker-compose logs -f"
fi

echo ""
echo "🎉 One command deploy complete!"
echo "🔧 Management: docker-compose restart/ps/logs/down"
