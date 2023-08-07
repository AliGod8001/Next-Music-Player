import GetTopArtists from "@/services/server/top-artists/GetTopArtists"
import GetTopMusics from "@/services/server/top-musics/GetTopMusics"
import GetTrends from "@/services/server/trends/GetTrends"

import Index from "@/components/index/Index"

const HomePage = async () => {
    const trends = await GetTrends()
    const topArtists = await GetTopArtists()
    const topMusic = await GetTopMusics()

    return <Index trends={trends} topArtists={topArtists} topMusics={topMusic} />
}

export default HomePage;