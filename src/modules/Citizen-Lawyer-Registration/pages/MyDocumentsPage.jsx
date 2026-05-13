import { useEffect, useState } from 'react';
import { getUserRole, decodeToken } from '../../../utils/jwtUtils';
import { uploadDocument, getCitizenByUserId, getLawyerByUserId, getDocuments } from '../axios/registrationApi';

export default function MyDocumentsPage() {
  const role      = getUserRole();
  const decoded   = decodeToken();
  const userId    = decoded?.userId || decoded?.id || null;
  const isCitizen = role === 'CITIZEN';

  const [profileId, setProfileId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus]       = useState(null);
  const [message, setMessage]     = useState('');
  
  // State to hold fetched documents
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  // 1. Fetch Profile ID
  useEffect(() => {
    if (!userId) return;
    const fetchProfileId = async () => {
      try {
        const res = isCitizen ? await getCitizenByUserId(userId) : await getLawyerByUserId(userId);
        if (res?.data?.id) {
            setProfileId(res.data.id);
        }
      } catch (err) { 
          setProfileId(null); 
      }
    };
    fetchProfileId();
  }, [userId, role]);

  // 2. Fetch Documents once Profile ID is known
  const fetchMyDocuments = async (id) => {
    setLoadingDocs(true);
    try {
        const res = await getDocuments(role, id);
        setDocuments(res.data || []);
    } catch (err) {
        console.error("Failed to fetch documents", err);
    } finally {
        setLoadingDocs(false);
    }
  };

  useEffect(() => {
      if (profileId) {
          fetchMyDocuments(profileId);
      }
  }, [profileId, role]);

  // 3. Handle File Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatus('loading');

    if (!profileId) {
      setStatus('error');
      setMessage('Profile not found.');
      return;
    }

    if (!selectedFile) {
      setStatus('error'); 
      setMessage('Please select a file.'); 
      return; 
    }

    const formData = new FormData();
    formData.append("ownerId", profileId);
    formData.append("role", role);
    formData.append("docType", isCitizen ? 'ID_PROOF' : 'BAR_CERTIFICATE');
    formData.append("file", selectedFile);

    try {
      await uploadDocument(formData); 
      setStatus('success');
      setMessage('Document uploaded successfully!');
      setSelectedFile(null);
      e.target.reset(); // Clear the file input visually
      
      // Refresh the document list so the user sees the new file immediately
      fetchMyDocuments(profileId);
      
    } catch (err) {
      setStatus('error');
      setMessage(err?.response?.data?.message || 'An unexpected error occurred. Check backend logs.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h4 className="fw-bold text-dark">My Documents</h4>
        <p className="text-muted small">Upload and view your {isCitizen ? 'ID_PROOF' : 'BAR_CERTIFICATE'}.</p>
      </div>

      <div className="row">
        {/* UPLOAD SECTION */}
        <div className="col-md-5 mb-4">
            <div className="card border-0 shadow-sm rounded-4 p-4">
                <h6 className="fw-bold mb-3">Upload New Document</h6>
                {status === 'success' && <div className="alert alert-success small mb-3">✅ {message}</div>}
                {status === 'error' && <div className="alert alert-danger small mb-3">❌ {message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold">Select File (PDF or Image)</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            accept="application/pdf, image/png, image/jpeg" 
                            onChange={(e) => setSelectedFile(e.target.files[0])} 
                            required 
                        />
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary fw-bold px-4 rounded-3" type="submit" disabled={status === 'loading' || !profileId}>
                        {status === 'loading' ? 'Processing...' : 'Upload Document'}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {/* VIEW DOCUMENTS SECTION */}
        <div className="col-md-7">
            <div className="card border-0 shadow-sm rounded-4 p-4">
                <h6 className="fw-bold mb-3">Uploaded Documents</h6>
                
                {loadingDocs ? (
                    <p className="text-muted small">Loading documents...</p>
                ) : documents.length === 0 ? (
                    <p className="text-muted small">No documents uploaded yet.</p>
                ) : (
                    <div className="d-flex flex-column gap-4">
                        {documents.map((doc) => (
                            <div key={doc.documentID} className="border rounded-3 p-3 bg-light">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="fw-bold text-secondary">{doc.docType}</span>
                                    <span className={`badge ${doc.verificationStatus === 'VERIFIED' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                        {doc.verificationStatus}
                                    </span>
                                </div>
                                
                                {/* Rendering the Base64 Data */}
                                <div className="bg-white border rounded overflow-hidden" style={{ minHeight: '300px' }}>
                                    {doc.fileUri.startsWith('data:application/pdf') ? (
                                        <iframe 
                                            src={doc.fileUri} 
                                            title={doc.docType}
                                            style={{ width: '100%', height: '400px', border: 'none' }}
                                        />
                                    ) : doc.fileUri.startsWith('data:image') ? (
                                        <img 
                                            src={doc.fileUri} 
                                            alt={doc.docType} 
                                            className="img-fluid w-100 object-fit-contain" 
                                            style={{ maxHeight: '400px' }}
                                        />
                                    ) : (
                                        <div className="p-4 text-center">
                                            <p className="text-muted small">Unsupported preview format.</p>
                                            <a href={doc.fileUri} download="document" className="btn btn-sm btn-outline-primary">
                                                Download File
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 text-end">
                                    <small className="text-muted" style={{ fontSize: '11px' }}>
                                        Uploaded: {new Date(doc.uploadedDate).toLocaleString()}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}