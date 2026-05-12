import { useEffect, useState } from 'react';
import {
  getAllCitizens,
  getCitizenById,
  updateCitizen,
  getDocumentsByEntity,
  verifyDocument,
} from '../axios/registrationApi';
import { getUserRole, decodeToken } from '../../../utils/token';

const STATUS_COLORS = {
  ACTIVE: 'success', PENDING: 'warning', APPROVED: 'primary',
  REJECTED: 'danger', BLOCKED: 'secondary', INACTIVE: 'dark',
};

const VERIFY_COLORS = {
  VERIFIED: 'success', REJECTED: 'danger', PENDING: 'warning',
};

export default function CitizenPanel() {
  const role    = getUserRole();
  const decoded = decodeToken();
  const isSelf  = role === 'CITIZEN'; // citizen sees only own profile

  const [citizens, setCitizens]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [selected, setSelected]   = useState(null);
  const [docs, setDocs]           = useState([]);
  const [editForm, setEditForm]   = useState(null);
  const [saving, setSaving]       = useState(false);
  const [saveMsg, setSaveMsg]     = useState('');
  const [verifying, setVerifying] = useState(null); // docId being verified

  // ── Fetch list ──────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      if (isSelf) {
        // CITIZEN: fetch all then filter by own userId from token
        const res  = await getAllCitizens();
        const list = res.data || [];
        const uid  = decoded?.userId || decoded?.id || null;
        const own  = uid ? list.find(c => c.userId === Number(uid)) : list[0];
        setCitizens(own ? [own] : []);
      } else {
        // ADMIN / CLERK: fetch all
        const res = await getAllCitizens();
        setCitizens(res.data || []);
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load citizens.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Open detail — GET /profiles/citizens/{id} + GET /profiles/documents/CITIZEN/{id} ──
  const openDetail = async (id) => {
    setSaveMsg('');
    setEditForm(null);
    try {
      const [cRes, dRes] = await Promise.all([
        getCitizenById(id),                      // GET /profiles/citizens/{id}
        getDocumentsByEntity('CITIZEN', id),     // GET /profiles/documents/CITIZEN/{id}
      ]);
      setSelected(cRes.data);
      setDocs(dRes.data || []);
    } catch {
      setSelected(null);
      setDocs([]);
    }
  };

  // ── Update — PUT /profiles/citizens/{id} ────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      await updateCitizen(selected.id, editForm);  // PUT /profiles/citizens/{id}
      setSaveMsg('Updated successfully.');
      setEditForm(null);
      fetchAll();
      openDetail(selected.id);
    } catch (e) {
      setSaveMsg(e?.response?.data?.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  // ── Verify document — PATCH /profiles/documents/verify/{id}?status= ─────────
  const handleVerify = async (docId, status) => {
    setVerifying(docId);
    try {
      await verifyDocument(docId, status);         // PATCH /profiles/documents/verify/{id}?status=
      // Refresh docs
      const dRes = await getDocumentsByEntity('CITIZEN', selected.id);
      setDocs(dRes.data || []);
    } catch (e) {
      setSaveMsg(e?.response?.data?.message || 'Verification failed.');
    } finally {
      setVerifying(null);
    }
  };

  const canVerify = ['ADMIN', 'CLERK'].includes(role);

  return (
    <div className="row g-4">

      {/* ── LEFT: Citizens Table ─────────────────────────────────────────────── */}
      <div className={selected ? 'col-md-5' : 'col-12'}>
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-header bg-white border-bottom border-light px-4 py-3 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-0 text-dark">🧑💼 Citizens</h5>
              <small className="text-muted">
                {isSelf ? 'Your registered profile' : `${citizens.length} registered citizen(s)`}
              </small>
            </div>
            <button className="btn btn-sm btn-outline-primary fw-semibold" onClick={fetchAll}>
              ↻ Refresh
            </button>
          </div>

          <div className="card-body p-0">
            {loading && <div className="text-center py-5 text-muted small">Loading...</div>}
            {error   && <div className="alert alert-danger m-3 small">{error}</div>}
            {!loading && !error && citizens.length === 0 && (
              <div className="text-center py-5 text-muted small">No citizen profile found.</div>
            )}
            {!loading && citizens.length > 0 && (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 small">ID</th>
                      <th className="small">Name</th>
                      <th className="small">Contact</th>
                      <th className="small">Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {citizens.map((c) => (
                      <tr key={c.id} className={selected?.id === c.id ? 'table-active' : ''}>
                        <td className="ps-4 text-muted small">#{c.id}</td>
                        <td className="fw-semibold small">{c.name}</td>
                        <td className="text-muted small">{c.contactInfo}</td>
                        <td>
                          <span className={`badge bg-${STATUS_COLORS[c.status] || 'secondary'} text-${c.status === 'PENDING' ? 'dark' : 'white'} small`}>
                            {c.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => openDetail(c.id)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Detail + Edit + Documents ─────────────────────────────────── */}
      {selected && (
        <div className="col-md-7">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-bottom border-light px-4 py-3 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Citizen #{selected.id} — {selected.name}</h6>
              </div>
              <div className="d-flex gap-2">
                {!editForm && (
                  <button className="btn btn-sm btn-primary fw-semibold"
                    onClick={() => setEditForm({
                      address:     selected.address,
                      contactInfo: selected.contactInfo,
                      status:      selected.status,
                    })}>
                    ✏️ Edit
                  </button>
                )}
                <button className="btn btn-sm btn-outline-secondary"
                  onClick={() => { setSelected(null); setEditForm(null); setSaveMsg(''); }}>
                  ✕
                </button>
              </div>
            </div>

            <div className="card-body px-4 py-3">
              {saveMsg && (
                <div className={`alert ${saveMsg.includes('success') ? 'alert-success' : 'alert-danger'} py-2 small mb-3`}>
                  {saveMsg}
                </div>
              )}

              {/* ── View Mode ── */}
              {!editForm && (
                <div className="row g-2 mb-3">
                  {[
                    ['Citizen ID',  selected.id],
                    ['User ID',     selected.userId],
                    ['Name',        selected.name],
                    ['Address',     selected.address || '—'],
                    ['Contact',     selected.contactInfo],
                    ['Status',      selected.status],
                    ['Registered',  selected.createdDate  ? new Date(selected.createdDate).toLocaleDateString()  : '—'],
                  ].map(([label, val]) => (
                    <div className="col-6" key={label}>
                      <div className="text-muted text-uppercase" style={{ fontSize: '0.68rem' }}>{label}</div>
                      <div className="fw-semibold text-dark small">
                        {label === 'Status'
                          ? <span className={`badge bg-${STATUS_COLORS[val] || 'secondary'} text-${val === 'PENDING' ? 'dark' : 'white'}`}>{val}</span>
                          : val}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Edit Mode — PUT /profiles/citizens/{id} ── */}
              {editForm && (
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary small text-uppercase">Address</label>
                    <input className="form-control form-control-sm" value={editForm.address || ''}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary small text-uppercase">Contact Info</label>
                    <input className="form-control form-control-sm" value={editForm.contactInfo || ''}
                      onChange={(e) => setEditForm({ ...editForm, contactInfo: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary small text-uppercase">Status</label>
                    <select className="form-select form-select-sm" value={editForm.status || ''}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                      {['ACTIVE','INACTIVE','PENDING','APPROVED','REJECTED','BLOCKED'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 d-flex gap-2 justify-content-end">
                    <button className="btn btn-sm btn-light fw-semibold" onClick={() => setEditForm(null)}>Cancel</button>
                    <button className="btn btn-sm btn-primary fw-semibold px-4" onClick={handleSave} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── Documents — GET /profiles/documents/CITIZEN/{id} ── */}
              <hr className="my-3" />
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-semibold text-secondary small text-uppercase">📄 Documents</span>
              </div>

              {docs.length === 0 ? (
                <p className="text-muted small">No documents uploaded.</p>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {docs.map((d) => (
                    <div key={d.documentID}
                      className="d-flex align-items-center justify-content-between bg-light rounded-3 px-3 py-2">
                      <div>
                        <div className="fw-semibold small">{d.docType}</div>
                        <div className="text-muted" style={{ fontSize: '0.72rem', wordBreak: 'break-all' }}>{d.fileUri}</div>
                        <div className="text-muted" style={{ fontSize: '0.68rem' }}>
                          {d.uploadedDate ? new Date(d.uploadedDate).toLocaleDateString() : ''}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-1">
                        <span className={`badge bg-${VERIFY_COLORS[d.verificationStatus] || 'secondary'} text-${d.verificationStatus === 'PENDING' ? 'dark' : 'white'} small`}>
                          {d.verificationStatus}
                        </span>
                        {/* PATCH /profiles/documents/verify/{id} — ADMIN/CLERK only */}
                        {canVerify && d.verificationStatus === 'PENDING' && (
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-success btn-sm py-0 px-2"
                              style={{ fontSize: '0.7rem' }}
                              disabled={verifying === d.documentID}
                              onClick={() => handleVerify(d.documentID, 'VERIFIED')}>
                              ✓ Verify
                            </button>
                            <button
                              className="btn btn-danger btn-sm py-0 px-2"
                              style={{ fontSize: '0.7rem' }}
                              disabled={verifying === d.documentID}
                              onClick={() => handleVerify(d.documentID, 'REJECTED')}>
                              ✗ Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
