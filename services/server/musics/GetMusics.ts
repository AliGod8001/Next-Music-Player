const GetMusics = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_MUSICS_API)

    const data : Music[] = await res.json()

    return data
}

export default GetMusics;