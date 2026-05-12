import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllComplianceRecords, resolveComplianceRecord } from '../axios/complianceApi';

const RESULT_COLORS = {
  COMPLIANT: 'success', PASSED: 'success', FAILED: 'danger',
  NON_COMPLIANT: 'danger', WARNING: 'warning',
};

export default function ComplianceListPage() {
  const [records, setRecords]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [selected, setSelected]   = useState(null);
  const [notes, setNotes]         = useState('');
  const [resolving, setResolving] = useState(false);
  const [msg, setMsg]             = useState('');

  const fetchAll = async () => {
    setLoading(true); setError('');
    try {
      const res = await getAllComplianceRecords();
      setRecords(res.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load compliance records.');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleResolve = async () => {
    if (!notes.trim()) return;
    setResolving(true); setMsg('');
    try {
      await resolveComplianceRecord(selected.complianceID, notes);
      setMsg('Record resolved successfully.');
      setSelected(null); setNotes('');
      fetchAll();
    } catch (e) {
      setMsg(e?.response?.data?.message || 'Resolve failed.');
    } finally { setResolving(false); }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">📋 Compliance Records</h4>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-secondary fw-semibold" onClick={fetchAll}>↻ Refresh</button>
          <Link to="/compliance/records/new" className="btn btn-danger fw-semibold px-4">+ Add Record</Link>
        </div>
      </div>

      {msg && <div className={`alert ${msg.includes('success') ? 'alert-success' : 'alert-danger'} small mb-3`}>{msg}</div>}

      <div className="row g-4">
        <div className={selected ? 'col-md-7' : 'col-12'}>
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-0">
              {loading && <div className="text-center py-5 text-muted">Loading...</div>}
              {error   && <div className="alert alert-danger m-3">{error}</div>}
              {!loading && records.length === 0 && <div className="text-center py-5 text-muted small">No records found.</div>}
              {!loading && records.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4 small">ID</th>
                        <th className="small">Entity ID</th>
                        <th className="small">Type</th>
                        <th className="small">Result</th>
                        <th className="small">Date</th>
                        <th className="small">Resolved</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((r) => (
                        <tr key={r.complianceID} className={selected?.complianceID === r.complianceID ? 'table-active' : ''}>
                          <td className="ps-4 text-muted small">#{r.complianceID}</td>
                          <td className="fw-semibold small">{r.entityId}</td>
                          <td><span className="badge bg-secondary small">{r.type}</span></td>
                          <td>
                            <span className={`badge bg-${RESULT_COLORS[r.result] || 'secondary'} text-${r.result === 'WARNING' ? 'dark' : 'white'} small`}>
                              {r.result}
                            </span>
                          </td>
                          <td className="text-muted small">{r.date}</td>
                          <td>
                            <span className={`badge small ${r.isResolved ? 'bg-success' : 'bg-warning text-dark'}`}>
                              {r.isResolved ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-secondary px-3"
                              onClick={() => { setSelected(r); setMsg(''); setNotes(''); }}>
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

        {/* Detail + Resolve Panel */}
        {selected && (
          <div className="col-md-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-header bg-white border-bottom border-light px-4 py-3 d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">Record #{selected.complianceID}</h6>
                <button className="btn btn-sm btn-outline-secondary"
                  onClick={() => { setSelected(null); setNotes(''); setMsg(''); }}>✕</button>
              </div>
              <div className="card-body px-4 py-3">
                <div className="row g-2 small mb-3">
                  {[
                    ['Compliance ID',  selected.complianceID],
                    ['Entity ID',      selected.entityId],
                    ['Officer ID',     selected.officerId],
                    ['Type',           selected.type],
                    ['Result',         selected.result],
                    ['Date',           selected.date],
                    ['Resolved',       selected.isResolved ? 'Yes' : 'No'],
                    ['Notes',          selected.notes],
                  ].map(([label, val]) => (
                    <div className="col-6" key={label}>
                      <div className="text-muted text-uppercase" style={{ fontSize: '0.68rem' }}>{label}</div>
                      <div className="fw-semibold text-dark">{val}</div>
                    </div>
                  ))}
                  {selected.correctiveActionNotes && selected.correctiveActionNotes !== 'NONE' && (
                    <div className="col-12">
                      <div className="text-muted text-uppercase" style={{ fontSize: '0.68rem' }}>Corrective Notes</div>
                      <div className="fw-semibold text-dark">{selected.correctiveActionNotes}</div>
                    </div>
                  )}
                </div>

                {/* Resolve — PUT /api/compliance/records/{id}/resolve */}
                {!selected.isResolved && (
                  <>
                    <hr className="my-3" />
                    <label className="form-label fw-semibold text-secondary small text-uppercase">Corrective Action Notes</label>
                    <textarea className="form-control form-control-sm mb-2" rows={3}
                      placeholder="Describe the corrective action taken..."
                      value={notes} onChange={(e) => setNotes(e.target.value)} />
                    <button className="btn btn-success btn-sm fw-semibold w-100"
                      onClick={handleResolve} disabled={resolving || !notes.trim()}>
                      {resolving ? 'Resolving...' : '✓ Mark as Resolved'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
