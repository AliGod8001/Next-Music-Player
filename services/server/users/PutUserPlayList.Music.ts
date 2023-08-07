import GetUser from "./GetUser";
import PutUser from "./PutUser";

const PutUserPlayListMusic = async (
  userId: number,
  playListId: number,
  music: Music,
  type: ChangePlayListMusicType
) : Promise<ServiceResponse<PlayList[]>> => {
    let status : number = 201;
    let error : string = ""
    let data : PlayList[];
    const userRes = await GetUser(userId)

    if ( userRes.data ) {
        const user = userRes.data
        const playlists = user.playLists
        const playListIndex = playlists.findIndex(pl => pl.id === playListId)

        if ( playListId !== -1 ) {
            const playlist = playlists[playListIndex]

            if ( type === "add" ) {
                playlist.musics = [music, ...playlist.musics]
            } else {
                playlist.musics = playlist.musics.filter(mc => mc.id !== music.id)
            }
            playlists[playListIndex] = playlist;
            user.modificationDate = new Date().getTime()

            const res = await PutUser(user)

            if ( res.data ) {
                data = playlists
            } else {
                status = res.status;
                error = res.error;
            }
        } else {
            status = 404;
            error = "PlayList Not Found."
        }
    } else {

    }

    return {
        status,
        error,
        data
    }
};

export default PutUserPlayListMusic;
