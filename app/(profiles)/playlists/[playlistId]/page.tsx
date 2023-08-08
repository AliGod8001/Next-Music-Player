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
    return <h1>{params.playlistId}</h1>
}


export default PlayListDetailPage;