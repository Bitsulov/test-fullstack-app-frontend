import c from "./actionButton.module.scss";
import {useEffect} from "react";

interface IProps {
    children?: string;
    type?: string;
    className?: string;
}

export const ActionButton = ({type = "button", children, className = "", ...props}: IProps) => {
    const resultType = type === "submit" ? "submit" : "button";

    return (
        <button type={resultType} className={`${c.submit} ${className}`} {...props}>{children}</button>
    )
}
