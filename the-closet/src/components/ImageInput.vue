<template>
  <div
    v-if="mode == 'edit'"
    class="base-image-input w-32 sm:w-48 h-32 sm:h-48"
    :style="{ 'background-image': `url(${imageData})` }"
    @click="chooseImage"
  >
    <div v-if="!imageData" class="placeholder">
      <FontAwesomeLayers class="text-9xl">
        <FontAwesomeIcon icon="fas fa-image" class="text-royal-purple-300 hover:text-royal-purple-400 dark:text-royal-purple-800 hover:dark:text-royal-purple-900" />
        <FontAwesomeIcon
          icon="fas fa-circle" transform="shrink-8 down-4 right-6"
          class="text-white dark:text-royal-purple-300"
        />
        <FontAwesomeIcon
          icon="fas fa-circle-plus" transform="shrink-8 down-4 right-6"
          class="text-royal-purple-400 hover:text-royal-purple-500 dark:text-royal-purple-700 hover:dark:text-royal-purple-800"
        />
      </FontAwesomeLayers>
    </div>
    <input
      ref="fileInput"
      class="file-input"
      type="file"
      accept="image/*"
      @input="onSelectFile"
    >
  </div>
  <div
    v-else
    class="base-image-input"
    :style="{ 'background-image': `url(${props.source})` }"
    @click="chooseImage"
  >
    <div v-if="!props.source" class="placeholder">
      <FontAwesomeLayers class="text-9xl">
        <FontAwesomeIcon icon="fas fa-image" class="text-royal-purple-300 hover:text-royal-purple-400 dark:text-royal-purple-800 hover:dark:text-royal-purple-900" />
        <FontAwesomeIcon
          icon="fas fa-circle" transform="shrink-8 down-4 right-6"
          class="text-white dark:text-royal-purple-300"
        />
        <FontAwesomeIcon
          icon="fas fa-circle-plus" transform="shrink-8 down-4 right-6"
          class="text-royal-purple-400 hover:text-royal-purple-500 dark:text-royal-purple-700 hover:dark:text-royal-purple-800"
        />
      </FontAwesomeLayers>
    </div>
    <input
      ref="fileInput"
      class="file-input"
      type="file"
      accept="image/*"
      @input="onSelectFile"
    >
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const emit = defineEmits(["input"]);
const props = defineProps<{
  source?: string
}>();

const mode = ref("view");
const imageData = ref();
const fileInput = ref<any>(null);

function chooseImage() {
  if (fileInput.value != undefined)
    fileInput.value.click();
}

function onSelectFile() {
  console.log("onSelectFile");

  const files = fileInput.value.files;

  if (files && files[0]) {
    const reader = new FileReader;

    reader.addEventListener('load', (e) => {
      imageData.value = e.target?.result;
    });

    reader.readAsDataURL(files[0]);
    emit("input", files[0]);
    mode.value = "edit";
  }
}

onMounted(() => {
  if (props.source !== undefined)
    imageData.value = props.source;
});
</script>

<style scoped>
.base-image-input {
  display: block;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.file-input {
  display: none;
}
</style>