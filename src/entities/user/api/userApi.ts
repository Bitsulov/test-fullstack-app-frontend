import type {AxiosResponse} from "axios";
import {api} from "shared/api/instance";
import type {
    AuthResponse,
    UserResponse,
    UserDetailResponse,
    SignUpRequest,
    SignInRequest,
    UserUpdateRequest, ChangePasswordRequest
} from "../lib/types";

const urls = {
    baseUrlAuth: "/auth",
    baseUrlUser: "/users",
    register: function () { return `${this.baseUrlAuth}/register` },
    login: function () { return `${this.baseUrlAuth}/login` },
    refresh: function () { return `${this.baseUrlAuth}/refresh` },
    user: function () { return `${this.baseUrlAuth}/user` },
    userId: function (id: number) { return `${this.baseUrlUser}/${id}` },
    updateUser: function (id: number) { return `${this.baseUrlUser}/${id}` },
    updateUserPassword: function () { return `${this.baseUrlUser}/password` },
};

export async function register(data: SignUpRequest): Promise<AxiosResponse<string>> {
    console.log("Calling register", data);
    return api.post(urls.register(), data);
}

export async function login(data: SignInRequest): Promise<AxiosResponse<AuthResponse>> {
    console.log("Calling login", data);
    return api.post(urls.login(), data);
}

export async function refresh(data: SignInRequest): Promise<AxiosResponse<AuthResponse>> {
    console.log("Calling refresh", data);
    return api.post(urls.refresh(), data);
}

export async function getPrincipalUser(): Promise<AxiosResponse<UserDetailResponse>> {
    console.log("Calling principal user");
    return api.get(urls.user());
}

export async function getUser(id: number): Promise<AxiosResponse<UserResponse>> {
    console.log("Calling user", id);
    return api.get(urls.userId(id));
}

export async function updateUser(id: number, data: UserUpdateRequest): Promise<AxiosResponse<UserResponse>> {
    console.log("Calling update user", id);
    return api.put(urls.updateUser(id), data);
}

export async function updateUserPassword(data: ChangePasswordRequest): Promise<AxiosResponse<string>> {
    console.log("Calling change password");
    return api.put(urls.updateUserPassword(), data);
}
