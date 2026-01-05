import type React from "react";

export function changeInputTypeHandler(
    e: React.MouseEvent,
    setCurrentType: React.Dispatch<React.SetStateAction<"text" | "password">>
) {
    setCurrentType(state => state === "text" ? "password" : "text");
}
