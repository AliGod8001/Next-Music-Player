import MusicList from "@/components/music/MusicList"

const Musics = ({
    musics
} : {
    musics: Music[]
}) => {
    return <MusicList musics={musics} playListId="musics-page-playlist" />
}

export default Musics