import Image from 'next/image'

import FavoriteProvider from '@/components/providers/FavoriteProvider'
import AddToPlayList from '../helper/AddToPlayList'
import useNumber from '@/hooks/use-number'

import styles from './MusicItem.module.scss'

const MusicItem = ({
    musicData,
    onMusicClick,
} : {
    musicData: Music
    onMusicClick: (music: Music) => void,
}) => {
    const formatedNumber = useNumber(musicData.playedCount)

    const musicClickHandler = () => {
        onMusicClick(musicData)
    }

    return <li className={styles.item}>
        <div className={styles.fixed}>
            <FavoriteProvider musicId={musicData.id} className={styles.btn} />
            <AddToPlayList musicId={musicData.id} className={`${styles.btn} ${styles.playlist}`} />
        </div>
        <div onClick={musicClickHandler}>
            <Image
                className={styles.img}
                src={musicData.avatar}
                width={160}
                height={160}
                loading='lazy'
                alt={`${musicData.name} cover image`}
            />
            <h5 className={styles.title}>{musicData.name}</h5>
            <span className={styles.text}>{musicData.artist}, <small>{formatedNumber}</small></span>
        </div>
    </li>
}

export default MusicItem;