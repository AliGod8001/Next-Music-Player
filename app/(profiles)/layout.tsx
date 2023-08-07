"use client"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth-store";
import MainCard from "@/components/ui/main-card/MainCard";
import { profileBackgroundImage } from "@/public/images"

import styles from './layout.module.scss'

const ProfilesGroupLayout = ({
    children,
} : {
    children: React.ReactNode
}) => {
    const [title, setTitle] = useState<string>("Your Profile Account.")
    const path = usePathname()
    const router = useRouter()
    const token = useAuthStore(state => state.token)

    useEffect(() => {
        if ( !token ) {
            router.push(`/login?returnUrl=${path.replaceAll("/", "%2F")}`)
        }

        const action : string = path.split('/').at(-1)
        switch (action) {
            case "favorites":
                setTitle("Your Favorite Musics")
                break;

            case "recents":
                setTitle("Your Recnets Played Musics")
                break;

            case "playlists":
                setTitle("Your Lovely Playlists")
                break;
            default:
                setTitle("Your Profile Account.")
                break;
        }
    }, [token, path, router])
    
    return (
        <div>
            <div className={styles.img}>
                <Image
                    src={profileBackgroundImage}
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

export default ProfilesGroupLayout;