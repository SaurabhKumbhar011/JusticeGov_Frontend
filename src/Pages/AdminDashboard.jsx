import React, { useState, useEffect } from 'react';
import { getAuditLogs, approveUser, suspendUser, reactivateUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext.jsx';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [emailTarget, setEmailTarget] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const adminId = 1; 

  useEffect(() => {
    if (showLogs && logs.length === 0) {
      loadLogs();
    }
  }, [showLogs]);

  const loadLogs = async () => {
    try { 
      const data = await getAuditLogs(adminId);
      setLogs(data); 
    } catch (e) { 
      console.error("Audit Sync Failure:", e); 
    }
  };

  const toggleLogs = () => {
    setShowLogs((current) => !current);
  };

  const handleApprove = async () => {
    const targetEmail = emailTarget.trim();
    if (!targetEmail) {
      setStatusMsg({ type: 'danger', text: 'Please enter a valid email address to approve.' });
      return;
    }
    setIsProcessing(true);
    setStatusMsg(null);
    
    try {
      await approveUser(targetEmail);
      setStatusMsg({ type: 'success', text: `Identity Verified: ${targetEmail} is now active.` });
      setEmailTarget('');
      loadLogs();
    } catch (e) {
      const errorText = e.response?.data?.message || "Internal Server Error during approval.";
      setStatusMsg({ type: 'danger', text: errorText });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuspend = async () => {
    const targetEmail = emailTarget.trim();
    if (!targetEmail) {
      setStatusMsg({ type: 'danger', text: 'Please enter a valid email address to suspend.' });
      return;
    }
    setIsProcessing(true);
    setStatusMsg(null);

    try {
      await suspendUser(targetEmail);
      setStatusMsg({ type: 'success', text: `Account suspended: ${targetEmail}` });
      setEmailTarget('');
      loadLogs();
    } catch (e) {
      const errorText = e.response?.data?.message || "Internal Server Error during suspend.";
      setStatusMsg({ type: 'danger', text: errorText });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReactivate = async () => {
    const targetEmail = emailTarget.trim();
    if (!targetEmail) {
      setStatusMsg({ type: 'danger', text: 'Please enter a valid email address to reactivate.' });
      return;
    }
    setIsProcessing(true);
    setStatusMsg(null);

    try {
      await reactivateUser(targetEmail);
      setStatusMsg({ type: 'success', text: `Account reactivated: ${targetEmail}` });
      setEmailTarget('');
      loadLogs();
    } catch (e) {
      const errorText = e.response?.data?.message || "Internal Server Error during reactivation.";
      setStatusMsg({ type: 'danger', text: errorText });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 py-5 text-light" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <header className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom border-secondary border-opacity-20">
          <div>
            <h2 className="fw-bolder mb-0" style={{ color: '#38bdf8' }}>JusticeGov <span className="text-white opacity-75">IAM</span></h2>
            <div className="small text-secondary fw-bold text-uppercase mt-1" style={{ letterSpacing: '1px' }}>Global Admin Console</div>
          </div>
          <div className="badge bg-primary bg-opacity-10 text-primary border border-primary px-3 py-2 rounded-pill fw-bold">ADMIN</div>
        </header>

        <div className="d-flex justify-content-end mb-4">
          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            style={{ borderRadius: '10px' }}
            onClick={toggleLogs}
          >
            {showLogs ? 'Hide Audit Logs' : 'Show Audit Logs'}
          </button>
        </div>

        <div className="card border-0 shadow-lg rounded-4 mb-5" style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)' }}>
          <div className="card-body p-4 p-lg-5">
            <h5 className="fw-bold text-white mb-4">User Access Management</h5>
            <p className="text-secondary small mb-4">Approve, suspend, or reactivate users using their registered email address.</p>
            
            {statusMsg && (
              <div className={`alert alert-${statusMsg.type} bg-opacity-10 border-0 rounded-3 small fw-bold mb-4`}>
                {statusMsg.text}
              </div>
            )}

            <div className="row g-3">
              <div className="col-lg-9">
                <input 
                  type="email" 
                  className="form-control form-control-lg bg-dark text-white border-0 shadow-none py-3" 
                  placeholder="Citizen or Staff Email..."
                  value={emailTarget}
                  onChange={e => setEmailTarget(e.target.value)}
                  style={{ borderRadius: '12px' }}
                />
              </div>
              <div className="col-lg-3">
                <button 
                  onClick={handleApprove} 
                  className="btn btn-info btn-lg w-100 fw-bolder text-white py-3"
                  disabled={!emailTarget || isProcessing}
                  style={{ borderRadius: '12px', background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)', border: 'none' }}
                >
                  {isProcessing ? 'Validating...' : 'Approve User'}
                </button>
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-4">
                <button
                  onClick={handleSuspend}
                  className="btn btn-warning btn-lg w-100 fw-bolder text-white py-3"
                  disabled={!emailTarget || isProcessing}
                  style={{ borderRadius: '12px' }}
                >
                  {isProcessing ? 'Processing...' : 'Suspend User'}
                </button>
              </div>
              <div className="col-md-4">
                <button
                  onClick={handleReactivate}
                  className="btn btn-success btn-lg w-100 fw-bolder text-white py-3"
                  disabled={!emailTarget || isProcessing}
                  style={{ borderRadius: '12px' }}
                >
                  {isProcessing ? 'Processing...' : 'Reactivate User'}
                </button>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <div className="text-muted small">Only admins can perform these actions.</div>
              </div>
            </div>
          </div>
        </div>

        <h4 className="fw-bold mb-4">System Audit Trail</h4>
        {showLogs ? (
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ backgroundColor: '#1e293b' }}>
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 align-middle">
                <thead style={{ backgroundColor: '#0f172a' }}>
                  <tr className="text-secondary small fw-bold text-uppercase">
                    <th className="px-4 py-3">Audit ID</th>
                    <th className="px-4 py-3">User UID</th>
                    <th className="px-4 py-3">Operation</th>
                    <th className="px-4 py-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {logs.length > 0 ? logs.map(log => (
                    <tr key={log.auditId} className="border-secondary border-opacity-10">
                      <td className="px-4 py-3 text-secondary">#{log.auditId}</td>
                      <td className="px-4 py-3 fw-bold">{log.userId}</td>
                      <td className="px-4 py-3">
                        <span className="badge rounded-pill bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-3 py-2">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-secondary small">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-secondary">No recorded system events.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-secondary small mb-4">Click "Show Audit Logs" to display the audit table.</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;