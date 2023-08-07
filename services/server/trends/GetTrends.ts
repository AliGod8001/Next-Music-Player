const GetTrends = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_TRENDS_API)

    const data : Music[] = await res.json()

    return data;
}

export default GetTrends;