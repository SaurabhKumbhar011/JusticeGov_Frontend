import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(creds);
      loginUser(data);
      // Route to Admin Dashboard if role matches
      navigate(data.role === 'ADMIN' ? '/admin-dashboard' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#0f172a' }}>
      <div className="card border-0 shadow-lg p-5 rounded-4" style={{ backgroundColor: '#1e293b', maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold text-white mb-1">JusticeGov</h1>
          <p className="text-secondary small text-uppercase fw-bold">Identity & Access Portal</p>
        </div>
        
        {error && <div className="alert alert-danger bg-danger bg-opacity-10 border-0 text-danger small py-2">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">Government Email</label>
            <input 
              type="email" 
              className="form-control bg-dark text-white border-0 py-2 shadow-none" 
              style={{ borderRadius: '8px' }}
              onChange={e => setCreds({...creds, email: e.target.value})} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Secure Password</label>
            <input 
              type="password" 
              className="form-control bg-dark text-white border-0 py-2 shadow-none" 
              style={{ borderRadius: '8px' }}
              onChange={e => setCreds({...creds, password: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-info w-100 fw-bold py-2 shadow" style={{ background: '#38bdf8', border: 'none' }}>
            Authorize Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;