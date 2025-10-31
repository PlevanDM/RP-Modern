@echo off
echo 🚀 RepairHub Pro - Vultr Deployment
echo ====================================
echo.
echo This will create a new server on Vultr with automatic deployment
echo of the RepairHub Pro application.
echo.
echo Requirements:
echo ✅ Vultr API Key: WQVRXDQWELSA5ZIE3HZWVHJTZQE7JX7IK5ZA
echo ✅ Windows with PowerShell
echo ✅ SSH client
echo.
echo What will be deployed:
echo 🖥️ New Ubuntu 22.04 server in Frankfurt region
echo 🐳 Docker + Docker Compose setup
echo ⚛️ React + TypeScript + Tailwind CSS application
echo 🌐 Nginx web server on port 80
echo 🔒 Security headers and CSP configured
echo.
echo URLs after deployment:
echo 🌐 http://repairhub.one (main domain)
echo 🌐 http://[SERVER_IP] (direct IP)
echo.
echo Estimated time: 3-5 minutes
echo.
pause

echo.
echo 🚀 Starting deployment...
powershell -ExecutionPolicy Bypass -File "create-vultr-server.ps1"

echo.
echo ✅ Deployment completed!
echo.
echo 📋 Next steps:
echo 1. Wait 3-5 minutes for server setup
echo 2. Check application: curl http://repairhub.one
echo 3. SSH access: ssh -i %USERPROFILE%\.ssh\vultr_key root@[SERVER_IP]
echo.
echo 📚 Documentation: README-DEPLOYMENT.md
echo.
pause

