import { useEffect, useState } from 'react';
import {
  getAllLawyers,
  getLawyerById,
  updateLawyer,
  getDocumentsByEntity,
  verifyDocument,
} from '../axios/registrationApi';
//import { getUserRole, decodeToken } from '../../../utils/token';

const STATUS_COLORS = {
  ACTIVE: 'success', PENDING: 'warning', APPROVED: 'primary',
  REJECTED: 'danger', BLOCKED: 'secondary', INACTIVE: 'dark',
};

const VERIFY_COLORS = {
  VERIFIED: 'success', REJECTED: 'danger', PENDING: 'warning',
};

export default function LawyerPanel() {
  const role    = localStorage.getItem('role'); // getUserRole();
  //const decoded = decodeToken();
  const isSelf  = role === 'LAWYER'; // lawyer sees only own profile

  const [lawyers, setLawyers]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [selected, setSelected]   = useState(null);
  const [docs, setDocs]           = useState([]);
  const [editForm, setEditForm]   = useState(null);
  const [saving, setSaving]       = useState(false);
  const [saveMsg, setSaveMsg]     = useState('');
  const [verifying, setVerifying] = useState(null);

  // ── Fetch list ──────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      if (isSelf) {
        // LAWYER: fetch all then filter by own userId from token
        const res  = await getAllLawyers();
        const list = res.data || [];
        //const uid  = decoded?.userId || decoded?.id || null;
        const own  = uid ? list.find(l => l.userId === Number(uid)) : list[0];
        setLawyers(own ? [own] : []);
      } else {
        // ADMIN / CLERK: fetch all
        const res = await getAllLawyers();
        setLawyers(res.data || []);
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load lawyers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Open detail — GET /profiles/lawyers/{id} + GET /profiles/documents/LAWYER/{id} ──
  const openDetail = async (id) => {
    setSaveMsg('');
    setEditForm(null);
    try {
      const [lRes, dRes] = await Promise.all([
        getLawyerById(id),                       // GET /profiles/lawyers/{id}
        getDocumentsByEntity('LAWYER', id),      // GET /profiles/documents/LAWYER/{id}
      ]);
      setSelected(lRes.data);
      setDocs(dRes.data || []);
    } catch {
      setSelected(null);
      setDocs([]);
    }
  };

  // ── Update — PUT /profiles/lawyers/{id} ─────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      await updateLawyer(selected.id, editForm);  // PUT /profiles/lawyers/{id}
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
      const dRes = await getDocumentsByEntity('LAWYER', selected.id);
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

      {/* ── LEFT: Lawyers Table ──────────────────────────────────────────────── */}
      <div className={selected ? 'col-md-5' : 'col-12'}>
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-header bg-white border-bottom border-light px-4 py-3 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="fw-bold mb-0 text-dark">⚖️ Lawyers</h5>
              <small className="text-muted">
                {isSelf ? 'Your registered profile' : `${lawyers.length} registered lawyer(s)`}
              </small>
            </div>
            <button className="btn btn-sm btn-outline-primary fw-semibold" onClick={fetchAll}>
              ↻ Refresh
            </button>
          </div>

          <div className="card-body p-0">
            {loading && <div className="text-center py-5 text-muted small">Loading...</div>}
            {error   && <div className="alert alert-danger m-3 small">{error}</div>}
            {!loading && !error && lawyers.length === 0 && (
              <div className="text-center py-5 text-muted small">No lawyer profile found.</div>
            )}
            {!loading && lawyers.length > 0 && (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 small">ID</th>
                      <th className="small">Name</th>
                      <th className="small">Bar ID</th>
                      <th className="small">Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lawyers.map((l) => (
                      <tr key={l.id} className={selected?.id === l.id ? 'table-active' : ''}>
                        <td className="ps-4 text-muted small">#{l.id}</td>
                        <td className="fw-semibold small">{l.name}</td>
                        <td className="text-muted small">{l.barId}</td>
                        <td>
                          <span className={`badge bg-${STATUS_COLORS[l.status] || 'secondary'} text-${l.status === 'PENDING' ? 'dark' : 'white'} small`}>
                            {l.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => openDetail(l.id)}>
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
                <h6 className="fw-bold mb-0 text-dark">Lawyer #{selected.id} — {selected.name}</h6>
              </div>
              <div className="d-flex gap-2">
                {!editForm && (
                  <button className="btn btn-sm btn-primary fw-semibold"
                    onClick={() => setEditForm({
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
                    ['Lawyer ID',     selected.id],
                    ['User ID',       selected.userId],
                    ['Name',          selected.name],
                    ['Bar ID',        selected.barId],
                    ['Contact',       selected.contactInfo || '—'],
                    ['Status',        selected.status],
                    ['Registered',    selected.createdDate       ? new Date(selected.createdDate).toLocaleDateString()       : '—'],
                    ['Last Modified', selected.lastModifiedDate  ? new Date(selected.lastModifiedDate).toLocaleDateString()  : '—'],
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

              {/* ── Edit Mode — PUT /profiles/lawyers/{id} ── */}
              {editForm && (
                <div className="row g-3 mb-3">
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

              {/* ── Documents — GET /profiles/documents/LAWYER/{id} ── */}
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
