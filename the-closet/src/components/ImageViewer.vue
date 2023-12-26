<template>
  <div class="base-image-input" :style="{ 'background-image': `url(${props.source})` }">
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["input"]);
const props = defineProps(["source"]);
console.log(props.source)
</script>
<style scoped>
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
</style>