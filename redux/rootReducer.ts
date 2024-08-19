import { combineReducers } from "redux";
import globalReducer, { logout } from "./globalSlice";
import apiReducer from "./apiSlice";
import cartReducer from "./cartSlice";
import favoriteReducer from "./favoriteSlice";

const appReducer = combineReducers({
    global: globalReducer,
    api: apiReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === logout.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
