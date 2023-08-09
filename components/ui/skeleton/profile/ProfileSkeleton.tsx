"use client"
import { Skeleton } from "antd";

import styles from './ProfileSkeleton.module.scss'

const ProfileSkeleton = () => {
    return <div className={styles.wrapper}>
        <div className={styles.card}>
            <div className={styles.header}>
                <Skeleton.Avatar active shape="circle" size={70} />
                <div>
                    <Skeleton active title={{ width: 200, style: { marginBottom: -10 } }} paragraph={{ rows: 0 }} />
                    <Skeleton active title={{ width: 120, style: { margin: 0 } }} paragraph={{ rows: 0 }} />
                </div>
            </div>
            {
                [0, 1, 2].map(item => (
                    <div className={styles.header} key={item} style={{ marginBottom: 5 }}>
                        <Skeleton title={{ width: 90, style: { margin: 0 } }} paragraph={{ rows: 0 }} style={{ width: "auto" }}/>
                        <Skeleton title={{ width: 120, style: { margin: 0 } }} paragraph={{ rows: 0 }}/>
                    </div>
                ))
            }
        </div>
        <div className={styles.card}>
            {
                [0, 1, 2, 3, 4].map(item => (
                    <div className={styles.header} key={item} style={{ marginBottom: 10 }}>
                        <Skeleton title={{ width: 135, style: { margin: 0 } }} paragraph={{ rows: 0 }} style={{ width: "auto" }}/>
                        <Skeleton title={{ width: 120, style: { margin: 0 } }} paragraph={{ rows: 0 }}/>
                    </div>
                ))
            }
        </div>
    </div>
}

export default ProfileSkeleton;