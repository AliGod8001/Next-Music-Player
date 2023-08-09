import { Skeleton } from "antd";

import styles from './IndexArtistSkeleton.module.scss'

const IndexArtistSkeleton = () => {
    const skeltons = new Array(6).fill(5)
    return (
        <div className={styles.list}>
            {
                skeltons.map((sklton, index) => (
                    <div className={styles.item} key={`index-top-artists-${index}`}>
                        <Skeleton.Image active className={styles.img} />
                        <Skeleton active title={{ width: "65%", className: styles.title }} paragraph={{ rows: 0 }} />
                        <Skeleton active title={{ width: "50%", className: styles.title, style: { marginTop: "-20px"} }} paragraph={{ rows: 0 }} />
                    </div>
                ))
            }
        </div>
    )
}

export default IndexArtistSkeleton;