import GetUser from "./GetUser";
import PutUser from "./PutUser";

const PutUserPlayList = async (userId: number, playList: PlayList) : Promise<ServiceResponse<PlayList[]>> => {
    let status : number = 201;
    let error : string = ""
    let data : PlayList[];

    const userRes = await GetUser(userId)

    if ( userRes.data ) {
        const user = userRes.data

        if ( user.playLists.length && !user.playLists.findIndex(pl => pl.title === playList.title ) ) {
            status = 502
            error = "You already have this playlist."
            data = user.playLists
            
        } else {
            const newPlayList = [playList, ...user.playLists]
            user.playLists = newPlayList
            user.modificationDate = new Date().getTime()
    
            const res = await PutUser(user)

            if ( res.data ) {
                data = newPlayList
            } else {
                status = 501
                error = "Faild to add playlist"
            }
        }


    } else {
        status = 404,
        error = "User not found"
    }

    return {
        status,
        error,
        data
    }
}

export default PutUserPlayList