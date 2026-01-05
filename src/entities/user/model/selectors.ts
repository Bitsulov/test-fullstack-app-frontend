import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "app/store/index.js";
import type { UserType } from "../lib/types.ts";

export const selectIsAuthenticated = (state: RootState) => !!state.user.accessToken;
export const selectUser = (state: RootState): UserType => state.user;
export const selectUserInfo = createSelector([selectUser], user => {
    return {
        id: user.id,
        email: user.email,
		name: user.name,
		surname: user.surname,
		secondName: user.secondName,
		username: user.username,
        role: user.role,
        accessToken: user.accessToken,
        accessTokenExpiresAt: user.accessTokenExpiresAt,
        refreshToken: user.refreshToken,
        refreshTokenExpiresAt: user.refreshTokenExpiresAt
    };
});
