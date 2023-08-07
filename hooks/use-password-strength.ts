const getPasswordStrength = (password: string) : PasswordStrength => {
    let point : number = -1
    let strength : PasswordStrength = "very weak"

    if ( /\d/.test(password) ) point += 1

    if ( password.length > 15 ) point += 1

    if ( /[a-z]/.test(password) ) point += 1

    if ( /[A-Z]/.test(password) ) point += 1

    if ( /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(password) ) point += 1


    switch (point) {
        case 1:
            strength = "weak"
            break;

        case 2:
            strength = "moderate"
            break;

        case 3:
            strength = "strong"
            break;

        case 4:
            strength = "powerfull"
            break;

        default:
            strength = "very weak"
            break;
    }

    return strength
}

const usePasswordStrength = (password: string | null) => {
    return getPasswordStrength(password ? password : "")
}

export default usePasswordStrength;