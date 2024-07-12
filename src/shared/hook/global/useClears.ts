// Отчистки объекта
export const useClears = (obj: any) => {
    if (!obj) return {}

    const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

    for (const key of ownKeys) {
        if (obj[key] && typeof obj[key] !== 'object') {
            obj[key] = null
        } else {
            obj[key] = useClears(obj[key])
        }
    }

    return obj
}
