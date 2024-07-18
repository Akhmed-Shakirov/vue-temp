import { useNotifications, useToken, storeToRefs } from '@store/index'
import { logout } from '@/entities/authorization'

export interface TFetch {
    method: string
    headers: any
    body?: any
}

const BASE_URL = import.meta.env.VITE_BASE_URL
const refresh_api = `${BASE_URL}/auth/refresh/`
// Это ключи как принемает БЭК
const key = {
    refresh: 'refreshToken',
    access: 'accessToken'
}

export const useFetch = (url: string | [ string, any? ], method: string | [ string, string? ] = 'GET', body?: any, success?: string) => {
    const { setNotification } = useNotifications()
    const { access_token, refresh_token } = storeToRefs(useToken())

    let api = typeof url === 'string' ? url : url[0]
    let query = ''

    let requestType = (typeof method === 'string' ? method : method[0]).toLocaleUpperCase()
    let successText = ''

    if (Array.isArray(url) && useIsNotEmpty(url[1]) || requestType == 'GET' && useIsNotEmpty(body)) {
        query = !!useGetQuery(url[1]) ? useGetQuery(url[1]) : useGetQuery(body)
    }

    if (!successText && Array.isArray(method) && method[1]) successText = method[1]
    if (!successText && success) successText = success
    if (api[0] !== '/') api = `/${api}`

    const params: TFetch = {
        method: requestType,
        headers: {
            'Content-Type': 'application/json',
            Authorization: access_token.value ? `Bearer ${access_token.value}` : ''
        }
    }

    if (!['GET', 'HEAD', 'DELETE'].includes(requestType)) {
        params.body = JSON.stringify(body) || {}
    }

    const requestRefresh = (api: string, paramsData: TFetch) => {
        setNotification({ type: 'warning', text: 'Invalid token' })

        return fetch(refresh_api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [key.refresh]: refresh_token.value })
        }).then(async (res) => {
            if (res.status === 401 || res.status === 400) {
                setNotification({ type: 'warning', text: 'Rederect to auth' })
                logout()

                return null
            }

            const refresh_data = await res.json()
            access_token.value = refresh_data[key.access]

            if (refresh_data[key.refresh]) {
                refresh_token.value = refresh_data[key.refresh]
            }

            paramsData.headers.Authorization = `Bearer ${access_token.value}`

            return request(api, paramsData)
        })
    }

    const request = (api: string, paramsData: TFetch) => {
        return fetch(api, paramsData)
            .then(async (res) => {
                if (!res.ok && res.status !== 401) {
                    throw `Error status: ${res.status}`
                }

                if (res.status === 401) {
                    requestRefresh(api, paramsData)
                    return
                }

                if (successText) {
                    setNotification({ type: 'success', text: successText })
                }

                return await res.json()
            })
            .catch((error) => {
                setNotification({ type: 'danger', text: error })
                throw error
            })
            .finally(() => {
            })
    }

    return request(`${BASE_URL}${api}${query}`, params)
}
