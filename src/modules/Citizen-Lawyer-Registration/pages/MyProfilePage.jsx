import { useEffect, useState } from 'react';
import { getUserRole, decodeToken } from '../../../utils/token';
import {
  getAllCitizens,
  getAllLawyers,
  updateCitizen,
  updateLawyer,
  getDocumentsByEntity,
} from '../axios/registrationApi';

const STATUS_COLORS = {
  ACTIVE: 'success', PENDING: 'warning', APPROVED: 'primary',
  REJECTED: 'danger', BLOCKED: 'secondary', INACTIVE: 'dark',
};

export default function MyProfilePage() {
  const role     = getUserRole();           // CITIZEN | LAWYER
  const decoded  = decodeToken();
  const email    = decoded?.sub || '';

  const [profile, setProfile]   = useState(null);
  const [docs, setDocs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [editForm, setEditForm] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState('');

  // ── Find own profile by matching userId from token ──────────────────────────
  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const isCitizen = role === 'CITIZEN';
      const res = isCitizen ? await getAllCitizens() : await getAllLawyers();
      const list = res.data || [];

      // Match by userId stored in token (sub is email; userId may be in token claims)
      const userId = decoded?.userId || decoded?.id || null;
      const found  = userId
        ? list.find((p) => p.userId === userId || p.userId === Number(userId))
        : list[0]; // fallback: first record (dev mode)

      if (!found) { setError('Profile not found for your account.'); return; }

      setProfile(found);

      const dRes = await getDocumentsByEntity(role, found.id);
      setDocs(dRes.data || []);
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
      else                    await updateLawyer(profile.id, editForm);
      setSaveMsg('Profile updated successfully.');
      setEditForm(null);
      fetchProfile();
    } catch (e) {
      setSaveMsg(e?.response?.data?.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-5 text-muted">Loading your profile...</div>;
  if (error)   return <div className="alert alert-danger">{error}</div>;

  const isCitizen = role === 'CITIZEN';

  return (
    <div>
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
        {/* Profile Card */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-bottom border-light px-4 py-3 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">{isCitizen ? '' : '⚖️'} Profile Details</h6>
              {!editForm && (
                <button className="btn btn-sm btn-primary fw-semibold"
                  onClick={() => setEditForm(
                    isCitizen
                      ? { address: profile.address, contactInfo: profile.contactInfo, status: profile.status }
                      : { contactInfo: profile.contactInfo, status: profile.status }
                  )}>
                  ✏️ Edit
                </button>
              )}
            </div>
            <div className="card-body px-4 py-3">
              {saveMsg && (
                <div className={`alert ${saveMsg.includes('success') ? 'alert-success' : 'alert-danger'} py-2 small mb-3`}>
                  {saveMsg}
                </div>
              )}

              {/* View Mode */}
              {!editForm && (
                <div className="row g-3 small">
                  {[
                         ['Name',       profile.name],
                    isCitizen
                      ? ['Address', profile.address || '—']
                      : ['Bar ID',  profile.barId],
                    ['Contact',    profile.contactInfo || '—'],
                    ['Status',     profile.status],
                    ['Registered', profile.createdDate ? new Date(profile.createdDate).toLocaleDateString() : '—'],
                  ].map(([label, val]) => (
                    <div className="col-6" key={label}>
                      <div className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>{label}</div>
                      <div className="fw-semibold text-dark">
                        {label === 'Status'
                          ? <span className={`badge bg-${STATUS_COLORS[val] || 'secondary'} text-${val === 'PENDING' ? 'dark' : 'white'}`}>{val}</span>
                          : val}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Edit Mode */}
              {editForm && (
                <div className="row g-3">
                  {isCitizen && (
                    <div className="col-12">
                      <label className="form-label fw-semibold text-secondary small text-uppercase">Address</label>
                      <input className="form-control" value={editForm.address || ''}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
                    </div>
                  )}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary small text-uppercase">Contact Info</label>
                    <input className="form-control" value={editForm.contactInfo || ''}
                      onChange={(e) => setEditForm({ ...editForm, contactInfo: e.target.value })} />
                  </div>
                  <div className="col-12 d-flex gap-2 justify-content-end">
                    <button className="btn btn-light fw-semibold" onClick={() => setEditForm(null)}>Cancel</button>
                    <button className="btn btn-primary fw-semibold px-4" onClick={handleSave} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Documents Card */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-bottom border-light px-4 py-3">
              <h6 className="fw-bold mb-0"> My Documents</h6>
            </div>
            <div className="card-body px-4 py-3">
              {docs.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted small mb-2">No documents uploaded yet.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {docs.map((d) => (
                    <div key={d.documentID}
                      className="d-flex align-items-center justify-content-between bg-light rounded-3 px-3 py-2">
                      <div>
                        <div className="fw-semibold small">{d.docType}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{d.fileUri}</div>
                      </div>
                      <span className={`badge bg-${d.verificationStatus === 'VERIFIED' ? 'success' : d.verificationStatus === 'REJECTED' ? 'danger' : 'warning'} text-${d.verificationStatus === 'PENDING' ? 'dark' : 'white'}`}>
                        {d.verificationStatus}
                      </span>
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
