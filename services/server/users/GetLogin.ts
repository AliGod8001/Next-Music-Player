import GetUsers from "./GetUsers"
import { generateUUID } from "./uuid"

const GetLogin = async (payload: LoginPayload) : Promise<ServiceResponse<LoginResponseData>> => {
    let status : number = 201;
    let error : string = "";
    let data : LoginResponseData;

    const usersRes = await GetUsers()

    if ( usersRes.data ) {
        const users = usersRes.data
        const user : User = users.find(user => user.email === payload.email)

        if ( !user ) {
            error = "User Not Found..."
            status = 404
        } else if ( user.password !== payload.password ) {
            error = "Password is wrong"
            status = 404
        } else {
            data = {
                token: generateUUID(),
                user: user
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


export default GetLogin;