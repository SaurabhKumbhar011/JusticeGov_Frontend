import { useState, useEffect } from 'react';
import { fileCase, getAllCases } from '../axios/caseApi';
import { uploadDocument, getDocumentsByCase } from '../../document/axios/documentApi';
import { useAuth } from '../../../../contexts/AuthContext';

// Enums matching com.justicegov.demo.model.enums.CaseDocumentType
const DOCUMENT_TYPES = ['PETITION', 'EVIDENCE', 'MISC']; 

export default function CaseFilingPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    citizenId: '',
    lawyerId: '',
    title: '',
    description: '',
    filedDate: new Date().toISOString().split('T')[0]
  });
  
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [filedCase, setFiledCase] = useState(null);
  const [allCases, setAllCases] = useState([]);
  const [uploadForm, setUploadForm] = useState({ file: null, type: 'PETITION' });
  const [documents, setDocuments] = useState([]);

  const fetchAllCases = async () => {
    try {
      const response = await getAllCases();
      setAllCases(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Case Registry fetch failed:', err);
    }
  };

  const fetchDocuments = async (caseId) => {
    if (!caseId) return;
    try {
      const response = await getDocumentsByCase(caseId);
      setDocuments(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Document fetch failed:', err);
      setDocuments([]);
    }
  };

  useEffect(() => {
    fetchAllCases();
  }, []);

  useEffect(() => {
    if (filedCase?.id) {
      fetchDocuments(filedCase.id);
    }
  }, [filedCase]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading'); setMessage('');
    try {
      const data = {
        ...form,
        citizenId: Number(form.citizenId),
        lawyerId: Number(form.lawyerId),
        userId: user.id,
        filedDate: form.filedDate
      };
      const response = await fileCase(data);
      setFiledCase(response.data);
      setStatus('success');
      setMessage('Case filed successfully.');
      fetchAllCases();
    } catch (err) {
      setStatus('error');
      setMessage(err?.response?.data?.message || 'Failed to file case.');
    }
  };

  const handleUploadChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setUploadForm({ ...uploadForm, file: files[0] });
    } else {
      setUploadForm({ ...uploadForm, [name]: value });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!filedCase?.id || !uploadForm.file) return;
    setStatus('loading');
    try {
      await uploadDocument(filedCase.id, uploadForm.file, uploadForm.type);
      setUploadForm({ ...uploadForm, file: null });
      setMessage('Document uploaded successfully.');
      setStatus('success');
      await fetchDocuments(filedCase.id); 
    } catch (err) {
      setStatus('error');
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row g-4">
        <div className="col-md-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 className="fw-bold mb-3">📄 Case Filing</h5>
            {status === 'success' && <div className="alert alert-success py-2 small">✅ {message}</div>}
            {status === 'error' && <div className="alert alert-danger py-2 small">❌ {message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Citizen ID</label>
                  <input className="form-control" name="citizenId" type="number" value={form.citizenId} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Lawyer ID</label>
                  <input className="form-control" name="lawyerId" type="number" value={form.lawyerId} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Title</label>
                  <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Description</label>
                  <textarea className="form-control" name="description" rows="2" value={form.description} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Processing...' : 'File Case'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {filedCase && (
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="text-primary fw-bold mb-3">📁 Documents for Case #{filedCase.id}</h5>
              
              <form onSubmit={handleUpload} className="row g-2 mb-4">
                <div className="col-md-4">
                  <select className="form-select" name="type" value={uploadForm.type} onChange={handleUploadChange}>
                    {DOCUMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-md-5">
                  <input className="form-control" name="file" type="file" key={uploadForm.file ? 'file' : 'reset'} onChange={handleUploadChange} required />
                </div>
                <div className="col-md-3">
                  {/* Fixed Button: Added white-space nowrap and small font size adjustment */}
                  <button 
                    type="submit" 
                    className="btn btn-secondary w-100" 
                    style={{ whiteSpace: 'nowrap', fontSize: '0.85rem', fontWeight: 'bold' }}
                  >
                    Upload
                  </button>
                </div>
              </form>

              <hr />

              <h6 className="fw-bold mb-3">Uploaded Documents:</h6>
              <div className="list-group">
                {documents.length > 0 ? documents.map((doc) => (
                  <div key={doc.id} className="list-group-item d-flex justify-content-between align-items-center border-0 bg-light mb-2 rounded-3 px-3 py-3">
                    <div>
                      <span className="badge bg-dark me-2">{doc.documentType}</span>
                      <small className="text-muted">Uploaded: {doc.uploadDate}</small>
                    </div>
                    <div>
                      <span className="text-success small fw-bold">✓ Uploaded</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-4 text-muted small">No documents found for this case.</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="col-md-5">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-bold mb-3">Case Registry Overview</h5>
            <div className="list-group overflow-auto" style={{ maxHeight: '600px' }}>
              {allCases.map(c => (
                <button key={c.id} onClick={() => setFiledCase(c)}
                  className={`list-group-item list-group-item-action border-0 mb-2 rounded-3 ${filedCase?.id === c.id ? 'active' : 'bg-light'}`}>
                  <div className="fw-bold">Case ID: #{c.id}</div>
                  <div className="small text-truncate">{c.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}