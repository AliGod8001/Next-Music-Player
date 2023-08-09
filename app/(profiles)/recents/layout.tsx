import MainCard from "@/components/ui/main-card/MainCard";
import React from "react";

const RecentsPageLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return <MainCard title="Your recents played musics.">{children}</MainCard>
}

export default RecentsPageLayout;