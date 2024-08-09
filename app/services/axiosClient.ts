import { ApiErrorToast } from "@/components/common/AUIToast";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useSelector } from "react-redux";

export const baseURL = "https://zz22vf7g-4000.inc1.devtunnels.ms/dev/";

const useAxios = () => {
    const token = useSelector((state: RootState) => state.global.token);
    const axiosClient = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

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

    const del = async (url: string, payload?: any, query = {}) => {
        try {
            const queryString = new URLSearchParams(query).toString();
            const response = await axiosClient.delete(`${url}?${queryString}`, { data: payload });
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
