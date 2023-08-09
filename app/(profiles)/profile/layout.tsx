"use client"
import { usePathname } from "next/navigation";
import React from "react";

import MainCard from "@/components/ui/main-card/MainCard";

const ProfilePageLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    const path = usePathname()
    const action = path.split('/').at(-1)

    const mainCardProps = {
        ...(action !== "profile" && {text: "Back", link: "/profile"})
    }
    return <MainCard title="Your profile account." {...mainCardProps}>{children}</MainCard>
}

export default ProfilePageLayout;