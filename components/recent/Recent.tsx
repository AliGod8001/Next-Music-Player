"use client"
import { useUserStore } from "@/store/user-store"

import MusicList from "../music/MusicList";
import NotFound from "../ui/not-found/NotFound";

const Recent = () => {
    const recents = useUserStore(state => state.recent)

    return (
        <>
            {
                recents.length 
                ? <MusicList musics={recents} playListId="recent-musics-playlist" />
                : <NotFound>Recent Music</NotFound>
            }
        </>
    )
}

export default Recent;