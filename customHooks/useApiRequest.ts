import useAxios from "@/app/services/axiosClient";
import { setResponse } from "@/redux/apiSlice";
import { setLoader } from "@/redux/globalSlice";
import { useDispatch } from "react-redux";

const useApiRequest = () => {
    const dispatch = useDispatch();
    const { get } = useAxios();
    dispatch(setLoader(true));

    const requestFn = (url: string, storeName: string, query?: {}) => {
        get(url, query || {})
            .then((res) => {
                dispatch(setResponse({ storeName, data: res.data }));
                dispatch(setLoader(false));
                console.log("response from API hook => ", res);
            })
            .catch((error: any) => {
                dispatch(setLoader(false));
                console.log("error from API hook => ", error);
            });
    };

    return {
        requestFn,
    };
};

export default useApiRequest;
