import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User, Order, Offer, Dispute, Review, Payment, Notification, Part } from '../src/types/models';
import { allDevicesDatabase } from './data/deviceDatabase.js';
import * as businessLogic from './businessLogic.js';

// --- DATABASE SETUP ---
interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  errorType?: 'network' | 'api' | 'validation' | 'auth' | 'unknown';
  statusCode?: number;
  retryable?: boolean;
  userMessage?: string;
  suggestions?: string[];
  userId?: string;
  serverTimestamp?: string;
  ip?: string;
}

interface DbData {
  users: User[];
  orders: Order[];
  offers: Offer[];
  payments: Payment[];
  disputes: Dispute[];
  reviews: Review[];
  notifications: Notification[];
  errorLogs?: ErrorLog[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile<DbData>(file);
const defaultData: DbData = { users: [], orders: [], offers: [], payments: [], disputes: [], reviews: [], notifications: [], errorLogs: [] };
const db = new Low<DbData>(adapter, defaultData);

async function initializeDatabase() {
  await db.read();
  if (!db.data) {
    db.data = { users: [], orders: [], offers: [], payments: [], disputes: [], reviews: [], notifications: [], errorLogs: [] };
    await db.write();
  }
  
  // Initialize test users if empty
  if (db.data.users.length === 0) {
    console.log('📝 Initializing test users...');
    
    const testUsers: User[] = [
      {
        id: 'test-client-1',
        name: 'Test Client',
        email: 'client@test.com',
        role: 'client',
        city: 'Київ',
        phone: '+380501234567',
        avatar: '',
        balance: 0,
        skills: [],
        specialization: 'Client',
        verified: true,
        blocked: false,
        completedOrders: 0,
        rating: 0
      },
      {
        id: 'test-master-1',
        name: 'Test Master',
        email: 'master@test.com',
        role: 'master',
        city: 'Київ',
        phone: '+380509876543',
        avatar: '',
        balance: 0,
        skills: ['iPhone Repair', 'Screen Replacement'],
        specialization: 'iPhone Specialist',
        verified: true,
        blocked: false,
        completedOrders: 0,
        rating: 4.8
      },
      {
        id: 'test-admin-1',
        name: 'Admin',
        email: 'admin@test.com',
        role: 'admin',
        city: 'Київ',
        phone: '+380500000000',
        avatar: '',
        balance: 0,
        skills: [],
        specialization: 'Administrator',
        verified: true,
        blocked: false,
        completedOrders: 0,
        rating: 0
      },
      {
        id: 'test-superadmin-1',
        name: 'Super Admin',
        email: 'superadmin@test.com',
        role: 'superadmin',
        city: 'Київ',
        phone: '+380500000001',
        avatar: '',
        balance: 0,
        skills: [],
        specialization: 'Super Administrator',
        verified: true,
        blocked: false,
        completedOrders: 0,
        rating: 0
      }
    ];
    
    // Hash passwords
    for (const user of testUsers) {
      user.password = await bcrypt.hash('password123', 10);
      db.data.users.push(user);
    }
    
    await db.write();
    console.log('✅ Test users initialized:', testUsers.length);
  }
  
  console.log('✅ Database initialized.');
}

// --- NOTIFICATION HELPER ---
async function createNotification(userId: string, message: string, type: 'order' | 'message' | 'status' | 'rating' = 'order') {
    const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId,
        message,
        type,
        read: false,
        createdAt: new Date(),
    };
    db.data.notifications.push(newNotification);
    await db.write();
    return newNotification;
}

// --- EXPRESS APP SETUP ---
const app = express();
const port = 3001;
const JWT_SECRET = 'your_super_secret_key_change_in_production'; // Replace with env variable

// CORS configuration for public access via tunnels
app.use(cors({
  origin: (origin, callback) => {
    // Allow all origins (including null for same-origin requests)
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Handle preflight requests explicitly for all routes
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(express.json());

// --- AUTHENTICATION ---

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name, city, specialization, role = 'client' } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Email, password, and name are required.' });
  }

  await db.read();
  const existingUser = db.data.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    password: hashedPassword,
    name,
    city: city || '',
    specialization: specialization || '',
    role,
    verified: false,
    blocked: false,
    balance: 0,
    rating: 0,
    skills: [],
    avatar: ''
    // Add other default fields from User type
  };

  db.data.users.push(newUser);
  await db.write();

  const token = jwt.sign({ userId: newUser.id, role: newUser.role, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
});

// Login a user (password is required if user has a password in database)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  await db.read();
  const user = db.data.users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // If user has a password in database, password is required
  if (user.password) {
    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
  } else {
    // If user doesn't have a password, allow login without password (for legacy users)
    // But in production, this should not happen
  }

  if (user.blocked) {
      return res.status(403).json({ message: 'Your account has been blocked.' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  // Return all necessary user data (without password)
  const { password: _, ...userData } = user;
  res.json({ token, user: userData });
});


// --- MIDDLEWARE ---

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: User;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; role: User['role']; iat: number; exp: number };

    await db.read();
    const user = db.data.users.find(u => u.id === payload.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (user.blocked) {
      return res.status(403).json({ message: 'User account is blocked.' });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

const requireRole = (roles: Array<User['role']>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied. Required role: ${roles.join(' or ')}` });
    }
    next();
  };
};


// --- MIDDLEWARE to fetch and attach order to request ---
const getOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await db.read();
  const order = db.data.orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }
  (req as AuthRequest & { order: Order }).order = order; // Attach order to request
  next();
};

const getOffer = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await db.read();
    const offer = db.data.offers.find(o => o.id === id);
    if (!offer) {
        return res.status(404).json({ message: 'Offer not found.' });
    }
    (req as AuthRequest & { offer: Offer }).offer = offer; // Attach offer to request
    next();
};

// 3. Check order ownership (for protected order operations)
const _checkOrderOwnership = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.user!;
    
    await db.read();
    const order = db.data.orders.find(o => o.id === id);
    
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    
    // Admin can access any order
    if (user.role === 'admin' || user.role === 'superadmin') {
        (req as AuthRequest & { order: Order }).order = order;
        return next();
    }
    
    // Check ownership: client OR master OR admin
    if (order.clientId !== user.id && order.masterId !== user.id) {
        return res.status(403).json({ message: 'You do not have permission to access this order.' });
    }
    
    (req as AuthRequest & { order: Order }).order = order;
    next();
};


// --- OFFER MANAGEMENT API ---

// 1. Create an offer for an order
app.post('/api/offers', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const { orderId, price, description, estimatedDays } = req.body;
    const master = req.user!;

    if (!orderId || !price || !description) {
        return res.status(400).json({ message: 'orderId, price, and description are required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    if (order.status !== 'open') {
        return res.status(403).json({ message: 'You can only make offers on open orders.' });
    }

    const activeOffers = db.data.offers.filter(o => o.masterId === master.id && o.status === 'pending');
    if (activeOffers.length >= 5) {
        return res.status(403).json({ message: 'You have reached the maximum limit of 5 active offers.' });
    }

    const newOffer: Offer = {
        id: `offer-${Date.now()}`,
        orderId,
        masterId: master.id,
        masterName: master.name,
        masterRating: master.rating,
        price,
        description,
        estimatedDays: estimatedDays || 1,
        status: 'pending',
        createdAt: new Date(),
        masterAvatar: master.avatar
    };

    db.data.offers.push(newOffer);
    order.proposalCount = (order.proposalCount || 0) + 1; // Increment proposal count
    await db.write();

    res.status(201).json(newOffer);
});

// 2. Get all offers for a specific order
app.get('/api/offers', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { orderId } = req.query;
    if (!orderId) {
        return res.status(400).json({ message: 'orderId query parameter is required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }

    // Security check: Only client who owns the order or an admin can see offers
    if (req.user!.role !== 'admin' && req.user!.id !== order.clientId) {
        return res.status(403).json({ message: 'You are not authorized to view offers for this order.' });
    }

    const offers = db.data.offers.filter(o => o.orderId === orderId);
    res.json(offers);
});

// 3. Accept an offer
app.post('/api/offers/:id/accept', authMiddleware, requireRole(['client']), getOffer, async (req: AuthRequest, res: Response) => {
    const client = req.user!;
    const offerToAccept = (req as AuthRequest & { offer: Offer }).offer;

    await db.read();
    const order = db.data.orders.find(o => o.id === offerToAccept.orderId);

    if (!order) {
        return res.status(404).json({ message: 'Associated order not found.' });
    }
    if (order.clientId !== client.id) {
        return res.status(403).json({ message: 'You can only accept offers for your own orders.' });
    }
    if (order.status !== 'open') {
        return res.status(403).json({ message: 'This order is no longer open for offers.' });
    }

    // --- Critical Transaction Logic ---
    // 1. Update order
    order.status = 'accepted';
    order.masterId = offerToAccept.masterId;
    order.agreedPrice = offerToAccept.price;
    order.updatedAt = new Date();

    // 2. Update the accepted offer
    offerToAccept.status = 'accepted';

    // 3. Reject all other offers for this order
    const otherOffers = db.data.offers.filter(o => o.orderId === order.id && o.id !== offerToAccept.id);
    otherOffers.forEach(offer => {
        offer.status = 'rejected';
    });

    await db.write();

    // Notify the master
    await createNotification(offerToAccept.masterId, `Your offer for "${order.title}" has been accepted.`, 'order');

    res.json({ message: 'Offer accepted successfully.', order });
});

// 4. Retract/Delete an offer (by master)
app.delete('/api/offers/:id', authMiddleware, requireRole(['master']), getOffer, async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const offer = (req as AuthRequest & { offer: Offer }).offer;

    if (offer.masterId !== master.id) {
        return res.status(403).json({ message: 'You can only delete your own offers.' });
    }
    if (offer.status !== 'pending') {
        return res.status(403).json({ message: 'You can only delete offers that are still pending.' });
    }

    // Soft delete or hard delete. For now, hard delete.
    db.data.offers = db.data.offers.filter(o => o.id !== offer.id);

    // Decrement proposal count on the order
    const order = db.data.orders.find(o => o.id === offer.orderId);
    if(order) {
        order.proposalCount = Math.max(0, (order.proposalCount || 1) - 1);
    }

    await db.write();

    res.status(204).send(); // No Content
});


// --- PAYMENT & WORKFLOW API (v2.0 Architecture) ---

// 1. Client pays for an accepted order (moves money to escrow)
// POST /api/payments
app.post('/api/payments', authMiddleware, requireRole(['client']), async (req: AuthRequest, res: Response) => {
    const { orderId, amount } = req.body;
    const client = req.user!;

    if (!orderId || !amount) {
        return res.status(400).json({ message: 'orderId and amount are required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }

    // Use business logic check
    if (!businessLogic.canCreatePayment(client, order)) {
        return res.status(403).json({ message: 'Cannot create payment for this order.' });
    }

    // Create Payment object
    const paymentId = `payment-${Date.now()}`;
    const commission = 0.05; // 5% platform commission (as per ARCHITECTURE.md)
    const payment: Payment = {
        id: paymentId,
        orderId: order.id,
        amount: amount,
        status: 'escrowed',
        commission: commission,
        createdAt: new Date()
    };

    // --- Transaction: Update order and create payment ---
    order.status = 'in_progress';
    order.paymentStatus = 'escrowed';
    order.paymentAmount = amount;
    order.paymentDate = new Date();
    order.escrowId = paymentId;
    order.updatedAt = new Date();

    // Add payment to database
    db.data.payments.push(payment);
    await db.write();

    // Notify the master
    if (order.masterId) {
        await createNotification(order.masterId, `Payment for "${order.title}" has been received.`, 'status');
    }

    res.json({ message: 'Payment successful. Order is now in progress.', payment, order });
});

// 2. Client releases payment upon work completion
// POST /api/payments/:orderId/release
app.post('/api/payments/:orderId/release', authMiddleware, requireRole(['client']), async (req: AuthRequest, res: Response) => {
    const { orderId } = req.params;
    const client = req.user!;

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    
    // Use business logic check
    if (!businessLogic.canReleasePayment(client, order)) {
        return res.status(403).json({ message: 'Cannot release payment for this order.' });
    }

    // Find payment
    const payment = db.data.payments.find(p => p.orderId === orderId);
    if (!payment) {
        return res.status(404).json({ message: 'Payment not found.' });
    }
    if (payment.status !== 'escrowed') {
        return res.status(403).json({ message: 'Payment is not in escrow status.' });
    }

    const master = db.data.users.find(u => u.id === order.masterId);
    if (!master) {
        return res.status(500).json({ message: 'Master for this order not found.' });
    }

    // --- Critical Transaction: Release payment ---
    // 1. Calculate earnings (amount * (1 - commission))
    const earnings = payment.amount * (1 - payment.commission);
    const platformEarnings = payment.amount * payment.commission;

    // 2. Update master's balance (payment.amount * (1 - commission))
    master.balance += earnings;
    master.completedOrders = (master.completedOrders || 0) + 1;

    // 3. Update payment status
    payment.status = 'released';
    payment.releasedAt = new Date();

    // 4. Update order status
    order.status = 'completed';
    order.paymentStatus = 'released';
    order.releaseDate = new Date();
    order.completedAt = new Date();
    order.updatedAt = new Date();

    await db.write();

    res.json({ 
        message: `Payment of ${earnings} released to master successfully. Platform commission: ${platformEarnings}`, 
        payment,
        order 
    });

    // Notify the master
    if (order.masterId) {
        await createNotification(order.masterId, `Payment for "${order.title}" has been released to your account.`, 'status');
    }
});

// 3. Master notifies that work has started
app.post('/api/orders/:id/start', authMiddleware, requireRole(['master']), getOrder, async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const order = (req as AuthRequest & { order: Order }).order;

    if(order.masterId !== master.id) {
        return res.status(403).json({ message: 'You are not the assigned master for this order.' });
    }
    // This endpoint is mostly for notification/logging purposes. The status is already set by payment.
    console.log(`Master ${master.name} has officially started work on order ${order.id}`);

    res.json({ message: 'Work started notification sent.' });
});

// 4. Master notifies that work is finished
app.post('/api/orders/:id/finish', authMiddleware, requireRole(['master']), getOrder, async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const order = (req as AuthRequest & { order: Order }).order;

    if(order.masterId !== master.id) {
        return res.status(403).json({ message: 'You are not the assigned master for this order.' });
    }
    // This notifies the client that the work is done and they should check and release the payment.
    // The status remains 'in_progress' until the client releases the funds.
    order.updatedAt = new Date();
    // We could add a new field like `workFinishedAt` if needed.

    await db.write();

    // Notify the client
    await createNotification(order.clientId, `The master has finished working on your order: "${order.title}".`, 'status');

    res.json({ message: 'Client has been notified that work is finished. Awaiting payment release.' });
});


// --- ORDER MANAGEMENT API ---

// 1. Create a new order
app.post('/api/orders', authMiddleware, requireRole(['client']), async (req: AuthRequest, res: Response) => {
  const { title, description, device, budget, urgency } = req.body;
  const user = req.user!;

  if (!title || !description || !device) {
    return res.status(400).json({ message: 'Title, description, and device are required.' });
  }

  // Use business logic check
  const canCreate = await businessLogic.canCreateOrder(user, db);
  if (!canCreate) {
    return res.status(403).json({ message: 'You have reached the maximum limit of 10 active orders.' });
  }

  const newOrder: Order = {
    id: `order-${Date.now()}`,
    clientId: user.id,
    clientName: user.name,
    title,
    description,
    device,
    city: user.city,
    budget: budget || 0,
    urgency: urgency || 'medium',
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date(),
    proposalCount: 0,
    // Initialize other fields...
    deviceType: 'Other',
    issue: '',
    paymentStatus: 'pending',
    paymentAmount: 0,
    escrowId: '',
    paymentDate: new Date(),
    paymentMethod: 'card',
    disputeStatus: 'none'
  };

  await db.read();
  db.data.orders.push(newOrder);
  await db.write();

  // Notify all masters about the new order
  const masters = db.data.users.filter(u => u.role === 'master');
  for (const master of masters) {
    await createNotification(master.id, `New order available: "${newOrder.title}"`, 'order');
  }

  res.status(201).json(newOrder);
});

// 2. Get orders (logic depends on user role)
app.get('/api/orders', authMiddleware, async (req: AuthRequest, res: Response) => {
  await db.read();
  const user = req.user!;
  let allUserOrders;

  if (user.role === 'client') {
    allUserOrders = db.data.orders.filter(o => o.clientId === user.id);
  } else if (user.role === 'master') {
    allUserOrders = db.data.orders.filter(o => o.status === 'open' || o.masterId === user.id);
  } else { // admin or superadmin
    allUserOrders = db.data.orders;
  }

  // Filtering
  const { status, searchTerm } = req.query;
  if (status && status !== 'all') {
    allUserOrders = allUserOrders.filter(o => o.status === status);
  }
  if (searchTerm) {
    const lowercasedSearch = (searchTerm as string).toLowerCase();
    allUserOrders = allUserOrders.filter(o =>
      o.title.toLowerCase().includes(lowercasedSearch) ||
      o.device.toLowerCase().includes(lowercasedSearch) ||
      o.issue.toLowerCase().includes(lowercasedSearch)
    );
  }

  // Sorting
  const { sortBy } = req.query;
  if (sortBy === 'price') {
    allUserOrders.sort((a, b) => (b.agreedPrice || 0) - (a.agreedPrice || 0));
  } else { // Default sort by date
    allUserOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Pagination
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedOrders = allUserOrders.slice(startIndex, endIndex);
  const totalOrders = allUserOrders.length;

  res.json({
    orders: paginatedOrders,
    totalOrders,
    currentPage: page,
    totalPages: Math.ceil(totalOrders / limit),
  });
});

// 3. Get a single order by ID
app.get('/api/orders/:id', authMiddleware, getOrder, async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const order = (req as AuthRequest & { order: Order }).order;

  // Ownership check
  if (user.role !== 'admin' && user.role !== 'superadmin' && user.id !== order.clientId && user.id !== order.masterId) {
      return res.status(403).json({ message: 'You do not have permission to view this order.' });
  }

  res.json(order);
});

// 4. Update an order
app.patch('/api/orders/:id', authMiddleware, requireRole(['client']), getOrder, async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const order = (req as AuthRequest & { order: Order }).order;

  // Check ownership and status
  if (order.clientId !== user.id) {
    return res.status(403).json({ message: 'You can only edit your own orders.' });
  }
  if (order.status !== 'open') {
    return res.status(403).json({ message: 'You can only edit orders that are currently open.' });
  }

  // Update logic
  const { title, description, budget } = req.body;
  if (title) order.title = title;
  if (description) order.description = description;
  if (budget) order.budget = budget;
  order.updatedAt = new Date();

  await db.write();
  res.json(order);
});

// 5. Cancel an order
app.post('/api/orders/:id/cancel', authMiddleware, requireRole(['client', 'admin']), getOrder, async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const order = (req as AuthRequest & { order: Order }).order;

    // Client cancellation logic
    if (user.role === 'client') {
        if (order.clientId !== user.id) {
            return res.status(403).json({ message: 'You can only cancel your own orders.' });
        }
        if (order.status !== 'open' && order.status !== 'accepted') {
            return res.status(403).json({ message: 'You can only cancel an order before work has started. Please open a dispute if needed.' });
        }
    }

    // Admin can cancel any order, but for now, we just handle the status change
    order.status = 'cancelled';
    order.updatedAt = new Date();
    await db.write();

    res.json({ message: 'Order has been cancelled.', order });
});


// --- API ROUTES ---

// Example of a protected route
app.get('/api/profile/me', authMiddleware, (req: AuthRequest, res: Response) => {
    // req.user is guaranteed to be defined here by the middleware
    const { password: _password, ...userProfile } = req.user!;
    res.json(userProfile);
});

// Update user's own profile
// Update user profile by userId (для Profile компонента)
app.patch('/api/users/:userId', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { userId } = req.params;
  const user = req.user!;
  
  // Користувач може оновлювати тільки свій профіль, адмін - будь-який
  if (user.id !== userId && user.role !== 'admin' && user.role !== 'superadmin') {
    return res.status(403).json({ message: 'You can only update your own profile.' });
  }

  await db.read();
  const userToUpdate = db.data.users.find(u => u.id === userId);
  if (!userToUpdate) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const { name, email, phone, city, bio, avatar } = req.body;
  
  if (name) userToUpdate.name = name;
  if (email) userToUpdate.email = email;
  if (phone) userToUpdate.phone = phone;
  if (city) userToUpdate.city = city;
  if (bio !== undefined) userToUpdate.bio = bio;
  if (avatar) userToUpdate.avatar = avatar;

  await db.write();

  const { password: _, ...updatedUser } = userToUpdate;
  res.json(updatedUser);
});

// Update user profile (старий endpoint, залишаємо для сумісності)
app.patch('/api/users/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { name, email, phone, city, bio, avatar } = req.body;

    await db.read();
    const userToUpdate = db.data.users.find(u => u.id === user.id);

    if (!userToUpdate) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Update fields if they are provided in the body
    if (name) userToUpdate.name = name;
    if (email) userToUpdate.email = email;
    if (phone) userToUpdate.phone = phone;
    if (city) userToUpdate.city = city;
    if (bio) userToUpdate.bio = bio;
    if (avatar) userToUpdate.avatar = avatar;

    await db.write();

    const { password: _password, ...updatedUser } = userToUpdate;
    res.json(updatedUser);
});

// Get all devices (public route)
// Base API endpoint for health check
app.get('/api', (req, res) => {
  res.json({
    status: 'ok',
    message: 'RepairHub Pro API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login, /api/auth/register',
      users: '/api/users',
      orders: '/api/orders',
      devices: '/api/devices',
      profile: '/api/profile/me'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/devices', (req, res) => {
  res.json(allDevicesDatabase);
});


// --- ADMIN API ---

// Middleware to get user by ID
const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await db.read();
    const user = db.data.users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    (req as AuthRequest & { targetUser: User }).targetUser = user;
    next();
};

// Public endpoint for getting users (for any authenticated user)
app.get('/api/users', authMiddleware, async (req: AuthRequest, res: Response) => {
    await db.read();
    const users = db.data.users.map(u => {
        const { password: _password, ...user } = u;
        return user;
    });
    res.json(users);
});

// 1. Get all users (admin only)
app.get('/api/admin/users', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
    await db.read();
    const users = db.data.users.map(u => {
        const { password: _password, ...user } = u;
        return user;
    });
    res.json(users);
});

// 2. Get a single user
app.get('/api/admin/users/:id', authMiddleware, requireRole(['admin', 'superadmin']), getUser, (req: AuthRequest, res: Response) => {
    const { password: _password, ...user } = (req as AuthRequest & { targetUser: User }).targetUser;
    res.json(user);
});

// 3. Update a user
app.patch('/api/admin/users/:id', authMiddleware, requireRole(['admin', 'superadmin']), getUser, async (req: AuthRequest, res: Response) => {
    const userToUpdate = (req as AuthRequest & { targetUser: User }).targetUser;
    const { role, balance, verified, blocked } = req.body;

    // Update fields if they are provided in the body
    if (role) userToUpdate.role = role;
    if (balance !== undefined) userToUpdate.balance = parseFloat(balance);
    if (verified !== undefined) userToUpdate.verified = verified;
    if (blocked !== undefined) userToUpdate.blocked = blocked;

    await db.write();
    const { password: _password, ...updatedUser } = userToUpdate;
    res.json(updatedUser);
});

// 4. Ban/Unban a user
app.post('/api/admin/users/:id/ban', authMiddleware, requireRole(['admin', 'superadmin']), getUser, async (req: AuthRequest, res: Response) => {
    const targetUser = (req as AuthRequest & { targetUser: User }).targetUser;
    targetUser.blocked = true;
    await db.write();
    res.json({ message: 'User has been banned.' });
});

app.post('/api/admin/users/:id/unban', authMiddleware, requireRole(['admin', 'superadmin']), getUser, async (req: AuthRequest, res: Response) => {
    const targetUser = (req as AuthRequest & { targetUser: User }).targetUser;
    targetUser.blocked = false;
    await db.write();
    res.json({ message: 'User has been unbanned.' });
});

// 5. Get all orders (admin version)
app.get('/api/admin/orders', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
    await db.read();
    res.json(db.data.orders);
});

// 6. Force update an order
app.patch('/api/admin/orders/:id', authMiddleware, requireRole(['admin', 'superadmin']), getOrder, async (req: AuthRequest, res: Response) => {
    const orderToUpdate = (req as AuthRequest & { order: Order }).order;
    const { status, masterId } = req.body;

    if (status) orderToUpdate.status = status;
    if (masterId) orderToUpdate.masterId = masterId;
    orderToUpdate.updatedAt = new Date();

    await db.write();
    res.json(orderToUpdate);
});

// 7. Manually manage escrow payment for an order
app.post('/api/admin/escrow/:orderId/refund', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
    const { orderId } = req.params;
    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);

    if(!order) return res.status(404).json({ message: 'Order not found.' });

    // Simulate refund to client's balance (if you track that)
    order.paymentStatus = 'refunded';
    order.status = 'cancelled'; // Or another appropriate status
    await db.write();

    res.json({ message: 'Payment has been refunded to the client.', order });
});


// --- SUPERADMIN API ---

// Update a user's role (superadmin only)
app.patch('/api/superadmin/users/:id/role', authMiddleware, requireRole(['superadmin']), getUser, async (req: AuthRequest, res: Response) => {
    const userToUpdate = (req as AuthRequest & { targetUser: User }).targetUser;
    const { role } = req.body;

    const allowedRoles: Array<User['role']> = ['client', 'master', 'admin'];

    if (!role || !allowedRoles.includes(role)) {
        return res.status(400).json({ message: `Invalid role. Must be one of: ${allowedRoles.join(', ')}.` });
    }

    // Prevent changing the role of another superadmin
    if (userToUpdate.role === 'superadmin') {
        return res.status(403).json({ message: 'Cannot change the role of a superadmin.' });
    }

    userToUpdate.role = role;

    await db.write();

    const { password: _password, ...updatedUser } = userToUpdate;
    res.json(updatedUser);
});


// --- DISPUTE MANAGEMENT API ---

// 1. Create a dispute for an order
app.post('/api/disputes', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { orderId, reason, description } = req.body;
    const user = req.user!;

    if(!orderId || !reason) {
        return res.status(400).json({ message: 'orderId and reason are required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    // Authorization check
    if (order.clientId !== user.id && order.masterId !== user.id) {
        return res.status(403).json({ message: 'You must be the client or master to open a dispute for this order.' });
    }
    if (order.status !== 'in_progress') {
        return res.status(403).json({ message: 'Disputes can only be opened for orders that are in progress.' });
    }

    // --- Critical Transaction ---
    // 1. Find and freeze payment
    const payment = db.data.payments.find(p => p.orderId === orderId);
    if (payment && payment.status === 'escrowed') {
        payment.status = 'frozen';
    }

    // 2. Change order status
    order.status = 'disputed';
    order.disputeStatus = 'open';

    // 3. Create the dispute record
    const newDispute: Dispute = {
        id: `dispute-${Date.now()}`,
        orderId,
        clientId: order.clientId,
        masterId: order.masterId!,
        reason,
        description: description || '',
        status: 'open',
        createdAt: new Date(),
        resolution: 'Dispute has been opened.'
    };
    db.data.disputes.push(newDispute);

    await db.write();

    res.status(201).json({ 
        message: 'Dispute created successfully. Payment frozen. An admin will review your case.', 
        dispute: newDispute,
        payment: payment || null
    });
});


// 2. Admin resolves a dispute (v2.0 Architecture)
app.post('/api/disputes/:id/resolve', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { decision, explanation } = req.body; // decision: 'client_wins', 'master_wins', 'compromise'

    if (!decision || !['client_wins', 'master_wins', 'compromise'].includes(decision)) {
        return res.status(400).json({ message: "Invalid decision type. Must be 'client_wins', 'master_wins', or 'compromise'." });
    }

    await db.read();
    const dispute = db.data.disputes.find(d => d.id === id);
    if (!dispute) {
        return res.status(404).json({ message: 'Dispute not found.' });
    }
    if (dispute.status !== 'open') {
        return res.status(403).json({ message: 'Dispute is not in open status.' });
    }

    const order = db.data.orders.find(o => o.id === dispute.orderId);
    if (!order) {
        return res.status(500).json({ message: 'Associated order not found.' });
    }

    // Find payment
    const payment = db.data.payments.find(p => p.orderId === order.id);
    if (!payment) {
        return res.status(500).json({ message: 'Payment for this order not found.' });
    }
    if (payment.status !== 'frozen' && payment.status !== 'escrowed') {
        return res.status(403).json({ message: 'Payment is not in frozen or escrowed status.' });
    }

    const master = db.data.users.find(u => u.id === order.masterId);
    if (!master) {
        return res.status(500).json({ message: 'Master for this order not found.' });
    }

    // --- Handle Resolution ---
    dispute.status = 'resolved';
    dispute.resolvedAt = new Date();
    dispute.resolutionBy = req.user!.id;
    dispute.decision = decision as 'client_wins' | 'master_wins' | 'compromise';

    // Handle payment resolution based on decision
    if (decision === 'client_wins') {
        // Full refund to client
        payment.status = 'refunded';
        payment.refundedAt = new Date();
        order.status = 'cancelled';
        order.paymentStatus = 'refunded';
        dispute.resolution = explanation || 'Resolved in favor of the client. Full refund issued.';
        
    } else if (decision === 'master_wins') {
        // Full release to master (same as normal release)
        const earnings = payment.amount * (1 - payment.commission);
        const _platformEarnings = payment.amount * payment.commission;
        
        master.balance += earnings;
        master.completedOrders = (master.completedOrders || 0) + 1;
        
        payment.status = 'released';
        payment.releasedAt = new Date();
        order.status = 'completed';
        order.paymentStatus = 'released';
        order.completedAt = new Date();
        dispute.resolution = explanation || 'Resolved in favor of the master. Payment released.';
        
    } else { // compromise
        // Manual handling - admin decides split
        // For now, mark as resolved but keep payment frozen for manual processing
        payment.status = 'frozen'; // Keep frozen for manual handling
        order.status = 'disputed'; // Keep disputed status
        dispute.resolution = explanation || 'Resolved with compromise. Manual fund distribution required.';
    }

    order.disputeStatus = 'resolved';
    order.updatedAt = new Date();

    await db.write();

    res.json({ 
        message: `Dispute resolved: ${decision}`, 
        dispute,
        order,
        payment
    });
});



// --- REVIEWS & WITHDRAWALS ---

// 1. Create a review for a completed order
app.post('/api/reviews', authMiddleware, requireRole(['client']), async (req: AuthRequest, res: Response) => {
    const { orderId, rating, text } = req.body;
    const client = req.user!;

    if (!orderId || rating === undefined) {
        return res.status(400).json({ message: 'orderId and rating are required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    if (order.clientId !== client.id) return res.status(403).json({ message: 'You can only review your own orders.' });
    if (order.status !== 'completed') return res.status(403).json({ message: 'You can only review completed orders.' });

    const existingReview = db.data.reviews.find(r => r.orderId === orderId && r.authorId === client.id);
    if (existingReview) return res.status(409).json({ message: 'You have already submitted a review for this order.' });

    const newReview: Review = {
        id: `review-${Date.now()}`,
        orderId,
        authorId: client.id,
        authorName: client.name,
        rating: Math.max(0, Math.min(5, rating)), // Clamp rating between 0 and 5
        text: text || '',
        status: 'approved', // Auto-approve for now
        createdAt: new Date(),
    };
    db.data.reviews.push(newReview);

    // Update master's average rating
    const master = db.data.users.find(u => u.id === order.masterId);
    if (master) {
        const masterReviews = db.data.reviews.filter(r => db.data.orders.some(o => o.id === r.orderId && o.masterId === master.id));
        const totalRating = masterReviews.reduce((acc, r) => acc + r.rating, 0);
        master.rating = totalRating / masterReviews.length;
    }

    await db.write();
    res.status(201).json(newReview);
});

// 2. Master requests a withdrawal
app.post('/api/withdrawals', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const { amount } = req.body;
    const master = req.user!;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'A valid amount is required.' });
    }

    await db.read();
    // Re-fetch user from DB to ensure we have the latest balance
    const freshMaster = db.data.users.find(u => u.id === master.id)!;

    if (freshMaster.balance < 500) {
        return res.status(403).json({ message: `Minimum withdrawal amount is 500. Your balance is ${freshMaster.balance}.` });
    }
    if (freshMaster.balance < amount) {
        return res.status(403).json({ message: `Insufficient funds. Your balance is ${freshMaster.balance}.` });
    }

    freshMaster.balance -= amount;
    await db.write();

    // In a real app, this would trigger a payout process.
    res.json({ message: 'Withdrawal request successful.', newBalance: freshMaster.balance });
});


// --- PORTFOLIO API ---

// 1. Get a master's portfolio (public)
app.get('/api/portfolio/:masterId', async (req, res) => {
    const { masterId } = req.params;
    await db.read();
    const master = db.data.users.find(u => u.id === masterId && u.role === 'master');

    if (!master) {
        return res.status(404).json({ message: 'Master not found.' });
    }

    // Ensure portfolio is an array
    const portfolio = master.portfolio || [];
    res.json(portfolio);
});

// 2. Add a new portfolio item (master only)
app.post('/api/portfolio', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const { title, description, photos, images, rating, completedDate, beforeImage, afterImage, price, clientReview, deviceType, issue } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    const newItem = {
        id: `portfolio-${Date.now()}`,
        masterId: master.id,
        title,
        description,
        photos: photos || [],
        images: images || [],
        rating: rating || 0,
        completedDate,
        beforeImage,
        afterImage,
        price,
        clientReview,
        deviceType,
        issue,
    };

    if (!master.portfolio) {
        master.portfolio = [];
    }
    master.portfolio.push(newItem);

    await db.write();
    res.status(201).json(newItem);
});

// 3. Update a portfolio item (master only)
app.put('/api/portfolio/:itemId', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const { itemId } = req.params;
    const { title, description, photos, images, rating, completedDate, beforeImage, afterImage, price, clientReview, deviceType, issue } = req.body;

    if (!master.portfolio) {
        return res.status(404).json({ message: 'Portfolio not found.' });
    }

    const itemIndex = master.portfolio.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Portfolio item not found.' });
    }

    const updatedItem = {
        ...master.portfolio[itemIndex],
        title: title || master.portfolio[itemIndex].title,
        description: description || master.portfolio[itemIndex].description,
        photos: photos || master.portfolio[itemIndex].photos,
        images: images || master.portfolio[itemIndex].images,
        rating: rating || master.portfolio[itemIndex].rating,
        completedDate: completedDate || master.portfolio[itemIndex].completedDate,
        beforeImage: beforeImage || master.portfolio[itemIndex].beforeImage,
        afterImage: afterImage || master.portfolio[itemIndex].afterImage,
        price: price || master.portfolio[itemIndex].price,
        clientReview: clientReview || master.portfolio[itemIndex].clientReview,
        deviceType: deviceType || master.portfolio[itemIndex].deviceType,
        issue: issue || master.portfolio[itemIndex].issue,
    };

    master.portfolio[itemIndex] = updatedItem;

    await db.write();
    res.json(updatedItem);
});

// 4. Delete a portfolio item (master only)
app.delete('/api/portfolio/:itemId', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const { itemId } = req.params;

    if (!master.portfolio) {
        return res.status(404).json({ message: 'Portfolio not found.' });
    }

    const initialLength = master.portfolio.length;
    master.portfolio = master.portfolio.filter(item => item.id !== itemId);

    if (master.portfolio.length === initialLength) {
        return res.status(404).json({ message: 'Portfolio item not found.' });
    }

    await db.write();
    res.status(204).send();
});

// --- NOTIFICATIONS API ---

// 1. Get user's notifications
app.get('/api/notifications', authMiddleware, async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    await db.read();
    const notifications = db.data.notifications.filter(n => n.userId === user.id);
    res.json(notifications);
});

// 2. Mark a notification as read
app.post('/api/notifications/:id/read', authMiddleware, async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    await db.read();
    const notification = db.data.notifications.find(n => n.id === id);

    if (!notification) {
        return res.status(404).json({ message: 'Notification not found.' });
    }

    if (notification.userId !== user.id) {
        return res.status(403).json({ message: 'You can only mark your own notifications as read.' });
    }

    notification.read = true;
    await db.write();

    res.json(notification);
});

// --- PARTS INVENTORY API ---

// 1. Get a master's parts inventory (public)
app.get('/api/inventory/:masterId', async (req, res) => {
    const { masterId } = req.params;
    await db.read();
    const master = db.data.users.find(u => u.id === masterId && u.role === 'master');

    if (!master) {
        return res.status(404).json({ message: 'Master not found.' });
    }

    const inventory = master.partsInventory || [];
    res.json(inventory);
});

// 2. Add a new part to inventory (master only)
app.post('/api/inventory', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const { name, description, price, quantity, image } = req.body;

    if (!name || !description || !price || !quantity) {
        return res.status(400).json({ message: 'Name, description, price, and quantity are required.' });
    }

    const newPart: Part = {
        id: `part-${Date.now()}`,
        masterId: master.id,
        name,
        description,
        price,
        quantity,
        image,
    };

    if (!master.partsInventory) {
        master.partsInventory = [];
    }
    master.partsInventory.push(newPart);

    await db.write();
    res.status(201).json(newPart);
});

// 3. Update a part in inventory (master only)
app.put('/api/inventory/:partId', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const { partId } = req.params;
    const { name, description, price, quantity, image } = req.body;

    if (!master.partsInventory) {
        return res.status(404).json({ message: 'Inventory not found.' });
    }

    const partIndex = master.partsInventory.findIndex(part => part.id === partId);

    if (partIndex === -1) {
        return res.status(404).json({ message: 'Part not found in inventory.' });
    }

    const updatedPart = {
        ...master.partsInventory[partIndex],
        name: name || master.partsInventory[partIndex].name,
        description: description || master.partsInventory[partIndex].description,
        price: price || master.partsInventory[partIndex].price,
        quantity: quantity || master.partsInventory[partIndex].quantity,
        image: image || master.partsInventory[partIndex].image,
    };

    master.partsInventory[partIndex] = updatedPart;

    await db.write();
    res.json(updatedPart);
});

// 4. Delete a part from inventory (master only)
app.delete('/api/inventory/:partId', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const { partId } = req.params;

    if (!master.partsInventory) {
        return res.status(404).json({ message: 'Inventory not found.' });
    }

    const initialLength = master.partsInventory.length;
    master.partsInventory = master.partsInventory.filter(part => part.id !== partId);

    if (master.partsInventory.length === initialLength) {
        return res.status(404).json({ message: 'Part not found in inventory.' });
    }

    await db.write();
    res.status(204).send();
});


// --- SIMULATED CRON JOB for Auto-Release ---
function startAutoReleaseCron() {
    console.log('🔄 Starting cron job for auto-release...');
    setInterval(async () => {
        await db.read();
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const ordersToRelease = db.data.orders.filter(o =>
            o.status === 'in_progress' &&
            o.completedAt && // Assuming master marks it as finished, setting this date
            new Date(o.completedAt) < sevenDaysAgo
        );

        if (ordersToRelease.length > 0) {
            console.log(`[CRON] Found ${ordersToRelease.length} orders to auto-release.`);
            for (const order of ordersToRelease) {
                // Find payment
                const payment = db.data.payments.find(p => p.orderId === order.id);
                if (!payment) continue;
                
                const master = db.data.users.find(u => u.id === order.masterId);
                if (master && payment.status === 'escrowed') {
                    const earnings = payment.amount * (1 - payment.commission);
                    
                    master.balance += earnings;
                    master.completedOrders = (master.completedOrders || 0) + 1;
                    
                    payment.status = 'released';
                    payment.releasedAt = new Date();
                    
                    order.status = 'completed';
                    order.paymentStatus = 'released';
                    order.releaseDate = new Date();
                    console.log(`[CRON] ✅ Auto-released payment for order ${order.id} (${earnings} UAH to master).`);
                }
            }
            await db.write();
        }
    }, 60 * 60 * 1000); // Check every hour
}

// --- AUTO-DISPUTE TIMEOUT Cron Job ---
function startAutoDisputeCron() {
    console.log('⚖️ Starting cron job for auto-dispute timeout...');
    setInterval(async () => {
        await db.read();
        const hours24 = 24 * 60 * 60 * 1000;
        const now = Date.now();
        
        const disputesToResolve = db.data.disputes.filter(d =>
            d.status === 'open' &&
            (now - new Date(d.createdAt).getTime()) >= hours24
        );

        if (disputesToResolve.length > 0) {
            console.log(`[CRON] Found ${disputesToResolve.length} disputes to auto-resolve (client_wins after 24h timeout).`);
            
            for (const dispute of disputesToResolve) {
                const order = db.data.orders.find(o => o.id === dispute.orderId);
                if (!order) continue;
                
                const payment = db.data.payments.find(p => p.orderId === order.id);
                if (!payment || payment.status !== 'frozen') continue;

                // Auto-resolve in favor of client (refund)
                dispute.status = 'resolved';
                dispute.resolvedAt = new Date();
                dispute.decision = 'client_wins';
                dispute.resolution = 'Auto-resolved in favor of client after 24h without master response. Full refund issued.';
                
                payment.status = 'refunded';
                payment.refundedAt = new Date();
                
                order.status = 'cancelled';
                order.paymentStatus = 'refunded';
                order.disputeStatus = 'resolved';
                order.updatedAt = new Date();
                
                console.log(`[CRON] ⚖️ Auto-resolved dispute ${dispute.id} in favor of client (refund).`);
            }
            await db.write();
        }
    }, 60 * 60 * 1000); // Check every hour
}


// --- ERROR LOGGING API ---
// Endpoint for frontend error logging
app.post('/api/errors', async (req, res) => {
  try {
    const errorLog: ErrorLog = req.body;
    
    // Додаємо інформацію про користувача якщо є токен
    const token = req.headers.authorization?.replace('Bearer ', '');
    let userId: string | undefined;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string };
        userId = decoded.userId;
      } catch {
        // Токен невалідний, але це не критично для логування помилок
      }
    }

    await db.read();
    
    // Зберігаємо помилку в базі даних
    if (!db.data.errorLogs) {
      db.data.errorLogs = [];
    }
    
    const logEntry: ErrorLog = {
      ...errorLog,
      userId,
      serverTimestamp: new Date().toISOString(),
      ip: req.ip || req.socket.remoteAddress,
    };
    
    db.data.errorLogs.push(logEntry);
    
    // Обмежуємо кількість логів (останні 1000)
    if (db.data.errorLogs.length > 1000) {
      db.data.errorLogs = db.data.errorLogs.slice(-1000);
    }
    
    await db.write();
    
    console.log(`[ERROR LOG] ${errorLog.errorType || 'unknown'}: ${errorLog.message} (User: ${userId || 'anonymous'})`);
    
    res.status(200).json({ success: true, message: 'Error logged successfully' });
  } catch (error) {
    console.error('Failed to log error:', error);
    res.status(500).json({ success: false, message: 'Failed to log error' });
  }
});

// Get error logs (admin only)
app.get('/api/admin/errors', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
  await db.read();
  const errors = db.data.errorLogs || [];
  
  // Фільтрація за параметрами
  const { type, limit = '100' } = req.query;
  let filteredErrors = errors;
  
  if (type) {
    filteredErrors = errors.filter((e: ErrorLog) => e.errorType === type);
  }
  
  // Сортування за часом (новіші спочатку)
  filteredErrors.sort((a: ErrorLog, b: ErrorLog) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  res.json(filteredErrors.slice(0, Number(limit)));
});

// --- SERVER INITIALIZATION ---
initializeDatabase().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Server is running on http://0.0.0.0:${port}`);
    console.log(`✅ Server accessible at http://localhost:${port}`);
    console.log(`✅ Server accessible from network at http://<your-ip>:${port}`);
    startAutoReleaseCron(); // Start auto-release cron
    startAutoDisputeCron(); // Start auto-dispute timeout cron
  });
}).catch(error => {
  console.error("❌ Failed to initialize and start server:", error);
});
