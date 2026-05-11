import api from '../../../services/apiClient';

// ─── CITIZEN endpoints ────────────────────────────────────────────────────────

export const registerCitizen = async (citizenData) => {
    return api.post('/profiles/citizens', citizenData);
};

export const getAllCitizens = async () => {
    return api.get('/profiles/citizens');
};

export const getCitizenById = async (id) => {
    return api.get(`/profiles/citizens/${id}`);
};

export const updateCitizen = async (id, citizenData) => {
    if (!id) {
        console.error('updateCitizen called with missing id');
        throw new Error('Citizen ID is required for update');
    }
    return api.put(`/profiles/citizens/${id}`, citizenData);
};

// ─── LAWYER endpoints ─────────────────────────────────────────────────────────

export const registerLawyer = async (lawyerData) => {
    return api.post('/profiles/lawyers', lawyerData);
};

export const getAllLawyers = async () => {
    return api.get('/profiles/lawyers');
};

export const getLawyerById = async (id) => {
    return api.get(`/profiles/lawyers/${id}`);
};

export const updateLawyer = async (id, lawyerData) => {
    if (!id) {
        console.error('updateLawyer called with missing id');
        throw new Error('Lawyer ID is required for update');
    }
    return api.put(`/profiles/lawyers/${id}`, lawyerData);
};

// ─── DOCUMENT endpoints ───────────────────────────────────────────────────────

export const uploadDocument = async (documentData) => {
    return api.post('/profiles/documents', documentData);
};

export const verifyDocument = async (id, status) => {
    return api.patch(`/profiles/documents/verify/${id}?status=${status}`);
};

export const getDocumentsByEntity = async (role, id) => {
    return api.get(`/profiles/documents/${role}/${id}`);
};
