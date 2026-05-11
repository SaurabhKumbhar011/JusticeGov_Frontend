import LawyerPanel from '../lawyer/LawyerPanel';
import { Link } from 'react-router-dom';

export default function LawyerPanelPage() {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Lawyer Panel</h4>
          <p className="text-muted small mb-0">View, manage and update all registered lawyers and their documents.</p>
        </div>
        <Link to="/register/lawyer" className="btn btn-primary fw-semibold px-4">
          + Register New Lawyer
        </Link>
      </div>
      <LawyerPanel />
    </div>
  );
}
