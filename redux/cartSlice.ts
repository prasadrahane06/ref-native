import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    items: any[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<any>) => {
            state.items = action.payload;
        },

        removeItemFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.course._id !== action.payload);
        },
    },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
