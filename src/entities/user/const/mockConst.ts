import {createUser} from "../model/createUser";
import {ROLES} from "entities/role";

export const principalUserMock = createUser({
	id: 1,
    email: "testEmail@test.com",
	name: "Name",
	secondName: "SecondName",
	username: "username",
	surname: "Surname",
    role: {id: 1, name: ROLES.USER},
    accessToken: "",
    accessTokenExpiresAt: 0,
    refreshToken: "",
    refreshTokenExpiresAt: 0
});
