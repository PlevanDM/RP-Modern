# 🗄️ НАЛАШТУВАННЯ БАЗИ ДАНИХ

## 📋 ПЛАН УСТАНОВКИ

### 1️⃣ PostgreSQL
- Зберігання користувачів
- Зберігання замовлень
- Зберігання пропозицій
- Зберігання чатів

### 2️⃣ Redis
- Кешування сесій
- Блокування повторних запитів
- Тимчасові дані

### 3️⃣ План дій

1. **Додати PostgreSQL в docker-compose.yml**
2. **Додати Redis в docker-compose.yml**
3. **Налаштувати підключення**
4. **Створити міграції**
5. **Запустити seed дані**

---

## 📝 КОМПОНЕНТИ БАЗИ ДАНИХ

### PostgreSQL Tables:

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  phone VARCHAR(50),
  city VARCHAR(255),
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES users(id),
  master_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  device VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  price DECIMAL(10,2),
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Proposals
CREATE TABLE proposals (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  master_id UUID REFERENCES users(id),
  price DECIMAL(10,2) NOT NULL,
  comment TEXT,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  from_id UUID REFERENCES users(id),
  to_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 МОДИФІКАЦІЯ DOCKER-COMPOSE

Файл `docker-compose.yml` має бути:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:80"
    environment:
      - POSTGRES_HOST=postgres
      - POSTGRES_DB=repairhub
      - POSTGRES_USER=repairhub
      - POSTGRES_PASSWORD=your_password
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=repairhub
      - POSTGRES_USER=repairhub
      - POSTGRES_PASSWORD=your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## 📌 НАСТУПНІ КРОКИ

1. ✅ Запустити сервер (IN PROGRESS)
2. ⏳ Додати PostgreSQL в docker-compose.yml
3. ⏳ Додати Redis в docker-compose.yml
4. ⏳ Налаштувати підключення
5. ⏳ Створити міграції
6. ⏳ Протестувати підключення

