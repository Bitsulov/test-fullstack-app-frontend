import c from "./profileTextField.module.scss";
import React, {useEffect, useState} from "react";
import {FieldInput} from "features/fieldInput";
import {useForm} from "react-hook-form";
import type {FieldModesType, IForm} from "../lib/types.ts";
import {fieldValidSubmitHandler} from "../model/fieldValidSubmitHandler.ts";
import {editButtonHandler} from "../model/editButtonHandler.ts";

interface IProfileTextFieldProps {
    value?: string;
    type?: string;
    name: string;
    placeholderText?: string;
    onSubmitHandler: (value: string) => void;
    inputParams?: {
        required?: boolean | string;
        pattern?: {
            value: RegExp;
            message: string;
        };
        minLength?: {
            value: number;
            message: string;
        };
        maxLength?: {
            value: number;
            message: string;
        };
        validate?: (value: string) => boolean | string;
    };
}

export const ProfileTextField = ({
     onSubmitHandler,
     placeholderText = "",
     value = "",
     type = "text",
     name,
     inputParams,
     ...props
}: IProfileTextFieldProps) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IForm>({ shouldFocusError: false });
    const [mode, setMode] = useState<FieldModesType>("read");

    const currentValue = watch(name);

    useEffect(() => {
        if(value === "" || value === null) {
            setMode("change");
        } else {
            setMode("read");
            setValue(name, value);
        }
    }, [value]);

	return (
		<form
            onSubmit={handleSubmit(
                (data, e) => fieldValidSubmitHandler(data, onSubmitHandler, name, setMode, e)
            )}
            className={c.wrapper}
            {...props}
        >
            {mode === "read" ? (
                <>
                    <p className={c.value}>{value}</p>
                    <button
                        type="button"
                        onClick={e => editButtonHandler(e, setMode)}
                        className={`${c.button} ${c.button_edit}`}
                    >
                        Edit
                    </button>
                </>
            ) : (
                <>
                    <FieldInput
                        {...register(name, inputParams)}
                        wrapperClassname={c.input}
                        placeholder={placeholderText}
                        type="text"
                        currentValue={currentValue}
                        errorText={errors[name]?.message || ""}
                    />
                    <button
                        type="submit"
                        className={`${c.button} ${c.button_confirm}`}
                    >
                        Confirm
                    </button>
                </>
            )}
		</form>
	)
}
