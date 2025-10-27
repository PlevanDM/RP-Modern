import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

import { mockUsers, mockOrders } from '../src/utils/mockData.js';
import { User, Order } from '../src/types/index.js';

// Define the structure of our database
interface DbData {
  users: User[];
  orders: Order[];
}

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure the database file path
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile<DbData>(file);
const db = new Low<DbData>(adapter);

// Function to initialize the database
async function initializeDatabase() {
  await db.read();
  // If the database is empty, seed it with mock data
  if (!db.data || !db.data.users || !db.data.orders) {
    console.log('Database is empty or malformed. Seeding with initial data...');
    db.data = { users: mockUsers, orders: mockOrders };
    await db.write();
    console.log('Database seeded successfully.');
  } else {
    console.log('Database already initialized.');
  }
}

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- API Routes ---

// Get all users
app.get('/api/users', async (req, res) => {
  await db.read();
  res.json(db.data.users);
});

// Create a new user (used internally, registration has its own endpoint)
app.post('/api/users', async (req, res) => {
  const newUser: User = req.body;
  db.data.users.push(newUser);
  await db.write();
  res.status(201).json(newUser);
});

// Block a user
app.post('/api/users/:id/block', async (req, res) => {
  const userId = req.params.id;
  await db.read();
  const user = db.data.users.find((u) => u.id === userId);
  if (user) {
    user.blocked = true;
    await db.write();
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Unblock a user
app.post('/api/users/:id/unblock', async (req, res) => {
  const userId = req.params.id;
  await db.read();
  const user = db.data.users.find((u) => u.id === userId);
  if (user) {
    user.blocked = false;
    await db.write();
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  await db.read();
  res.json(db.data.orders);
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  const newOrder: Order = { ...req.body, id: `order-${Date.now()}` }; // Ensure unique ID
  db.data.orders.push(newOrder);
  await db.write();
  res.status(201).json(newOrder);
});

// --- Authentication Routes ---

// Login a user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  await db.read();
  const user = db.data.users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Register a new user
app.post('/api/auth/register', async (req, res) => {
    // Basic validation
    if (!req.body.email || !req.body.name) {
        return res.status(400).json({ message: 'Email and name are required.' });
    }
  const newUser: User = { ...req.body, id: `user-${Date.now()}` }; // Ensure unique ID
  db.data.users.push(newUser);
  await db.write();
  res.status(201).json(newUser);
});


// Initialize the database and then start the server
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => {
    console.error("Failed to initialize database and start server:", error);
});
