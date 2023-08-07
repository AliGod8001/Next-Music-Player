"use client"
import { useState, useCallback } from "react"

const useFetch = <T>() => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const sendRequest = useCallback(async (config: RequestConfig, applyData: (data: T) => void) => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch(
            config.url,
            config.data
          );
    
          if (!response.ok) {
            throw new Error("Request failed!");
          }
    
          const data : T = await response.json();
    
          applyData(data)
        } catch (err) {
          setError(err.message || "Something went wrong!");
        }
        setLoading(false);
    },[]);

    return {
        loading,
        error,
        sendRequest
    }
}

export default useFetch;