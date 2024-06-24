import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiState {
    popularSchools: { docs: any[] };
    [key: string]: any;
}

interface SetResponsePayload {
    storeName: string;
    data: any;
}

const initialState: ApiState = {
    popularSchools: { docs: [] },
};

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        setResponse(state, action: PayloadAction<SetResponsePayload>) {
            state[action.payload.storeName] = action.payload.data;
        },
    },
});

export const { setResponse } = apiSlice.actions;
export default apiSlice.reducer;
