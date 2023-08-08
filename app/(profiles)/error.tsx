"use client"
import Error from "@/components/ui/error/Error";

const ProfilesGroupErrorPage = ({
    error,
    reset,
} : {
    error: Error,
    reset: () => void
}) => {
    return <Error reset={reset} />
}

export default ProfilesGroupErrorPage;