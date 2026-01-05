import type { UserType } from "../lib/types";
import { ROLES } from "entities/role";

export function createUser({
	id,
    email,
	name = "",
	surname = "",
	secondName = "",
	username = "",
    role = ROLES.USER,
    accessToken,
    accessTokenExpiresAt = 0,
    refreshToken,
    refreshTokenExpiresAt = 0
}: UserType) {
	return {id, email, name, surname, secondName, username, role, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt}
}
