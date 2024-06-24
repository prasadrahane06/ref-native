import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "./../constants/Colors";

export interface GlobalState {
    profile: string;
    theme: ThemeType;
    signInType: string;
    signupDetails: any;
    loader: boolean;
}

const initialState: GlobalState = {
    profile: "",
    theme: "light",
    signInType: "",
    signupDetails: null,
    loader: false,
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
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            state.theme = action.payload;
        },
        setLoader: (state, action: PayloadAction<boolean>) => {
            state.loader = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProfile, setTheme, setSignInType, setSignupDetails, setLoader } =
    globalSlice.actions;

export default globalSlice.reducer;
