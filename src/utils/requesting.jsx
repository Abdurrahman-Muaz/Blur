
export const simpleAPICall = async ({ endpoint, body = {}, method = "POST", options = {}, verbose = false }) => {
    const response = await fetch(endpoint, {
        method: method,
        body: body,
        ...options,
        headers: {
            ...options.headers,
        },
    })

    const result = await response.json()
    if (!response.ok) {
        throw {
            status: response.status,
            message: result.detail
        }
    }
    else {
        if (verbose) {
            console.log(result.status, result.message)
        }
        return result.data
    }
}