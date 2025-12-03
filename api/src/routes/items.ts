import express from 'express';
import Item from '../models/Item';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all items
router.get('/', auth, async (_req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get one item
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create item
router.post('/', auth, async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Update item
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Delete item
router.delete('/:id', auth, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Adjust quantity
router.post('/:id/adjust', auth, async (req, res) => {
  try {
    const { delta, reason } = req.body;
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity += delta;
    item.changeLog.push({ delta, reason, userId: (req as any).user.id });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Invalid request' });
  }
});

export default router;
