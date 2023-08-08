"use client"
import { useUserStore } from "@/store/user-store";

const PlayListDetail = ({
    playlistId
} : {
    playlistId: string
}) => {
    console.log(playlistId)
    const playlists = useUserStore(state => state.playLists)
    const playlist = playlists.find(playlist => playlist.id === Number(playlistId))

    return <div>
        <h1>{playlist.title}</h1>
        <span>{playlist.color}</span>
        <ul>{playlist.musics.map(music => <li key={music.id}>{music.name} {music.artist}</li>)}</ul>
    </div>
}

export default PlayListDetail;