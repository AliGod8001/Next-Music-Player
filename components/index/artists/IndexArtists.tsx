import MainCard from "@/components/ui/main-card/MainCard";
import IndexArtistItem from "./IndexArtistItem";

import styles from './IndexArtists.module.scss'

const IndexArtits = ({
    artists,
} : {
    artists: Artist[]
}) => {
    return (
        <MainCard 
            title="Top Artists" 
            link="/artists"
            text="See all"
        >
            <ul className={styles.list}>
                {
                    artists.map(artist => (
                        <IndexArtistItem key={artist.id} artistData={artist} />
                    ))
                }
            </ul>
        </MainCard>
    )
}

export default IndexArtits;