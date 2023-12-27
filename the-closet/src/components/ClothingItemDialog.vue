<!-- ModalDialog.vue -->
<template>
  <div
    v-if="clickedClothingItem"
    id="modalClothingItem"
    class="modal fade show in"
    :style="{ 'display': modalDisplay }"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          />
        </div>
        <div class="modal-body">
          <form>
            <div class="custom-file mb-3 px-4 row">
              <div class=" col-sm-3">
                <label
                  class="custom-file-label"
                  for="customFile"
                >Picture</label>
              </div>
              <div class=" col-sm-9">
                <ImageViewer
                  v-if="mode == 'view'"
                  :source="clickedClothingItem.imageURL"
                />
                <ImageInput
                  v-else
                  :source="clickedClothingItem.imageURL"
                />
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class=" col-sm-4">
                <label for="name">Name</label>
              </div>
              <div
                v-if="mode == 'view'"
                class="col-sm-8"
              >
                <span>{{ clickedClothingItem.name }}</span>
              </div>
              <div
                v-else
                class=" col-sm-8"
              >
                <input
                  id="name"
                  type="text"
                  class="form-control"
                  placeholder="e.g. Short pants"
                  :value="clickedClothingItem.name"
                >
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class="col-sm-4">
                <label for="inputState">Category</label>
              </div>

              <div
                v-if="viewingMode"
                class="col-md-8"
              >
                {{ clickedClothingItem.category }}
              </div>

              <div
                v-else
                class="col-md-8"
              >
                <select
                  id="parentCategory"
                  v-model="selectedParentCategoryId"
                  name="parentCategory"
                  class="col-sm-6 form-control"
                  @change="changeChildCategories"
                >
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class="col-sm-4">
                <label for="inputState">Sub category</label>
              </div>
              <div
                v-if="viewingMode"
                class="col-sm-8"
              >
                {{ clickedClothingItem.subCategory }}
              </div>
              <div
                v-else
                class="col-sm-8"
              >
                <select
                  id="childCategory"
                  v-model="selectedChildCategoryId"
                  name="childCategory"
                  class="col-sm-6 form-control"
                >
                  <option
                    v-for="category in currentChildCategories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name
                    }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class="col-sm-4">
                <label for="inputState">Brand</label>
              </div>
              <div
                v-if="viewingMode"
                class="col-sm-8"
              >
                {{ clickedClothingItem.brand }}
              </div>
              <div
                v-else
                class="col-sm-8"
              >
                <select
                  id="brand"
                  name="brand"
                  class="col-sm-6 form-control"
                >
                  <option
                    v-for="brand in brandsStore.brands"
                    :key="brand.id"
                    :value="brand.id"
                  >
                    {{ brand.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class=" col-sm-4">
                <label for="formGroupExampleInput">Size</label>
              </div>
              <div
                v-if="viewingMode"
                class="col-sm-8"
              >
                {{ clickedClothingItem.size }}
              </div>
              <div
                v-else
                class=" col-sm-8"
              >
                <input
                  id="size"
                  type="text"
                  class="form-control"
                  placeholder="e.g. M"
                  :value="clickedClothingItem.size"
                >
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class=" col-sm-4">
                <label for="formGroupExampleInput">Purchase price (€)</label>
              </div>
              <div
                v-if="viewingMode"
                class="col-sm-8"
              >
                {{ clickedClothingItem.price }}
              </div>
              <div
                v-else
                class="col-sm-8"
              >
                <input
                  id="price"
                  type="text"
                  class="form-control"
                  placeholder="e.g. 19,99"
                  :value="clickedClothingItem.price"
                >
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class=" col-sm-4">
                <label>Material</label>
              </div>
              <div
                v-if="viewingMode"
                class="col-sm-8"
              >
                {{ materialText }}
              </div>
              <div
                v-else
                class="col-sm-8"
              >
                <div
                  v-for="material in materialsStore.materials"
                  :key="material.id"
                  class="form-check"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="material.id"
                    :checked="clickedClothingItem.materialIdList.includes(material.id)"
                  >
                  <label class="form-check-label">
                    {{ material.material }}
                  </label>
                </div>
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class=" col-sm-4">
                <label for="washing-mode">Washing mode</label>
              </div>
              <div
                v-if="viewingMode"
                class="col-sm-8"
              >
                {{ washingModeStore.washingModes.filter((el) => el.id == clickedClothingItem?.washingModeID)[0].washingMode }}
              </div>
              <div
                v-else
                class="col-sm-8"
              >
                <div
                  v-for="washingMode in washingModeStore.washingModes"
                  id="washing-mode"
                  :key="washingMode.id"
                  class="form-check"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :value="washingMode.id"
                    :checked="washingMode.id == clickedClothingItem.washingModeID"
                  >
                  <label class="form-check-label">
                    {{ washingMode.washingMode }}
                  </label>
                </div>
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class=" col-sm-4">
                <label for="formGroupExampleInput">Color</label>
              </div>
              <div
                v-if="viewingMode"
                class="col-sm-8"
              >
                <ColorIndicator :color="getColor" />
              </div>
              <div
                v-else
                class="col-sm-8"
              >
                <ColorPicker
                  v-model="selectedColorId"
                  :colors="colors"
                  @update:model-value="console.log(selectedColorId)"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer !justify-between">
          <div class="flex justify-start">
            <button
              type="button"
              class="btn btn-secondary"
            >
              Delete
            </button>
          </div>
          <div class="flex justify-end gap-x-2">
            <button
              type="button"
              class="btn btn-secondary"
              @click="toggleMode"
            >
              {{ viewingMode ? 'Edit' : 'Discard changes' }}
            </button>
            <button
              v-if="editMode"
              type="button"
              class="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed, onBeforeMount, inject, Ref } from "vue";
import ImageInput from '@/components/ImageInput.vue';
import ImageViewer from "./ImageViewer.vue";
import masterdata from '../../resources/test_data/masterdata.json'
import ColorPicker from '@/components/ColorPicker.vue';
import ColorIndicator from "./ColorIndicator.vue";
import { Category, ClothingItem, Color } from '@/custom_types';
import { useBrandsStore, useMaterialsStore, useWashingModeStore } from '@/store/masterdata';

const brandsStore = useBrandsStore();
const materialsStore = useMaterialsStore();
const washingModeStore = useWashingModeStore();

const clickedClothingItem = inject<Ref<ClothingItem>>("clickedClothingItem");

const modalDisplay = ref("none");

const selectedParentCategoryId = ref<number>(1);
const selectedChildCategoryId = ref<number>(1);

const categories = ref<Category[]>(masterdata.categories);
const currentChildCategories = ref<Category[]>(masterdata.categories);

const colors = ref<Color[]>(masterdata.colors);

const selectedColorId = ref<number>(1);

const mode = ref<string>("view");

const openModal = () => {
    modalDisplay.value = "block";
    console.log(clickedClothingItem?.value)
};

const closeModal = () => {
    modalDisplay.value = "none";
    mode.value = "view";
};

function changeChildCategories() {
    let childCategoryArray: any = [];

    if (categories.value instanceof Array && typeof categories.value.filter == "function")
        childCategoryArray = categories.value.filter((el) => el.id === selectedParentCategoryId.value)[0].child_categories;

    if (typeof childCategoryArray != "undefined")
        currentChildCategories.value = childCategoryArray;
}

function toggleMode() {
    if (mode.value == 'view')
        mode.value = 'edit';
    else
        mode.value = 'view';
}

// computed properties

const getColor = computed(() => {
    return masterdata.colors.filter((color) => color.id == clickedClothingItem?.value.colorID)[0];
})

const viewingMode = computed(() => {
    return mode.value == "view";
})

const editMode = computed(() => {
    return mode.value == "edit";
})

const materialText = computed(() => {
    if (clickedClothingItem?.value.materialList !== undefined)
        return clickedClothingItem.value.materialList.join(", ")
    return "No material"
})

// lifecycle hooks

onMounted(() => {
    changeChildCategories();
    console.log(clickedClothingItem?.value)
});

onBeforeMount(() => {
    if (brandsStore.isEmpty) {
        brandsStore.fetch();
    }

    if (materialsStore.isEmpty) {
        materialsStore.fetch();
    }

    if (washingModeStore.isEmpty) {
        washingModeStore.fetch();
    }
})

defineExpose({
    openModal,
    closeModal
});
</script>
  