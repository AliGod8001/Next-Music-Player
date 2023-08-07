const GetArtists = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_ARTISTS_API)

    const data : Artist[] = await res.json()

    return data
}

export default GetArtists;