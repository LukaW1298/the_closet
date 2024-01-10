<!-- ModalDialog.vue -->
<template>
  <div
    v-if="clickedClothingItem" id="modalClothingItem"
    class="modal fade show in" :style="{ 'display': modalDisplay }"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <span v-if="viewingMode">{{ clickedClothingItem.name }}</span>
          <button
            type="button" class="btn-close"
            aria-label="Close" @click="closeModal"
          />
        </div>
        <div class="modal-body">
          <form>
            <div class="custom-file mb-3 px-4 row">
              <div class="flex justify-center">
                <ImageViewer v-if="mode == 'view'" :source="clickedClothingItem.imageURL" />
                <ImageInput v-else-if="mode == 'new'" />
                <ImageInput v-else :source="clickedClothingItem.imageURL" />
              </div>
            </div>
            <div v-if="!viewingMode" class="mb-3 px-4 row">
              <div class=" col-sm-4">
                <label for="name" class="text-woodsmoke-600">Name</label>
              </div>
              <div v-if="mode == 'view'" class="col-sm-8">
                <span>{{ clickedClothingItem.name }}</span>
              </div>
              <div v-else class=" col-sm-8">
                <input
                  id="name" type="text"
                  class="form-control" placeholder="e.g. Short pants"
                  :value="mode == 'edit' ? clickedClothingItem.name : ''"
                >
              </div>
            </div>
            <div class="mb-3 px-4 row">
              <div class="col-sm-4">
                <label
                  v-t="'message.category'" for="inputState"
                  class="text-woodsmoke-500 max-sm:text-sm"
                />
              </div>

              <div v-if="viewingMode" class="col-md-8">
                {{ clickedClothingItem.category }}
              </div>

              <div v-else>
                <CategorySelect :list="categories" />
              </div>

            </div>
            <div class="mb-3 px-4 row">
              <div class="col-sm-4">
                <label v-t="'message.subCategory'" for="inputState" />
              </div>
              <div v-if="viewingMode" class="col-sm-8">
                {{ clickedClothingItem.subCategory }}
              </div>
              <div v-else class="col-sm-8">
                <select
                  id="childCategory" v-model="selectedChildCategoryId"
                  name="childCategory"
                  class="col-sm-6 form-control"
                >
                  <option
                    v-for="category in currentChildCategories" :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name
                    }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
              <div class="col-sm-4">
                <label v-t="'message.brand'" for="inputState" />
              </div>
              <div class="col-sm-8">
                <BrandAutocompleteSelect
                  :list="brandsStore.brands" text-key="name"
                  :multiple="false"
                />
              </div>
            </div>
            <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
              <div class=" col-sm-4">
                <label v-t="'message.size'" for="formGroupExampleInput" />
              </div>
              <div v-if="viewingMode" class="col-sm-8">
                {{ clickedClothingItem.size }}
              </div>
              <div v-else class=" col-sm-8">
                <input
                  id="size" type="text"
                  class="form-control" placeholder="e.g. M"
                  :value="mode == 'edit' ? clickedClothingItem.size : ''"
                >
              </div>
            </div>
            <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
              <div class=" col-sm-4">
                <label v-t="'message.price'" for="formGroupExampleInput" />
              </div>
              <div v-if="viewingMode" class="col-sm-8">
                {{ clickedClothingItem.price }}
              </div>
              <div v-else class="col-sm-8">
                <input
                  id="price" type="text"
                  class="form-control" placeholder="e.g. 19,99"
                  :value="mode == 'edit' ? clickedClothingItem.price : ''"
                >
              </div>
            </div>
            <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
              <div class=" col-sm-4">
                <label v-t="'message.material'" />
              </div>
              <div v-if="viewingMode" class="col-sm-8">
                {{ materialText }}
              </div>
              <div v-else class="col-sm-8">
                <!-- <div
                  v-for="material in materialsStore.materials" :key="material.id"
                  class="form-check"
                >
                  <input
                    class="form-check-input" type="checkbox"
                    :value="material.id"
                    :checked="clickedClothingItem.materialIdList.includes(material.id)"
                  >
                  <label class="form-check-label">
                    {{ material.material }}
                  </label>
                </div> -->

                <MaterialAutocompleteSelect :list="materialsStore.materials" multiple />
              </div>
            </div>
            <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
              <div class=" col-sm-4">
                <label v-t="'message.washingMode'" for="washing-mode" />
              </div>
              <div v-if="viewingMode" class="col-sm-8">
                {{ washingModeStore.washingModes.filter((el) => el.id ==
                  clickedClothingItem?.washingModeID)[0].washingMode }}
              </div>
              <div v-else class="col-sm-8">
                <div
                  v-for="washingMode in washingModeStore.washingModes" id="washing-mode"
                  :key="washingMode.id"
                  class="form-check"
                >
                  <input
                    class="form-check-input" type="radio"
                    :value="washingMode.id"
                    :checked="washingMode.id == clickedClothingItem.washingModeID"
                    name="washingMode"
                  >
                  <label class="form-check-label">
                    {{ washingMode.washingMode }}
                  </label>
                </div>
              </div>
            </div>
            <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
              <div class=" col-sm-4">
                <label for="status">Status</label>
              </div>
              <div class="col-sm-8">
                <InputStatus v-model="status" />
              </div>
            </div>
            <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
              <div class=" col-sm-4">
                <label v-t="'message.color'" for="formGroupExampleInput" />
              </div>
              <div v-if="viewingMode" class="col-sm-8">
                <ColorIndicator :color="getColor" />
              </div>
              <div v-else class="col-sm-8">
                <ColorPicker
                  v-model="selectedColorId" :colors="colorsStore.colors"
                  @update:model-value="console.log(selectedColorId)"
                />
              </div>
            </div>
            <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
              <div class=" col-sm-4">
                <label>Notizen</label>
              </div>
              <div class="col-sm-8">
                <textarea class="form-control" rows="2" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer !justify-between">
          <div class="flex justify-start">
            <button
              v-t="'message.delete'" type="button"
              class="btn btn-secondary"
            />
          </div>
          <div class="flex justify-end gap-x-2">
            <button
              type="button" class="btn btn-secondary"
              @click="toggleMode"
            >
              {{ viewingMode ? $t("message.edit") : $t("message.discardChanges") }}
            </button>
            <button
              v-if="editMode" v-t="'message.save'"
              type="button" class="btn btn-primary"
            />
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
import InputStatus from "./InputStatus.vue";
import BrandAutocompleteSelect from "./BrandAutocompleteSelect.vue";
import MaterialAutocompleteSelect from "./MaterialAutocompleteSelect.vue";
import CategorySelect from "./CategorySelect.vue";
import masterdata from '../../resources/test_data/masterdata.json'
import ColorPicker from '@/components/ColorPicker.vue';
import ColorIndicator from "./ColorIndicator.vue";
import { Category, ClothingItem, Color } from '@/custom_types';
import { useBrandsStore, useMaterialsStore, useStatusStore, useWashingModeStore, useColorStore } from '@/store/masterdata';

const brandsStore = useBrandsStore();
const materialsStore = useMaterialsStore();
const washingModeStore = useWashingModeStore();
const statusListStore = useStatusStore();
const colorsStore = useColorStore();

const status = ref(0);

const clickedClothingItem = inject<Ref<ClothingItem>>("clickedClothingItem");

const modalDisplay = ref("none");

const selectedParentCategoryId = ref<number>(1);
const selectedChildCategoryId = ref<number>(1);

const categories = ref<Category[]>(masterdata.categories);
const currentChildCategories = ref<Category[]>(masterdata.categories);

const colors = ref<Color[]>(masterdata.colors);

const selectedColorId = ref<number>(1);

const mode = ref<string>("view");

const openModal = (modalMode: string) => {
  if (modalMode)
    mode.value = modalMode;
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

  if (statusListStore.isEmpty) {
    statusListStore.fetch();
  }

  if (colorsStore.isEmpty) {
    colorsStore.fetch();
  }
})

defineExpose({
  openModal,
  closeModal
});
</script>
  