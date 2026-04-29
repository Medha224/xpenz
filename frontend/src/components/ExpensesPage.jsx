import React, { useState } from 'react';
import { CATEGORIES, getCat, fmt } from '../data/constants';

export default function ExpensesPage({ expenses, onAdd, onEdit, onDelete }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  let filtered = expenses;
  if (filter !== 'All') filtered = filtered.filter((e) => e.category === filter);
  if (search)           filtered = filtered.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );
  filtered = [...filtered].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Expenses</div>
          <div className="page-sub">{expenses.length} total transactions</div>
        </div>
        <button className="add-btn" onClick={onAdd}>+ Add Expense</button>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div className="filter-row">
            <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
            {CATEGORIES.slice(0, 5).map((c) => (
              <button
                key={c.name}
                className={`filter-btn ${filter === c.name ? 'active' : ''}`}
                onClick={() => setFilter(c.name)}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
          <input
            className="search-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th><th>Category</th><th>Date</th>
              <th>Note</th><th>Amount</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6">
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  No expenses found
                </div>
              </td></tr>
            ) : filtered.map((e) => {
              const c = getCat(e.category);
              return (
                <tr key={e.id}>
                  <td style={{ fontWeight: 500 }}>{e.title}</td>
                  <td>
                    <span className="cat-badge" style={{ background: c.bg, color: c.color }}>
                      {c.icon} {c.name}
                    </span>
                  </td>
                  <td style={{ color: 'var(--muted)' }}>{e.date}</td>
                  <td style={{ color: 'var(--muted)', fontSize: 13 }}>{e.note || '—'}</td>
                  <td className="amt-cell" style={{ color: 'var(--red)' }}>-{fmt(e.amount)}</td>
                  <td>
                    <button className="action-btn edit" onClick={() => onEdit(e)}>✏️ Edit</button>
                    <button className="action-btn del"  onClick={() => onDelete(e.id)}>🗑️ Del</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
