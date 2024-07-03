<template>
    <Button value="Add Product" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@ui/index'

import { useGetQuery } from '@hook/index'

const params = ref<any>({
    name: 0,
    age: 22
})

console.log(useGetQuery(params.value))
</script>

<style scoped lang="scss">
</style>
