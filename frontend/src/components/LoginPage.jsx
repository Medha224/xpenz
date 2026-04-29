import React, { useEffect } from 'react';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '384829527690-el4harqa3sblhinmvk7tut26gj1soauu.apps.googleusercontent.com', // ✅ your client ID
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      {
        theme: 'filled_black',
        size: 'large',
        width: 340,
        text: 'continue_with',
      }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    onLogin({
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      provider: 'google',
    });
  };

  return (
    <div className="login-page">
      <div className="login-blob b1" />
      <div className="login-blob b2" />
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">💰</div>
          <span className="login-brand">Xpenz</span>
        </div>

        <h1 className="login-title">Track every rupee</h1>
        <p className="login-sub">Your personal finance dashboard. Know where your money goes.</p>

        {/* Google renders its real button here */}
        <div id="google-signin-btn" style={{ margin: '24px auto', display: 'flex', justifyContent: 'center' }} />

        <div className="divider">or</div>

        <button
          className="demo-btn"
          onClick={() => onLogin({ name: 'Demo User', email: 'demo@xpenz.app', provider: 'demo' })}
        >
          Try Demo Account →
        </button>

         
      </div>
    </div>
  );
}