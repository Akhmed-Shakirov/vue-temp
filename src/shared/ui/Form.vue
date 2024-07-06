<template>
    <form @submit.prevent="submit" novalidate>
        <slot />
    </form>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'
import { storeToRefs, useStartValidator } from '@store/index'
const { startValidator, isError } = storeToRefs(useStartValidator())

const modelValue = defineModel<any>()

const emit = defineEmits(['send', 'error'])

const submit = () => {
    startValidator.value++

    setTimeout(() => {
        if (isError.value) {
            emit('error')
            if (modelValue.value) {
                modelValue.value.error()
            }
        } else {
            emit('send')
            if (modelValue.value) {
                modelValue.value.send()
            }
        }

        isError.value = false
    })
}
</script>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>

@/shared/store/index
