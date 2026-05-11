import { useState } from 'react';
import { getUserRole } from '../../../utils/token';
import { uploadDocument } from '../axios/registrationApi';

export default function MyDocumentsPage() {
  const role      = getUserRole();           // CITIZEN | LAWYER
  const isCitizen = role === 'CITIZEN';

  const [form, setForm]     = useState({ ownerId: '', docType: isCitizen ? 'ID_PROOF' : 'BAR_CERTIFICATE', fileUri: '' });
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      await uploadDocument({ ...form, ownerId: Number(form.ownerId), role });
      setStatus('success');
      setMessage('Document uploaded successfully. Verification status: PENDING');
      setForm({ ownerId: '', docType: isCitizen ? 'ID_PROOF' : 'BAR_CERTIFICATE', fileUri: '' });
    } catch (err) {
      setStatus('error');
      setMessage(err?.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">My Documents</h4>
        <p className="text-muted small mb-0">
          Upload your{' '}
          <span className={`badge ${isCitizen ? 'bg-info text-dark' : 'bg-primary'}`}>
            {isCitizen ? 'ID_PROOF' : 'BAR_CERTIFICATE'}
          </span>{' '}
          for verification.
        </p>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4" style={{ maxWidth: '560px' }}>
        {status === 'success' && (
          <div className="alert alert-success rounded-3 small mb-3">✅ {message}</div>
        )}
        {status === 'error' && (
          <div className="alert alert-danger rounded-3 small mb-3">❌ {message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary small text-uppercase">
                {isCitizen ? 'Citizen' : 'Lawyer'} Profile ID
              </label>
              <input className="form-control" type="number"
                placeholder={`Your ${isCitizen ? 'Citizen' : 'Lawyer'} ID from the system`}
                value={form.ownerId}
                onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
                required />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Document Type</label>
              <input className="form-control bg-light" value={form.docType} readOnly />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary small text-uppercase">File URI</label>
              <input className="form-control" placeholder="e.g. https://storage.example.com/doc.pdf"
                value={form.fileUri}
                onChange={(e) => setForm({ ...form, fileUri: e.target.value })}
                required />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary fw-semibold px-5" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Uploading...' : 'Upload Document'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
