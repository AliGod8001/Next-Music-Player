interface RequestConfig {
    url: string,
    data?: RequestInit
}

interface ReadFileResponse {
    status: number,
    statusText: text,
    promise?: Promise<string>
}

type FilePrefix = "B" | "KB" | "MB" | "GB"