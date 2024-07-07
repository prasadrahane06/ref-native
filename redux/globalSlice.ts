import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "./../constants/Colors";

export interface UserState {
    userId: string;
    userName: string;
    userImage: string;
    userEmail: string;
    userPhone: string;
    userType: string;
}

export interface GlobalState {
    profile: string;
    theme: ThemeType;
    signInType: string;
    signupDetails: any;
    schoolDetails: any;
    loader: boolean;
    token: string;
    isRTL: boolean;
    user: UserState;
}

const initialState: GlobalState = {
    profile: "",
    theme: "light",
    signInType: "",
    signupDetails: null,
    schoolDetails: null,
    loader: false,
    token: "",
    isRTL: false,
    user: {
        userId: "",
        userName: "",
        userImage: "",
        userEmail: "",
        userPhone: "",
        userType: "",
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
        setIsRTL: (state, action: PayloadAction<boolean>) => {
            state.isRTL = action.payload;
        },
        setUser: (
            state,
            action: PayloadAction<{
                userId: string;
                userName: string;
                userImage: string;
                userEmail: string;
                userPhone: string;
                userType: string;
            }>
        ) => {
            state.user = action.payload;
        },
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
    setUser,
    setIsRTL,
} = globalSlice.actions;

export default globalSlice.reducer;
