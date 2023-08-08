import GetUser from "../GetUser";

const GetPlayLists = async (userId: number) : Promise<ServiceResponse<PlayList[]>> => {
    let status: number = 201
    let error: string = ""
    let data: PlayList[];
    const res = await GetUser(userId)

    if ( res.data ) {
        data = res.data.playLists        
    } else {
        status = res.status;
        error = res.error
    }


    return {
        status,
        error,
        data
    }
}

export default GetPlayLists;