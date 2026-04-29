import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/constants';

const EMPTY = { title: '', amount: '', date: new Date().toISOString().slice(0, 10), category: 'Food', note: '' };

export default function ExpenseModal({ mode, expense, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(mode === 'edit' && expense ? { ...expense } : EMPTY);
  }, [mode, expense]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.title.trim() || !form.amount || !form.date) return;
    onSave({ ...form, amount: parseFloat(form.amount) });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">
          {mode === 'add' ? 'Add Expense' : 'Edit Expense'}
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input placeholder="e.g. Coffee" value={form.title} onChange={(e) => set('title', e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input type="number" placeholder="0" value={form.amount} onChange={(e) => set('amount', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Note (optional)</label>
          <input placeholder="Any note..." value={form.note} onChange={(e) => set('note', e.target.value)} />
        </div>

        <div className="modal-btns">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" style={{ margin: 0 }} onClick={handleSave}>
            {mode === 'add' ? 'Add Expense' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}
