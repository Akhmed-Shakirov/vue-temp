<template>
    <Form v-model="formHandler">
        <Input
            v-model="item.login"
            :validator="validator.login"
            label="Login"
        />

        <Input
            v-model="item.password"
            :validator="validator.password"
            label="Password"
        />

        <Button value="Next" isSubmit isBlue />
    </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input, Form, Button } from '@ui/index'
import { TAuch, login } from '@/entities/authorization'

const item = ref<TAuch>({
    login: '',
    password: ''
})
const validator = {
    login: ['required', 'min-3', 'max-6'],
    password: ['required']
}
const formHandler = ref({
    send: () => login(item.value),
    error: () => console.log('Method error')
})
</script>

<style scoped lang="scss">
</style>
