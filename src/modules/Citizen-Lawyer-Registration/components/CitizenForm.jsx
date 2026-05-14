import { useState } from 'react';

const EMPTY = { name: '', dob: '', gender: '', address: '', contactInfo: '' };

export default function CitizenForm({ onSubmit, status }) {
  const [form, setForm] = useState(EMPTY);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Full Name</label>
          <input className="form-control" name="name" placeholder="e.g. John Doe"
            value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Date of Birth</label>
          <input className="form-control" name="dob" type="date"
            value={form.dob} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Gender</label>
          <select className="form-select" name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Contact Info</label>
          <input className="form-control" name="contactInfo" placeholder="e.g. +1-555-0100"
            value={form.contactInfo} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Address</label>
          <input className="form-control" name="address" placeholder="e.g. 123 Main St"
            value={form.address} onChange={handleChange} />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-primary px-5 fw-semibold" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Register Citizen'}
          </button>
        </div>
      </div>
    </form>
  );
}
