import MainCard from "@/components/ui/main-card/MainCard";
import React from "react";

const MusicsPageLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return <MainCard title="All Musics">{children}</MainCard>
}

export default MusicsPageLayout;