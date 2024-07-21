import axios from "axios";

const botUrl = "https://1d79-223-233-86-189.ngrok-free.app";

// Create an Axios instance
const axiosClient = axios.create({
    baseURL: botUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response Interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle error here (e.g., show a notification)
        console.log("error in interceptors", error);
        return Promise.reject(error);
    }
);

export default axiosClient;
export const get = async (url: string, params = {}) => {
    try {
        const response = await axiosClient.get(url, { params });
        return response;
    } catch (error) {
        console.log("error in get", error);
        throw error;
    }
};
export const post = async (url: string, payload: any) => {
    try {
        const response = await axiosClient.post(url, payload);
        return response;
    } catch (error) {
        console.log("error in post", error);
        throw error;
    }
};
export const put = async (url: string, payload: any) => {
    try {
        const response = await axiosClient.put(url, payload);
        return response;
    } catch (error) {
        console.log("error in put", error);
        throw error;
    }
};
export const del = async (url: string) => {
    try {
        const response = await axiosClient.delete(url);
        return response;
    } catch (error) {
        console.log("error in delete", error);
        throw error;
    }
};
