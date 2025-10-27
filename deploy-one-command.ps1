# ONE COMMAND DEPLOY - RepairHub Pro (PowerShell)
# Единый скрипт для полного деплоя

Write-Host "🚀 RepairHub Pro - One Command Deploy" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Проверка прав администратора
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
$isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ Run PowerShell as Administrator" -ForegroundColor Red
    Write-Host "Right-click PowerShell -> Run as Administrator" -ForegroundColor Yellow
    exit 1
}

Write-Host "🔄 System update..." -ForegroundColor Yellow
# В Windows мы не можем использовать apt, но создадим скрипт для сервера

Write-Host "🐳 Checking Docker..." -ForegroundColor Yellow
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "✅ Docker installed: $(docker --version)" -ForegroundColor Green
} else {
    Write-Host "❌ Docker not found" -ForegroundColor Red
    Write-Host "📦 Please install Docker Desktop first" -ForegroundColor Yellow
    Write-Host "Download: https://www.docker.com/products/docker-desktop" -ForegroundColor Cyan
    exit 1
}

Write-Host "📦 Checking Docker Compose..." -ForegroundColor Yellow
if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
    Write-Host "✅ Docker Compose installed: $(docker-compose --version)" -ForegroundColor Green
} else {
    Write-Host "❌ Docker Compose not found" -ForegroundColor Red
    Write-Host "📦 Docker Compose included with Docker Desktop" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📋 Creating deployment script..." -ForegroundColor Blue

# Создание скрипта для сервера
$serverScript = @"
#!/bin/bash

echo "🚀 RepairHub Pro - Server Deploy"
echo "================================="

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Enable Docker
systemctl enable docker
systemctl start docker

# Clean old deployments
docker stop \$(docker ps -aq) 2>/dev/null || echo "No containers"
docker rm \$(docker ps -aq) 2>/dev/null || echo "No containers"
docker rmi \$(docker images -q) 2>/dev/null || echo "No images"
docker system prune -a --volumes -f

# Create project
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Create docker-compose.yml
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

# Create Dockerfile
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

# Create nginx.conf
cat > nginx.conf << 'EOF'
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / { try_files \$uri \$uri/ /index.html; }
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Create package.json
cat > package.json << 'EOF'
{
  "name": "repairhub-pro",
  "version": "1.0.0",
  "scripts": {
    "build": "echo 'Building...'"
  }
}
EOF

# Create HTML
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
        <h1>🚀 RepairHub Pro</h1>
        <div class="status">✅ Deployed Successfully!</div>
        <p>Server: \$(hostname)</p>
        <p>IP: \$(hostname -I | awk '{print \$1}')</p>
        <p>Time: \$(date)</p>
    </div>
</body>
</html>
EOF

# Wait and deploy
sleep 15
docker-compose up -d --build

echo "✅ Deployment complete!"
echo "🌐 Access: http://\$(hostname -I | awk '{print \$1}')"
echo "📊 Status: docker-compose ps"
"@

Write-Host "📤 Creating server deployment script..." -ForegroundColor Yellow

# Создание скрипта для сервера
$serverScript | Out-File -FilePath "server-deploy.sh" -Encoding UTF8

Write-Host "📋 Server deployment script created: server-deploy.sh" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Blue
Write-Host "1. Connect to server: ssh root@70.34.252.148" -ForegroundColor White
Write-Host "2. Upload script: scp server-deploy.sh root@70.34.252.148:/tmp/" -ForegroundColor White
Write-Host "3. Run on server: chmod +x /tmp/server-deploy.sh && /tmp/server-deploy.sh" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Or use Vultr Console:" -ForegroundColor Blue
Write-Host "   https://my.vultr.com/subs/vps/novnc/?id=c27acc98-d903-4c2e-b50c-2e1ca23451b0" -ForegroundColor Cyan
Write-Host "   Copy and run the server-deploy.sh script" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Alternative - One command for server:" -ForegroundColor Blue
Write-Host "curl -fsSL https://raw.githubusercontent.com/PlevanDM/RP-Modern/main/server-deploy.sh -o deploy.sh && chmod +x deploy.sh && ./deploy.sh" -ForegroundColor Gray
Write-Host ""
Write-Host "✅ One command deploy script ready!" -ForegroundColor Green
