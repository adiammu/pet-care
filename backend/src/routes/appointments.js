import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import QRCode from 'qrcode';

const router = Router();

// User routes
router.use(requireAuth);

router.get('/', async (req, res) => {
  const rows = await query(
    'SELECT a.*, p.name AS pet_name FROM appointments a JOIN pets p ON p.id=a.pet_id WHERE a.user_id=? ORDER BY a.start_at DESC',
    [req.user.id]
  );
  res.json(rows);
});

router.post(
  '/',
  [
    body('pet_id').isInt({ min: 1 }),
    body('start_at').isISO8601(),
    body('end_at').isISO8601(),
    body('service_ids').isArray({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { pet_id, start_at, end_at, service_ids, notes } = req.body;
    // Ensure pet belongs to user
    const petRows = await query('SELECT id FROM pets WHERE id=? AND user_id=?', [pet_id, req.user.id]);
    if (!petRows.length) return res.status(400).json({ error: 'Invalid pet' });
    const result = await query(
      'INSERT INTO appointments (user_id, pet_id, start_at, end_at, status, notes) VALUES (?,?,?,?,?,?)',
      [req.user.id, pet_id, start_at, end_at, 'booked', notes || null]
    );
    const appointmentId = result.insertId;
    for (const sid of service_ids) {
      await query('INSERT INTO appointment_services (appointment_id, service_id, quantity) VALUES (?,?,?)', [
        appointmentId,
        sid,
        1
      ]);
    }
    const qrPayload = JSON.stringify({ appointmentId, userId: req.user.id });
    const qrDataUrl = await QRCode.toDataURL(qrPayload);
    await query('UPDATE appointments SET qr_code=? WHERE id=?', [qrDataUrl, appointmentId]);
    const appt = await query('SELECT * FROM appointments WHERE id=?', [appointmentId]);
    res.status(201).json(appt[0]);
  }
);

router.patch('/:id/status', [body('status').isIn(['booked','under_care','medication_given','completed','cancelled'])], async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const rows = await query('SELECT * FROM appointments WHERE id=? AND user_id=?', [id, req.user.id]);
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  await query('UPDATE appointments SET status=? WHERE id=?', [req.body.status, id]);
  const appt = await query('SELECT * FROM appointments WHERE id=?', [id]);
  res.json(appt[0]);
});

// Admin-only views
router.get('/admin/all', requireAdmin, async (req, res) => {
  const rows = await query(
    'SELECT a.*, p.name AS pet_name, u.full_name AS user_name FROM appointments a JOIN pets p ON p.id=a.pet_id JOIN users u ON u.id=a.user_id ORDER BY a.start_at DESC'
  );
  res.json(rows);
});

export default router;



