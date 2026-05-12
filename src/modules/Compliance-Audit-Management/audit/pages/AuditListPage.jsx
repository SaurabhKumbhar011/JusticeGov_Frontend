import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllAudits, updateAudit } from '../axios/auditApi';

const STATUS_COLORS  = { OPEN: 'warning', IN_PROGRESS: 'primary', CLOSED: 'success' };
const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

const formatDate = (value) => value ? new Date(value).toLocaleDateString() : '—';

const toIsoDate = (value) => {
  if (!value) return '';
  if (typeof value !== 'string') value = value.toString();
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const normalizeAudit = (audit) => ({
  auditId: audit.auditId ?? audit.id ?? audit.auditID ?? '—',
  officerId: audit.officerId ?? audit.officerID ?? audit.auditorId ?? '—',
  complianceId: audit.complianceId ?? audit.complianceID ?? audit.recordId ?? '—',
  scope: audit.scope ?? audit.type ?? '—',
  findings: audit.findings ?? audit.notes ?? '—',
  date: formatDate(audit.date ?? audit.createdDate ?? audit.updatedDate),
  dateValue: toIsoDate(audit.date ?? audit.createdDate ?? audit.updatedDate),
  status: audit.status ?? audit.state ?? 'OPEN',
  createdDate: audit.createdDate,
  lastModifiedDate: audit.lastModifiedDate ?? audit.updatedDate,
});

export default function AuditListPage() {
  const [audits, setAudits]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [selected, setSelected] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState('');

  const fetchAll = async () => {
    setLoading(true); setError('');
    try {
      const res = await getAllAudits();
      setAudits(Array.isArray(res.data) ? res.data : res.data?.data ?? []);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load audits.');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      const auditId = selected?.auditId ?? selected?.id;
      await updateAudit(auditId, { ...editForm, officerId: Number(editForm.officerId), complianceId: Number(editForm.complianceId) });
      setMsg('Audit updated successfully.');
      setEditForm(null);
      fetchAll();
    } catch (e) {
      setMsg(e?.response?.data?.message || 'Update failed.');
    } finally { setSaving(false); }
  };

  const normalizedAudits = audits.map(normalizeAudit);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">🔍 Audits</h4>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-secondary fw-semibold" onClick={fetchAll}>↻ Refresh</button>
          <Link to="/compliance/audits/new" className="btn btn-dark fw-semibold px-4">+ New Audit</Link>
        </div>
      </div>

      {msg && <div className={`alert ${msg.includes('success') ? 'alert-success' : 'alert-danger'} small mb-3`}>{msg}</div>}

      <div className="row g-4">
        <div className={selected ? 'col-md-6' : 'col-12'}>
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-0">
              {loading && <div className="text-center py-5 text-muted">Loading...</div>}
              {error   && <div className="alert alert-danger m-3">{error}</div>}
              {!loading && audits.length === 0 && <div className="text-center py-5 text-muted small">No audits found.</div>}
              {!loading && audits.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4 small">ID</th>
                        <th className="small">Officer ID</th>
                        <th className="small">Scope</th>
                        <th className="small">Date</th>
                        <th className="small">Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalizedAudits.map((a) => (
                        <tr key={a.auditId} className={selected?.auditId === a.auditId ? 'table-active' : ''}>
                          <td className="ps-4 text-muted small">#{a.auditId}</td>
                          <td className="fw-semibold small">{a.officerId}</td>
                          <td className="text-muted small">{a.scope}</td>
                          <td className="text-muted small">{a.date}</td>
                          <td>
                            <span className={`badge bg-${STATUS_COLORS[a.status] || 'secondary'} text-${a.status === 'OPEN' ? 'dark' : 'white'} small`}>
                              {a.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-secondary px-3"
                              onClick={() => { setSelected(a); setEditForm(null); setMsg(''); }}>
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

        {/* Detail Panel */}
        {selected && (
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-header bg-white border-bottom border-light px-4 py-3 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-0">Audit #{selected.auditId}</h6>
                </div>
                <div className="d-flex gap-2">
                  {!editForm && (
                    <button className="btn btn-sm btn-dark fw-semibold"
                      onClick={() => setEditForm({ officerId: selected.officerId, complianceId: selected.complianceId, scope: selected.scope, findings: selected.findings, date: selected.dateValue, status: selected.status })}>
                      ✏️ Edit
                    </button>
                  )}
                  <button className="btn btn-sm btn-outline-secondary"
                    onClick={() => { setSelected(null); setEditForm(null); }}>✕</button>
                </div>
              </div>

              <div className="card-body px-4 py-3">
                {/* View Mode */}
                {!editForm && (
                  <div className="row g-2 small">
                    {[
                      ['Audit ID',      selected.auditId],
                      ['Officer ID',    selected.officerId],
                      ['Compliance ID', selected.complianceId],
                      ['Scope',         selected.scope],
                      ['Date',          selected.date],
                      ['Status',        selected.status],
                      ['Created',       selected.createdDate ? new Date(selected.createdDate).toLocaleDateString() : '—'],
                      ['Modified',      selected.lastModifiedDate ? new Date(selected.lastModifiedDate).toLocaleDateString() : '—'],
                    ].map(([label, val]) => (
                      <div className="col-6" key={label}>
                        <div className="text-muted text-uppercase" style={{ fontSize: '0.68rem' }}>{label}</div>
                        <div className="fw-semibold text-dark">
                          {label === 'Status'
                            ? <span className={`badge bg-${STATUS_COLORS[val] || 'secondary'} text-${val === 'OPEN' ? 'dark' : 'white'}`}>{val}</span>
                            : val}
                        </div>
                      </div>
                    ))}
                    {selected.findings && (
                      <div className="col-12">
                        <div className="text-muted text-uppercase" style={{ fontSize: '0.68rem' }}>Findings</div>
                        <div className="fw-semibold text-dark">{selected.findings}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Edit Mode — PUT /api/audits/{id} */}
                {editForm && (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-secondary small text-uppercase">Officer ID</label>
                      <input className="form-control form-control-sm" type="number" value={editForm.officerId || ''}
                        onChange={(e) => setEditForm({ ...editForm, officerId: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-secondary small text-uppercase">Compliance ID</label>
                      <input className="form-control form-control-sm" type="number" value={editForm.complianceId || ''}
                        onChange={(e) => setEditForm({ ...editForm, complianceId: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-secondary small text-uppercase">Scope</label>
                      <input className="form-control form-control-sm" value={editForm.scope || ''}
                        onChange={(e) => setEditForm({ ...editForm, scope: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-secondary small text-uppercase">Date</label>
                      <input className="form-control form-control-sm" type="date" value={editForm.date || ''}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold text-secondary small text-uppercase">Status</label>
                      <select className="form-select form-select-sm" value={editForm.status || ''}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold text-secondary small text-uppercase">Findings</label>
                      <textarea className="form-control form-control-sm" rows={3} value={editForm.findings || ''}
                        onChange={(e) => setEditForm({ ...editForm, findings: e.target.value })} />
                    </div>
                    <div className="col-12 d-flex gap-2 justify-content-end">
                      <button className="btn btn-sm btn-light fw-semibold" onClick={() => setEditForm(null)}>Cancel</button>
                      <button className="btn btn-sm btn-dark fw-semibold px-4" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
