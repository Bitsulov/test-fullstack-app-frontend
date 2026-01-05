import type {UserResponse, UserType, UserUpdateRequest} from "entities/user";
import type {AxiosResponse} from "axios";

interface IUpdateUserFn {
    id: number;
    data: UserUpdateRequest
}

export async function setEmailHandler(
    userPrincipal: UserType,
    value: string,
    setUserApi: ({id, data}: IUpdateUserFn) => Promise<AxiosResponse<UserResponse>>
) {
    await setUserApi({
        id: userPrincipal.id,
        data: {
            name: userPrincipal.name,
            secondName: userPrincipal.secondName,
            email: value,
            surname: userPrincipal.surname,
            username: userPrincipal.username
        }
    })
}
