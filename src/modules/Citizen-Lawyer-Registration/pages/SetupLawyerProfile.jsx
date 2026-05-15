import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerLawyer } from '../axios/registrationApi';

// 🚀 Embedded your exact token logic here to prevent crashes!
const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

export default function SetupLawyerProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const [formData, setFormData] = useState({
    userId: '', 
    name: '',
    contactInfo: '',
    dob: '',
    barId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const decoded = decodeToken();
    if (decoded) {
      const uid = decoded.userId || decoded.id || decoded.sub;
      setFormData(prev => ({ ...prev, userId: uid }));
    } else {
      setError("Session expired. Please login again.");
    }
  }, []);

  const validateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    if (dob >= today.setHours(0,0,0,0)) return "Date of Birth must be in the past.";
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    if (age < 18) return "Lawyers must be at least 18 years old.";
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const ageError = validateAge(formData.dob);
    if (ageError) {
      setError(ageError);
      return;
    }

    setLoading(true);
    try {
      await registerLawyer(formData, token);
      alert("Lawyer Profile setup successful!");
      navigate('/lawyerregister/my-profile'); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5">
              <h3 className="fw-bold text-primary mb-2">⚖️ Complete Lawyer Profile</h3>
              <p className="text-muted mb-4 small">Please provide your professional details to access the portal.</p>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Full Legal Name</label>
                  <input type="text" name="name" className="form-control" placeholder="Enter full legal name" 
                    onChange={handleChange} required />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Date of Birth</label>
                    <input type="date" name="dob" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Bar Registration ID</label>
                    <input type="text" name="barId" className="form-control" placeholder="e.g., BAR-12345" 
                      onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold">Professional Email/Contact Info</label>
                  <input type="email" name="contactInfo" className="form-control" placeholder="lawyer@justice.gov" 
                    onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2 rounded-3" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Initialize Profile'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}