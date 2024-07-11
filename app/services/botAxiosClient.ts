import axios from "axios";

const botUrl = "https://60bf-223-233-85-160.ngrok-free.app";

// Create an Axios instance
const axiosClient = axios.create({
    baseURL: botUrl,
    headers: {
        "Content-Type": "application/json",
    },
});
// Request Interceptor
axiosClient.interceptors.request.use(
    (config) => {
        // Modify config here (e.g., add authorization token if available)
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Response Interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle error here (e.g., show a notification)
        return Promise.reject(error);
    }
);
export default axiosClient;
export const get = async (url: string, params = {}) => {
    try {
        const response = await axiosClient.get(url, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const post = async (url: string, payload: any) => {
    try {
        const response = await axiosClient.post(url, payload);

        return response.data;
    } catch (error: any) {
        throw error;
    }
};
export const put = async (url: string, payload: any) => {
    try {
        const response = await axiosClient.put(url, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const del = async (url: string) => {
    try {
        const response = await axiosClient.delete(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
