import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    items: Array<{
        courseId: string;
        title: string;
        startingDate: string;
        image: any;
    }>;
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (
            state,
            action: PayloadAction<{
                courseId: string;
                title: string;
                startingDate: string;
                image: any;
            }>
        ) => {
            state.items.push(action.payload);
        },

        removeCourseFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((course) => course.courseId !== action.payload);
        },
    },
});

export const { addItemToCart, removeCourseFromCart } = cartSlice.actions;

export default cartSlice.reducer;
