import GetUsers from "./GetUsers"
import { generateUUID } from "./uuid"

const Register = async (payload: RegisterPayload) : Promise<ServiceResponse<LoginResponseData>> => {
    let status : number = 201;
    let error : string = ""
    let data : LoginResponseData;

    const usersRes = await GetUsers()

    if ( usersRes.data ) {
        const users = usersRes.data
        const user = users.find(user => user.email === payload.email )

        if ( user ) {
            status = 505;
            error = "You are signup already please login"

        } else {
            const newUser : User = {
                id: new Date().getTime(),
                email: payload.email,
                password: payload.password,
                birthDate: payload.birthDate,
                creationDate: new Date().getTime(),
                modificationDate: null,
                profileImage: null,
                userName: null,
                favorite: [],
                recent: [],
                playLists: []
            }
        
            const res : PostResponse = await fetch(process.env.NEXT_PUBLIC_USERS_API, {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            status = res.status;
            error = res.statusText

            if ( res.ok ) {
                data = {
                    token: generateUUID(),
                    user: newUser
                }
            }
        }

    } else {
        status = usersRes.status;
        error = usersRes.error
    }

    return {
        status,
        error,
        data
    }
}


export default Register;