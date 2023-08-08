const formatPlaylistTitle = (title: string) : string => {
    return `${title.split(" ")[0][0].toUpperCase()}${title
        .split(" ")
        .at(-1)[0]
        .toUpperCase()}`;
}

export default formatPlaylistTitle;