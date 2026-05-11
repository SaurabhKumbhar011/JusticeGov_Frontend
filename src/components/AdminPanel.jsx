import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminPanel = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="bi bi-shield-check me-2"></i>
            JusticeGov Admin Panel
          </a>
          <div className="d-flex">
            <span className="navbar-text me-3">
              Welcome, {user?.sub || 'Admin'}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  <i className="bi bi-gear me-2"></i>
                  Administration Dashboard
                </h4>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100 border-primary">
                      <div className="card-body text-center">
                        <i className="bi bi-people display-4 text-primary mb-3"></i>
                        <h5>User Management</h5>
                        <p className="text-muted">Manage user accounts and permissions</p>
                        <button className="btn btn-primary">Access Users</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100 border-success">
                      <div className="card-body text-center">
                        <i className="bi bi-file-earmark-text display-4 text-success mb-3"></i>
                        <h5>Judgement Orders</h5>
                        <p className="text-muted">Review and manage court orders</p>
                        <button className="btn btn-success">View Orders</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100 border-info">
                      <div className="card-body text-center">
                        <i className="bi bi-bar-chart display-4 text-info mb-3"></i>
                        <h5>Analytics</h5>
                        <p className="text-muted">View system statistics and reports</p>
                        <button className="btn btn-info">View Reports</button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-12">
                    <h5>Recent Activity</h5>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Action</th>
                            <th>User</th>
                            <th>Timestamp</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>User Login</td>
                            <td>{user?.sub || 'admin@example.com'}</td>
                            <td>{new Date().toLocaleString()}</td>
                            <td><span className="badge bg-success">Success</span></td>
                          </tr>
                          <tr>
                            <td>Order Created</td>
                            <td>judge@example.com</td>
                            <td>{new Date(Date.now() - 3600000).toLocaleString()}</td>
                            <td><span className="badge bg-info">Pending</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;