import type {ISignInForm} from "../lib/types";
import React from "react";
import {type AuthResponse, setUserInfo, type SignInRequest} from "entities/user";
import type {AxiosResponse} from "axios";
import type {UseFormSetValue} from "react-hook-form";
import type {Dispatch} from "@reduxjs/toolkit";
import {ROLES} from "entities/role";
import {encryptToString} from "shared/lib/crypto";

type SubmitFn = (data: SignInRequest) => Promise<AxiosResponse<AuthResponse>>;

export async function formValidSubmitHandler(data: ISignInForm, setValue: UseFormSetValue<ISignInForm>, dispatch: Dispatch, submit: SubmitFn, e?: React.BaseSyntheticEvent) {
    try {
        const response = await submit(data);
        const accessEncrypted = await encryptToString(response.data.accessToken, import.meta.env.VITE_CRYPTO_KEY);
        const refreshEncrypted = await encryptToString(response.data.refreshToken, import.meta.env.VITE_CRYPTO_KEY);
        const accessTokenExpiresAt = Date.now() + response.data.accessTokenExpiresIn;
        const refreshTokenExpiresAt = Date.now() + response.data.refreshTokenExpiresIn;
        dispatch(setUserInfo({
            id: response.data.id,
            email: data.email,
            name: "",
            surname: "",
            secondName: "",
            username: "",
            role: {id: 1, name: ROLES.USER},
            accessToken: accessEncrypted,
            accessTokenExpiresAt: accessTokenExpiresAt,
            refreshToken: refreshEncrypted,
            refreshTokenExpiresAt: refreshTokenExpiresAt,
        }));
        document.cookie = `accessToken=${accessEncrypted}; max-age=${Number(response.data.accessTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
        document.cookie = `accessTokenExpiresAt=${accessTokenExpiresAt}; max-age=${Number(response.data.accessTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
        document.cookie = `refreshToken=${refreshEncrypted}; max-age=${Number(response.data.refreshTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
        document.cookie = `refreshTokenExpiresAt=${refreshTokenExpiresAt}; max-age=${Number(response.data.refreshTokenExpiresIn) / 1000}; SameSite=Lax; path=/`; // прописать secure
        setValue("email", "");
        setValue("password", "");
    } catch (err) {}
}
