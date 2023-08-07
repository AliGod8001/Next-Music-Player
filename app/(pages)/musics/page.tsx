import Musics from "@/components/msuics/Musics";
import GetMusics from "@/services/server/musics/GetMusics";

export const metadata = {
    title: "Musics"
}

const MusicsPage = async () => {
    const musics : Music[] = await GetMusics()
    
    return <Musics musics={musics} />
}

export default MusicsPage;