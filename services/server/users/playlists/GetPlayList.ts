import GetPlayLists from "./GetPlayLists";

const GetPlayList = async (userId: number, playlistId: number) : Promise<ServiceResponse<PlayList>> => {
    let status: number = 201
    let error: string = ""
    let data: PlayList;
    const res = await GetPlayLists(userId)

    if ( res.data ) {
        const playlists = res.data
        const playlistIndex = playlists.findIndex(playlist => playlist.id === playlistId)

        if ( playlistIndex !== -1 ) {
            data = playlists[playlistIndex]
        } else {
            status = 404;
            error = "Playlist Not Found."
        }
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

export default GetPlayList;