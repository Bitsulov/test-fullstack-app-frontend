import type React from "react";

export function inputHandler(e: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<string>>) {
    setValue(e.target.value);
}
