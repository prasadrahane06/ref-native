import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/redux/store";
import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";

const baseURL = "https://zmgr2gg0-4000.inc1.devtunnels.ms/dev/";
// bot url
// const baseURL = "https://ef3e-223-233-85-160.ngrok-free.app";

const useAxios = () => {
    const token = useSelector((state: RootState) => state.global.token);
    console.log("token in client", token);

    const axiosClient = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Request Interceptor
    axiosClient.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
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
            ApiErrorToast(error.response?.data?.message);
            return Promise.reject(error);
        }
    );

    const get = async (url: string, query = {}) => {
        try {
            const queryString = new URLSearchParams(query).toString();
            const response = await axiosClient.get(`${url}?${queryString}`);
            return response.data;
        } catch (error) {
            console.error("Error in get request: ", error);
            throw error;
        }
    };

    const post = async (url: string, payload: any) => {
        try {
            const response = await axiosClient.post(url, payload);
            // if (response.data?.message.toLowerCase().includes("invalid")) {
            //     ApiErrorToast(response.data?.message);
            // } else {
            //     ApiSuccessToast(response.data?.message);
            // }
            return response.data;
        } catch (error: any) {
            ApiErrorToast(error.response?.data?.message);
            throw error;
        }
    };

    const put = async (url: string, payload: any) => {
        try {
            const response = await axiosClient.put(url, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const del = async (url: string, payload?: any) => {
        try {
            const response = await axiosClient.delete(url, { data: payload });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const patch = async (url: string, payload: any) => {
        try {
            const response = await axiosClient.patch(url, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return { get, post, put, del, patch };
};

export default useAxios;
