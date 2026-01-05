import { userReducer } from "entities/user";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    user: userReducer,
});
