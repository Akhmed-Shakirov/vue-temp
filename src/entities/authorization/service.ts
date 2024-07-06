import { TAuch } from './type'
import { useToken, useNotifications } from '@/shared/store/index'

const setup = () => {
    const { setData } = useToken()
    const { setNotification } = useNotifications()

    const login = (item: TAuch) => {
        if (item.login == 'admin' && item.password == '123') {
            setData('access', 'refresh', true)
        } else {
            setNotification({ value: 'danger', text: 'Login or password is incorrect!' })
        }
    }

    const logout = () => {
        setData('', '', false)
    }

    return {
        login,
        logout
    }
}

const { login, logout } = setup()
export { login, logout }
