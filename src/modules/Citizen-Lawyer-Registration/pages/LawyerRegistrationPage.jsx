import LawyerForm from '../components/LawyerForm';
import useRegistration from '../../../hooks/useRegistration';

export default function LawyerRegistrationPage() {
  const { status, message, registerLawyer, reset } = useRegistration();

  const handleSubmit = (data) => {
    reset();
    registerLawyer(data);
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Register Lawyer</h4>
        <p className="text-muted small mb-0">
          Fill in the lawyer's details including Bar ID. Status will be set to <span className="badge bg-warning text-dark">PENDING</span> by default.
        </p>
      </div>

      <div className="card border-0 shadow-sm rounded-4 p-4">
        {status === 'success' && (
          <div className="alert alert-success rounded-3 d-flex align-items-center gap-2 mb-4">
            <span>✅</span> <span>{message}</span>
          </div>
        )}
        {status === 'error' && (
          <div className="alert alert-danger rounded-3 d-flex align-items-center gap-2 mb-4">
            <span>❌</span> <span>{message}</span>
          </div>
        )}
        <LawyerForm onSubmit={handleSubmit} status={status} />
      </div>
    </div>
  );
}
