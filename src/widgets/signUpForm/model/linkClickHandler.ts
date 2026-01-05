import React from "react";

export function linkClickHandler(e: React.MouseEvent, setForm: React.Dispatch<React.SetStateAction<"register" | "login">>) {
    setForm("login");
}
