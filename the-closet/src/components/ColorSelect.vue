<template>
  <Dropdown
    v-model="model" :options="props.options"
    option-label="name"
    class="w-full"
    placeholder="Select color"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex justify-start items-center">
        <div
          class="w-4 h-4 rounded-full border-solid border border-neutral-300 dark:border-neutral-600" :style="{
            backgroundColor: slotProps.value.hexCode
          }"
        />
        <span>&nbsp;&nbsp;{{ slotProps.value.name }}</span>
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex justify-start items-center ">
        <div
          class="w-4 h-4 rounded-full border-solid border border-neutral-300 dark:border-neutral-600" :style="{
            backgroundColor: slotProps.option.hexCode
          }"
        />
        <span>&nbsp;&nbsp;{{ slotProps.option.name }}</span>
      </div>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import { defineProps, defineModel } from 'vue';
import Dropdown from 'primevue/dropdown';
import { Color } from '@/custom_types';

const props = defineProps<{
  options: Color[]
}>();
const model = defineModel();
</script>