import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllComplianceRecords } from '../compliance/axios/complianceApi';
import { getAllAudits } from '../audit/axios/auditApi';

export default function ComplianceDashboard() {
  const [records, setRecords] = useState([]);
  const [audits, setAudits]   = useState([]);

  useEffect(() => {
    getAllComplianceRecords().then(r => setRecords(r.data || [])).catch(() => {});
    getAllAudits().then(r => setAudits(r.data || [])).catch(() => {});
  }, []);

  const total      = records.length;
  const resolved   = records.filter(r => r.isResolved).length;
  const unresolved = total - resolved;
  const openAudits = audits.filter(a => a.status === 'OPEN').length;

  const stats = [
    { label: 'Total Records',  value: total,      color: '#1a1a2e', icon: '📋' },
    { label: 'Resolved',       value: resolved,   color: '#27ae60', icon: '✅' },
    { label: 'Unresolved',     value: unresolved, color: '#e74c3c', icon: '⚠️' },
    { label: 'Open Audits',    value: openAudits, color: '#e67e22', icon: '🔍' },
  ];

  const quickActions = [
    { label: 'Compliance Records', to: '/compliance/records',     icon: '📋', color: '#1a1a2e', desc: 'View and manage all compliance records.' },
    { label: 'Add Record',         to: '/compliance/records/new', icon: '➕', color: '#e74c3c', desc: 'Create a new compliance record.' },
    { label: 'Audits',             to: '/compliance/audits',      icon: '🔍', color: '#16213e', desc: 'View all audit records.' },
    { label: 'New Audit',          to: '/compliance/audits/new',  icon: '📝', color: '#e67e22', desc: 'Create a new audit record.' },
  ];

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Compliance Officer Dashboard</h4>
        <p className="text-muted small mb-0">Overview of compliance records and audit activities — Module 4.7</p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div className="col-md-3 col-sm-6" key={s.label}>
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                <span className="fw-bold fs-4" style={{ color: s.color }}>{s.value}</span>
              </div>
              <p className="text-muted small fw-semibold mb-0">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h6 className="fw-bold text-secondary text-uppercase small mb-3">Quick Actions</h6>
      <div className="row g-3 mb-4">
        {quickActions.map((a) => (
          <div className="col-md-3 col-sm-6" key={a.to}>
            <Link to={a.to} className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-3 h-100"
                style={{ transition: 'transform 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="rounded-3 d-flex align-items-center justify-content-center mb-2"
                  style={{ width: '42px', height: '42px', background: a.color + '1a', fontSize: '1.3rem' }}>
                  {a.icon}
                </div>
                <h6 className="fw-bold text-dark mb-1 small">{a.label}</h6>
                <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>{a.desc}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Records */}
      <h6 className="fw-bold text-secondary text-uppercase small mb-3">Recent Compliance Records</h6>
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          {records.length === 0 ? (
            <div className="text-center py-4 text-muted small">No records yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4 small">ID</th>
                    <th className="small">Type</th>
                    <th className="small">Result</th>
                    <th className="small">Date</th>
                    <th className="small">Resolved</th>
                  </tr>
                </thead>
                <tbody>
                  {records.slice(0, 5).map(r => (
                    <tr key={r.complianceID}>
                      <td className="ps-4 text-muted small">#{r.complianceID}</td>
                      <td><span className="badge bg-secondary small">{r.type}</span></td>
                      <td>
                        <span className={`badge small bg-${r.result === 'COMPLIANT' || r.result === 'PASSED' ? 'success' : r.result === 'FAILED' || r.result === 'NON_COMPLIANT' ? 'danger' : 'warning'} text-${r.result === 'WARNING' ? 'dark' : 'white'}`}>
                          {r.result}
                        </span>
                      </td>
                      <td className="text-muted small">{r.date}</td>
                      <td>
                        <span className={`badge small ${r.isResolved ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {r.isResolved ? 'Yes' : 'No'}
                        </span>
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
  );
}
