// app.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import { verifyJWT } from './middlewares/auth.middleware.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { asyncHandler } from './src/utils/asyncHandler.js';

// Routes
import authRoutes from './src/services/routes/auth.routes.js';
import userRoutes from './src/services/routes/user.routes.js';
import companyRoutes from './src/services/routes/company.routes.js';
// Add more routes as needed

dotenv.config();

const app = express();

// === Middleware Setup ===

// Load security headers
app.use(helmet());

// Enable logging in dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse JSON & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// === Public Routes ===
app.use('/api/auth', authRoutes);

// === Protected Routes ===
app.use('/api/users', verifyJWT, userRoutes);
app.use('/api/companies', verifyJWT, companyRoutes);
// Add other protected routes like /applications, /emails, etc.

// === Health check ===
app.get('/api/health', asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server healthy 🚀' });
}));

// === Global Error Handler ===
app.use(errorHandler);

export default app;
