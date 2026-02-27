import apiClient from './apiClient';

export const applicationsApi = {
    submit: async (applicationData) => {
        // Expected: { job_id, name, email, resume_link, cover_note }
        const response = await apiClient.post('/applications', applicationData);
        return response.data;
    },
    getAll: async () => {
        const response = await apiClient.get('/applications');
        return response.data;
    }
};
