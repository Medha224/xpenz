import React from 'react';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'expenses',  icon: '💸', label: 'Expenses'  },
  { id: 'budget',    icon: '🎯', label: 'Budget'    },
  { id: 'profile',   icon: '👤', label: 'Profile'   },
];

export default function Sidebar({ page, user, onNavigate, onLogout }) {
  const initials = user?.name?.split(' ').map((w) => w[0]).join('').slice(0, 2) || 'U';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">💰</div>
        <span className="sidebar-brand">Xpenz</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${page === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="user-chip">
          <div className="avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'User'}</div>
            <div className="user-email">{user?.email || ''}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          🚪 <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
