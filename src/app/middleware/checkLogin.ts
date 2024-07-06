import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { useToken, storeToRefs } from '@/shared/store/index'

const checkLogin = (to: any) => {
    const router = useRouter()
    const isAuth = useStorage('is_auth', false)
    const { is_auth } = storeToRefs(useToken())

    if (to.path !== '/login' && !is_auth.value && !isAuth.value) {
        router.push('/login')
    }
}

export default checkLogin
