import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Favorite {
    items: {
        courses: any[];
        clients: any[];
        countries: any[];
    };
}

const initialState: Favorite = {
    items: {
        courses: [],
        clients: [],
        countries: [],
    },
};

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<Favorite["items"]>) => {
            state.items = action.payload;
        },
        removeFromFavorite: (
            state,
            action: PayloadAction<{ id: string; type: keyof Favorite["items"] }>
        ) => {
            const { id, type } = action.payload;
            state.items[type] = state.items[type].filter((item) => item?._id !== id);
        },
    },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
