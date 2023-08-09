import MainCard from "@/components/ui/main-card/MainCard";
import React from "react";

const FavoritesPageLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return <MainCard title="Your favorite musics.">{children}</MainCard>
}

export default FavoritesPageLayout;