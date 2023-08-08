"use client"
import Image from 'next/image'
import { useState } from 'react'

import useFormatSecond from '@/hooks/use-format-second'

import styles from './PlayListDetailMusicItem.module.scss'

const PlayListDetailMusicItem = ({
    musicData,
    isDragging,
} : {
    musicData: Music,
    isDragging: boolean
}) => {
    const [duratoinSeconds, setDurationSeconds] = useState<number>(null)
    const formatedDuration = useFormatSecond(duratoinSeconds)

    const metadataLoadHandler = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audioElement = e.target as HTMLAudioElement;
        const { duration } = audioElement;
        setDurationSeconds(duration)
    }
    return <li className={`${styles.item} ${isDragging ? styles.dragging : ""}`}>
        <audio className={styles.audio} onLoadedMetadata={metadataLoadHandler}>
            <source src={musicData.src} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        <Image
            className={styles.img}
            width={70}
            height={70}
            loading='lazy'
            src={musicData.avatar}
            alt={`${musicData.name} image`}
        />
        <div>
            <div className={styles.title}>{musicData.name}</div>
            <div className={styles.text}>{musicData.artist}</div>
        </div>

    </li>
}

export default PlayListDetailMusicItem;