<template>
  <div>
    <div class="grid grid-cols-12 pt-2">
      <label for="parent-categories" class="col-span-4 text-neutral-200">Parent category</label>
      <div id="parent-categories" class="col-span-8 gap-2 flex flex-wrap max-h-40 overflow-auto">
          <Chip  v-for="parentCategory in parentCategories" :key="parentCategory.id"  class="badge rounded-pill badge-gray-clickable sm:!text-13 !font-medium"
          :class="{ 'bg-royal-purple-700 text-white': isSelectedParentCategoryID(parentCategory.id) }"
          @click="() => selectParentCategory(parentCategory)" :label="capitalize(parentCategory.type)">
          <font-awesome-icon v-if="isSelectedParentCategoryID(parentCategory.id)" icon="fas fa-check" />
          </Chip>
        <!-- <div
          v-for="parentCategory in parentCategories" :key="parentCategory.id"
          class="badge rounded-pill badge-gray-clickable sm:!text-13 !font-medium"
          :class="{ 'bg-royal-purple-700 text-white': isSelectedParentCategoryID(parentCategory.id) }"
          @click="() => selectParentCategory(parentCategory)" :label="capitalize(parentCategory.name)"
        >
          {{ capitalize(parentCategory.name) }}
          <span v-if="isSelectedParentCategoryID(parentCategory.id)"> &nbsp;</span>

          <font-awesome-icon v-if="isSelectedParentCategoryID(parentCategory.id)" icon="fas fa-check" />
        </div> -->
      </div>
    </div>
    <div class="grid grid-cols-12 pt-2">
      <label for="child-categories" class="col-span-4 text-neutral-200">Sub category</label>
      <div id="child-categories" class="col-span-8 gap-2 flex flex-wrap max-h-40 overflow-auto">
        <div
          v-for="childCategory in childCategories" :key="childCategory.id"
          class="badge rounded-pill badge-gray-clickable sm:text-sm"
          :class="{ 'badge-royal-purple-selected': isSelectedChildCategoryID(childCategory.id) }"
          @click="() => selectChildCategory(childCategory)"
        >
          {{ capitalize(childCategory.type) }}
          <span v-if="isSelectedChildCategoryID(childCategory.id)"> &nbsp;</span>
          <font-awesome-icon v-if="isSelectedChildCategoryID(childCategory.id)" icon="fas fa-check" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, defineModel, onMounted } from 'vue';
import { sortObjectsAlphabetically } from '@/helpers/arrayFunctions';
import { Category } from '@/custom_types';
import { capitalize } from '@/helpers/stringFunctions';
import Chip from 'primevue/chip'
const props = defineProps<{
    list: Category[]
}>()
const model = defineModel<Category>();
const selectedParentCategory = ref<Category>()

const parentCategories = computed(() => {
    return sortObjectsAlphabetically<Category>(props.list, "type").filter((category) => category.parentCategoryID == undefined);
})

const childCategories = computed(() => {
    return sortObjectsAlphabetically<Category>(props.list, "type").filter((category) => category.parentCategoryID == selectedParentCategory.value?.id)
})

onMounted(() => {
    if (selectedParentCategory.value == undefined) {
        selectParentCategory(props.list.filter((el) => el.parentCategoryID == undefined)[0]);
    }
})

function isSelectedParentCategoryID(id: number) {
    if (typeof selectedParentCategory.value != "undefined" && selectedParentCategory.value.id == id)
        return true;

    return false;
}

function selectParentCategory(newParentCategory: Category) {
    selectedParentCategory.value = newParentCategory;
    autoSelectFirstChildCategory();
}

function isSelectedChildCategoryID(id: number) {
    return (typeof model.value != "undefined" && model.value.id == id);
}

function selectChildCategory(newChildCategory: Category) {
    model.value = newChildCategory;
}

function autoSelectFirstChildCategory() {
    model.value = childCategories.value[0];
}
</script>