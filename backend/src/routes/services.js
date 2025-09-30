import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Get all active services
router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM services WHERE active=1 ORDER BY name ASC');
    
    // Add additional service details for frontend
    const servicesWithDetails = rows.map(service => ({
      ...service,
      price_display: `₹${(service.price_cents / 100).toFixed(2)}`,
      category: getServiceCategory(service.name),
      duration: getServiceDuration(service.name),
      features: getServiceFeatures(service.name)
    }));
    
    res.json(servicesWithDetails);
  } catch (error) {
    console.error('Services fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get single service by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query('SELECT * FROM services WHERE id=? AND active=1', [id]);
    
    if (!rows.length) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    const service = rows[0];
    const serviceWithDetails = {
      ...service,
      price_display: `₹${(service.price_cents / 100).toFixed(2)}`,
      category: getServiceCategory(service.name),
      duration: getServiceDuration(service.name),
      features: getServiceFeatures(service.name),
      includes: getServiceIncludes(service.name)
    };
    
    res.json(serviceWithDetails);
  } catch (error) {
    console.error('Service fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Create new service (Admin only)
router.post(
  '/',
  requireAuth,
  requireAdmin,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Service name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must be less than 500 characters'),
    body('price_cents')
      .isInt({ min: 100 })
      .withMessage('Price must be at least ₹1.00')
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

      const { name, description, price_cents, active = true } = req.body;
      
      const result = await query(
        'INSERT INTO services (name, description, price_cents, active) VALUES (?,?,?,?)',
        [name.trim(), description?.trim() || null, price_cents, active ? 1 : 0]
      );
      
      const service = await query('SELECT * FROM services WHERE id=?', [result.insertId]);
      
      res.status(201).json({
        ...service[0],
        price_display: `₹${(service[0].price_cents / 100).toFixed(2)}`,
        message: 'Service created successfully'
      });
    } catch (error) {
      console.error('Service creation error:', error);
      res.status(500).json({ error: 'Failed to create service' });
    }
  }
);

// Update service (Admin only)
router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Service name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must be less than 500 characters'),
    body('price_cents')
      .optional()
      .isInt({ min: 100 })
      .withMessage('Price must be at least ₹1.00')
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

      const { id } = req.params;
      const { name, description, price_cents, active } = req.body;
      
      // Check if service exists
      const existingService = await query('SELECT * FROM services WHERE id=?', [id]);
      if (!existingService.length) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      await query(
        'UPDATE services SET name=COALESCE(?,name), description=COALESCE(?,description), price_cents=COALESCE(?,price_cents), active=COALESCE(?,active) WHERE id=?',
        [
          name?.trim() ?? null, 
          description?.trim() ?? null, 
          price_cents ?? null, 
          typeof active === 'boolean' ? (active ? 1 : 0) : null, 
          id
        ]
      );
      
      const service = await query('SELECT * FROM services WHERE id=?', [id]);
      
      res.json({
        ...service[0],
        price_display: `₹${(service[0].price_cents / 100).toFixed(2)}`,
        message: 'Service updated successfully'
      });
    } catch (error) {
      console.error('Service update error:', error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  }
);

// Delete service (Admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if service exists
    const existingService = await query('SELECT * FROM services WHERE id=?', [id]);
    if (!existingService.length) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    // Soft delete by setting active to 0
    await query('UPDATE services SET active=0 WHERE id=?', [id]);
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Service deletion error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Helper functions for service details
function getServiceCategory(serviceName) {
  const name = serviceName.toLowerCase();
  if (name.includes('groom') || name.includes('bath') || name.includes('trim')) return 'Grooming';
  if (name.includes('walk') || name.includes('exercise')) return 'Exercise';
  if (name.includes('medicine') || name.includes('medication') || name.includes('health')) return 'Health';
  if (name.includes('feed') || name.includes('food')) return 'Nutrition';
  return 'General Care';
}

function getServiceDuration(serviceName) {
  const name = serviceName.toLowerCase();
  if (name.includes('groom') || name.includes('bath')) return '2-3 hours';
  if (name.includes('walk')) return '30-60 minutes';
  if (name.includes('medicine') || name.includes('medication')) return '15-30 minutes';
  if (name.includes('feed')) return '15-20 minutes';
  return '1-2 hours';
}

function getServiceFeatures(serviceName) {
  const name = serviceName.toLowerCase();
  if (name.includes('groom')) {
    return ['Professional grooming', 'Nail trimming', 'Ear cleaning', 'Teeth brushing', 'Flea treatment'];
  }
  if (name.includes('walk')) {
    return ['Daily walks', 'Exercise routines', 'Socialization', 'Basic training', 'Health monitoring'];
  }
  if (name.includes('medicine')) {
    return ['Teeth cleaning', 'Dental checkup', 'Oral health assessment', 'Preventive care', 'Treatment planning'];
  }
  if (name.includes('feed')) {
    return ['Premium food', 'Scheduled feeding', 'Portion control', 'Dietary monitoring', 'Clean water'];
  }
  return ['Professional service', 'Quality care', 'Expert attention', 'Safe handling', 'Regular updates'];
}

function getServiceIncludes(serviceName) {
  const name = serviceName.toLowerCase();
  if (name.includes('groom')) {
    return 'Shampoo, conditioner, blow dry, styling';
  }
  if (name.includes('walk')) {
    return 'Leash, treats, waste bags, water';
  }
  if (name.includes('medicine')) {
    return 'Professional cleaning, fluoride treatment, dental report';
  }
  if (name.includes('feed')) {
    return 'Premium products, feeding bowls, water';
  }
  return 'All necessary supplies and equipment';
}

export default router;



