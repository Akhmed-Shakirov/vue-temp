<template>
    <h1 @click="logout">Good</h1>

    <Icon icon="eye-dropper" />
</template>

<script setup lang="ts">
import { Icon } from '@ui/index'
import { logout } from '@/entities/authorization'
</script>

<style scoped lang="scss">
</style>
