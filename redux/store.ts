import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import apiSlice from "./apiSlice";
import enquiryformSlice from "./enquiryformSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
    reducer: {
        global: globalSlice,
        api: apiSlice,
        enquiryForm: enquiryformSlice,
        cart: cartSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
