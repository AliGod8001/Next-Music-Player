const GetMusic = async (id: number) : Promise<ServiceResponse<Music>> => {
    let status : number = 201;
    let error : string = "";
    let data : Music;

    const res = await fetch(`${process.env.NEXT_PUBLIC_MUSICS_API}/${id}`)

    if ( res.ok ) {
        data = await res.json()
    } else {
        status = res.status;
        error = res.statusText
    }

    return {
        status,
        error,
        data
    };
}

export default GetMusic;