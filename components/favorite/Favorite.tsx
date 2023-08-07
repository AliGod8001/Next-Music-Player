"use client"
import { useUserStore } from "@/store/user-store";


import NotFound from "../ui/not-found/NotFound";
import MusicList from "../music/MusicList";

const Favorite = () => {
    const favorites = useUserStore(state => state.favorite)

    return (
        <>
            {
                favorites.length 
                ? <MusicList musics={favorites} playListId="favorites-musics-playlist" />
                : <NotFound>Favorite Music</NotFound>
            }
        </>
    )
}

export default Favorite;