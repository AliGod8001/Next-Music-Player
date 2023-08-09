"use client"
import { useState } from "react";

import useFormatSecond from "@/hooks/use-format-second";

const useAudioDuration = (audioSrc: string) => {
    const [durationSeconds, setDurationSeconds] = useState<number>(null)
    const formatedDuration = useFormatSecond(durationSeconds);

    const metadataLoadHandler = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audioElement = e.target as HTMLAudioElement;
        const { duration } = audioElement;
        setDurationSeconds(duration);
      };

    const output = (
        <audio onLoadedMetadata={metadataLoadHandler} style={{ display: "none" }}>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
    )

    return {
        output,
        durationSeconds,
        formatedDuration
    }
}

export default useAudioDuration;