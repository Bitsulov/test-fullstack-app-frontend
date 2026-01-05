import type {ISignUpForm} from "../lib/types.ts";
import React from "react";
import type {FieldErrors} from "react-hook-form";

export function formInvalidSubmitHandler(
    data: FieldErrors<ISignUpForm>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    transition: number,
    e?: React.BaseSyntheticEvent,
) {
    setError(true);
    setTimeout(() => {
        setError(false);
    }, transition)
}
