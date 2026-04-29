import React, { useState } from 'react';
import './ProfilePage.css';

export default function ProfilePage({ user, onUpdate }) {
  const [name, setName] = useState(user?.name || '');
  const [currency, setCurrency] = useState('₹ INR');
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2) || 'U';

  const handleSave = () => {
    onUpdate({ ...user, name });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Profile</div>
          <div className="page-sub">Manage your account</div>
        </div>
      </div>

      <div className="profile-card card">
        <div className="profile-top">
          <div className="big-avatar">{initials}</div>
          <div>
            <div className="profile-name">{name || 'User'}</div>
            <div className="profile-email">{user?.email || ''}</div>
            {user?.provider === 'google' && (
              <span className="provider-badge">🔗 Google Account</span>
            )}
          </div>
        </div>

        <div className="profile-field">
          <label className="form-label">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>

        <div className="profile-field">
          <label className="form-label">Email</label>
          <input value={user?.email || ''} disabled style={{ opacity: 0.5 }} />
        </div>

        <div className="profile-field">
          <label className="form-label">Currency</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option>₹ INR</option>
            <option>$ USD</option>
            <option>€ EUR</option>
            <option>£ GBP</option>
          </select>
        </div>

        <div className="profile-field">
          <label className="form-label">Theme</label>
          <select defaultValue="dark">
            <option value="dark">Dark (default)</option>
            <option value="light">Light (coming soon)</option>
          </select>
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
