import { defineStore } from 'pinia'

export interface TNotification {
    id?: number
    type: string
    text: string
}

const useNotifications = defineStore('notifications', () => {
	const notifications = ref<TNotification[]>([
        // { id: 1, type: 'warning', text: 'Warning' },
        // { id: 2, type: 'danger', text: 'Danger' },
        // { id: 3, type: 'success', text: 'Success' },
        // { id: 4, type: 'primary', text: 'Primary' },
        // { id: 5, type: 'secondary', text: 'Secondary' }
    ])

    const setNotification = (event: TNotification) => {
        notifications.value = [ { id: +new Date, ...event }, ...notifications.value ]
	}

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter((el: TNotification) => el?.id !== id)
    }

	return {
        notifications,
        setNotification,
        removeNotification
    }
})

export default useNotifications
