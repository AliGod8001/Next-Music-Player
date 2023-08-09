"use client"
import Error from "@/components/ui/error/Error";

const MusicsPageError = ({
    error,
    reset
} : {
    error: Error,
    reset: () => void,
}) => {
    return <Error reset={reset} />
}

export default MusicsPageError;