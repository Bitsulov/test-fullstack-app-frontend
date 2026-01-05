export function clearCookiesTokens() {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; path=/`;
    document.cookie = `accessTokenExpiresAt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; path=/`;
    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; path=/`;
    document.cookie = `refreshTokenExpiresAt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; path=/`;
}
