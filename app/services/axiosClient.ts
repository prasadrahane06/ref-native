import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import axios from "axios";

const baseURL = "https://80ebyyswed.execute-api.ap-south-1.amazonaws.com/dev/"; //"http://localhost:4000/dev/"; //process.env.REACT_APP_BASE_URL;
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
