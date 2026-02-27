import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://task-quickhire-qtec.onrender.com/api', // Live Render backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
