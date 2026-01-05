import c from "./profileSection.module.scss";
import {
    setUserInfo,
    updateUser,
    updateUserPassword,
    type UserType,
    type UserUpdateRequest
} from "entities/user";
import React, {useEffect, useState} from "react";
import avatar from "shared/icons/avatar-default-big.png";
import {ProfileTextField} from "features/profileTextField";
import {setNameHandler} from "../model/setNameHandler";
import {setSecondNameHandler} from "../model/setSecondNameHandler";
import {setSurnameHandler} from "../model/setSurnameHandler";
import {useDispatch} from "react-redux";
import {ChangePasswordForm} from "features/changePasswordForm";
import {useMutation} from "@tanstack/react-query";
import type {AxiosError} from "axios";
import {logoutHandler} from "../model/logoutHandler";
import {useNavigate} from "react-router-dom";
import type {AppError} from "shared/lib/types.ts";

interface IProfileSectionProps {
    userPrincipal: UserType
}

export const ProfileSection = ({userPrincipal, ...props}: IProfileSectionProps) => {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState<string>("loading...");
    const [passwordOldChangeErrorText, setPasswordOldChangeErrorText] = useState<string>("");
    const [passwordNewChangeErrorText, setPasswordNewChangeErrorText] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (userPrincipal.name !== null) {
            if (userPrincipal.name !== "") {
                if (userPrincipal.secondName === null || userPrincipal.surname === null) {
                    setFullName(userPrincipal.name);
                } else {
                    setFullName(`${userPrincipal.surname} ${userPrincipal.name} ${userPrincipal.secondName}`);
                }
            } else {
                setFullName("Your name not found");
            }
        } else {
            setFullName("Your name not found");
        }
    }, [userPrincipal]);

    interface IEditUser {
        id: number;
        data: UserUpdateRequest;
    }

    const editUserMutation = useMutation({
        mutationFn: ({id, data}: IEditUser) => updateUser(id, data),
        onSuccess: (response) => {
            dispatch(setUserInfo({
                name: response.data.name || userPrincipal.name,
                surname: response.data.surname || userPrincipal.surname,
                secondName: response.data.secondName || userPrincipal.secondName,
                email: response.data.email || userPrincipal.email,
                username: response.data.username || userPrincipal.username,
            }));
        },
        onError: (error) => {
            console.error(`Ошибка изменения информации о пользователе: ${error}`);
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: updateUserPassword,
        onSuccess: (response) => {
            console.log(response.data);
        },
        onError: (error: AxiosError<AppError>) => {
            const response = error.response?.data;
            if (response) {
                switch (response?.statusCode) {
                    case 400:
                        setPasswordOldChangeErrorText("Old password is incorrect");
                        break;
                    case 500:
                        setPasswordNewChangeErrorText("Server returned an unexpected error");
                }
            } else {
                setPasswordNewChangeErrorText("Bad connection or server is unavailable");
            }
        }
    })

    return (
        <section className={c.profile} {...props}>
            <div className="container">
                <div className={c.profile_inner}>
                    <h1 className={c.title}>{fullName}</h1>
                    <figure className={c.user_icon_wrapper}>
                        <img src={avatar} alt={fullName} className={c.user_icon}/>
                    </figure>
                    <div className={c.fields}>
                        <ProfileTextField
                            placeholderText="Enter your name"
                            value={userPrincipal.name}
                            name="name"
                            onSubmitHandler={value => setNameHandler(userPrincipal, value, editUserMutation.mutateAsync)}
                            inputParams={{
                                required: "Name is required",
                                maxLength: {value: 10, message: "Too long name"},
                            }}
                        />
                        <ProfileTextField
                            placeholderText="Enter your second name"
                            value={userPrincipal.secondName}
                            name="secondName"
                            onSubmitHandler={value => setSecondNameHandler(userPrincipal, value, editUserMutation.mutateAsync)}
                            inputParams={{
                                required: "Second name is required",
                                maxLength: {value: 25, message: "Too long second name"},
                            }}
                        />
                        <ProfileTextField
                            placeholderText="Enter your surname"
                            value={userPrincipal.surname}
                            name="surname"
                            onSubmitHandler={value => setSurnameHandler(userPrincipal, value, editUserMutation.mutateAsync)}
                            inputParams={{
                                maxLength: {value: 20, message: "Too long surname"},
                            }}
                        />
                        <ChangePasswordForm
                            errorTextOld={passwordOldChangeErrorText}
                            setErrorTextOld={setPasswordOldChangeErrorText}
                            errorTextNew={passwordNewChangeErrorText}
                            setErrorTextNew={setPasswordNewChangeErrorText}
                            changePasswordApi={changePasswordMutation.mutateAsync}
                        />
                        <div className={c.logout_wrapper}>
                            <button
                                onClick={e => logoutHandler(e, navigate, dispatch)}
                                className={c.delete_button}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
