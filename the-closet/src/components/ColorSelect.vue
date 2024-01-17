<template>
  <Dropdown
    v-model="model" :options="props.options"
    option-label="name"
    class="w-full"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value">
        <FontAwesomeIcon
          icon="fas fa-square" :style="{
            color: slotProps.value.hex_code
          }"
        />
        <span>&nbsp;&nbsp;{{ slotProps.value.name }}</span>
      </div>
    </template>
    <template #option="slotProps">
      <FontAwesomeIcon
        icon="fas fa-square" :style="{
          color: slotProps.option.hex_code
        }"
      />
      <span>&nbsp;&nbsp;{{ slotProps.option.name }}</span>
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