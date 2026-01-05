import c from "./fieldInput.module.scss";
import {useEffect, useState} from "react";
import {buttonsConfig} from "../config/buttonsConfig.ts";
import type {inputType} from "../lib/types.ts";
import {changeInputTypeHandler} from "../model/changeInputTypeHandler.ts";
import type {UseFormRegisterReturn} from "react-hook-form";

interface IFieldInput extends UseFormRegisterReturn {
    type: inputType;
    currentValue: string;
    className?: string;
    wrapperClassname?: string;
    placeholder?: string;
    placeholderClassName?: string;
    buttonImgClassName?: string;
    errorText: string;
}

export const FieldInput = ({
    type,
    currentValue = "",
    wrapperClassname = "",
    className = "",
    placeholder = "",
    placeholderClassName = "",
    buttonImgClassName = "",
    errorText = "",
    ...props
}: IFieldInput) => {
    const initialClassName = type === "password" ? `${c.input} ${c.password}` : c.input;
    const [resultClassName, setResultClassName] = useState(`${initialClassName} ${className}`);
    const [placeholderResultClassname, setPlaceholderResultClassname] = useState<string>(`${c.placeholder} ${placeholderClassName}`);
    const [errorClassName, setErrorClassName] = useState<string>(c.error_text);
    const [currentType, setCurrentType] = useState<"text" | "password">("password");

    const isPasswordField = type === 'password';
    const Button = buttonsConfig[currentType];

    const id = props.name;

    useEffect(() => {
        setResultClassName(`${initialClassName} ${className}`);
        currentValue !== ""
            ? setPlaceholderResultClassname(`${c.placeholder} ${c.hide} ${placeholderClassName}`)
            : setPlaceholderResultClassname(`${c.placeholder} ${placeholderClassName}`);
    }, [className, placeholderClassName]);

    useEffect(() => {
        currentValue !== ""
            ? setPlaceholderResultClassname(`${c.placeholder} ${c.hide} ${placeholderClassName}`)
            : setPlaceholderResultClassname(`${c.placeholder} ${placeholderClassName}`);
    }, [currentValue]);

    useEffect(() => {
        errorText.length > 0
            ? setErrorClassName(`${c.error_text} ${c.show}`)
            : setErrorClassName(c.error_text);
    }, [errorText]);

    return (
        <div className={`${c.input_wrapper} ${wrapperClassname}`}>
            <input id={id} type={isPasswordField ? currentType : type} className={resultClassName} {...props} />
            <label className={placeholderResultClassname} htmlFor={id}>{placeholder}</label>
            <p className={errorClassName}>{errorText}</p>
            {isPasswordField &&
                <Button className={buttonImgClassName} onClick={e => changeInputTypeHandler(e, setCurrentType)}/>
            }
        </div>
    )
}
