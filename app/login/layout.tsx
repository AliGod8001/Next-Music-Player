import Image, { StaticImageData } from 'next/image';
import React from 'react';

import MainCard from '@/components/ui/main-card/MainCard';
import { loginBackgroundImage } from '@/public/images'

import styles from './layout.module.scss'

const LoginPageLayout = ({
    children,
} : {
    children: React.ReactNode,
}) => {
    return (
        <div>
            <div className={styles.img}>
                <Image
                    src={loginBackgroundImage}
                    width={1920}
                    height={1080}
                    loading='eager'
                    alt="login page image"
                />
            </div>
            <div className={styles.content}>
                <div className={styles.wrapper}>
                    <MainCard className={styles.card}>{children}</MainCard>
                </div>
            </div>
        </div>
    )
}

export default LoginPageLayout;