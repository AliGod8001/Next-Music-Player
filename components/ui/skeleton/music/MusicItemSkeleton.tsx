"use client"
import { Skeleton } from "antd";

import styles from './MusicItemSkeleton.module.scss'

const MusicItemSkeleton = () => {
    return (
        <div className={styles.wrapper}>
            {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((skelton, index) => (
                    <div className={styles.card} key={`music-item-skelton${index}`}>
                        <Skeleton.Image active className={styles.img} />
                        <Skeleton active paragraph={{ rows: 1 }} className={styles.title} />
                        <Skeleton active paragraph={{ rows: 1 }} className={styles.text} />
                    </div>
                ))
            }
        </div>
    )
}

export default MusicItemSkeleton;