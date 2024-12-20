import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "./../constants/Colors";

export interface UserState {
    _id: string;
    academicSession: string;
    city: string;
    client: null;
    country: string;
    createdAt: string;
    dob: string;
    email: string;
    language: string;
    name: string;
    phone: string;
    qualification: string;
    state: string;
    status: number;
    type: string;
    updatedAt: string;
    gender?: string;
    photo?: string;
}

export interface GlobalState {
    profile: string;
    theme: ThemeType;
    signInType: string;
    signupDetails: any;
    schoolDetails: any;
    loader: boolean;
    token: string;
    deviceToken: string;
    isRTL: boolean;
    selectedLanguage: string;
    user: UserState;
}

const initialState: GlobalState = {
    profile: "",
    theme: "light",
    selectedLanguage: "",
    // theme: "dark",
    signInType: "",
    signupDetails: null,
    schoolDetails: null,
    loader: false,
    token: "",
    deviceToken: "",
    isRTL: false,
    user: {
        _id: "",
        academicSession: "",
        city: "",
        client: null,
        country: "",
        createdAt: "",
        dob: "",
        email: "",
        language: "",
        name: "",
        phone: "",
        qualification: "",
        state: "",
        status: 0,
        type: "",
        updatedAt: "",
    },
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes

        setProfile: (state, action: PayloadAction<string>) => {
            state.profile = action.payload;
        },
        setSignInType: (state, action: PayloadAction<string>) => {
            state.signInType = action.payload;
        },
        setSignupDetails: (state, action: PayloadAction<any>) => {
            state.signupDetails = action.payload;
        },
        setSchoolDetails: (state, action: PayloadAction<any>) => {
            state.schoolDetails = action.payload;
        },
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            state.theme = action.payload;
        },
        setLoader: (state, action: PayloadAction<boolean>) => {
            state.loader = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setDeviceToken: (state, action: PayloadAction<string>) => {
            state.deviceToken = action.payload;
        },
        setIsRTL: (state, action: PayloadAction<boolean>) => {
            state.isRTL = action.payload;
        },
        setselectedLanguage: (state, action: PayloadAction<string>) => {
            state.selectedLanguage = action.payload;
        },
        setUser: (
            state,
            action: PayloadAction<{
                _id: "";
                academicSession: "";
                city: "";
                client: null;
                country: "";
                createdAt: "";
                dob: "";
                email: "";
                language: "";
                name: "";
                phone: "";
                qualification: "";
                state: "";
                status: 0;
                type: "";
                updatedAt: "";
            }>
        ) => {
            state.user = action.payload;
        },
        logout: () => initialState,
    },
});

// Action creators are generated for each case reducer function
export const {
    setProfile,
    setTheme,
    setSignInType,
    setSignupDetails,
    setSchoolDetails,
    setLoader,
    setToken,
    setDeviceToken,
    setUser,
    setIsRTL,
    setselectedLanguage,
    logout,
} = globalSlice.actions;

export default globalSlice.reducer;
