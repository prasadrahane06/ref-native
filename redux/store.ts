import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import cartSlice from "./cartSlice";
import globalSlice from "./globalSlice";
import favoriteSlice from "./favoriteSlice";

export const store = configureStore({
    reducer: {
        global: globalSlice,
        api: apiSlice,
        cart: cartSlice,
        favorite: favoriteSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
