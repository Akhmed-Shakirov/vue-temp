<template>
    <component :is="layout">
        <router-view />
    </component>

    <Notifications :timer="5" />
</template>

<script setup lang="ts">
import { Notifications } from '@ui/index'
import { useToken } from '@store/index'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'

const { load, beforeunload } = useToken()
window.addEventListener('load', () => load())
window.addEventListener('beforeunload', () => beforeunload())

const route = useRoute()
const { t } = useI18n()

const layout = computed(() => {
    transitions()
    return route?.meta?.layout ?? 'default'
})

const transitions = () => {
    useTitle(t(String(route?.meta?.title ?? 'Template')))

   // code
}
</script>

<style scoped lang="scss">
</style>
