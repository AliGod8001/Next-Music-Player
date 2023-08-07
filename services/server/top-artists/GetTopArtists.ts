const GetTopArtists = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_TOP_ARTISTS_API)

    const data : Artist[] = await res.json()

    return data;
}

export default GetTopArtists;