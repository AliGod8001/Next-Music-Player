interface LoginPayload {
    email: string,
    password: string
}

type RegisterPayload = {
    email: string;
    password: string,
    birthDate: number
}

type LoginResponseData = {
    token: string,
    user: User,
}

type UserEditData = {
    userName?: string,
    oldpassword?: string,
    newpassword?: string,
    profileImage?: string,
    birthDate?: number
}

type PutUserPayload =
| { type: "playlist"; playlist: PlayList }
| { type: "recent"; music: Music }
| { type: "favorite"; music: Music }
| { type: "info"; info: UserInfo }; 