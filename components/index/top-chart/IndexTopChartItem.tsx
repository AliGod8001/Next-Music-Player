import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useAppStore } from "@/store/app-store"

import useFormatSecond from "@/hooks/use-format-second"
import FavoriteProvider from "@/providers/FavoriteProvider"

import Icon from "@/components/ui/Icon"

import styles from './IndexTopChartItem.module.scss'
import React from "react"

const IndexTopChartItem = ({
    musicData,
    index,
    onMusicClick,
} : {
    musicData: Music,
    index: number,
    onMusicClick: (music: Music) => void,
}) => {
    const [music, isPlaying, setIsPlaying] = useAppStore(state => [state.currentMusic, state.isPlaying, state.setPlayingState])

    const [duratoinSeconds, setDurationSeconds] = useState<number>(null)
    const formatedDuration = useFormatSecond(duratoinSeconds)
    const number = index < 10 ? `0${index}` : `${index}`
    const currentMusic = music && music.id === musicData.id

    const metadataLoadHandler = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audioElement = e.target as HTMLAudioElement;
        const { duration } = audioElement;
        setDurationSeconds(duration)
    }

    const musicPlayClickHandler = () => {
        if ( currentMusic ) {
            if ( isPlaying ) {
                setIsPlaying(false)
            } else {
                setIsPlaying(true)
            }
        } else {
            onMusicClick(musicData)
        }
    }

    return (
        <li> 
            <div className={styles.link}>
                <audio className={styles.audio} onLoadedMetadata={metadataLoadHandler}>
                    <source src={musicData.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <span className={styles.number}>{number}</span>
                <Image
                    className={styles.img}
                    src={musicData.avatar}
                    width={90}
                    height={70}
                    loading="lazy"
                    alt={`${musicData.name} music cover image`}
                />

                <Link href="/">
                    <h5 className={styles.title}>{musicData.name}</h5>
                    <h6 className={styles.text}>{musicData.artist}</h6>
                </Link>

                <span className={styles.time}>{duratoinSeconds ? `${formatedDuration} '` : "00:00 '"}</span>
                <button className={`btn ${styles.button} ${styles.play} ${currentMusic ? styles.active : ""}`} onClick={musicPlayClickHandler}>
                    <Icon icon={currentMusic && isPlaying ? "pause-fill" : "play"} />
                </button>

                <FavoriteProvider className={`btn ${styles.button} ${styles.favorite}`} musicId={musicData.id} activeClass={styles.active}></FavoriteProvider>
                
            </div>
        </li>
    )
}

export default IndexTopChartItem