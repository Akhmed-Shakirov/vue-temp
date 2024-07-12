// Вывода не пустых ключей объекта
export const useNotEmpty = (obj: any): any => {
    let newObj: any = {}

    const ownKeys = Object.keys(obj).filter(key => obj.hasOwnProperty(key))

    for (const key of ownKeys) {
        if (obj[key] && typeof obj[key] !== 'object') {
            newObj[key] = obj[key]
        }

        if (obj[key] && typeof obj[key] == 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key])?.length) {
            const value = useNotEmpty(obj[key])

            if (Object.keys(value)?.length) {
                newObj[key] = useNotEmpty(obj[key])
            }
        }
    }

    return newObj
}
