import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileCase } from '../../../services/caseService';
import { uploadCaseDocument } from '../../../services/caseDocumentService';
import { getUserRole, getJudgeId } from '../../../utils/token';

export default function CaseFilingPage() {
  const navigate = useNavigate();
  const role = getUserRole();
  const currentUserId = getJudgeId();

  const [caseForm, setCaseForm] = useState({
    citizenId: role === 'CITIZEN' ? currentUserId : '',
    lawyerId: role === 'LAWYER' ? currentUserId : '',
    title: '',
    description: '',
    filedDate: '',
  });
  const [caseResult, setCaseResult] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [documentType, setDocumentType] = useState('PETITION');
  const [message, setMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCaseChange = (event) => {
    const { name, value } = event.target;
    setCaseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCase = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        citizenId: caseForm.citizenId ? Number(caseForm.citizenId) : null,
        lawyerId: caseForm.lawyerId ? Number(caseForm.lawyerId) : null,
        title: caseForm.title,
        description: caseForm.description,
        filedDate: caseForm.filedDate,
        userId: currentUserId,
      };

      const result = await fileCase(payload);
      setCaseResult(result);
      setMessage('Case created successfully. You can now upload documents.');
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Failed to create case. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleUploadDocument = async (event) => {
    event.preventDefault();
    setUploadMessage('');

    if (!caseResult?.id) {
      setUploadMessage('Please create the case first.');
      return;
    }
    if (!documentFile) {
      setUploadMessage('Please select a document to upload.');
      return;
    }

    try {
      await uploadCaseDocument(caseResult.id, documentFile, documentType);
      setUploadMessage('Document uploaded successfully.');
      setDocumentFile(null);
    } catch (error) {
      setUploadMessage(
        error.response?.data?.message || 'Failed to upload document. Please try again.'
      );
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Case Filing</h4>
          <p className="text-muted small mb-0">Create a case and upload supporting documents.</p>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/register/my-profile')}
        >
          Back to Profile
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Case Information</h5>

              {message && (
                <div className="alert alert-info py-2">{message}</div>
              )}

              <form onSubmit={handleSubmitCase}>
                <div className="mb-3">
                  <label className="form-label">Citizen ID</label>
                  <input
                    type="number"
                    name="citizenId"
                    value={caseForm.citizenId}
                    onChange={handleCaseChange}
                    className="form-control"
                    placeholder="Enter citizen ID"
                    disabled={role === 'CITIZEN'}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Lawyer ID</label>
                  <input
                    type="number"
                    name="lawyerId"
                    value={caseForm.lawyerId}
                    onChange={handleCaseChange}
                    className="form-control"
                    placeholder="Enter lawyer ID"
                    disabled={role === 'LAWYER'}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Case Title</label>
                  <input
                    type="text"
                    name="title"
                    value={caseForm.title}
                    onChange={handleCaseChange}
                    className="form-control"
                    placeholder="Enter case title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={caseForm.description}
                    onChange={handleCaseChange}
                    className="form-control"
                    rows="4"
                    placeholder="Describe the case details"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Filed Date</label>
                  <input
                    type="date"
                    name="filedDate"
                    value={caseForm.filedDate}
                    onChange={handleCaseChange}
                    className="form-control"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Case'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Upload Required Documents</h5>
              {caseResult?.id ? (
                <div className="mb-3">
                  <p className="mb-2">
                    <strong>Case ID:</strong> {caseResult.id}
                  </p>
                  <p className="text-muted small mb-3">You can upload petition or evidence documents for this case.</p>

                  {uploadMessage && (
                    <div className="alert alert-info py-2">{uploadMessage}</div>
                  )}

                  <form onSubmit={handleUploadDocument}>
                    <div className="mb-3">
                      <label className="form-label">Document Type</label>
                      <select
                        className="form-select"
                        value={documentType}
                        onChange={(event) => setDocumentType(event.target.value)}
                      >
                        <option value="PETITION">Petition</option>
                        <option value="EVIDENCE">Evidence</option>
                        <option value="MISC">Miscellaneous</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Select File</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleDocumentChange}
                      />
                    </div>

                    <button className="btn btn-success">Upload Document</button>
                  </form>
                </div>
              ) : (
                <div className="alert alert-secondary">
                  Create the case first, then upload documents for it.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
