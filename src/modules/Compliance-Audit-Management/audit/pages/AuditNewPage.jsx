import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAudit } from '../axios/auditApi';

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
const EMPTY = { officerId: '', complianceId: '', scope: '', findings: '', date: '', status: 'OPEN' };

export default function AuditNewPage() {
  const navigate          = useNavigate();
  const [form, setForm]   = useState(EMPTY);
  const [status, setStatus]   = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading'); setMessage('');
    try {
      await createAudit({ ...form, officerId: Number(form.officerId), complianceId: Number(form.complianceId) });
      setStatus('success');
      setMessage('Audit created successfully.');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setMessage(err?.response?.data?.message || 'Failed to create audit.');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">➕ New Audit</h4>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4" style={{ maxWidth: '640px' }}>
        {status === 'success' && <div className="alert alert-success small mb-3">✅ {message}</div>}
        {status === 'error'   && <div className="alert alert-danger  small mb-3">❌ {message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Officer ID</label>
              <input className="form-control" name="officerId" type="number" placeholder="e.g. 5"
                value={form.officerId} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Compliance ID</label>
              <input className="form-control" name="complianceId" type="number" placeholder="e.g. 3"
                value={form.complianceId} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Scope</label>
              <input className="form-control" name="scope" placeholder="e.g. CASE_REVIEW"
                value={form.scope} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Date</label>
              <input className="form-control" name="date" type="date"
                value={form.date} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Status</label>
              <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Findings</label>
              <textarea className="form-control" name="findings" rows={3}
                placeholder="Describe the audit findings..."
                value={form.findings} onChange={handleChange} />
            </div>
            <div className="col-12 d-flex gap-2 justify-content-end">
              <button type="button" className="btn btn-light fw-semibold"
                onClick={() => navigate('/compliance/audits')}>Cancel</button>
              <button type="submit" className="btn btn-dark fw-semibold px-5"
                disabled={status === 'loading'}>
                {status === 'loading' ? 'Saving...' : 'Create Audit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
