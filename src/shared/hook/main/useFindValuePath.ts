// Поиск значение
const useFindValuePath = (data: any, path: string[]): any => {
    return path.reduce((acc: any, key: any) => {
        if (typeof acc === 'object' && acc !== null && key.startsWith('[') && key.endsWith(']')) {
            const index = parseInt(key.slice(1, -1), 10)
            return acc[index]
        }
        return acc && acc[key]
    }, data)
}

export default useFindValuePath
