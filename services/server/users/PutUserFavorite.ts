import GetUser from "./GetUser"
import PutUser from "./PutUser";

const PutUserFavorite = async (userId: number, music: Music) : Promise<ServiceResponse<Music[]>> => {
    let status : number = 201;
    let error : string = ""
    let data : Music[];

    const userRes = await GetUser(userId)

    if ( userRes.data ) {
        const user = userRes.data

        const favoriteMusics = user.favorite
        const musicIndex = favoriteMusics.findIndex(fav => fav.id === music.id)
        let newFavorites : Music[] = []

        if ( musicIndex >= 0 ) {
            newFavorites = favoriteMusics.filter(fav => fav.id !== music.id)
        } else {
            newFavorites = [music, ...favoriteMusics]
        }

        user.favorite = newFavorites
        user.modificationDate = new Date().getTime()

        const res = await PutUser(user);

        if ( res.data ) {
            data = user.favorite;
        } else {
            status = res.status;
            error = res.error
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

export default PutUserFavorite;