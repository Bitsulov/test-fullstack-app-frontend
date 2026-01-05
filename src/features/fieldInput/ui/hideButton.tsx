import c from "./fieldInput.module.scss";
import React, {useEffect, useState} from "react";
import { Eye } from "lucide-react";

interface IProps {
    onClick: React.MouseEventHandler;
    className?: string;
}

export const HideButton = ({ className, onClick, ...props }: IProps) => {
    const [resultClassName, setResultClassName] = useState<string>(`${c.button_img} ${className}`);

    useEffect(() => {
        setResultClassName(`${c.button_img} ${className}`);
    }, [className]);

	return (
        <button className={`${c.button} ${c.hide}`} onClick={e => onClick(e)} {...props}>
            <Eye className={resultClassName} />
        </button>
	)
}
