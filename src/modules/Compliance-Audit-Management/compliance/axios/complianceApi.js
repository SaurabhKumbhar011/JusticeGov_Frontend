import api from '../../../../services/apiClient';

// POST   /api/compliance/records
export const createComplianceRecord = async (data) =>
    api.post('/api/compliance/records', data);

// GET    /api/compliance/records
export const getAllComplianceRecords = async () =>
    api.get('/api/compliance/records');

// GET    /api/compliance/records/{id}
export const getComplianceRecordById = async (id) =>
    api.get(`/api/compliance/records/${id}`);

// PUT    /api/compliance/records/{id}/resolve?notes=
export const resolveComplianceRecord = async (id, notes) =>
    api.put(`/api/compliance/records/${id}/resolve?notes=${encodeURIComponent(notes)}`);

// GET    /api/compliance/count?start=&end=
export const getComplianceCount = async (start, end) =>
    api.get(`/api/compliance/count?start=${start}&end=${end}`);

// GET    /api/compliance/result-count?result=&start=&end=
export const getComplianceResultCount = async (result, start, end) =>
    api.get(`/api/compliance/result-count?result=${result}&start=${start}&end=${end}`);
