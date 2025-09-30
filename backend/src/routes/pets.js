import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  const pets = await query('SELECT * FROM pets WHERE user_id=?', [req.user.id]);
  res.json(pets);
});

router.post(
  '/',
  [body('name').notEmpty(), body('species').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, species, breed, age, notes } = req.body;
    const result = await query(
      'INSERT INTO pets (user_id, name, species, breed, age, notes) VALUES (?,?,?,?,?,?)',
      [req.user.id, name, species, breed || null, age || null, notes || null]
    );
    const pet = await query('SELECT * FROM pets WHERE id=?', [result.insertId]);
    res.status(201).json(pet[0]);
  }
);

router.put(
  '/:id',
  [body('name').optional().notEmpty(), body('species').optional().notEmpty()],
  async (req, res) => {
    const petId = req.params.id;
    const rows = await query('SELECT * FROM pets WHERE id=? AND user_id=?', [petId, req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const { name, species, breed, age, notes } = req.body;
    await query(
      'UPDATE pets SET name=COALESCE(?, name), species=COALESCE(?, species), breed=COALESCE(?, breed), age=COALESCE(?, age), notes=COALESCE(?, notes) WHERE id=?',
      [name ?? null, species ?? null, breed ?? null, age ?? null, notes ?? null, petId]
    );
    const pet = await query('SELECT * FROM pets WHERE id=?', [petId]);
    res.json(pet[0]);
  }
);

router.delete('/:id', async (req, res) => {
  const petId = req.params.id;
  await query('DELETE FROM pets WHERE id=? AND user_id=?', [petId, req.user.id]);
  res.status(204).end();
});

export default router;



