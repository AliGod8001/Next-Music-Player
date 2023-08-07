import Image from 'next/image';
import React from 'react';

import { notFoundImage } from '@/public/images';

import styles from './NotFound.module.scss'

const NotFound = ({
    children
} : {
    children: React.ReactNode
}) => {
    return <div className={styles['not-found']}>
        <Image
            className={`${styles.img} dark-image`}
            src={notFoundImage}
            width={90}
            height={90}
            loading='lazy'
            alt='not found image'
        />
        <span className={styles.title}>{`" ${children} "`}</span>
        <span className={styles.text}>Not Found.</span>
    </div>
}

export default NotFound;