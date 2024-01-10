<template>
  <input
    v-model="searchInput" type="text"
    placeholder="Search..." class="form-control form-control-sm"
  >
  <div class="gap-2 flex flex-wrap pt-2 max-h-40 overflow-auto">
    <div
      v-for="item in filteredList" :key="item.id"
      class="badge rounded-pill badge-gray-clickable"
      :class="{ 'bg-royal-purple-700 text-white': model.includes(item.id) }" @click="() => changeValue(item)"
    >
      {{ item.material }}
            &nbsp;
      <font-awesome-icon v-if="model.includes(item.id)" icon="fas fa-check" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, defineModel } from 'vue';
import { sortObjectsAlphabetically } from '@/helpers/arrayFunctions';
import { Material } from '@/custom_types';
const props = defineProps<{
    list: Material[],
    multiple: boolean
}>()
const model = defineModel<number[]>({ type: Array<number>, default: [] });

const searchInput = ref("");

function changeValue(item: Material) {
    // clicking on the badge if the item is already selected: deselect the clicked item
    if (model.value.includes(item.id)) {
        console.log(model.value)
        console.log(item.id)
        console.log(model.value.indexOf(item.id))
        model.value.splice(model.value.indexOf(item.id), 1);
        console.log(model.value)
        console.log(model.value.includes(item.id))

        if (!props.multiple)
            model.value = [];
    }
    else {
        if (props.multiple) {
            model.value = model.value.slice();
            model.value.push(item.id);
        }
        else
            model.value = [item.id]
    }
}

const filteredList = computed(() => {
    const regex = new RegExp(searchInput.value, "i");
    let sortedAndFilteredList = sortObjectsAlphabetically<Material>(props.list, "material").filter((listElement) => regex.test(listElement.material));

    // if there are selected fields, push them to the start of the array so the user can see them better
    // even show the selected fields if they are not in the filter!
    const selectedFields = props.list.filter((listItem) => model.value.includes(listItem.id));

    if (selectedFields.length > 0) {
        const selectedIds = selectedFields.map((field) => field.id);
        sortedAndFilteredList = sortedAndFilteredList.filter((listItem) => !selectedIds.includes(listItem.id))

        sortedAndFilteredList.unshift(...selectedFields);
    }

    return sortedAndFilteredList;
})
</script>