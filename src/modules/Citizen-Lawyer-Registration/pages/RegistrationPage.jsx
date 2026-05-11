import { useState } from 'react';
import CitizenForm from '../components/CitizenForm';
import LawyerForm from '../components/LawyerForm';
import DocumentUpload from '../components/DocumentUpload';
import useRegistration from '../../../hooks/useRegistration';

const TABS = ['Register Citizen', 'Register Lawyer', 'Upload Document'];

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { status, message, registerCitizen, registerLawyer, uploadDocument, reset } = useRegistration();

  const handleTabChange = (idx) => {
    reset();
    setActiveTab(idx);
  };

  return (
    <div className="container-fluid py-4 px-4">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Citizen & Lawyer Registration</h2>
        <p className="text-muted small mb-0">
          <i className="bi bi-info-circle me-1"></i>
          Register citizens, lawyers, and upload legal documents for verification.
        </p>
      </div>

      {/* Main Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

        {/* Tabs */}
        <div className="card-header bg-white border-bottom border-light px-4 pt-3 pb-0">
          <ul className="nav nav-tabs border-0">
            {TABS.map((tab, idx) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link fw-semibold px-4 ${activeTab === idx ? 'active text-primary border-bottom border-primary border-2' : 'text-secondary'}`}
                  style={{ borderRadius: 0, background: 'none', border: 'none', borderBottom: activeTab === idx ? '2px solid' : '2px solid transparent' }}
                  onClick={() => handleTabChange(idx)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Body */}
        <div className="card-body p-4">

          {/* Status Alert */}
          {status === 'success' && (
            <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4" role="alert">
              <i className="bi bi-check-circle-fill"></i>
              <span>{message}</span>
            </div>
          )}
          {status === 'error' && (
            <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 mb-4" role="alert">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{message}</span>
            </div>
          )}

          {activeTab === 0 && <CitizenForm onSubmit={registerCitizen} status={status} />}
          {activeTab === 1 && <LawyerForm  onSubmit={registerLawyer}  status={status} />}
          {activeTab === 2 && <DocumentUpload onSubmit={uploadDocument} status={status} />}
        </div>
      </div>

      {/* Info Cards */}
      <div className="row g-3 mt-3">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-3 p-3 h-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-warning text-dark">PENDING</span>
              <span className="fw-semibold text-dark small">Default Status</span>
            </div>
            <p className="text-muted small mb-0">All new registrations are set to PENDING and require admin approval.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-3 p-3 h-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-info text-dark">ID_PROOF</span>
              <span className="fw-semibold text-dark small">Citizens</span>
            </div>
            <p className="text-muted small mb-0">Citizens must upload a valid ID Proof document for identity verification.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-3 p-3 h-100">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-primary">BAR_CERTIFICATE</span>
              <span className="fw-semibold text-dark small">Lawyers</span>
            </div>
            <p className="text-muted small mb-0">Lawyers must upload a Bar Certificate to validate their legal credentials.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
