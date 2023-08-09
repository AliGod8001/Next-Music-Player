"use client"
import PlayListSkeletonItem from './PlayListSkeletonItem'
import styles from './PlayListSkeleton.module.scss'

const PlayListSkeleton = () => {
    return <div className={styles.wrapper}>
        {
            [0, 1, 2, 3, 4].map(item => <PlayListSkeletonItem key={item} />)
        }
    </div>
}

export default PlayListSkeleton;