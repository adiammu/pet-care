import { Router } from 'express';
import { query } from '../db.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

// Generate or fetch bill for an appointment owned by the user
router.post('/:appointmentId/generate', async (req, res) => {
  const { appointmentId } = req.params;
  const apptRows = await query('SELECT * FROM appointments WHERE id=? AND user_id=?', [appointmentId, req.user.id]);
  if (!apptRows.length) return res.status(404).json({ error: 'Appointment not found' });
  const items = await query(
    'SELECT s.id, s.name, s.price_cents, asv.quantity FROM appointment_services asv JOIN services s ON s.id=asv.service_id WHERE asv.appointment_id=?',
    [appointmentId]
  );
  const subtotal = items.reduce((sum, item) => sum + item.price_cents * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1); // 10% tax example
  const total = subtotal + tax;
  const existing = await query('SELECT * FROM bills WHERE appointment_id=?', [appointmentId]);
  if (existing.length) {
    return res.json(existing[0]);
  }
  const result = await query(
    'INSERT INTO bills (appointment_id, subtotal_cents, tax_cents, total_cents, paid) VALUES (?,?,?,?,0)',
    [appointmentId, subtotal, tax, total]
  );
  const bill = await query('SELECT * FROM bills WHERE id=?', [result.insertId]);
  res.status(201).json(bill[0]);
});

router.get('/my', async (req, res) => {
  const rows = await query(
    'SELECT b.*, a.start_at, a.end_at FROM bills b JOIN appointments a ON a.id=b.appointment_id WHERE a.user_id=? ORDER BY b.generated_at DESC',
    [req.user.id]
  );
  res.json(rows);
});

// Admin mark paid
router.patch('/:id/paid', requireAdmin, async (req, res) => {
  const { id } = req.params;
  await query('UPDATE bills SET paid=1 WHERE id=?', [id]);
  const bill = await query('SELECT * FROM bills WHERE id=?', [id]);
  if (!bill.length) return res.status(404).json({ error: 'Not found' });
  res.json(bill[0]);
});

export default router;



