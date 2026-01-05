import c from "./signUpForm.module.scss";
import {useForm} from "react-hook-form";
import {formSubmitHandler} from "../model/formSubmitHandler";
import type {ISignUpForm} from "../lib/types";
import {FieldInput} from "features/fieldInput";
import {ActionButton} from "features/actionButton";
import React, {useState} from "react";
import {formInvalidSubmitHandler} from "../model/formInvalidSubmitHandler";
import {linkClickHandler} from "../model/linkClickHandler";
import type {SignUpRequest} from "entities/user";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {AxiosError, AxiosResponse} from "axios";
import type {AppError} from "shared/lib/types.ts";

export interface ISignUpFormProps {
    setCurrentForm: React.Dispatch<React.SetStateAction<("register" | "login")>>;
    auth: (data: SignUpRequest) => Promise<AxiosResponse<string>>;
}

export const SignUpForm = ({setCurrentForm, auth, ...props}: ISignUpFormProps) => {
    const {register, setValue, handleSubmit, watch, formState: {errors}, setError} = useForm<ISignUpForm>({ shouldFocusError: false });
    const [isErrorSubmit, setIsErrorSubmit] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const transitionTime = +getComputedStyle(document.documentElement).getPropertyValue('--transition-time').slice(0, -2);

    const emailValue = watch("email");
    const passwordValue = watch("password");
    const confirmPasswordValue = watch("confirmPassword");

    const registerMutation = useMutation({
        mutationFn: auth,
        onSuccess: () => {
            console.log("Registered");
            queryClient.invalidateQueries({queryKey: ["register"]});
        },
        onError: (error: AxiosError<AppError>) => {
            const response = error.response?.data;
            if(response) {
                switch (response?.statusCode) {
                    case 400:
                        setError("email", {message: "User already exists"});
                        break;
                    case 500:
                        setError("email", {message: ""});
                        setError("password", {message: ""});
                        setError("confirmPassword", {message: "Server returned an unexpected error"});
                }
            } else {
                setError("email", {message: ""});
                setError("password", {message: ""});
                setError("confirmPassword", {message: "Bad connection or server is unavailable"});
            }
        },
    });

    return (
        <section className={c.signUpForm} {...props}>
            <form
                onSubmit={handleSubmit(
                    (data, e) => formSubmitHandler(data, setValue, registerMutation.mutateAsync, e),
                    (data, e) => formInvalidSubmitHandler(data, setIsErrorSubmit, transitionTime, e),
                )}
                className={c.signUpForm_inner}
            >
                <h1 className={c.title}>Sign up</h1>
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
                    <FieldInput
                        currentValue={confirmPasswordValue}
                        placeholder="Enter your password again"
                        className={errors.confirmPassword ? c.error : ""}
                        buttonImgClassName={errors.confirmPassword ? c.error_img : ""}
                        {...register(
                            "confirmPassword",
                            {
                                required: "Confirm your password",
                                minLength: {
                                    value: 6,
                                    message: "Password cannot be shorter 6 symbols"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Password cannot be longer 50 symbols"
                                },
                                validate: value => value === passwordValue || "Passwords do not match"
                            }
                        )}
                        type="password"
                        errorText={errors.confirmPassword?.message || ""}
                    />
                </div>
                <ActionButton
                    className={isErrorSubmit ? `${c.submit_error} ${c.submit}` : c.submit}
                    type="submit"
                >
                    Send
                </ActionButton>
                <p className={c.sign}>Already have an account? <span onClick={e => linkClickHandler(e, setCurrentForm)} className={c.sign_link}>Login</span></p>
            </form>
        </section>
    )
}
