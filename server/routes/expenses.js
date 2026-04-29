const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses for a user
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email required' });

    // We map id to _id on the frontend later, or we can send id alias
    const expenses = await Expense.find({ userEmail: email }).sort({ date: -1 });
    // Transform _id to id so frontend needs fewer changes
    const formatted = expenses.map(e => ({
      id: e._id.toString(),
      title: e.title,
      amount: e.amount,
      category: e.category,
      date: e.date,
      note: e.note,
      userEmail: e.userEmail
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an expense
router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const saved = await newExpense.save();

    res.status(201).json({
      id: saved._id.toString(),
      title: saved.title,
      amount: saved.amount,
      category: saved.category,
      date: saved.date,
      note: saved.note,
      userEmail: saved.userEmail
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });

    res.json({
      id: updated._id.toString(),
      title: updated.title,
      amount: updated.amount,
      category: updated.category,
      date: updated.date,
      note: updated.note,
      userEmail: updated.userEmail
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
