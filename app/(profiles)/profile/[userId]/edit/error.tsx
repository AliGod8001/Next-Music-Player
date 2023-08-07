"use client"
import Error from "@/components/ui/error/Error"

const ProfileEditPageError = ({
    error,
    reset
} : {
    error: Error,
    reset: () => {}
}) => {
    return <Error reset={reset} />
}

export default ProfileEditPageError;