import Artists from "@/components/artists/Artists"
import GetArtists from "@/services/server/artist/GetArtists"

export const metadata = {
    title: "Artists"
}

const ArtistsPage = async () => {
    const artists = await GetArtists()

    return <Artists artists={artists} />
}

export default ArtistsPage