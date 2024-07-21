import useAxios from "@/app/services/axiosClient";
import { setResponse, setUpdatedResponse } from "@/redux/apiSlice";
import { setLoader } from "@/redux/globalSlice";
import { useDispatch } from "react-redux";

interface Query {

    [key : string] : any

}

const useApiRequest = () => {
    const dispatch = useDispatch();
    const { get } = useAxios();

    const requestFn = (url: string, storeName: string, query: Query = {}) => {
        dispatch(setLoader(true));

        get(url, query)
            .then((res) => {
                dispatch(setLoader(false));
                if (query.page && query.page > 1) {
                    console.log("updated response");
                    dispatch(setUpdatedResponse({ storeName, data: res.data }));
                } else {
                    console.log("first response");
                    dispatch(setResponse({ storeName, data: res.data }));
                }
            })
            .catch((error: any) => {
                dispatch(setLoader(false));
                console.error("error from API hook => ", error);
            });
    };

    return {
        requestFn,
    };
};


export default useApiRequest;
