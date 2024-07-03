import { useRouter } from 'vue-router'
import { useToken, storeToRefs } from '@store/index'

const checkLogin = (to: any) => {
    const { is_auth } = storeToRefs(useToken())

    const router = useRouter()

    if (to.path !== '/login' && !is_auth.value) {
        router.push('/login')
    }
}

export default checkLogin
