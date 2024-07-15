import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    items: {
        courses: any[];
    };
}

const initialState: CartState = {
    items: {
        courses: [],
    },
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartState["items"]>) => {
            state.items = action.payload;
        },

        removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            state.items.courses = state.items.courses.filter((item) => item.course._id !== id);
        },
    },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
