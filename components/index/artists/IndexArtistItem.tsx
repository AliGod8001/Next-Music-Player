import Link from 'next/link'
import Image from 'next/image'
import useNumber from '@/hooks/use-number'

import styles from './IndexArtistItem.module.scss'

const IndexArtistItem = ({
    artistData
} : {
    artistData: Artist
}) => {
    const totalPlayed = artistData.musics.reduce((arc, music) => {
        return arc + music.playedCount
    }, 0)
    const formatedTotalPlayed = useNumber(totalPlayed)

    return <li>
        <Link className={styles.artist} href="/">
            <Image
                className={styles.img}
                src={artistData.avatar}
                width={90}
                height={90}
                loading='lazy'
                alt={`${artistData.name} artist image`}
            />
            <h4 className={styles.title}>{artistData.name}</h4>
            <span className={styles.text}>{formatedTotalPlayed}</span>
        </Link>
    </li>
}

export default IndexArtistItem;