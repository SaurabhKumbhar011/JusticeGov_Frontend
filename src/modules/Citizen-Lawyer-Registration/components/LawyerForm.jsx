import { useState } from 'react';

const EMPTY = { userId: '', name: '', dob: '', barId: '', contactInfo: '' };

export default function LawyerForm({ onSubmit, status }) {
  const [form, setForm] = useState(EMPTY);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, userId: Number(form.userId) });
    setForm(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">User ID</label>
          <input className="form-control" name="userId" type="number" placeholder="e.g. 202"
            value={form.userId} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Full Name</label>
          <input className="form-control" name="name" placeholder="e.g. Jane Smith"
            value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Date of Birth</label>
          <input className="form-control" name="dob" type="date"
            value={form.dob} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Bar ID</label>
          <input className="form-control" name="barId" placeholder="e.g. BAR-2024-001"
            value={form.barId} onChange={handleChange} required />
        </div>
        <div className="col-md-12">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Contact Info</label>
          <input className="form-control" name="contactInfo" placeholder="e.g. +1-555-0200"
            value={form.contactInfo} onChange={handleChange} required />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-primary px-5 fw-semibold" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting...' : 'Register Lawyer'}
          </button>
        </div>
      </div>
    </form>
  );
}
