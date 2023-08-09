"use client"
import { usePathname } from "next/navigation"

import MainCard from "@/components/ui/main-card/MainCard"

const PlayListPageLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    const path = usePathname()
    const action = path.split('/').at(-1)

    const mainCardProps = {
        ...(action !== "playlists" && {text: "Back", link: "/playlists"})
    }

    return <MainCard title="Your Lovely Playlist" {...mainCardProps}>{children}</MainCard>
}

export default PlayListPageLayout;