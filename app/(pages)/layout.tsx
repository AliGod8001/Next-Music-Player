"use client"
import Image from "next/image"
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import MainCard from "@/components/ui/main-card/MainCard";
import { artistsBackgroundImage } from "@/public/images"

import styles from './layout.module.scss'

const PagesGroupLayout = ({
    children,
} : {
    children: React.ReactNode
}) => {
    const [title, setTitle] = useState<string>("All Musics.")
    const path = usePathname()

    useEffect(() => {
        const action : string = path.split('/').at(-1)
        switch (action) {
            case "artists":
                setTitle(null)
                break;
            
            default:
                setTitle("All Musics.")
                break;
        }
    }, [path])
    
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
            <div className={styles.content}>
                <MainCard title={title} className={styles.card}>{children}</MainCard>
            </div>
        </div>
    )
}

export default PagesGroupLayout;