import GetUser from "./GetUser";

const DeleteUserPlayList = async (userId: number, playlistId: number) : Promise<ServiceResponse<PlayList[]>> => {
    let status : number = 201
    let error : string = ""
    let data : PlayList[];

    const userRes = await GetUser(userId)

    if ( userRes.data ) {
        const user = userRes.data
        const playlistIndex = user.playLists.findIndex(playlist => playlist.id === playlistId)

        if ( playlistIndex !== -1 ) {
            const newPlaylist = user.playLists.filter(playlist => playlist.id !== playlistId)
            user.playLists = newPlaylist

            const res = await fetch(`${process.env.NEXT_PUBLIC_USERS_API}/${userId}`, {
                method: "PUT",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type" : "application/json"
                }
            })

            if ( res.ok ) {
                data = newPlaylist

            } else {
                status = res.status
                if ( process.env.NODE_ENV === "development" ) {
                    error = res.statusText
                } else if ( process.env.NODE_ENV === "production" ) {
                    error = "Faild to delete playlist"
                }
            }
        } else {
            status = 404;
            error = "Playlist not found"
        }

    } else {
        status = 404;
        error = "User not found"
    }


    return {
        status,
        error,
        data
    }
}

export default DeleteUserPlayList;