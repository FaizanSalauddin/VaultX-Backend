import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB, isConnected } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import { isAuthenticated } from './middleware/Auth.js';

const app = express();

// Load environment variables
config({ path: '.env' });

// Middleware
app.use(express.json());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Connect to MongoDB (only once)
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
  }
  next();
});

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/pass', isAuthenticated, passwordRoutes);

export default app;
