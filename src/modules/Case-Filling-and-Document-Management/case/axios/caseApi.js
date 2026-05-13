import api from '../../../../services/apiClient';

// POST /api/cases
export const fileCase = async (data) =>
    api.post('api/cases', data);

// GET /api/cases
export const getAllCases = async () =>
    api.get('api/cases');
// GET /api/cases/{id}
export const getCaseById = async (id) =>
    api.get(`api/cases/${id}`);

// GET /api/cases/count?start=&end=
export const getTotalCases = async (start, end) =>
    api.get(`api/cases/count?start=${start}&end=${end}`);
// GET /api/cases/status-count?status=&start=&end=
export const getCasesByStatus = async (status, start, end) =>
    api.get(`api/cases/status-count?status=${status}&start=${start}&end=${end}`);