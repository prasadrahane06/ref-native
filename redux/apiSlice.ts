import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiState {
    popularSchools: { docs: any[] };
    [key: string]: any;
    compareSchool1: null | any;
    compareSchool2: null | any;
}

interface SetResponsePayload {
    storeName: string;
    data: any;
}

const initialState: ApiState = {
    popularSchools: { docs: [] },
    compareSchool1: null,
    compareSchool2: null,
};

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        setResponse(state, action: PayloadAction<SetResponsePayload>) {
            state[action.payload.storeName] = action.payload.data;
        },
        setUpdatedResponse(state, action: PayloadAction<SetResponsePayload>) {
            const { storeName, data } = action.payload;
            state[storeName] = {
                ...state[storeName],
                ...data,
                docs: [
                    ...(state[storeName]?.docs || []),
                    ...(data.docs || [])
                ],
            };
        },
        setSelectedSchool1(state, action: PayloadAction<any>) {
            state.compareSchool1 = action.payload;
        },
        setSelectedSchool2(state, action: PayloadAction<any>) {
            state.compareSchool2 = action.payload;
        },
    },
});

export const { setResponse, setSelectedSchool1, setSelectedSchool2, setUpdatedResponse } = apiSlice.actions;
export default apiSlice.reducer;


