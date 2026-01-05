import React from "react";
import type {IChangePasswordForm} from "../lib/types.ts";
import type {Dispatch} from "@reduxjs/toolkit";
import {type ChangePasswordRequest, setUserInfo} from "entities/user";
import type {AxiosResponse} from "axios";

export async function formValidSubmitHandler(
    data: IChangePasswordForm,
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
    dispatch: Dispatch,
    changePasswordApi: (data: ChangePasswordRequest) => Promise<AxiosResponse<string>>,
    e?: React.BaseSyntheticEvent
) {
    try {
        await changePasswordApi({oldPassword: data.password, newPassword: data.confirmPassword});
        setIsValid(true);
    } catch (error) {}
}
