import Image from "next/image"

import { artistsBackgroundImage } from "@/public/images"

import styles from './layout.module.scss'

const PagesGroupLayout = ({
    children,
} : {
    children: React.ReactNode
}) => {
    return (
        <div>
            <div className={styles.img}>
                <Image
                    src={artistsBackgroundImage}
                    width={1920}
                    height={1080}
                    loading="eager"
                    alt="profile page background image"
                />
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    )
}

export default PagesGroupLayout;