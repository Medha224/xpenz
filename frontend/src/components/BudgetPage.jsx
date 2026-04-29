import React from 'react';
import { CATEGORIES, fmt } from '../data/constants';
import './BudgetPage.css';

export default function BudgetPage({ expenses, budgets }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Budget</div>
          <div className="page-sub">Track your spending vs. budget</div>
        </div>
      </div>

      <div className="budget-grid">
        {CATEGORIES.map((c) => {
          const spent  = expenses.filter((e) => e.category === c.name).reduce((s, e) => s + Number(e.amount), 0);
          const budget = budgets[c.name] || 0;
          const pct    = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
          const over   = spent > budget;

          return (
            <div key={c.name} className="budget-card card">
              <div className="budget-header">
                <div className="budget-cat">
                  <span style={{ fontSize: 18 }}>{c.icon}</span>
                  {c.name}
                </div>
                <span
                  className="budget-pct"
                  style={{
                    background: over ? 'rgba(239,68,68,.12)' : 'rgba(34,197,94,.12)',
                    color: over ? 'var(--red)' : 'var(--green)',
                  }}
                >
                  {pct}%
                </span>
              </div>
              <div className="budget-amounts">
                <span style={{ color: 'var(--muted)' }}>Spent: {fmt(spent)}</span>
                <span>Budget: {fmt(budget)}</span>
              </div>
              <div className="prog-bar">
                <div
                  className="prog-fill"
                  style={{ width: `${pct}%`, background: over ? 'var(--red)' : c.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
