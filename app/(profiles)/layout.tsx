"use client"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";
import { profileBackgroundImage } from "@/public/images"

import styles from './layout.module.scss'

const ProfilesGroupLayout = ({
    children,
} : {
    children: React.ReactNode
}) => {
    const path = usePathname()
    const router = useRouter()
    const token = useAuthStore(state => state.token)

    useEffect(() => {
        if ( !token ) {
            router.push(`/login?returnUrl=${path.replaceAll("/", "%2F")}`)
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
            <div className={styles.content}>{children}</div>
        </div>
    )
}

export default ProfilesGroupLayout;