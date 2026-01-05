import { createSlice } from "@reduxjs/toolkit";
import {ROLES} from "entities/role";

const initialState = {
    id: 0,
    email: "",
	name: "",
	surname: "",
	secondName: "",
	username: "",
    role: ROLES.USER,
    accessToken: "",
    accessTokenExpiresAt: 0,
    refreshToken: "",
    refreshTokenExpiresAt: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo(state, action) {
            if (action.payload.id !== undefined) state.id = action.payload.id;
            if (action.payload.name !== undefined) state.name = action.payload.name;
            if (action.payload.email !== undefined) state.email = action.payload.email;
            if (action.payload.surname !== undefined) state.surname = action.payload.surname;
            if (action.payload.secondName !== undefined) state.secondName = action.payload.secondName;
            if (action.payload.username !== undefined) state.username = action.payload.username;
            if (action.payload.role !== undefined) state.role = action.payload.role;
            if (action.payload.accessToken !== undefined) state.accessToken = action.payload.accessToken;
            if (action.payload.accessTokenExpiresAt !== undefined) state.accessTokenExpiresAt = action.payload.accessTokenExpiresAt;
            if (action.payload.refreshToken !== undefined) state.refreshToken = action.payload.refreshToken;
            if (action.payload.refreshTokenExpiresAt !== undefined) state.refreshTokenExpiresAt = action.payload.refreshTokenExpiresAt;
        }
    }
});

export const { setUserInfo } = userSlice.actions;

export const userReducer = userSlice.reducer;
