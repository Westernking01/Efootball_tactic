import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const generateTactic = async (input) => {
    const response = await api.post('/tactics/generate', input);
    return response.data;
};

export const validateTactic = async (tactic) => {
    const response = await api.post('/tactics/validate', tactic);
    return response.data;
};

export const getPresets = async () => {
    const response = await api.get('/tactics/presets');
    return response.data;
};

export const getPresetById = async (id) => {
    const response = await api.get(`/tactics/presets/${id}`);
    return response.data;
};

export default api;
