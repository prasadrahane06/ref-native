import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  profile: string;
}

const initialState: GlobalState = {
  profile: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { setProfile } = globalSlice.actions;

export default globalSlice.reducer;
