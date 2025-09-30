import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = Router();

// Enhanced password validation
const passwordValidation = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');

// Register endpoint
router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    passwordValidation,
    body('fullName')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Full name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Full name can only contain letters and spaces')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: errors.array().map(err => ({
            field: err.path,
            message: err.msg
          }))
        });
      }

      const { email, password, fullName } = req.body;
      
      // Check if email already exists
      const existing = await query('SELECT id FROM users WHERE email=?', [email]);
      if (existing.length) {
        return res.status(409).json({ error: 'Email address is already registered' });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 12);
      
      // Create user
      const result = await query(
        'INSERT INTO users (email, password_hash, full_name, role) VALUES (?,?,?,?)',
        [email, passwordHash, fullName.trim(), 'user']
      );

      // Generate JWT token
      const user = { 
        id: result.insertId, 
        email, 
        full_name: fullName.trim(), 
        role: 'user' 
      };
      const token = jwt.sign(user, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });

      res.status(201).json({ 
        token, 
        user,
        message: 'Account created successfully! Welcome to PetsCare.'
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to create account. Please try again.' });
    }
  }
);

// Login endpoint
router.post('/login', [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    const { email, password } = req.body;
    
    // Find user
    const rows = await query('SELECT * FROM users WHERE email=?', [email]);
    if (!rows.length) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const userRow = rows[0];
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, userRow.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const user = { 
      id: userRow.id, 
      email: userRow.email, 
      full_name: userRow.full_name, 
      role: userRow.role 
    };
    const token = jwt.sign(user, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });

    res.json({ 
      token, 
      user,
      message: 'Login successful! Welcome back to PetsCare.'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Token verification endpoint
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev');
    
    // Get fresh user data
    const userRows = await query('SELECT id, email, full_name, role FROM users WHERE id=?', [decoded.id]);
    if (!userRows.length) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = userRows[0];
    res.json({ 
      valid: true, 
      user,
      message: 'Token is valid'
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;



