<template>
    <teleport to="body">
        <Transition>
            <div class="modal" v-if="modelValue">
                <Form
                    v-model="handler"
                    class="modal__content"
                    ref="modal"
                >
                    <div class="modal__head" v-if="!isHideHead">

                    </div>
                    <div class="modal__body">
                        <slot />
                    </div>
                    <div class="modal__footer" v-if="!isHideFooter">
                        <Button @click="toggle('cancel')" value="Cansel" />
                        <Button is-submit value="OK" />
                    </div>
                </Form>
            </div>
        </Transition>
    </teleport>
</template>

<script setup lang="ts">
import { ref, defineModel } from 'vue'
import { Button, Form } from './index.ts'
import { onClickOutside } from '@vueuse/core'

const modelValue = defineModel<boolean>()
const formHandler = defineModel<any>('formHandler')

const props = defineProps<{
    isHideHead?: boolean
    isHideFooter?: boolean
}>()
props

const modal = ref()

onClickOutside(modal, (event: any) => {
    const list = [ ...event?.target?.classList ]
    if (!!modelValue.value && list?.includes('modal')) modelValue.value = false
})

const emit = defineEmits(['cancel', 'send', 'error'])

const toggle = (type: any) => {
    emit(type)
    modelValue.value = false
}
const handler = ref({
    send: () => {
        emit('send')
        if (formHandler.value) {
            formHandler.value.send()
        }
    },
    error: () => {
        emit('error')
        if (formHandler.value) {
            formHandler.value.error()
        }
    }
})
</script>

<style scoped lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000072;

    &__content {
        border-radius: 8px;
        background: #242424;
        color: #FFFFFF;
        min-width: 300px;
    }

    &__body {
        width: 400px;
        min-height: 100px;
        padding: 16px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;

        max-height: 80vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    &__footer {
        border-top: 1px solid #000;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 16px;
    }
}
</style>
