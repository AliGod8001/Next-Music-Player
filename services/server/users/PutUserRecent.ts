import GetUser from "./GetUser"
import PutUser from "./PutUser"

const PutUserRecent = async (userId: number, music: Music) : Promise<ServiceResponse<Music[]>> => {
    let status : number = 201;
    let error : string = "";
    let data : Music[];
    const userRes = await GetUser(userId)

    if ( userRes.data ) {
        const user = userRes.data

        let recents = [music, ...user.recent.slice(0, user.recent.length > 19 ? 19 : user.recent.length)]
        user.recent = recents
        user.modificationDate = new Date().getTime()

        const res = await PutUser(user)

        if ( res.data ) {
            data = user.recent
        } else {
            status = res.status;
            error = res.error
        }


    } else {
        status = 404;
        error = "User NotFound."
    }


    return {
        status,
        error,
        data
    }
}

export default PutUserRecent;