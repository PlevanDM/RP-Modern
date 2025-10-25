# Пошаговое развертывание RepairHub Pro на Vultr

## Информация о сервере:
- IP: 45.32.158.217
- Пароль: pH[7)MPXFXAajxvM
- Статус: Сервер доступен (ping работает)

## Инструкции для развертывания:

### 1. Подключение к серверу:
```bash
ssh root@45.32.158.217
# Пароль: pH[7)MPXFXAajxvM
```

### 2. Выполнение команд по порядку:

#### Шаг 1: Обновление системы
```bash
apt update && apt upgrade -y
```

#### Шаг 2: Установка пакетов
```bash
apt install -y curl wget git nginx ufw
```

#### Шаг 3: Установка Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root
```

#### Шаг 4: Установка Docker Compose
```bash
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### Шаг 5: Клонирование проекта
```bash
git clone https://github.com/PlevanDM/RP-Modern.git
cd RP-Modern
git checkout 24.10v3
```

#### Шаг 6: Сборка и запуск
```bash
docker-compose build
docker-compose up -d
```

#### Шаг 7: Проверка статуса
```bash
docker-compose ps
```

### 3. Проверка работы:
После завершения приложение будет доступно:
- HTTP: http://45.32.158.217:3000

### 4. Тестирование:
```bash
# Проверка локально на сервере
curl -I http://localhost:3000

# Проверка извне
curl -I http://45.32.158.217:3000
```

### 5. Полезные команды:
```bash
# Просмотр логов
docker-compose logs -f

# Статус контейнеров
docker-compose ps

# Перезапуск
docker-compose restart
```

## Готово к развертыванию!
