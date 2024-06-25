import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useSelector } from "react-redux";

// const baseURL = "https://o30dx07h3h.execute-api.ap-south-1.amazonaws.com/dev/"; //"http://localhost:4000/dev/"; //process.env.REACT_APP_BASE_URL;
const baseURL = "http://localhost:4000/dev/";

// Create an Axios instance
const axiosClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosClient.interceptors.request.use(
    (config) => {
        // Modify config here (e.g., add authorization token if available)

        const token = useSelector((state: RootState) => state.global.token);
        // console.log("token-inStore", token);
        config.headers.Authorization = `Bearer ${token}`;
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

export const get = async (url: string, query = {}) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const response = await axiosClient.get(`${url}?${queryString}`);
        return response.data;
    } catch (error) {
        console.error("Error in get request: ", error);
        throw error;
    }
};

export const post = async (url: string, payload: any) => {
    try {
        const response = await axiosClient.post(url, payload);

        if (response.data?.message.toLowerCase().includes("invalid")) {
            ApiErrorToast(response.data?.message);
        } else {
            ApiSuccessToast(response.data?.message);
        }

        return response.data;
    } catch (error: any) {
        ApiErrorToast(error.response?.data?.message);

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
