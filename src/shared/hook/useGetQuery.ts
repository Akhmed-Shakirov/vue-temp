// Cозадет Query параметр
export const useGetQuery = (obj: any, isEmpty?: boolean): any => {
    if (!useIsNotEmpty(obj)) return ''

    let url = ''

    const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

    for (const key of ownKeys) {
        if (obj[key] && typeof obj[key] !== 'object') {
            url += `${url ? '&' : isEmpty ? '' : '?'}${key}=${obj[key]}`
        }
    }

    return url
}

// export default useGetQuery
