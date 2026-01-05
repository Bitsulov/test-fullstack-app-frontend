import c from "./signInForm.module.scss";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {FieldInput} from "features/fieldInput";
import {ActionButton} from "features/actionButton";
import type {ISignInForm} from "../lib/types";
import {formValidSubmitHandler} from "../model/formValidSubmitHandler";
import {formInvalidSubmitHandler} from "../model/formInvalidSubmitHandler";
import {linkClickHandler} from "../model/linkClickHandler";
import {type SignInRequest} from "entities/user";
import type {AxiosError, AxiosResponse} from "axios";
import type {AuthResponse} from "entities/user";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useDispatch} from "react-redux";
import type {AppError} from "shared/lib/types.ts";

export interface ISignInFormProps {
    setCurrentForm: React.Dispatch<React.SetStateAction<"register" | "login">>;
    auth: (data: SignInRequest) => Promise<AxiosResponse<AuthResponse>>;
}

export const SignInForm = ({setCurrentForm, auth, ...props}: ISignInFormProps) => {
    const {register, setValue, handleSubmit, watch, formState: {errors}, setError} = useForm<ISignInForm>({shouldFocusError: false});
    const [isErrorSubmit, setIsErrorSubmit] = useState<boolean>(false);

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const transitionTime = +getComputedStyle(document.documentElement).getPropertyValue('--transition-time').slice(0, -2);

    const emailValue = watch("email");
    const passwordValue = watch("password");

    const loginMutation = useMutation({
        mutationFn: auth,
        onSuccess: () => {
            console.log("logined");
            queryClient.invalidateQueries({queryKey: ["login"]});
        },
        onError: (error: AxiosError<AppError>) => {
            const response = error.response?.data
            if(response) {
                switch (response?.statusCode) {
                    case 400:
                        setError("email", {message: ""});
                        setError("password", {message: "Invalid email or password"});
                        break;
                    case 500:
                        setError("email", {message: ""});
                        setError("password", {message: "Server returned an unexpected error"});
                }
            } else {
                setError("email", {message: ""});
                setError("password", {message: "Bad connection or server is unavailable"});
            }
        }
    });

    return (
        <section className={c.signInForm} {...props}>
            <form
                onSubmit={handleSubmit(
                    (data, e) => formValidSubmitHandler(data, setValue, dispatch, loginMutation.mutateAsync, e),
                    (data, e) => formInvalidSubmitHandler(data, setIsErrorSubmit, transitionTime, e),
                )}
                className={c.signInForm_inner}
            >
                <h1 className={c.title}>Sign in</h1>
                <p className={c.subtitle}>To join this project</p>
                <div className={c.inputs}>
                    <FieldInput
                        currentValue={emailValue}
                        placeholder="Enter your email"
                        className={errors.email ? c.error : ""}
                        buttonImgClassName={errors.email ? c.error_img : ""}
                        {...register(
                            "email",
                            {
                                required: "Enter your email",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid email"
                                }
                            }
                        )}
                        type="email"
                        errorText={errors.email?.message || ""}
                    />
                    <FieldInput
                        currentValue={passwordValue}
                        placeholder="Enter your password"
                        className={errors.password ? c.error : ""}
                        buttonImgClassName={errors.password ? c.error_img : ""}
                        {...register(
                            "password",
                            {
                                required: "Enter your password",
                                minLength: {
                                    value: 6,
                                    message: "Password cannot be shorter 6 symbols"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Password cannot be longer 50 symbols"
                                },
                            }
                        )}
                        type="password"
                        errorText={errors.password?.message || ""}
                    />
                </div>
                <ActionButton
                    className={isErrorSubmit ? `${c.submit_error} ${c.submit}` : c.submit}
                    type="submit"
                >
                    Send
                </ActionButton>
                <p
                    className={c.sign}
                >
                    Don’t have an account? <span onClick={e => linkClickHandler(e, setCurrentForm)} className={c.sign_link}>Register</span>
                </p>
            </form>
        </section>
    )
}
