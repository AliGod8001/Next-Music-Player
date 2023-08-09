import { Skeleton } from 'antd'

import styles from './PlayListSkeletonItem.module.scss'

const PlayListSkeletonItem = () => {
    return <div className={styles.item}>
        <Skeleton title={{ width: 20, style: { margin: 0 } }} className={styles.title} paragraph={{ rows: 0 }} />
        <Skeleton.Image className={styles.img} active />
        <div>
            <Skeleton title={{ width: 200, style: { margin: 0, marginBottom: -6 } }} paragraph={{ rows: 0 }} />
            <Skeleton title={{ width: 150, style: { margin: 0 } }} paragraph={{ rows: 0 }} />
        </div>

        <div className={styles.box}>
            <Skeleton title={{ width: 100, style: { margin: 0 } }} className={styles.text} paragraph={{ rows: 0 }} />
            <Skeleton.Button className={styles.button} />
            <Skeleton.Button className={styles.button} />
        </div>
    </div>
}

export default PlayListSkeletonItem