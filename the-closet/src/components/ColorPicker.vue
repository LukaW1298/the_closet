<template>
    <div class="color-box-container flex flex-wrap gap-1">
        <div v-for="color in colors" class="color-box border-2 w-7 h-7" :style="{ backgroundColor: color.hex_code }" :title="color.name"
            :value="color.id"
            
            @click="emit('update:modelValue', color.id)"
            
            :class="{ active: color.id == modelValue }">

        </div>
        <input type="hidden" :value="modelValue" id="color-id" name="color-id" ref="input"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(["colors", "modelValue"])
const emit = defineEmits(['update:modelValue'])

const selectedColor = ref<number>(1);
const input = ref<any>(null);

function updateInput(colorId: number) {

    console.log("input.value", input.value)
    console.log("colorId", colorId)

    if (input.value != null)
        input.value.value = colorId;
}

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