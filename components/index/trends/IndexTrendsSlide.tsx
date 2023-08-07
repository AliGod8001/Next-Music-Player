import Image from 'next/image'

import FavoriteProvider from '@/components/providers/FavoriteProvider'
import useNumber from '@/hooks/use-number'
import MainButton from '@/components/ui/button/MainButton'

import styles from './IndexTrendsSlide.module.scss'

const IndexTrendsSlide = ({
    trendInfo,
    onMusicClick,
    music,
} : {
    trendInfo: Music,
    onMusicClick: (music: Music) => void,
    music: Music,
}) => {
    const convertedPlayedCount = useNumber(trendInfo.playedCount)

    const musicClickHandler = () => {
        onMusicClick(trendInfo)
    }

    return <div className={styles.slide}>
        <Image 
            className={styles.img}
            src={trendInfo.coverImage}
            width={1920}
            height={1080}
            loading='eager'
            alt={`${trendInfo.name} music cover image`}
        />
        <div className={styles.body}>
            <span className={styles.title}>Trending New Hits</span>
            <span className={styles.name}>{trendInfo.name}</span>
            <div className={styles.wrapper}>
                <span className={styles.artist}>{trendInfo.artist}</span>
                <span className={styles.played}>{convertedPlayedCount}</span>
            </div>
            <div className={styles.action}>
                {
                    music && music.id === trendInfo.id 
                    ? <MainButton type='primary' round>Listening...</MainButton>
                    : <MainButton type='primary' round onClick={musicClickHandler}>Listen Now</MainButton>
                }
                <FavoriteProvider className={styles.favorite} musicId={trendInfo.id} activeClass={styles.active}></FavoriteProvider>
                
            </div>
        </div>
    </div>
}

export default IndexTrendsSlide;