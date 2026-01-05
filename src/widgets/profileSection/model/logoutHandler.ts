import React from "react";
import {clearCookiesTokens} from "shared/lib/clearCookiesTokens";
import type {NavigateFunction} from "react-router-dom";
import type {Dispatch} from "@reduxjs/toolkit";
import {setUserInfo} from "entities/user";
import {ROLES} from "entities/role";

export function logoutHandler(e: React.MouseEvent, navigate: NavigateFunction, dispatch: Dispatch) {
    clearCookiesTokens();
    dispatch(setUserInfo({
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
    }))
    navigate("/login");
}
