import type {ISignInForm} from "../lib/types.ts";
import React from "react";
import type {FieldErrors} from "react-hook-form";

export function formInvalidSubmitHandler(
    data: FieldErrors<ISignInForm>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    transition: number,
    e?: React.BaseSyntheticEvent,
) {
    setError(true);
    setTimeout(() => {
        setError(false);
    }, transition)
}
