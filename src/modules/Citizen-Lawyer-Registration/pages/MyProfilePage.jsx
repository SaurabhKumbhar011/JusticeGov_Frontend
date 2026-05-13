import { useEffect, useState } from 'react';
import { getUserRole, decodeToken } from '../../../utils/jwtUtils';
import {
  getCitizenByUserId,
  getLawyerByUserId,
  updateCitizen,
  updateLawyer,
  getDocumentsByEntity,
} from '../axios/registrationApi';

const STATUS_COLORS = {
  ACTIVE: 'success', PENDING: 'warning', APPROVED: 'primary',
  REJECTED: 'danger', BLOCKED: 'secondary', INACTIVE: 'dark',
};

export default function MyProfilePage() {
  const role     = getUserRole();
  const decoded  = decodeToken();
  const email    = decoded?.sub || '';

  const [profile, setProfile]   = useState(null);
  const [docs, setDocs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [editForm, setEditForm] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState('');

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const userId = decoded?.userId || decoded?.id;
      
      // Use the specific ByUserId endpoints
      const res = (role === 'CITIZEN') 
        ? await getCitizenByUserId(userId) 
        : await getLawyerByUserId(userId);

      if (!res.data) { 
        setError('Profile not found.'); 
        return; 
      }

      setProfile(res.data);

      const dRes = await getDocumentsByEntity(role, res.data.id);
      setDocs(Array.isArray(dRes.data) ? dRes.data : []);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      if (role === 'CITIZEN') await updateCitizen(profile.id, editForm);
      else                   await updateLawyer(profile.id, editForm);
      setSaveMsg('Profile updated successfully.');
      setEditForm(null);
      fetchProfile();
    } catch (e) {
      setSaveMsg(e?.response?.data?.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  // Helper function to safely view Base64 strings in a new tab
  const handleViewDocument = (fileUri) => {
    if (!fileUri) return;

    const win = window.open();
    if (!win) {
      alert("Please allow pop-ups to view the document.");
      return;
    }

    // Write HTML to the new window to render the PDF or Image safely
    win.document.write(`
      <html>
        <head><title>Document Viewer</title></head>
        <body style="margin:0; display:flex; justify-content:center; align-items:center; background-color:#333; height:100vh;">
          ${fileUri.startsWith('data:application/pdf') 
            ? `<iframe src="${fileUri}" width="100%" height="100%" style="border:none;"></iframe>` 
            : `<img src="${fileUri}" style="max-width:100%; max-height:100vh; object-fit:contain;" />`
          }
        </body>
      </html>
    `);
  };

  if (loading) return <div className="text-center py-5 text-muted">Loading your profile...</div>;
  if (error)   return <div className="alert alert-danger m-4">{error}</div>;

  const isCitizen = role === 'CITIZEN';

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">My Profile</h4>
        <p className="text-muted small mb-0">
          Logged in as <span className="fw-semibold">{email}</span> &nbsp;
          <span className={`badge bg-${isCitizen ? 'info' : 'primary'} text-${isCitizen ? 'dark' : 'white'}`}>
            {role}
          </span>
        </p>
      </div>

      <div className="row g-4">
        {/* PROFILE CARD */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-bottom border-light px-4 py-3 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">{isCitizen ? '👤' : '⚖️'} Profile Details</h6>
              {!editForm && (
                <button className="btn btn-sm btn-outline-primary fw-semibold"
                  onClick={() => setEditForm(
                    isCitizen
                      ? { address: profile.address, contactInfo: profile.contactInfo }
                      : { contactInfo: profile.contactInfo }
                  )}>
                  ✏️ Edit
                </button>
              )}
            </div>
            <div className="card-body px-4 py-3">
              {saveMsg && (
                <div className={`alert ${saveMsg.includes('successfully') ? 'alert-success' : 'alert-danger'} py-2 small mb-3`}>
                  {saveMsg}
                </div>
              )}

              {!editForm ? (
                <div className="row g-3 small">
                  {profile && [
                    ['Full Name', profile.name],
                    ['Date of Birth', profile.dob],
                    isCitizen ? ['Address', profile.address] : ['Bar ID', profile.barId],
                    ['Contact', profile.contactInfo],
                    ['Status', profile.status],
                  ].map(([label, val]) => (
                    <div className="col-6" key={label}>
                      <div className="text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>{label}</div>
                      <div className="fw-semibold text-dark">
                        {label === 'Status' ? (
                          <span className={`badge bg-${STATUS_COLORS[val] || 'secondary'}`}>{val}</span>
                        ) : val || '—'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row g-3">
                  {isCitizen && (
                    <div className="col-12">
                      <label className="form-label small fw-bold">Address</label>
                      <input className="form-control" value={editForm.address || ''}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
                    </div>
                  )}
                  <div className="col-12">
                    <label className="form-label small fw-bold">Contact Info</label>
                    <input className="form-control" value={editForm.contactInfo || ''}
                      onChange={(e) => setEditForm({ ...editForm, contactInfo: e.target.value })} />
                  </div>
                  <div className="col-12 d-flex gap-2 justify-content-end mt-2">
                    <button className="btn btn-sm btn-light" onClick={() => setEditForm(null)}>Cancel</button>
                    <button className="btn btn-sm btn-primary" onClick={handleSave} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DOCUMENTS CARD */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-bottom border-light px-4 py-3">
              <h6 className="fw-bold mb-0">📁 Documents</h6>
            </div>
            <div className="card-body px-4 py-3">
              {!Array.isArray(docs) || docs.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted small">No documents found.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {docs.map((d) => (
                    <div key={d.documentID} className="d-flex align-items-center justify-content-between bg-light rounded-3 px-3 py-2 border border-white">
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-white rounded-2 p-2 shadow-sm text-danger fw-bold" style={{fontSize: '0.7rem'}}>
                           {d.fileUri?.startsWith('data:image') ? 'IMG' : 'PDF'}
                        </div>
                        <div>
                          <div className="fw-semibold small text-dark">{d.docType}</div>
                          <div className="text-muted" style={{ fontSize: '0.6rem' }}>
                            {d.verificationStatus}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-1">
                        {/* Swapped standard anchor tag for a button that triggers the new tab logic */}
                        <button 
                           onClick={() => handleViewDocument(d.fileUri)} 
                           className="btn btn-sm btn-white border shadow-sm"
                        >
                          👁️ View
                        </button>
                        {/* Download button successfully removed */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}