import api from '../../../services/apiClient';
import axios from 'axios';

// ─── CITIZEN endpoints ────────────────────────────────────────────────────────

export const registerCitizen = async (citizenData) => {
    return api.post('/profiles/citizens', citizenData);
};

export const getAllCitizens = async () => {
    return api.get('/profiles/citizens');
};

// NEW: Fetch citizen profile by Identity User ID
export const getCitizenByUserId = async (userId) => {
    return api.get(`/profiles/citizens/user/${userId}`);
};

export const lookupProfile = async (userId, role) => {
    return api.get(`/profiles/lookup/${userId}?role=${role}`);
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

// NEW: Fetch lawyer profile by Identity User ID
export const getLawyerByUserId = async (userId) => {
    return api.get(`/profiles/lawyers/user/${userId}`);
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
export const uploadDocument = async (formData) => {
    return await axios.post(`http://localhost:9999/profiles/documents`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            // Axios automatically sets the multipart/form-data boundary for you
            'Content-Type': 'multipart/form-data' 
        }
    });
};

export const verifyDocument = async (id, status) => {
    return api.patch(`/profiles/documents/verify/${id}?status=${status}`);
};

export const getDocumentsByEntity = async (role, id) => {
    return api.get(`/profiles/documents/${role}/${id}`);
};

export const getDocuments = async (role, id) => {
    // Assuming you have an axios instance setup, or just use axios directly
    return await axios.get(`http://localhost:9999/profiles/documents/${role}/${id}`, {
        headers: {
            // Include your auth token here if required
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    });
};