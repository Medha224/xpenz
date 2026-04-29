import React from 'react';
import { CATEGORIES, MONTHS, MONTHLY_DATA, getCat, fmt } from '../data/constants';
import './Dashboard.css';

function DonutChart({ expenses }) {
  const catTotals = {};
  CATEGORIES.forEach((c) => {
    catTotals[c.name] = expenses
      .filter((e) => e.category === c.name)
      .reduce((s, e) => s + Number(e.amount), 0);
  });
  const topCats  = CATEGORIES.filter((c) => catTotals[c.name] > 0)
                              .sort((a, b) => catTotals[b.name] - catTotals[a.name])
                              .slice(0, 5);
  const catTotal = topCats.reduce((s, c) => s + catTotals[c.name], 0) || 1;
  const radius = 54, circ = 2 * Math.PI * radius;
  let offset = 0;

  const paths = topCats.map((c) => {
    const pct  = catTotals[c.name] / catTotal;
    const dash = pct * circ;
    const gap  = circ - dash;
    const el   = (
      <circle
        key={c.name}
        cx="64" cy="64" r={radius}
        fill="none"
        stroke={c.color}
        strokeWidth="13"
        strokeDasharray={`${dash.toFixed(1)} ${gap.toFixed(1)}`}
        strokeDashoffset={(circ * 0.25 - offset).toFixed(1)}
        strokeLinecap="round"
      />
    );
    offset += dash;
    return el;
  });

  return (
    <div className="chart-card card">
      <div className="card-title">By Category</div>
      <div className="donut-wrap">
        <svg width="128" height="128" viewBox="0 0 128 128">{paths}</svg>
        <div className="donut-center">
          <div className="donut-center-val">{topCats.length}</div>
          <div className="donut-center-label">categories</div>
        </div>
      </div>
      <div className="legend">
        {topCats.slice(0, 4).map((c) => (
          <div key={c.name} className="legend-item">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="legend-dot" style={{ background: c.color }} />
              {c.name}
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              {fmt(catTotals[c.name])}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ user, expenses, onAddClick }) {
  const total     = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const thisMonth = expenses
    .filter((e) => e.date.startsWith('2025-04'))
    .reduce((s, e) => s + Number(e.amount), 0);
  const maxMonth  = Math.max(...MONTHLY_DATA);
    const currentMonth = new Date().getMonth();
  const recent    = [...expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const activeCats = CATEGORIES.filter((c) => expenses.some((e) => e.category === c.name)).length;

  const stats = [
    { label: 'Total Spent',   val: fmt(total),     cls: 's-green', icon: '💸', trend: 'All time' },
   
    { label: 'Transactions',  val: expenses.length,cls: 's-amber', icon: '🔢', trend: 'Total entries' },
    { label: 'Categories',    val: activeCats,     cls: 's-red',   icon: '🏷️', trend: 'Active' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-sub">
            Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
          </div>
        </div>
        <button className="add-btn" onClick={onAddClick}>+ Add Expense</button>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card card ${s.cls}`}>
            <span className="stat-icon">{s.icon}</span>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-val ${s.cls}`}>{s.val}</div>
            <div className="stat-trend">{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart-card card">
          <div className="card-title">Monthly Spending</div>
          <div className="bar-chart">
            {MONTHS.map((m, i) => {
              const h      = Math.round((MONTHLY_DATA[i] / maxMonth) * 140);
             const isCurrent = i === currentMonth;
              return (
                <div key={m} className="bar-group">
                  <div className="bar-wrap">
                    <div
                      className="bar"
                      style={{
                        height: h,
                       background: isCurrent
  ? 'linear-gradient(180deg, #00ff87, #00a855)'
  : 'rgba(0,201,106,.2)',
border: isCurrent ? '1px solid rgba(0,255,135,.3)' : 'none',
                      }}
                    />
                  </div>
                  <div className="bar-label">{m}</div>
                </div>
              );
            })}
          </div>
        </div>
        <DonutChart expenses={expenses} />
      </div>

      {/* Recent transactions */}
      <div className="table-card">
        <div className="table-header">
          <div className="card-title" style={{ margin: 0 }}>Recent Transactions</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((e) => {
              const c = getCat(e.category);
              return (
                <tr key={e.id}>
                  <td>{e.title}</td>
                  <td>
                    <span className="cat-badge" style={{ background: c.bg, color: c.color }}>
                      {c.icon} {c.name}
                    </span>
                  </td>
                  <td style={{ color: 'var(--muted)' }}>{e.date}</td>
                  <td className="amt-cell" style={{ color: 'var(--red)' }}>
                    -{fmt(e.amount)}
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
