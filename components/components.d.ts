interface LoginSignUpPayload {
    email: string,
    password: string
    rePassword?: string,
    birthDate?: AntDesignDatePickerValue,
}

type AntDesignDatePickerValue = {
    $M: number;
    $D: number;
    $H: number;
    $L: string;
    $W: number;
    $d: string;
    $m: number;
    $ms: number;
    $s: number;
    $u: undefined;
    $x: {};
    $y: number;
}

interface AddPlayListPayload {
    playlistTitle: string,
    playlistDescription: string,
    playlistColor: AntDesignColorPickerType
}

type AntDesignColorPickerType = {
    metaColor: {
        a: number,
        b: number,
        g: number,
        gradientType: undefined,
        r: number,
        roundA: number,
        isValid: boolean,
        format: string,
        originalInput: OriginalInput | string
    }
}

type OriginalInput = {
    a: number,
    h: number,
    s: number,
    v: number
}

interface UserEditPayload {
    username: string,
    oldpassword?: string,
    newpassword?: string,
    repassword?: string,
    birthdate?: AntDesignDatePickerValue
    profileimage?: string
}

type playChangeType ="play" | "pause"

type buttonType = "button" | "reset" | "submit"