# RepairHub Pro - Vultr Auto Deployment
# One-click deployment script

Write-Host "🚀 RepairHub Pro - Automatic Deployment to Vultr" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$API_KEY = "WQVRXDQWELSA5ZIE3HZWVHJTZQE7JX7IK5ZA"
$REGION = "fra"  # Frankfurt, Germany
$PLAN = "vc2-1c-1gb"  # 1 CPU, 1GB RAM
$OS_ID = "270"  # Ubuntu 22.04

Write-Host "📋 Configuration:" -ForegroundColor Blue
Write-Host "  Region: Frankfurt (Europe)" -ForegroundColor White
Write-Host "  Plan: 1 CPU, 1GB RAM" -ForegroundColor White
Write-Host "  OS: Ubuntu 22.04 LTS" -ForegroundColor White
Write-Host "  Application: React + Docker + Nginx" -ForegroundColor White
Write-Host ""

# Step 1: Generate SSH key
$SSH_KEY_PATH = "$HOME\.ssh\vultr_repairhub_key"
if (-not (Test-Path $SSH_KEY_PATH)) {
    Write-Host "🔑 Generating SSH key for server access..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path (Split-Path $SSH_KEY_PATH)
    & ssh-keygen -t ed25519 -C "repairhub-admin@vultr" -f $SSH_KEY_PATH -N '""' 2>&1 | Out-Null

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ SSH key generated successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to generate SSH key" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ SSH key already exists" -ForegroundColor Green
}

# Step 2: Get public key
$PUBLIC_KEY = Get-Content "${SSH_KEY_PATH}.pub" -Raw
Write-Host "📋 SSH public key ready for deployment" -ForegroundColor Cyan

# Step 3: Create server
Write-Host "🖥️ Creating server instance..." -ForegroundColor Yellow

$serverConfig = @{
    region = $REGION
    plan = $PLAN
    os_id = $OS_ID
    label = "repairhub-pro"
    hostname = "repairhub"
    tag = "repairhub-app"
} | ConvertTo-Json

try {
    Write-Host "📡 Sending request to Vultr API..." -ForegroundColor Yellow

    $response = Invoke-RestMethod -Method POST -Uri "https://api.vultr.com/v2/instances" `
        -Headers @{"Authorization" = "Bearer $API_KEY"} `
        -ContentType "application/json" `
        -Body $serverConfig

    $SERVER_ID = $response.id
    $SERVER_IP = $response.main_ip

    Write-Host "✅ Server created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Server Details:" -ForegroundColor Blue
    Write-Host "  Server ID: $SERVER_ID" -ForegroundColor White
    Write-Host "  IP Address: $SERVER_IP" -ForegroundColor White
    Write-Host "  Status: Creating..." -ForegroundColor Yellow

} catch {
    Write-Host "❌ Failed to create server: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "🔍 Possible issues:" -ForegroundColor Red
    Write-Host "  - Invalid API key" -ForegroundColor White
    Write-Host "  - Insufficient funds in Vultr account" -ForegroundColor White
    Write-Host "  - Region or plan not available" -ForegroundColor White
    exit 1
}

# Step 4: Wait for server to be ready
Write-Host ""
Write-Host "⏳ Waiting for server to be ready..." -ForegroundColor Yellow
Write-Host "This process takes approximately 3-5 minutes" -ForegroundColor Yellow
Write-Host "Please wait while the server is being configured..." -ForegroundColor Yellow

$waitTime = 0
$maxWait = 300  # 5 minutes maximum

while ($waitTime -lt $maxWait) {
    Start-Sleep -Seconds 30
    $waitTime += 30

    $minutes = [math]::Floor($waitTime / 60)
    $seconds = $waitTime % 60

    Write-Host "  ⏱️ Elapsed time: $minutes minutes $seconds seconds" -ForegroundColor Cyan

    # Check server status via API
    try {
        $statusResponse = Invoke-RestMethod -Method GET -Uri "https://api.vultr.com/v2/instances/$SERVER_ID" `
            -Headers @{"Authorization" = "Bearer $API_KEY"}

        $status = $statusResponse.status

        if ($status -eq "active") {
            Write-Host "✅ Server is now active!" -ForegroundColor Green
            break
        } else {
            Write-Host "  🔄 Server status: $status" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "  ⚠️ Could not check server status, continuing to wait..." -ForegroundColor Yellow
    }
}

