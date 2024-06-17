import { GLOBAL_TEXT } from "@/constants/Properties";
import Toast from "react-native-toast-message";

export const FormValidateToast = () => ({
  email: Toast.show({
    type: "error",
    text1: GLOBAL_TEXT.validate_email,
  }),
  phone: Toast.show({
    type: "error",
    text1: GLOBAL_TEXT.validate_mobile,
  }),
});

export const ApiSuccessToast = (text: string) =>
  Toast.show({
    type: "success",
    text1: text,
    position: "bottom",
  });
export const ApiErrorToast = (text: string) =>
  Toast.show({
    type: "error",
    text1: text,
    position: "bottom",
  });
