import DocumentUpload from '../components/DocumentUpload';
import useRegistration from '../../../hooks/useRegistration';

export default function DocumentUploadPage() {
  const { status, message, uploadDocument, reset } = useRegistration();

  const handleSubmit = (data) => {
    reset();
    uploadDocument(data);
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Upload Legal Document</h4>
        <p className="text-muted small mb-0">
          Upload an <span className="badge bg-info text-dark">ID_PROOF</span> for citizens or a{' '}
          <span className="badge bg-primary">BAR_CERTIFICATE</span> for lawyers. Verification status starts as{' '}
          <span className="badge bg-warning text-dark">PENDING</span>.
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
        <DocumentUpload onSubmit={handleSubmit} status={status} />
      </div>
    </div>
  );
}
