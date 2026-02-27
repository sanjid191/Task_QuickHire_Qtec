import apiClient from './apiClient';

export const jobApi = {
    getAll: async (params) => {
        // params can include: search, category, location
        const response = await apiClient.get('/jobs', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await apiClient.get(`/jobs/${id}`);
        return response.data;
    },

    create: async (jobData) => {
        const response = await apiClient.post('/jobs', jobData);
        return response.data;
    },

    delete: async (id) => {
        const response = await apiClient.delete(`/jobs/${id}`);
        return response.data;
    }
};
