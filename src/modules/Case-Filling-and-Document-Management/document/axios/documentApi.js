import api from '../../../../services/apiClient';

// POST /api/documents/upload
export const uploadDocument = async (caseId, file, type) => {
    const formData = new FormData();
    formData.append('caseId', caseId);
    formData.append('file', file);
    formData.append('type', type);
    return api.post('api/documents/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// GET /api/documents/{caseId}
export const getDocumentsByCase = async (caseId) =>
    api.get(`api/documents/${caseId}`);