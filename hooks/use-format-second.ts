const useFormatSecond = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secondsRemaining = totalSeconds % 60;
    const secondsFormatted = secondsRemaining < 10 ? `0${Math.round(secondsRemaining)}` : `${Math.round(secondsRemaining)}`;

    return `${minutes}:${secondsFormatted}`;
};

export default useFormatSecond