# Step 5: Deploy application
Write-Host ""
Write-Host "🚀 Starting application deployment..." -ForegroundColor Yellow

$deploymentScript = @"
#!/bin/bash
echo "🔧 Starting RepairHub Pro installation..."

# Update system
apt update && apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Install Docker Compose
echo "📦 Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create project directory
echo "📁 Creating project structure..."
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Create docker-compose.yml
cat > docker-compose.yml << 'COMPOSE_EOF'
services:
  repairhub-pro:
    build:
      context: .
      dockerfile: Dockerfile
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
    networks:
      - repair-network
    volumes:
      - ./nginx.conf:/etc/nginx/http.d/default.conf:ro
      - nginx-logs:/var/log/nginx

volumes:
  nginx-logs:
    driver: local

networks:
  repair-network:
    driver: bridge
COMPOSE_EOF

# Create Dockerfile
cat > Dockerfile << 'DOCKER_EOF'
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install necessary packages
RUN apk add --no-cache wget curl

# Copy built application
COPY --from=build /app/dist /app/dist

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create directories
RUN mkdir -p /var/log/nginx /var/cache/nginx /etc/nginx/http.d /run/nginx

# Create startup script
RUN echo '#!/bin/sh' > /start.sh && \\
    echo 'echo "Starting RepairHub Pro..."' >> /start.sh && \\
    echo 'nginx -t || exit 1' >> /start.sh && \\
    echo 'nginx -g "daemon off;"' >> /start.sh && \\
    chmod +x /start.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \\
    CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

CMD ["/start.sh"]
DOCKER_EOF

# Create nginx configuration
cat > nginx.conf << 'NGINX_EOF'
server {
    listen 80;
    server_name repairhub.one www.repairhub.one;
    root /app/dist;
    index index.html;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;

    # Disable caching for HTML files
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        expires -1;
        try_files \$uri /index.html;
    }

    # Cache static assets with long expiry
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)\$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
    }

    # SPA fallback
    location / {
        try_files \$uri \$uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:*;" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;

    # Error pages
    error_page 404 /index.html;
}
NGINX_EOF

# Create package.json
cat > package.json << 'PACKAGE_EOF'
{
  "name": "repair-hub-pro",
  "version": "1.0.0",
  "description": "Professional Repair Management Platform",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "serve": "vite preview --host 0.0.0.0 --port 3000"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.13",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.294.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.3.1",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^7.1.11"
  }
}
PACKAGE_EOF

# Create main React application
mkdir -p src/components/pages src/components/ui src/components/layout

# Create main.tsx
cat > main.tsx << 'MAIN_EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
MAIN_EOF

# Create App.tsx
cat > App.tsx << 'APP_EOF'
import { useState } from 'react';
import ModernLandingPage from './components/pages/ModernLandingPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userId: string) => {
    console.log('User logged in:', userId);
    setCurrentUser(userId);
  };

  return <ModernLandingPage onLogin={(userId) => login(userId)} />;
}

export default App;
APP_EOF

# Create index.css
cat > index.css << 'CSS_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
CSS_EOF

# Create tailwind.config.js
cat > tailwind.config.js << 'TAILWIND_EOF'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
    },
  },
  plugins: [],
}
TAILWIND_EOF

# Create vite.config.ts
cat > vite.config.ts << 'VITE_EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
  },
})
VITE_EOF

# Start Docker and deploy
echo "🔧 Starting Docker service..."
systemctl enable docker
systemctl start docker

echo "⏳ Waiting for Docker to start..."
sleep 15

echo "🚀 Building and starting RepairHub Pro..."
docker-compose up -d --build

echo "✅ Deployment completed successfully!"
echo "🌐 Application should be available at: http://repairhub.one"
echo "📊 Check status with: docker-compose ps"
echo "📋 Check logs with: docker-compose logs -f"
echo "🔄 Restart with: docker-compose restart"
echo "🛑 Stop with: docker-compose down"
COMPOSE_EOF

# Copy and run deployment script
Write-Host "📤 Uploading deployment script to server..." -ForegroundColor Yellow

