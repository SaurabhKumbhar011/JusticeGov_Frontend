import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComplianceRecord } from '../axios/complianceApi';

const TYPES   = ['CASE', 'HEARING', 'JUDGEMENT', 'RESEARCH'];
const RESULTS = ['PASSED', 'FAILED', 'WARNING', 'COMPLIANT', 'NON_COMPLIANT'];
const EMPTY   = { entityId: '', officerId: '', type: 'CASE', result: 'COMPLIANT', date: '', notes: '' };

export default function ComplianceNewPage() {
  const navigate      = useNavigate();
  const [form, setForm]       = useState(EMPTY);
  const [status, setStatus]   = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading'); setMessage('');
    try {
      await createComplianceRecord({ ...form, entityId: Number(form.entityId), officerId: Number(form.officerId) });
      setStatus('success');
      setMessage('Compliance record created successfully.');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setMessage(err?.response?.data?.message || 'Failed to create record.');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">➕ Add Compliance Record</h4>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4" style={{ maxWidth: '640px' }}>
        {status === 'success' && <div className="alert alert-success small mb-3">✅ {message}</div>}
        {status === 'error'   && <div className="alert alert-danger  small mb-3">❌ {message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Entity ID</label>
              <input className="form-control" name="entityId" type="number" placeholder="e.g. 1"
                value={form.entityId} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Officer ID</label>
              <input className="form-control" name="officerId" type="number" placeholder="e.g. 5"
                value={form.officerId} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Type</label>
              <select className="form-select" name="type" value={form.type} onChange={handleChange}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Result</label>
              <select className="form-select" name="result" value={form.result} onChange={handleChange}>
                {RESULTS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Date</label>
              <input className="form-control" name="date" type="date"
                value={form.date} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Notes</label>
              <textarea className="form-control" name="notes" rows={3}
                placeholder="Describe the compliance finding..."
                value={form.notes} onChange={handleChange} />
            </div>
            <div className="col-12 d-flex gap-2 justify-content-end">
              <button type="button" className="btn btn-light fw-semibold"
                onClick={() => navigate('/compliance/records')}>Cancel</button>
              <button type="submit" className="btn btn-danger fw-semibold px-5"
                disabled={status === 'loading'}>
                {status === 'loading' ? 'Saving...' : 'Create Record'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
