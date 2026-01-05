import type {ISignUpForm} from "../lib/types";
import React from "react";
import type {SignUpRequest} from "entities/user";
import type {AxiosResponse} from "axios";
import type {UseFormSetValue} from "react-hook-form";

type SubmitFn = (data: SignUpRequest) => Promise<AxiosResponse<string>>;

export async function formSubmitHandler(data: ISignUpForm, setValue: UseFormSetValue<ISignUpForm>, submit: SubmitFn, e?: React.BaseSyntheticEvent) {
    try {
        await submit(data);
        setValue("email", "");
        setValue("password", "");
        setValue("confirmPassword", "");
    } catch (e) {}
}
