import { ApiErrorToast, ApiSuccessToast } from "@/components/common/AUIToast";
import axios from "axios";

const baseURL = " https://d318-2402-e280-3e7b-220-556c-9458-3d6a-ce98.ngrok-free.app/dev/"; //"http://localhost:4000/dev/"; //process.env.REACT_APP_BASE_URL;

// Define the token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjE3MzQ0MTk2MDUsImlkIjoiNjY2MmRiMTYyMzI0YmRmMGYwMzM2NDZjIiwiY2xpZW50IjoiNjY2MmRiMTYyMzI0YmRmMGYwMzM2NDZiIiwidHlwZSI6InNjaG9vbCIsImVtYWlsIjoiYXNoaXQxNTQwQGdtYWlsLmNvbSIsInBob25lIjoiOTE5MTY5NjE1NTAwIiwiaWF0IjoxNzE4ODY3NjA1fQ.4zoZB65jH8HpOoTq9Vu0gbDSk7qOWmWPLzXtoD7kZWs';

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

export const get = async ( url : string, query = {}) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const response = await axiosClient.get(`${url}?${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Error in get request: ', error);
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
