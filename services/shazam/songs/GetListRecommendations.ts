const GetListRecommendations = async (key: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SHAZAM_URL}/songs/list-recommendations?key=${key}&locale=en-US`, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_SHAZAM_APIKEY,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_SHAZAM_HOST
        }
    })

    return await res.json()
}

export default GetListRecommendations;