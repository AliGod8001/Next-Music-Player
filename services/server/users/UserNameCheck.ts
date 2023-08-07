import GetUsers from "./GetUsers"

const UserNameCheck = async (userName: string, userId: number) : Promise<ServiceResponse<string>> => {
    let status : number = 201
    let error  : string = ""
    let data   : string = null

    const usersRes = await GetUsers()

    if ( usersRes.data ) {
        let users : User[] = usersRes.data
        users = users.filter(user => user.id !== userId)
    
        const userNameFound = users.findIndex(user => user.userName === userName)
    
        if ( userNameFound !== -1 ) {
            status = 202
            error = "User Name Has Been Found, Please Pick Another one."
        } else {
            data = "Success"
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

export default UserNameCheck;