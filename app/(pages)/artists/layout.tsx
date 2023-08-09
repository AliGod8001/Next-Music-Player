import MainCard from "@/components/ui/main-card/MainCard";
import React from "react";

const ArtistsPageLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return <MainCard title="All Artist Musics.">{children}</MainCard>
}

export default ArtistsPageLayout;