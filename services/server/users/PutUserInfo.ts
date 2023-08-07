import GetUser from "./GetUser"
import PutUser from "./PutUser"
import UserNameCheck from "./UserNameCheck"

const PutUserInfo = async (userId: number, info: UserEditData) : Promise<ServiceResponse<User>> => {
    let status : number = 201
    let error  : string = ""
    let data   : User   = null

    const userRes = await GetUser(userId)

    if ( userRes.data ) {
        const user = userRes.data;

        user.birthDate    = info.birthDate    ? info.birthDate    : user.birthDate
        user.profileImage = info.profileImage ? info.profileImage : user.profileImage
        user.modificationDate = new Date().getTime()
        if ( info.oldpassword && info.newpassword ) {
            if ( info.oldpassword === user.password ) {
                user.password     = info.newpassword
            } else {
                status = 406
                error = "Your Password is wrong"
            }
        }

        if ( info.userName ) {
            const res = await UserNameCheck(info.userName, user.id)
            if ( res.status === 201 ) {
                user.userName = info.userName
            } else {
                status = 407
                error = "This user name has been taken already, please choose another one."
            }
        }

        const res = await PutUser(user)

        if ( res.data ) {
            data = user
        } else {
            status = res.status;
            error  = res.error 
        }
    } else {
        status = userRes.status;
        error = userRes.error
    }



    return {
        status,
        error,
        data
    }
}

export default PutUserInfo;