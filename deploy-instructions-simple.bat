@echo off
echo Starting RepairHub Pro deployment on Vultr...
echo.

set SERVER_IP=45.32.158.217
set SERVER_PASSWORD=pH[7)MPXFXAajxvM

echo Server Information:
echo   - IP: %SERVER_IP%
echo   - Password: %SERVER_PASSWORD%
echo.

echo Checking server availability...
ping -n 1 %SERVER_IP% > nul
if %errorlevel% equ 0 (
    echo Server is available (ping works)
) else (
    echo Server is not available
    pause
    exit /b 1
)

echo.
echo Deployment Instructions:
echo.
echo 1. Open new terminal and connect to server:
echo    ssh root@%SERVER_IP%
echo    Password: %SERVER_PASSWORD%
echo.
echo 2. Run commands step by step:
echo.
echo    Step 1: Update system
echo    apt update ^&^& apt upgrade -y
echo.
echo    Step 2: Install packages
echo    apt install -y curl wget git nginx ufw
echo.
echo    Step 3: Install Docker
echo    curl -fsSL https://get.docker.com -o get-docker.sh
echo    sh get-docker.sh
echo    usermod -aG docker root
echo.
echo    Step 4: Install Docker Compose
echo    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
echo    chmod +x /usr/local/bin/docker-compose
echo.
echo    Step 5: Clone project
echo    git clone https://github.com/PlevanDM/RP-Modern.git
echo    cd RP-Modern
echo    git checkout 24.10v3
echo.
echo    Step 6: Build and run
echo    docker-compose build
echo    docker-compose up -d
echo.
echo    Step 7: Check status
echo    docker-compose ps
echo.
echo 3. After completion, application will be available:
echo    - HTTP: http://%SERVER_IP%:3000
echo.
echo 4. For testing:
echo    curl -I http://localhost:3000
echo    curl -I http://%SERVER_IP%:3000
echo.
echo Ready for deployment!
pause
