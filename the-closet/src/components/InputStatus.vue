<template>
  <div class="flex gap-x-2">
    <div
      v-for="status in statusStore.statusList" id="status"
      :key="status.id"
    >
      <input
        :id="`status-${status.id}`" class="btn-check"
        type="radio" name="status"
        @change="(event) => updateValue(event, status.id)"
        :checked="model == status.id"
      >
      <label
        class="btn btn-sm" :class="getStatusClass(status.status)"
        :for="`status-${status.id}`"
      >
        {{ status.status }}
        <font-awesome-icon v-if="model == status.id" icon="fas fa-check"></font-awesome-icon>
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, defineModel } from 'vue';
import { useStatusStore } from '@/store/masterdata';
import { Status } from '@/custom_types';

const model = defineModel({ default: 0 })
const statusStore = useStatusStore();

function getStatusClass(status: string) {
    if (status == "okay")
        return "btn-outline-warning";
    else if (status == "schmutzig" || status == "dirty")
        return "btn-outline-danger";
    
    return "btn-outline-success";

}

function updateValue(event: Event, statusId: number) {
    if ((<HTMLInputElement>event.target).checked) {
        console.log("checked")
        model.value = statusId;
        console.log(model.value)
    }

}

onBeforeMount(() => {
    if (statusStore.isEmpty)
        statusStore.fetch();
});
</script>