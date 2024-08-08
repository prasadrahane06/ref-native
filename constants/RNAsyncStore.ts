import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";

export const storeUserData = async (key: string, value: object) => {
    try {
        const existingData = await getUserData(key);
        console.log("existingData", existingData);

        const updatedData = { ...existingData, ...value };
        const jsonValue = JSON.stringify(updatedData);
        console.log("jsonValue", jsonValue);

        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log("Error in storeUserData:", e);
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
        console.log("Error in storeUserDeviceData:", e);
    }
};

export const getUserData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error in getUserData:", e);
    }
};

export const getUserDeviceData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@user-device-data");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error in getUserDeviceData:", e);
    }
};

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log("Error in clearAllData:", e);
    }
};
