<template>
    <div class="checkbox">
        <Icon icon="check" v-if="active" />
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@ui/index'

const props = defineProps<{
    active?: boolean
}>()
props
</script>

<style scoped lang="scss">
.checkbox {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid #FFFFFF;
    background: #242424;

    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
        height: 17px;
        width: 17px;
    }
}
</style>
