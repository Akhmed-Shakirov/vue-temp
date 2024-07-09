<template>
    <i :class="[icon, deg]" class="icon" :style="styleObject" />
</template>

<script setup lang="ts">
import { StyleValue, computed } from 'vue'
import { TIcons } from '@/app/assets/icons'

const props = defineProps<{
    icon: TIcons
    deg?: string
}>()

const styleObject = computed<StyleValue | undefined>(() => {
    return {
        '-webkit-mask-image': `url(/icons/${props.icon}.svg)`,
        'mask-image': `url(/icons/${props.icon}.svg)`
    }
})
</script>

<style scoped lang="scss">
i.icon, img.icon {
    display: inline-block;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: contain;

    transition: .2s;


    &.up {
        transform: rotate(-180deg);
    }

    &.down {
        transform: rotate(180deg);
    }

    &.left {
        transform: rotate(-90deg);
    }

    &.right {
        transform: rotate(90deg);
    }
}
i.icon {
    background: currentColor;
}

.icon {
    height: 20px;
    width: 20px;
}
</style>
