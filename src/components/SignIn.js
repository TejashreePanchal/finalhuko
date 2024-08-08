import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://finalhuko-backend-ad893b87634b.herokuapp.com/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.body[0], navigate);
      } else {
        setError('Please enter valid email or password');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('An error occurred during sign-in');
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <h1 className="auth-title">Sign In</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="auth-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
