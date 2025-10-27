import express from 'express';
import cors from 'cors';
import { mockUsers, mockOrders } from '../src/utils/mockData';
import { User, Order } from '../src/types';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let users: User[] = [...mockUsers];
let orders: Order[] = [...mockOrders];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser: User = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder: Order = req.body;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const newUser: User = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
