import c from "./changePasswordForm.module.scss";
import {FieldInput} from "features/fieldInput";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import type {IChangePasswordForm} from "../lib/types";
import {formValidSubmitHandler} from "../model/formValidSubmitHandler";
import {useDispatch} from "react-redux";
import type {ChangePasswordRequest} from "entities/user";
import type {AxiosResponse} from "axios";

interface IChangePasswordFormProps {
    changePasswordApi: (data: ChangePasswordRequest) => Promise<AxiosResponse<string>>;
    errorTextOld: string;
    setErrorTextOld: React.Dispatch<React.SetStateAction<string>>;
    errorTextNew: string;
    setErrorTextNew: React.Dispatch<React.SetStateAction<string>>
}

export const ChangePasswordForm = ({
   errorTextOld,
   setErrorTextOld,
   errorTextNew,
   setErrorTextNew,
   changePasswordApi,
   ...props
}: IChangePasswordFormProps) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setError
    } = useForm<IChangePasswordForm>({shouldFocusError: false});
    const [isValid, setIsValid] = useState<boolean>(false);

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const successMessageClassname = isValid ? `${c.success_text} ${c.show}` : c.success_text;

    useEffect(() => {
        let timer = 0;
        if (isValid) {
            timer = setTimeout(() => {
                setIsValid(false);
            }, 5000);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [isValid]);

    useEffect(() => {
        if (errorTextOld !== "") {
            setError("password", {message: errorTextOld});
            setErrorTextOld("");
        }
    }, [errorTextOld]);

    useEffect(() => {
        if (errorTextNew !== "") {
            setError("confirmPassword", {message: errorTextNew});
            setErrorTextNew("");
        }
    }, [errorTextNew]);

    return (
        <>
            <form
                onSubmit={handleSubmit(
                    (data, e) =>
                        formValidSubmitHandler(data, setIsValid, dispatch, changePasswordApi, e)
                )}
                className={c.wrapper}
                {...props}
            >
                <div className={c.fields_password}>
                    <FieldInput
                        {...register(
                            "password",
                            {
                                required: "Enter current password",
                            }
                        )}
                        wrapperClassname={c.input}
                        placeholder="Enter current password"
                        type="password"
                        currentValue={password}
                        errorText={errors["password"]?.message || ""}
                    />
                    <FieldInput
                        {...register(
                            "confirmPassword",
                            {
                                required: "Enter new password",
                                minLength: {
                                    value: 6,
                                    message: "Too short password"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Too long password"
                                }
                            }
                        )}
                        wrapperClassname={c.input}
                        placeholder="Enter new password"
                        type="password"
                        currentValue={confirmPassword}
                        errorText={errors["confirmPassword"]?.message || ""}
                    />
                </div>
                <button
                    type="submit"
                    className={c.button}
                >
                    Confirm
                </button>
                <p className={successMessageClassname}>Password was edit correctly</p>
            </form>
        </>
    )
}
