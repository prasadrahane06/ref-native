import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Favourite {
    items: any[];
}

const initialState: Favourite = {
    items: [],
};

export const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addToFav: (state, action: PayloadAction<any>) => {
            state.items = action.payload;
        },

        removeFromFav: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.course._id !== action.payload);
        },
    },
});

export const { addToFav, removeFromFav } = favouriteSlice.actions;

export default favouriteSlice.reducer;
