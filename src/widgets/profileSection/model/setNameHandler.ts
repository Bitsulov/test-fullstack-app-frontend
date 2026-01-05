import type {Dispatch} from "@reduxjs/toolkit";
import type {UserResponse, UserType, UserUpdateRequest} from "entities/user";
import type {AxiosResponse} from "axios";

interface IUpdateUserFn {
    id: number;
    data: UserUpdateRequest
}

export async function setNameHandler(
    userPrincipal: UserType,
    value: string,
    setUserApi: ({id, data}: IUpdateUserFn) => Promise<AxiosResponse<UserResponse>>
) {
    await setUserApi({
        id: userPrincipal.id,
        data: {
            name: value,
            secondName: userPrincipal.secondName,
            email: userPrincipal.email,
            surname: userPrincipal.surname,
            username: userPrincipal.username
        }
    })
}
