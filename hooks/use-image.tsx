"use client"
import { useState } from "react";

import useReadFile from "./use-read-file";

const useImage = ({
    maxSize,
    prefix,
    inputId,
    errorClass,
} : {
    maxSize: number,
    prefix: FilePrefix,
    inputId: string,
    errorClass: string,
}) => {
    // const [error, setError] = useState<string>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<string>(null);
    const [file, setFile] = useState<File>(null)
    const { status, statusText, promise } = useReadFile(file, maxSize, prefix);

    if ( promise ) {
        promise.then((fileContent: string) => {
            setImage(fileContent)
            setLoading(false)
        });
    }

    if ( !promise && status !== 201 && loading ) {
        setLoading(false)
    }

    const fileInputChangeHandler = (ev) => {
        setLoading(true)
        const files = [...ev.currentTarget.files].map((file) => {
            if (!file) return;
            setFile(file)
        });
    };

    const reset = () => {
        setImage(null)
        setFile(null)
    }

    // const setErrorHandler = (value: string) => {
    //     setError(value)
    // }

    const output = (
        <>
            <input
                style={{ display: "none" }}
                hidden
                name={inputId}
                id={inputId}
                type="file"
                accept="image/*"
                onChange={fileInputChangeHandler}
            />
            { status === 501 && <span className={errorClass}>{statusText}</span>}
        </>
    )

    return { image, reset, status, statusText, output, loading }
}

export default useImage;