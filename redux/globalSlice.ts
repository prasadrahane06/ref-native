import { ThemeType } from "./../constants/Colors";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
    profile: string;
    theme: ThemeType;
}

const initialState: GlobalState = {
    profile: "",
    theme: "light",
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

        setTheme: (state, action: PayloadAction<ThemeType>) => {
            state.theme = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProfile, setTheme } = globalSlice.actions;

export default globalSlice.reducer;
