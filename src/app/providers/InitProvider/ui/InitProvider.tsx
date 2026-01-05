import {type ReactNode, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getPrincipalUser, setUserInfo} from "entities/user";
import { principalUserMock } from "entities/user";
import {getCookieByName} from "shared/lib/getCookieByName";
import {useLocation, useNavigate} from "react-router-dom";
import {authorizationIgnoreUrls} from "shared/const/authorizationIgnoreUrls";

type InitProviderPropsType = {
    children?: ReactNode;
};

const InitProvider = ({ children }: InitProviderPropsType) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    async function initFromCookies() {
        const cookieRefreshToken = getCookieByName("refreshToken");

        if(!cookieRefreshToken) {
            if(!authorizationIgnoreUrls.includes(location.pathname)) {
                alert("Authorization is required to open this page");
                navigate("/auth");
            }
            return
        }

        const response = await getPrincipalUser();

        const cookieAccessTokenUpdated = getCookieByName("accessToken");
        const cookieRefreshTokenUpdated = getCookieByName("refreshToken");
        const cookieAccessTokenExpiresAt = Number(getCookieByName("accessTokenExpiresAt"));
        const cookieRefreshTokenExpiresAt = Number(getCookieByName("refreshTokenExpiresAt"));

        dispatch(setUserInfo({
            id: response.data.id,
            email: response.data.email,
            name: response.data.name,
            surname: response.data.surname,
            secondName: response.data.secondName,
            username: response.data.username,
            role: response.data.role,
            accessToken: cookieAccessTokenUpdated,
            accessTokenExpiresAt: cookieAccessTokenExpiresAt,
            refreshToken: cookieRefreshTokenUpdated,
            refreshTokenExpiresAt: cookieRefreshTokenExpiresAt,
        }))
    }

    useEffect(() => {
        initFromCookies().catch(er => {
            console.log(er)
            alert("Error while getting user info: " + er.message)
        });
    }, [location.pathname]);

    return <>{children}</>;
};

export { InitProvider };
