import axios from 'axios';

export const API_URL = process.env.VUE_APP_API_URL

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.configs;
    try {
        if(error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            axios.request(originalRequest);
        }
    }
    catch (error) {
        console.log('Не авторизован');
    }
    throw error;
})

export default $api;