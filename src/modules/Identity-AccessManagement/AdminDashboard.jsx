import React, { useState, useEffect } from 'react';
import { getAuditLogs, approveUser, reactivateUser, suspendUser, getAllUsers } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
 
const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [userList, setUserList] = useState([]);
  const [statusMsg, setStatusMsg] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [activeSection, setActiveSection] = useState('user-management');
  const { user } = useAuth();
 
  const adminId = 1;
 
  useEffect(() => {
    loadLogs();
    loadUsers();
  }, []);
 
  const loadLogs = async () => {
    try {
      const data = await getAuditLogs(adminId);
      setLogs(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } catch (e) {
      console.error("Audit Sync Failure:", e);
    }
  };
 
  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUserList(allUsers);
    } catch (error) {
      console.error("Failed to fetch user list", error);
    }
  };
 
  const handleApprove = async (targetEmail) => {
    setProcessingId(targetEmail);
    setStatusMsg(null);
    try {
      await approveUser(targetEmail);
      setStatusMsg({ type: 'success', text: `Identity Verified: ${targetEmail} is now active.` });
      loadLogs();
      loadUsers();
    } catch (e) {
      setStatusMsg({ type: 'danger', text: e.response?.data?.message || "Internal Server Error during approval." });
    } finally {
      setProcessingId(null);
    }
  };
 
  const handleReactivate = async (targetEmail) => {
    setProcessingId(targetEmail);
    setStatusMsg(null);
    try {
      await reactivateUser(targetEmail);
      setStatusMsg({ type: 'success', text: `Access Reactivated: ${targetEmail} is now active.` });
      loadLogs();
      loadUsers();
    } catch (e) {
      setStatusMsg({ type: 'danger', text: e.response?.data?.message || "Internal Server Error during reactivation." });
    } finally {
      setProcessingId(null);
    }
  };
 
  const handleSuspend = async (targetEmail) => {
    setProcessingId(targetEmail);
    setStatusMsg(null);
    try {
      await suspendUser(targetEmail);
      setStatusMsg({ type: 'warning', text: `Access Suspended: ${targetEmail} has been suspended.` });
      loadLogs();
      loadUsers();
    } catch (e) {
      setStatusMsg({ type: 'danger', text: e.response?.data?.message || "Internal Server Error during suspension." });
    } finally {
      setProcessingId(null);
    }
  };
 
  return (
    <div className="d-flex vh-100 overflow-hidden bg-light text-dark">
     
      {/* Sidebar */}
      <aside
        className="d-flex flex-column flex-shrink-0 p-3 text-white"
        style={{
          width: "260px",
          background: "linear-gradient(180deg, #061a2e, #02101f)",
        }}
      >
        <div className="d-flex flex-column mb-4 ps-2">
          <span className="fs-4 fw-bold">⚖️ JusticeGov</span>
          <small className="opacity-75" style={{ fontSize: "0.75rem" }}>Admin Dashboard</small>
        </div>
 
        <nav className="nav nav-pills flex-column mb-auto">
          <button
            onClick={() => setActiveSection('user-management')}
            className={`nav-link p-3 rounded-3 mb-1 ${activeSection === 'user-management' ? 'bg-primary text-white' : 'text-white'}`}
            style={{ border: 'none', background: 'none' }}
          >
            System User Management
          </button>
          <button
            onClick={() => setActiveSection('audit-logs')}
            className={`nav-link p-3 rounded-3 mb-1 ${activeSection === 'audit-logs' ? 'bg-primary text-white' : 'text-white'}`}
            style={{ border: 'none', background: 'none' }}
          >
            Audit Logs
          </button>
        </nav>
      </aside>
 
      {/* Main Content */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <main className="flex-grow-1 overflow-auto p-4">
          <div className="container" style={{ maxWidth: '1100px' }}>
       
        {statusMsg && (
          <div className={`alert alert-${statusMsg.type} py-3 fw-bold border-0 mb-4 rounded-4 shadow-sm`}>
            {statusMsg.text}
          </div>
        )}
 
        {activeSection === 'user-management' && (
        <div className="card bg-white border-0 mb-5 rounded-4 shadow-sm overflow-hidden">
          <div className="card-header bg-success border-0 py-3 px-4 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold text-white mb-0">System User Management</h5>
            <span className="badge bg-primary rounded-pill px-3 py-2">{userList.length} Total Users</span>
          </div>
         
          <div className="table-responsive p-4">
            <table className="table table-borderless align-middle mb-0" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
              <thead>
                <tr>
                  <th className="small text-muted fw-bold px-3">UID</th>
                  <th className="small text-muted fw-bold px-3">EMAIL ADDRESS</th>
                  <th className="small text-muted fw-bold px-3">ROLE</th>
                  <th className="small text-muted fw-bold px-3">STATUS</th>
                  <th className="small text-muted fw-bold px-3 text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {userList.map(u => (
                  <tr key={u.userId}>
                    <td className="px-3 py-3 bg-light small text-muted fw-bold" style={{ borderRadius: '10px 0 0 10px' }}>{u.userId}</td>
                    <td className="px-3 py-3 bg-light small text-dark fw-bold">{u.email}</td>
                    <td className="px-3 py-3 bg-light small text-muted fw-medium">{u.role}</td>
                    <td className="px-3 py-3 bg-light small fw-bold">
                      <span className={`text-${u.status === 'PENDING' ? 'warning' : u.status === 'INACTIVE' ? 'danger' : 'success'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 bg-light text-end" style={{ borderRadius: '0 10px 10px 0' }}>
                      <div className="d-flex gap-2 justify-content-end">
                        {u.status === 'PENDING' && (
                          <button
                            onClick={() => handleApprove(u.email)}
                            className="btn btn-sm btn-success fw-bold px-3 shadow-sm"
                            disabled={processingId === u.email}
                            style={{ borderRadius: '6px' }}
                          >
                            {processingId === u.email ? '...' : 'Approve'}
                          </button>
                        )}
                        {u.status === 'ACTIVE' && (
                          <button
                            onClick={() => handleSuspend(u.email)}
                            className="btn btn-sm btn-warning fw-bold px-3 shadow-sm"
                            disabled={processingId === u.email}
                            style={{ borderRadius: '6px' }}
                          >
                            {processingId === u.email ? '...' : 'Suspend'}
                          </button>
                        )}
                        {u.status === 'INACTIVE' && (
                          <button
                            onClick={() => handleReactivate(u.email)}
                            className="btn btn-sm btn-primary fw-bold px-3 shadow-sm"
                            disabled={processingId === u.email}
                            style={{ borderRadius: '6px' }}
                          >
                            {processingId === u.email ? '...' : 'Reactivate'}
                          </button>
                        )}
                        {u.status !== 'ACTIVE' && u.status !== 'PENDING' && u.status !== 'INACTIVE' && (
                          <span className="text-muted small fw-medium">Active Account</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {userList.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted small bg-light" style={{ borderRadius: '10px' }}>
                      No users found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}
 
        {activeSection === 'audit-logs' && (
        <div className="card bg-white border-0 rounded-4 shadow-sm overflow-hidden mb-5">
          <div className="card-header bg-success border-0 py-3 px-4">
            <h5 className="fw-bold text-white mb-0">System Audit Logs</h5>
          </div>
 
          <div className="table-responsive p-4">
            <table className="table table-borderless align-middle mb-0" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
              <thead>
                <tr>
                  <th className="small text-muted fw-bold px-3">AUDIT ID</th>
                  <th className="small text-muted fw-bold px-3">USER UID</th>
                  <th className="small text-muted fw-bold px-3">OPERATION</th>
                  <th className="small text-muted fw-bold px-3">RESOURCE</th>
                  <th className="small text-muted fw-bold px-3 text-end">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? logs.map(log => (
                  <tr key={log.auditId}>
                    <td className="px-3 py-3 bg-light small text-muted fw-bold" style={{ borderRadius: '10px 0 0 10px' }}>#{log.auditId}</td>
                    <td className="px-3 py-3 bg-light small text-dark fw-bold">{log.userId}</td>
                    <td className="px-3 py-3 bg-light small text-muted fw-medium">{log.action}</td>
                    <td className="px-3 py-3 bg-light small text-muted fw-medium">{log.resource}</td>
                    <td className="px-3 py-3 bg-light small text-muted text-end" style={{ borderRadius: '0 10px 10px 0' }}>
                      {new Date(log.timestamp).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted small bg-light" style={{ borderRadius: '10px' }}>
                      The system log is currently empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
 
          <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center py-3 px-4">
            <div className="d-flex align-items-center gap-2 text-muted small fw-bold">
              <span>{logs.length} Total Logs Tracked</span>
            </div>
            <div className="d-flex align-items-center gap-3 small fw-bold">
              <span className="text-muted" style={{ cursor: 'pointer' }}>First</span>
              <span className="badge rounded-circle p-2 shadow-sm" style={{ backgroundColor: '#4169E1', color: 'white', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
              <span className="text-muted" style={{ cursor: 'pointer' }}>Last</span>
            </div>
          </div>
        </div>
        )}
 
          </div>
        </main>
      </div>
    </div>
  );
};
 
export default AdminDashboard;