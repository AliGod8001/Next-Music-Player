interface ServiceResponse<T> {
    status: number,
    error: string,
    data?: T
}

interface PostResponse {
    body: {},
    bodyUsed: boolean,
    headers: {},
    ok: boolean,
    redirected: boolean,
    status: number,
    statusText: string,
    type: string,
    url: string,
}