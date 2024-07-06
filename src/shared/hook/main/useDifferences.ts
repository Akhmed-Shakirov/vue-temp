// Разница объектов
const useDifferences = (main: any, obj: any): any => {
    const differences: any = {}

    for (const key in main) {
        if (obj[key] !== main[key] && typeof main[key] !== 'object') {
            differences[key] = main[key]
        }
        if (typeof main[key] == 'object') {
            const value = useDifferences(main[key], obj[key])

            if (Object.keys(value)?.length) {
                differences[key] = value
            }
        }
    }

    return differences
}

export default useDifferences
