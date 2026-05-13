import CitizenPanel from '../citizen/CitizenPanel';
import { Link } from 'react-router-dom';

export default function CitizenPanelPage() {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Citizen Panel</h4>
          <p className="text-muted small mb-0">View, manage and update all registered citizens and their documents.</p>
        </div>
        <Link to="/register/citizen" className="btn btn-primary fw-semibold px-4">
          + Register New Citizen
        </Link>
      </div>
      <CitizenPanel />
    </div>
  );
}
