import MainCard from "@/components/ui/main-card/MainCard"

const PlayListPageLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return <MainCard title="Your Lovely Playlist" text="Back" link="/playlists">{children}</MainCard>
}

export default PlayListPageLayout;