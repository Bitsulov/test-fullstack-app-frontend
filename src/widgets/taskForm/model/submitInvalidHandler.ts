import type {FieldErrors} from "react-hook-form";
import React from "react";

export function submitInvalidHandler(
    data: FieldErrors,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    transition: number,
    e?: React.BaseSyntheticEvent
) {
    setError(true);
    setTimeout(() => {
        setError(false);
    }, transition);
}
