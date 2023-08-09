const useFormatSecond = (totalSeconds: number) => {
    const seconds: number = Math.ceil(totalSeconds)
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const secondsFormatted = secondsRemaining < 10 ? `0${Math.round(secondsRemaining)}` : `${Math.round(secondsRemaining)}`;

    return `${minutes}:${secondsFormatted}`;
};

export default useFormatSecond