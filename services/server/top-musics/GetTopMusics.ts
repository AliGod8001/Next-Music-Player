const GetTopMusics = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_TOP_MUSICS_API);

    const data : Music[] = await res.json()

    return data;
}

export default GetTopMusics;