#!/bin/bash
# RP-Modern Startup Script
set -e
echo "🚀 Запуск RP-Modern..."
echo ""
# Перевірка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не встановлено"
    exit 1
fi
echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""
# Backend
echo "🚀 Backend на http://localhost:3001"
cd server && npx tsx server.ts &
BACKEND_PID=$!
sleep 2
cd ..
# Frontend
echo "🚀 Frontend на http://localhost:5173"
npm run dev
trap "kill $BACKEND_PID 2>/dev/null" EXIT
