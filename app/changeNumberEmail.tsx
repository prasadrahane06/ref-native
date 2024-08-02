import React from "react";
import { AUIThemedView } from "@/components/common/AUIThemedView";
import { AUIThemedText } from "@/components/common/AUIThemedText";
import { StyleSheet } from "react-native";
import useIsomorphicLayoutEffect from "@/customHooks/useIsomorphicLayoutEffect";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { APP_THEME } from "@/constants/Colors";
import AUIButton from "@/components/common/AUIButton";
import DropdownComponent from "@/components/common/AUIDropdown";
import AUIInputField from "@/components/common/AUIInputField";
import { ApiErrorToast } from "@/components/common/AUIToast";
import OTPScreen from "@/components/screenComponents/OTPScreen";
import {  BACKGROUND_THEME } from "@/constants/Colors";
import { GLOBAL_TEXT, SIGNUP_FIELDS } from "@/constants/Properties";
import { storeUserData } from "@/constants/RNAsyncStore";
import { loginPageStyles, secondaryButtonStyle } from "@/constants/Styles";
import { countriesData } from "@/constants/dummy data/countriesData";
import { API_URL } from "@/constants/urlProperties";
import { useLangTransformSelector } from "@/customHooks/useLangTransformSelector";
import { setLoader, setToken, setUser } from "@/redux/globalSlice";
import { RootState } from "@/redux/store";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useAxios from "./services/axiosClient";

const schema = Yup.object().shape({
    input: Yup.string().when("selectedButton", {
        is: "mobile",
        then: (schema) =>
            schema
                .required(GLOBAL_TEXT.validate_mobile)
                .test("mobile-phoneCode-length", "Mobile number is not valid", function (value) {
                    if (value) {
                        const { phoneCode } = this.parent;
                        const onlyPhoneCode = phoneCode.split("+")[1];
                        const totalLength =
                            (value ? value.length : 0) + (onlyPhoneCode ? onlyPhoneCode.length : 0);
                        return totalLength === 12;
                    }
                }),
        otherwise: (schema) =>
            schema
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, GLOBAL_TEXT.validate_email)
                .required(GLOBAL_TEXT.validate_email),
    }),
    phoneCode: Yup.string(),
    selectedButton: Yup.string().required(),
});

export default function ChangeNumberEmail() {
    const { type } = useLocalSearchParams<{ type: any }>();
    const effect = useIsomorphicLayoutEffect();
    const navigation = useNavigation();

    effect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerBackVisible: false,

            headerTitle: () => (
                <AUIThemedText style={[styles.screenTitle]}>
                    {type === "email" ? "Change Email" : "Change Number"}
                </AUIThemedText>
            ),
        });
    }, [type]);

    return (
        <AUIThemedView style={styles.container}>
            <AUIThemedText>changeNumberEmail</AUIThemedText>
        </AUIThemedView>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: APP_THEME.light.background,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
