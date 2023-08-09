import MainCard from "@/components/ui/main-card/MainCard";
import React from "react";

const ProfilePageLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return <MainCard title="Your profile account." link="/profile" text="Back">{children}</MainCard>
}

export default ProfilePageLayout;