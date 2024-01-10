<template>
  <div
    v-if="mode == 'edit'"
    class="base-image-input"
    :style="{ 'background-image': `url(${imageData})` }"
    @click="chooseImage"
  >
    <span v-if="!imageData" class="placeholder">
      Foto wählen
    </span>
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
    <span v-if="!props.source" class="placeholder">
      Foto wählen
    </span>
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

const emit = defineEmits(["input"])
const props = defineProps<{
  source?: string
}>();

const mode = ref("view");
const imageData = ref()
const fileInput = ref<any>(null);

function chooseImage() {
  if (fileInput.value != null)
    fileInput.value.click();
}

function onSelectFile() {
  console.log("onSelectFile")
  const files = fileInput.value.files;

  if (files && files[0]) {
    const reader = new FileReader;
    reader.onload = (e) => {
      imageData.value = e.target?.result;
    }

    reader.readAsDataURL(files[0]);
    emit("input", files[0]);
    mode.value = "edit";
  }
}

onMounted(() => {
  if (typeof props.source !== "undefined")
    imageData.value = props.source
})
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

.placeholder {
  background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #E0E0E0;
}

.file-input {
  display: none;
}
</style>