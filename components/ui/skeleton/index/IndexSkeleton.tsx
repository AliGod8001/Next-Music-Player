"use client"
import { Skeleton } from 'antd';

import IndexArtistSkeleton from './IndexArtistSkeleton';
import MainCard from '../../main-card/MainCard';

import styles from './IndexSkeleton.module.scss'

const IndexSkeleton = () => {
    return (
        <div className={styles.wrapper}>            
            <div className={styles.top}>
                <Skeleton.Image active className={styles.img} />
                <div className={styles.body}>
                    <Skeleton 
                        active 
                        title={{ width: 150, className: styles.title}}
                        paragraph={{ rows: 0 }} />
                    <Skeleton
                        active
                        title={{ width: 350, className: styles.name}}
                        paragraph={{ rows: 0 }}/>
                    <Skeleton
                        active
                        title={{ width: 150 }}
                        paragraph={{ rows: 0 }}/>
                    <div className={styles.action}>
                        <Skeleton.Button active className={styles.round} size='large' />
                        <Skeleton.Button active className={styles.circle} size='default'/>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <MainCard loading className={styles.card} template={(
                    <>
                        <Skeleton 
                            active 
                            title={{ width: 100 }} 
                            paragraph={{ rows: 0 }} />
                        <Skeleton 
                            active 
                            title={{ width: 50, style: { marginLeft: "auto" } }} 
                            paragraph={{ rows: 0 }} />
                    </>
                )}>
                    <IndexArtistSkeleton />
                </MainCard>
            </div>
        </div>
    )
}

export default IndexSkeleton;