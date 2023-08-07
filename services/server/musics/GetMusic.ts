const GetMusic = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MUSICS_API}/${id}`)

    const data : Music = await res.json()

    return data;
}

export default GetMusic;