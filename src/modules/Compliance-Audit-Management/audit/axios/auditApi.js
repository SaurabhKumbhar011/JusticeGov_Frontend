import api from '../../../../services/apiClient';

// POST   /api/audits
export const createAudit = async (data) =>
    api.post('/api/audits', data);

// GET    /api/audits
export const getAllAudits = async () =>
    api.get('/api/audits');

// GET    /api/audits/{id}
export const getAuditById = async (id) =>
    api.get(`/api/audits/${id}`);

// PUT    /api/audits/{id}
export const updateAudit = async (id, data) =>
    api.put(`/api/audits/${id}`, data);
