import axios, {type InternalAxiosRequestConfig} from "axios";
import {decryptFromString, encryptToString} from "../lib/crypto";
import {getCookieByName} from "../lib/getCookieByName";
import {clearCookiesTokens} from "../lib/clearCookiesTokens";
import {refreshIgnoreEndpoints} from "../const/refreshIgnoreEndpoints";

const API_BASE: string = import.meta.env.VITE_API_BASE;

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessTokenEncrypted = getCookieByName("accessToken");

        if(accessTokenEncrypted) {
            const accessToken = await decryptFromString(accessTokenEncrypted, import.meta.env.VITE_CRYPTO_KEY);
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            if(config.url && refreshIgnoreEndpoints.includes(config.url)) {
                return config;
            }
            const refreshTokenEncrypted = getCookieByName("refreshToken");

            if(refreshTokenEncrypted) {
                const decryptedRefreshToken = await decryptFromString(refreshTokenEncrypted, import.meta.env.VITE_CRYPTO_KEY);
                console.log("Calling refresh");
                try {
                    const response = await api.post("/auth/refresh", {refreshToken: decryptedRefreshToken});

                    const encryptedAccessToken = await encryptToString(response.data.accessToken, import.meta.env.VITE_CRYPTO_KEY);
                    const accessTokenExpiresIn = response.data.accessTokenExpiresIn;

                    const encryptedRefreshToken = await encryptToString(response.data.refreshToken, import.meta.env.VITE_CRYPTO_KEY);
                    const refreshTokenExpiresIn = response.data.refreshTokenExpiresIn;

                    const accessTokenExpiresAt = Date.now() + accessTokenExpiresIn;
                    const refreshTokenExpiresAt = Date.now() + refreshTokenExpiresIn;

                    clearCookiesTokens();
                    document.cookie = `accessToken=${encryptedAccessToken}; max-age=${Number(accessTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
                    document.cookie = `accessTokenExpiresAt=${accessTokenExpiresAt}; max-age=${Number(accessTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
                    document.cookie = `refreshToken=${encryptedRefreshToken}; max-age=${Number(refreshTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
                    document.cookie = `refreshTokenExpiresAt=${refreshTokenExpiresAt}; max-age=${Number(refreshTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;

                    config.headers = config.headers ?? {};
                    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                } catch (error: any) {
                    if(axios.isAxiosError(error)) {
                        if(error.response) {
                            alert(`Unexpected error has occured: ${error.response.data.message}`);
                        } else {
                            alert("Bad connection or server is unavailable. Try to reload page now or later");
                        }
                    } else {
                        console.error(error);
                    }
                }
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
)

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//
//             const refreshTokenEncrypted = getCookieByName("refreshToken");
//
//             if (!refreshTokenEncrypted) {
//                 return Promise.reject(error);
//             }
//
//             try {
//                 const decryptedRefreshToken = await decryptFromString(refreshTokenEncrypted, import.meta.env.VITE_CRYPTO_KEY);
//                 const response = await api.post("/auth/refresh", { refreshToken: decryptedRefreshToken });
//
//                 const encryptedAccessToken = await encryptToString(response.data.accessToken, import.meta.env.VITE_CRYPTO_KEY);
//                 const accessTokenExpiresIn = response.data.accessTokenExpiresIn;
//
//                 const encryptedRefreshToken = await encryptToString(response.data.refreshToken, import.meta.env.VITE_CRYPTO_KEY);
//                 const refreshTokenExpiresIn = response.data.refreshTokenExpiresIn;
//
//                 const accessTokenExpiresAt = Date.now() + accessTokenExpiresIn;
//                 const refreshTokenExpiresAt = Date.now() + refreshTokenExpiresIn;
//
//                 clearCookiesTokens();
//                 document.cookie = `accessToken=${encryptedAccessToken}; max-age=${Number(accessTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
//                 document.cookie = `accessTokenExpiresAt=${accessTokenExpiresAt}; max-age=${Number(accessTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
//                 document.cookie = `refreshToken=${encryptedRefreshToken}; max-age=${Number(refreshTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
//                 document.cookie = `refreshTokenExpiresAt=${refreshTokenExpiresAt}; max-age=${Number(refreshTokenExpiresIn) / 1000}; SameSite=Lax; path=/`;
//
//                 store.dispatch(setUserInfo({
//                     accessToken: encryptedAccessToken,
//                     accessTokenExpiresAt: accessTokenExpiresAt,
//                     refreshToken: encryptedRefreshToken,
//                     refreshTokenExpiresAt: refreshTokenExpiresAt,
//                 }));
//
//                 originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
//                 return api(originalRequest);
//             } catch (err) {
//                 return Promise.reject(err);
//             }
//         }
//
//         return Promise.reject(error);
//     }
// );
