import { setResponse } from "@/redux/apiSlice";
import { useDispatch } from "react-redux";

const useApiRequest = () => {
  const dispatch = useDispatch();

  const requestFn = (method: Promise<any>, storeName: string) => {
    method
      .then((res) => {
        dispatch(setResponse({ storeName, data: res.data }));
        console.log("response from API hook => ", res);
      })
      .catch((error: any) => {
        console.log("error from API hook => ", error);
      });
  };

  return {
    requestFn,
  };
};

export default useApiRequest;
