export function currentPasswordValidation(value: string, password: string) {
    return value === password ? true : "Password do not match";
}
