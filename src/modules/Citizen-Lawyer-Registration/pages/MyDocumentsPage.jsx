import { useEffect, useState } from 'react';
import { getUserRole, decodeToken } from '../../../utils/token';
import { uploadDocument, getCitizenByUserId, getLawyerByUserId } from '../axios/registrationApi';

export default function MyDocumentsPage() {
  const role      = getUserRole();
  const decoded   = decodeToken();
  const userId    = decoded?.userId || decoded?.id || null;
  const isCitizen = role === 'CITIZEN';

  const [profileId, setProfileId] = useState(null);
  const [fileUri, setFileUri]     = useState('');
  const [status, setStatus]       = useState(null);
  const [message, setMessage]     = useState('');

  // Fetch profileId silently using the correct backend endpoints
  useEffect(() => {
    if (!userId) return;

    const fetchProfileId = async () => {
      try {
        let res;
        if (role === 'CITIZEN') {
          res = await getCitizenByUserId(userId);
        } else if (role === 'LAWYER') {
          res = await getLawyerByUserId(userId);
        }

        // If data exists, grab the database 'id' silently
        if (res && res.data && res.data.id) {
          setProfileId(res.data.id);
        } else {
          setProfileId(null);
        }
      } catch (err) {
        console.error("Error finding profile ID:", err);
        setProfileId(null);
      }
    };

    fetchProfileId();
  }, [userId, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileId) {
      setStatus('error');
      setMessage('Profile ID not found. Please complete your registration first.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      await uploadDocument({
        ownerId: profileId,
        role,
        docType: isCitizen ? 'ID_PROOF' : 'BAR_CERTIFICATE',
        fileUri,
      });
      setStatus('success');
      setMessage('Document uploaded successfully. Verification status: PENDING');
      setFileUri('');
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
        {status === 'success' && <div className="alert alert-success rounded-3 small mb-3">✅ {message}</div>}
        {status === 'error'   && <div className="alert alert-danger  rounded-3 small mb-3">❌ {message}</div>}

        {/* 🚀 ADDED: Clean warning message if they haven't set up their profile yet */}
        {!profileId && status !== 'loading' && (
          <div className="alert alert-warning rounded-3 small mb-3">
            ⚠️ Profile not found. Please complete your registration first.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Document Type</label>
              <input className="form-control bg-light" value={isCitizen ? 'ID_PROOF' : 'BAR_CERTIFICATE'} readOnly />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary small text-uppercase">File URI</label>
              <input className="form-control" placeholder="e.g. https://storage.example.com/doc.pdf"
                value={fileUri}
                onChange={(e) => setFileUri(e.target.value)}
                required />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary fw-semibold px-5" type="submit"
                disabled={status === 'loading' || !profileId}>
                {status === 'loading' ? 'Uploading...' : 'Upload Document'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}