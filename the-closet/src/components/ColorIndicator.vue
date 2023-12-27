<template>
  <div class="color-box-container flex flex-wrap gap-1">
    <div
      class="flex color-box border-2 w-7 h-7 justify-center items-center cursor-pointer"
      :style="{ backgroundColor: props.color.hex_code }"
      :title="props.color.name"
      :value="props.color.id"
    />
    <span>{{ props.color.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { Color } from '@/custom_types'
const props = defineProps({
    color: {
        type: Color,
        required: true
    }
})
</script>

<style scoped>
.color-box-container {
    display: flex;
    column-gap: 5px;
}

.color-box {
    border-radius: 4px;
}
</style>