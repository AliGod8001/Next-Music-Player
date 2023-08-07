const GetInfos = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DEEZER_URL}/infos`, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_SHAZAM_APIKEY,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_SHAZAM_HOST
        }
    })

    return res.json()
}

export default GetInfos;