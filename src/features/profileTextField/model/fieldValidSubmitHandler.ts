import React from "react";
import type {FieldValues} from "react-hook-form";
import type {FieldModesType} from "../lib/types.ts";

export function fieldValidSubmitHandler(
    data: FieldValues,
    func: (value: string) => void,
    name: string,
    setMode: React.Dispatch<React.SetStateAction<FieldModesType>>,
    e?: React.BaseSyntheticEvent
) {
    func(data[name]);
    setMode("read");
}
