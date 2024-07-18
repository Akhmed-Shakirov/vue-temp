import { defineStore } from 'pinia'

const useValidator = defineStore('validator', () => {
    const startValidator = ref(0)
    const isError = ref(false)
    const fetchError = ref<any>({})

    return { startValidator, isError, fetchError }
})

export default useValidator
