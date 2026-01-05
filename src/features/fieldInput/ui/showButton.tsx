import c from "./fieldInput.module.scss";
import React, {useEffect, useState} from "react";
import {EyeClosed} from "lucide-react";

interface IProps {
    onClick: React.MouseEventHandler;
    className?: string;
}

export const ShowButton = ({ className, onClick, ...props }: IProps) => {
    const [resultClassName, setResultClassName] = useState<string>(`${c.button_img} ${className}`);

    useEffect(() => {
        setResultClassName(`${c.button_img} ${className}`);
    }, [className]);

	return (
        <button className={`${c.button} ${c.show}`} onClick={e => onClick(e)} {...props}>
            <EyeClosed className={resultClassName} />
        </button>
	)
}
