import React from "react";
import type {FieldModesType} from "../lib/types.ts";

export function editButtonHandler(e: React.MouseEvent, setMode: React.Dispatch<React.SetStateAction<FieldModesType>>) {
    e.preventDefault();
    setMode("change");
}
