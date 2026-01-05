import {ROLES} from "entities/role";

export interface UserType {
	id: number;
    email: string;
	name: string;
	surname: string;
	secondName: string;
	username: string;
    role: ROLES;
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken: string;
    refreshTokenExpiresAt: number
}

export interface SignUpRequest {
    email: string;
    password: string;
    confirmPassword: string
}

export interface SignInRequest {
    email: string;
    password: string
}

export interface RefreshRequest {
    refreshToken: string
}

export interface AuthResponse {
    id: number;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: string;
    refreshTokenExpiresIn: string
}

export interface UserUpdateRequest {
    email: string;
    name: string;
    surname: string;
    secondName: string;
    username: string
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface UserResponse {
    id: number;
    name: string;
    surname: string;
    secondName: string;
    username: string;
    email: string
}

export interface UserDetailResponse {
    id: number;
    email: string;
    name: string;
    surname: string;
    secondName: string;
    username: string;
    role: string;
    enabled: boolean
}
