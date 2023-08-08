import GetUser from "../GetUser";
import PutUser from "../PutUser";

const PutPlayListMusicOrder = async (userId: number, playlistId: number, musics: Music[]) : Promise<ServiceResponse<PlayList[]>> => {
    let status: number = 201;
    let error: string = "";
    let data: PlayList[];
    const userRes = await GetUser(userId);

    if ( userRes.data ) {
        const user = userRes.data
        const playlistIndex = user.playLists.findIndex(playlist => playlist.id === playlistId)

        if ( playlistIndex !== -1 ) {
            const playlist = user.playLists[playlistIndex]
            playlist.musics = musics
            
            user.playLists[playlistIndex] = playlist
            user.modificationDate = new Date().getTime()

            const res = await PutUser(user)

            if ( res.data ) {
                data = user.playLists
            } else {
                status = res.status;
                error = res.error;
            }

        } else {
            status = 404;
            error = "Playlist Not Found."
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

export default PutPlayListMusicOrder;