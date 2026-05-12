import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../../utils/token'; 
import { registerCitizen } from '../axios/registrationApi';

export default function SetupCitizenProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  // 1. Component State
  const [formData, setFormData] = useState({
    userId: '', // Captured silently
    name: '',
    contactInfo: '',
    dob: '',
    gender: 'MALE',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. Extract UserID from token silently on load
  useEffect(() => {
    const decoded = decodeToken();
    if (decoded) {
      const uid = decoded.userId || decoded.id || decoded.sub;
      setFormData(prev => ({ ...prev, userId: uid }));
    } else {
      setError("Session expired. Please login again.");
    }
  }, []);

  // 3. Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // formData automatically includes the silent userId
      await registerCitizen(formData, token);
      alert("Profile setup successful!");
      navigate('/citizenregister/my-profile'); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create profile. You might already have one.");
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
              <h3 className="fw-bold text-primary mb-2">Complete Your Profile</h3>
              <p className="text-muted mb-4 small">Please provide your details to access the JusticeGov portal.</p>

              {error && <div className="alert alert-danger py-2 small">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* REMOVED the User ID input field here. It is handled silently in the state! */}

                <div className="mb-3">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input type="text" name="name" className="form-control" placeholder="Enter full legal name" 
                    onChange={handleChange} required />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Date of Birth</label>
                    <input type="date" name="dob" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Gender</label>
                    <select name="gender" className="form-select" onChange={handleChange}>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Email/Contact Info</label>
                  <input type="email" name="contactInfo" className="form-control" placeholder="example@justice.gov" 
                    onChange={handleChange} required />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold">Residential Address</label>
                  <textarea name="address" className="form-control" rows="2" placeholder="Current City/Address" 
                    onChange={handleChange} required></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2 rounded-3" disabled={loading}>
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : 'Initialize Profile'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}