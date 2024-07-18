import { watchDebounced } from "@vueuse/core"

export const useService = (api: string, fetchConfig?: { isStopRead?: boolean, filterTimer?: number }) => {

    const data = ref<any>([])
    const isLoading = ref<boolean>(false)
    const error = ref<any>({})
    const item = ref<any>({})
    const filter = ref<any>(useRouterQuery({}))

    const fetch = async (method: [string, any?], event?: any) => {
        try {
            isLoading.value = true
            const field = useIsNotEmpty(event) ? event : item.value

            if (method[0] == 'post') {
                delete field?.id
                data.value.push(await useFetch(api, method, useNotEmpty(field)))
            }

            if (method[0] == 'get') {
                data.value = await useFetch([api, filter.value], method)
            }

            if (method[0] == 'patch' && field?.id) {
                const index = data.value.findIndex((el: any) => el?.id == field?.id)
                const old = data.value.find((el: any) => el?.id == field?.id)
                data.value.splice(index, 1, await useFetch(`${api}/${field?.id}`, method, useDifferences(useNotEmpty(field), old)))
            }

            if (method[0] == 'delete' && field?.id) {
                await useFetch(`${api}/${field?.id}`, method)
                data.value = data.value.filter((el: any) => el?.id !== field?.id)
            }
        } catch (err) {
            error.value = err
        } finally {
            isLoading.value = false
        }
    }

    if (!fetchConfig?.isStopRead) {
        fetch(['get'])
    }

    watchDebounced(filter, () => {
        fetch(['get'])
    }, { debounce: (fetchConfig?.filterTimer ?? 1000), maxWait: 5000, deep: true })

    return {
        data,
        isLoading,
        error,
        item,
        filter,

        create: (event?: any, success?: string) =>  fetch(['post', success], event),
        read: (event?: any, success?: string) => fetch(['get', success], event),
        update: (event?: any, success?: string) =>  fetch(['patch', success], event),
        remove: (event?: any, success?: string) =>  fetch(['delete', success], event)
    }
}

