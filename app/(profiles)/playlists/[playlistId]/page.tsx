import PlayListDetail from "@/components/playlist-detail/PlayListDetail"

export const metadata = {
    title: "Your Playlist"
} 

const PlayListDetailPage = ({
    params,
} : {
    params: {
        playlistId: string
    }
}) => {
    return <PlayListDetail playlistId={params.playlistId} />
}


export default PlayListDetailPage;