import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';

// Reusable Password Input Component
const PasswordInput = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="password-input">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShow(!show)}
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
};

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Password strength validation
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Signup attempt:', { email, password });
    navigate('/dashboard', { state: { userEmail: email } });
  };

  const isFormValid =
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    validatePassword(password);

  return (
    <div className="signup-container">
      <div className="signup-header">
        <div className="app-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2" fill="#3b82f6"/>
            <path d="M7 8h10M7 12h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="app-title">AI Internship Finder</h1>
        <p className="app-subtitle">Create your account to get started.</p>
      </div>

      <div className="signup-card">
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">Sign In</Link>
          <button className="auth-tab active">Create Account</button>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Live password match check */}
          {confirmPassword && password !== confirmPassword && (
            <p className="error-text">Passwords do not match</p>
          )}

          <button type="submit" className="signup-button" disabled={!isFormValid}>
            Create Account
          </button>
        </form>

        <div className="signin-link">
          <span>Already have an account? </span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
