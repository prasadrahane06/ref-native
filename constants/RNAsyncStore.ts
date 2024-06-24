import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";

export const storeUserData = async (value: object) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@user-data", jsonValue);
    } catch (e) {
        // saving error
    }
};

export const storeUserDeviceData = async (value: object = {}) => {
    try {
        const jsonValue = {
            brand: Device.brand,
            modelId: Device.modelId, //for IOS only
            modelName: Device.modelName,
            osBuildId: Device.osBuildId,
            osName: Device.osName,
            osVersion: Device.osVersion,
            ...value,
        };

        await AsyncStorage.setItem("@user-device-data", JSON.stringify(jsonValue));
    } catch (e) {
        // saving error
    }
};
export const getUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@user-data");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};
export const getUserDeviceData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@user-device-data");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};
export const removeUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.removeItem("@user-data");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};