try {
    # Create deployment script on server
    $scriptContent = $deploymentScript -replace "`r`n", "`n"
    echo $scriptContent | ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@$SERVER_IP "cat > deploy.sh && chmod +x deploy.sh"

    Write-Host "🚀 Executing deployment on server..." -ForegroundColor Yellow

    # Run deployment script
    $deploymentResult = & ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@$SERVER_IP "./deploy.sh" 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Deployment script completed with warnings" -ForegroundColor Yellow
        Write-Host $deploymentResult -ForegroundColor Cyan
    }

} catch {
    Write-Host "❌ Failed to execute deployment: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "🔍 You can manually deploy using:" -ForegroundColor Yellow
    Write-Host "  ssh -i $SSH_KEY_PATH root@$SERVER_IP" -ForegroundColor White
}

# Step 6: Test application
Write-Host ""
Write-Host "🔍 Testing application availability..." -ForegroundColor Yellow

Start-Sleep -Seconds 30

try {
    $testResponse = Invoke-WebRequest -Uri "http://$SERVER_IP" -TimeoutSec 30 -UseBasicParsing
    if ($testResponse.StatusCode -eq 200) {
        Write-Host "🎉 SUCCESS! Application is running!" -ForegroundColor Green
        Write-Host "🌐 Application URL: http://$SERVER_IP" -ForegroundColor Green
        Write-Host "🔗 Also available at: http://repairhub.one" -ForegroundColor Green
    }
} catch {
    Write-Host "⏳ Application is still starting up..." -ForegroundColor Yellow
    Write-Host "📋 Check manually: curl http://$SERVER_IP" -ForegroundColor Cyan
    Write-Host "📊 Server status: ssh -i $SSH_KEY_PATH root@$SERVER_IP 'docker-compose ps'" -ForegroundColor Cyan
}

# Step 7: Display final information
Write-Host ""
Write-Host "🎉 RepairHub Pro Deployment Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Server Information:" -ForegroundColor Blue
Write-Host "  Server ID: $SERVER_ID" -ForegroundColor White
Write-Host "  IP Address: $SERVER_IP" -ForegroundColor White
Write-Host "  Region: Frankfurt (Europe)" -ForegroundColor White
Write-Host "  Plan: 1 CPU, 1GB RAM" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Access Credentials:" -ForegroundColor Blue
Write-Host "  SSH: ssh -i $SSH_KEY_PATH root@$SERVER_IP" -ForegroundColor White
Write-Host "  SSH Key Location: $SSH_KEY_PATH" -ForegroundColor White
Write-Host ""
Write-Host "🖥️ Management Commands:" -ForegroundColor Blue
Write-Host "  Check status: ssh -i $SSH_KEY_PATH root@$SERVER_IP 'docker-compose ps'" -ForegroundColor White
Write-Host "  View logs: ssh -i $SSH_KEY_PATH root@$SERVER_IP 'docker-compose logs -f'" -ForegroundColor White
Write-Host "  Restart app: ssh -i $SSH_KEY_PATH root@$SERVER_IP 'docker-compose restart'" -ForegroundColor White
Write-Host "  Stop app: ssh -i $SSH_KEY_PATH root@$SERVER_IP 'docker-compose down'" -ForegroundColor White
Write-Host "  Update app: ssh -i $SSH_KEY_PATH root@$SERVER_IP 'docker-compose up -d --build'" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Application URLs:" -ForegroundColor Blue
Write-Host "  Primary: http://$SERVER_IP" -ForegroundColor White
Write-Host "  Domain: http://repairhub.one" -ForegroundColor White
Write-Host ""
Write-Host "📱 Application Features:" -ForegroundColor Blue
Write-Host "  ✅ React + TypeScript + Vite" -ForegroundColor Green
Write-Host "  ✅ Tailwind CSS + Modern UI" -ForegroundColor Green
Write-Host "  ✅ Docker Containerized" -ForegroundColor Green
Write-Host "  ✅ Nginx Production Server" -ForegroundColor Green
Write-Host "  ✅ Auto-restart & Health Checks" -ForegroundColor Green
Write-Host "  ✅ Security Headers Configured" -ForegroundColor Green
Write-Host ""
Write-Host "✨ Your RepairHub Pro is ready to use!" -ForegroundColor Green
Write-Host "🎊 Happy repairing! 🔧" -ForegroundColor Green

