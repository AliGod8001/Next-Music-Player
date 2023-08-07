import MusicList from "../music/MusicList"

const Artists = ({
    artists
} : {
    artists: Artist[]
}) => {
    return <section>
        {
            artists.map(artist => (
                <MusicList key={artist.id} name={artist.name} musics={artist.musics} playListId={`${artist.name}-musics-playlist`} />
            ))
        }
    </section>
}

export default Artists