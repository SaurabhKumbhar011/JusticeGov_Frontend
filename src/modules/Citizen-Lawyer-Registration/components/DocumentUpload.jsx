import { useState } from 'react';

const EMPTY = { ownerId: '', role: 'CITIZEN', docType: 'ID_PROOF', fileUri: '' };

export default function DocumentUpload({ onSubmit, status }) {
  const [form, setForm] = useState(EMPTY);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, ownerId: Number(form.ownerId) });
    setForm(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Owner ID</label>
          <input className="form-control" name="ownerId" type="number" placeholder="Citizen or Lawyer ID"
            value={form.ownerId} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Role</label>
          <select className="form-select" name="role" value={form.role} onChange={handleChange}>
            <option value="CITIZEN">Citizen</option>
            <option value="LAWYER">Lawyer</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">Document Type</label>
          <select className="form-select" name="docType" value={form.docType} onChange={handleChange}>
            <option value="ID_PROOF">ID Proof</option>
            <option value="BAR_CERTIFICATE">Bar Certificate</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold text-secondary small text-uppercase">File URI</label>
          <input className="form-control" name="fileUri" placeholder="e.g. https://storage.example.com/doc.pdf"
            value={form.fileUri} onChange={handleChange} required />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-primary px-5 fw-semibold" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      </div>
    </form>
  );
}
