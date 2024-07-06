import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const useToken = defineStore('token', () => {
    const router = useRouter()

    // Store
    const refresh_token = ref<string>('')
    const access_token = ref<string>('')
    const is_auth = ref<boolean>(false)

    // Storage
    const access = useStorage('access_token', '')
    const refresh = useStorage('refresh_token', '')
    const isAuth = useStorage('is_auth', false)

    const setData = (access: string, refresh: string, isAuth: boolean) => {
        access_token.value = access
        refresh_token.value = refresh
        is_auth.value = isAuth

        if (isAuth) {
            router.push('/')
        } else {
            router.push('/login')
        }
    }

    const load = () => {
        access_token.value = access.value
        refresh_token.value = refresh.value
        is_auth.value = isAuth.value
    }
    const beforeunload = () => {
        access.value = access_token.value
        refresh.value = refresh_token.value
        isAuth.value = is_auth.value
    }

    return {
        access_token,
        refresh_token,
        is_auth,

        setData,
        load,
        beforeunload
    }
})

export default useToken
