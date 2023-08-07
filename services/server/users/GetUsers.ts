const GetUsers = async () : Promise<ServiceResponse<User[]>> => {
    let status : number = 201;
    let error : string = ""
    let data : User[];

    const res = await fetch(process.env.NEXT_PUBLIC_USERS_API)

    if ( res.ok ) {
        data = await res.json()
    } else {
        status = res.status;
        error = res.statusText;
    }

    return {
        status,
        error,
        data
    };
}

export default GetUsers;