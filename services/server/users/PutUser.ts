const PutUser = async (user: User) : Promise<ServiceResponse<string>> => {
    let status : number = 201
    let error : string = "";
    let data : string;

    const res = await fetch(`${process.env.NEXT_PUBLIC_USERS_API}/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if ( res.ok ) {
        data = "Success"
    } else {
        status = res.status;
        error = res.statusText
    }


    return {
        status,
        error,
        data
    }
}

export default PutUser;