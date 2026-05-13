import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, forgotPassword, resetPassword } from '../services/authService';
import { useAuth } from '../contexts/AuthContext.jsx';

const Login = () => {
  const [mode, setMode] = useState('login');
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetData, setResetData] = useState({ email: '', token: '', password: '', confirmPassword: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'CITIZEN',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const loginPayload = {
        email: creds.email.trim(),
        password: creds.password,
      };

      const data = await login(loginPayload);

      if (!data?.token) {
        setError('Login failed: invalid server response.');
        return;
      }

      loginUser(data);
      if (data.role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const serverError = err.response?.data?.message || err.response?.data?.error || 'Authentication failed. Please check credentials.';
      setError(typeof serverError === 'string' ? serverError : 'Authentication failed. Please check credentials.');
      console.error('Login error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      await register({
        name: registerData.name.trim(),
        email: registerData.email.trim(),
        phone: registerData.phone.trim(),
        password: registerData.password,
        role: registerData.role,
      });
      setSuccess('Registration successful. Please login or await approval.');
      setMode('login');
      setRegisterData({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'CITIZEN' });
    } catch (err) {
      const status = err.response?.status;
      let serverError = err.response?.data?.message || err.response?.data?.error;
      if (!serverError) {
        if (status === 409) serverError = 'This email is already registered.';
        else if (status === 400) serverError = 'Registration data is invalid.';
        else serverError = 'Registration failed. Please check your input or try again later.';
      }
      setError(typeof serverError === 'string' ? serverError : 'Registration failed.');
      console.error('Registration error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await forgotPassword(forgotEmail.trim());
      setSuccess('Reset token sent to your email. Use it below to reset your password.');
      setMode('reset');
      setResetData({ email: forgotEmail.trim(), token: '', password: '', confirmPassword: '' });
    } catch (err) {
      const serverError = err.response?.data?.message || err.response?.data?.error || 'Unable to send reset token.';
      setError(typeof serverError === 'string' ? serverError : 'Unable to send reset token.');
      console.error('Forgot password error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (resetData.password !== resetData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword({
        email: resetData.email.trim(),
        token: resetData.token.trim(),
        password: resetData.password,
      });
      setSuccess('Password reset successful. Please login with your new password.');
      setMode('login');
      setCreds({ email: resetData.email.trim(), password: '' });
    } catch (err) {
      const serverError = err.response?.data?.message || err.response?.data?.error || 'Password reset failed.';
      setError(typeof serverError === 'string' ? serverError : 'Password reset failed.');
      console.error('Reset password error:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Email</label>
        <input
          type="email"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
          placeholder="ram@justicegov.com"
          required
        />
      </div>
      <div className="mb-4">
        <label className="form-label text-secondary small fw-semibold">Password</label>
        <input
          type="password"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-info w-100 fw-bold py-2 shadow"
        style={{ background: '#38bdf8', border: 'none' }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Signing In...
          </>
        ) : (
          'Login'
        )}
      </button>
      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link text-secondary"
          onClick={() => {
            setError('');
            setSuccess('');
            setMode('forgot');
          }}
        >
          Forgot password?
        </button>
        <button
          type="button"
          className="btn btn-link text-secondary"
          onClick={() => {
            setError('');
            setSuccess('');
            setMode('register');
          }}
        >
          Register an account
        </button>
      </div>
    </form>
  );

  const renderForgotForm = () => (
    <form onSubmit={handleForgot}>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Email</label>
        <input
          type="email"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          placeholder="ram@justicegov.com"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-warning w-100 fw-bold py-2 shadow"
        style={{ border: 'none' }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Sending token...
          </>
        ) : (
          'Send Reset Token'
        )}
      </button>
      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link text-secondary"
          onClick={() => {
            setError('');
            setSuccess('');
            setMode('login');
          }}
        >
          Back to login
        </button>
        <button
          type="button"
          className="btn btn-link text-secondary"
          onClick={() => {
            setError('');
            setSuccess('');
            setMode('register');
          }}
        >
          Create a new account
        </button>
      </div>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={handleReset}>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Email</label>
        <input
          type="email"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={resetData.email}
          onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
          placeholder="ram@justicegov.com"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Reset Token</label>
        <input
          type="text"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={resetData.token}
          onChange={(e) => setResetData({ ...resetData, token: e.target.value })}
          placeholder="Enter reset token"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">New Password</label>
        <input
          type="password"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={resetData.password}
          onChange={(e) => setResetData({ ...resetData, password: e.target.value })}
          placeholder="New password"
          required
        />
      </div>
      <div className="mb-4">
        <label className="form-label text-secondary small fw-semibold">Confirm Password</label>
        <input
          type="password"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={resetData.confirmPassword}
          onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
          placeholder="Confirm new password"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-success w-100 fw-bold py-2 shadow"
        style={{ border: 'none' }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Resetting password...
          </>
        ) : (
          'Reset Password'
        )}
      </button>
      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link text-secondary"
          onClick={() => {
            setError('');
            setSuccess('');
            setMode('login');
          }}
        >
          Back to login
        </button>
        <button
          type="button"
          className="btn btn-link text-secondary"
          onClick={() => {
            setError('');
            setSuccess('');
            setMode('register');
          }}
        >
          Register instead
        </button>
      </div>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister}>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Full Name</label>
        <input
          type="text"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={registerData.name}
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
          placeholder="Abhi"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Email</label>
        <input
          type="email"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          placeholder="abhi@justicegov.com"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Phone</label>
        <input
          type="tel"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={registerData.phone}
          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
          placeholder="8023873927"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Role</label>
        <select
          className="form-select bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={registerData.role}
          onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
          required
        >
          <option value="ADMIN">ADMIN</option>
          <option value="AUDITOR">AUDITOR</option>
          <option value="JUDGE">JUDGE</option>
          <option value="CLERK">CLERK</option>
          <option value="COMPLIANCE_OFFICER">COMPLIANCE_OFFICER</option>
          <option value="CITIZEN">CITIZEN</option>
          <option value="LAWYER">LAWYER</option>
          <option value="REGISTRAR">REGISTRAR</option>
          <option value="RESEARCHER">RESEARCHER</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label text-secondary small fw-semibold">Password</label>
        <input
          type="password"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          placeholder="abhi123"
          required
        />
      </div>
      <div className="mb-4">
        <label className="form-label text-secondary small fw-semibold">Confirm Password</label>
        <input
          type="password"
          className="form-control bg-dark text-white border-0 py-2 shadow-none"
          style={{ borderRadius: '8px' }}
          value={registerData.confirmPassword}
          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
          placeholder="Confirm password"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-100 fw-bold py-2 shadow"
        style={{ border: 'none' }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Registering...
          </>
        ) : (
          'Register'
        )}
      </button>
      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link text-secondary"
          onClick={() => {
            setError('');
            setSuccess('');
            setMode('login');
          }}
        >
          Back to login
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#0f172a' }}>
      <div className="card border-0 shadow-lg p-5 rounded-4" style={{ backgroundColor: '#1e293b', maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold text-white mb-1">JusticeGov</h1>
          <p className="text-secondary small text-uppercase fw-bold">Identity & Access Portal</p>
        </div>

        {error && (
          <div className="alert alert-danger bg-danger bg-opacity-10 border-0 text-danger small py-2 mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success bg-success bg-opacity-10 border-0 text-success small py-2 mb-4">
            {success}
          </div>
        )}

        {mode === 'login' && renderLoginForm()}
        {mode === 'forgot' && renderForgotForm()}
        {mode === 'reset' && renderResetForm()}
        {mode === 'register' && renderRegisterForm()}
      </div>
    </div>
  );
};

export default Login;
