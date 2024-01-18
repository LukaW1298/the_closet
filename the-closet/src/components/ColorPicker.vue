<template>
  <div class="color-box-container flex flex-wrap gap-1">
    <div
      v-for="color in props.colors"
      :key="color.id"
      class="flex color-box border-2 w-7 h-7 justify-center items-center cursor-pointer"
      :style="{ backgroundColor: color.hexCode }"
      :title="color.name"
      :value="color.id"
      :class="{ active: color.id == modelValue }"
      @click="() => emit('update:modelValue', color.id)"
    >
      <FontAwesomeIcon
        v-if="color.id == modelValue"
        class="text-royal-purple-700"
        icon="fas fa-circle-check"
      />
    </div>
    <input
      id="color-id"
      ref="input"
      type="hidden"
      :value="modelValue"
      name="color-id"
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Color } from '@/custom_types';

const props = defineProps<{
    colors: Color[],
    modelValue: number
}>();

const emit = defineEmits<{
    'update:modelValue': [value: number]
}>();

const input = ref<any>(null);
</script>

<style scoped>
.color-box-container {
    display: flex;
    column-gap: 5px;
}

.color-box {
    border-radius: 4px;
}

.color-box.active {
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-color: #b898d0;
    box-shadow: 0 0 0 0.25rem rgba(112, 48, 160, 0.25);

}
</style>