<template>
  <Dialog v-model:visible="visible" modal>
    <form>
      <div class="custom-file mb-3 px-4 w-full">
        <div class="flex justify-center">
          <!-- <ImageViewer v-if="mode == 'view'" /> -->
          <ImageInput v-if="dialogMode == 'new'" />
          <ImageInput v-else :source="clothingStore.clothingItem.image.url" />
        </div>
      </div>
      <div v-if="!dialogViewMode" class="mb-3 px-4 grid grid-cols-12 w-full">
        <div class=" col-span-12 sm:col-span-4">
          <label for="name" class="text-woodsmoke-600">Name</label>
        </div>
        <div v-if="dialogViewMode" class="col-span-8">
          <span>{{ clothingStore.clothingItem.name }}</span>
        </div>
        <div v-else class=" col-span-8">
          <input
            id="name" type="text"
            class="form-control" placeholder="e.g. Short pants"
            :value="dialogMode == 'edit' ? clothingStore.clothingItem.name : ''"
          >
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full">
        <div class="col-span-12 sm:col-span-4">
          <label
            v-t="'message.category'" for="inputState"
            class=" max-sm:text-sm"
          />
        </div>

        <div class="col-span-12 sm:col-span-8">  
          <TreeSelect
            v-model="clothingStore.clothingItem.category" :options="categoriesTree"
            selection-mode="single"
            class="w-full"
            @change="console.log(unref(clothingStore.clothingItem.category))"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full border-t-2 pt-2 border-gray-100">
        <div class="col-span-12 sm:col-span-4">
          <label v-t="'message.brand'" for="inputState" />
        </div>
        <div class="col-span-12 sm:col-span-8">
          <AutoComplete
            v-model="clothingStore.clothingItem.brand" option-label="name"
            :suggestions="brandSuggestions" @complete="filterBrandList"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full border-t-2 pt-2 border-gray-100">
        <div class=" col-span-12 sm:col-span-4">
          <label v-t="'message.size'" for="formGroupExampleInput" />
        </div>
        <div v-if="dialogViewMode" class="col-span-8">
          {{ clothingStore.clothingItem.size }}
        </div>
        <div v-else class=" col-span-8">
          <InputText v-model="clothingStore.clothingItem.size" placeholder="e.g. M" />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full border-t-2 pt-2 border-gray-100">
        <div class=" col-span-12 sm:col-span-4">
          <label v-t="'message.price'" for="formGroupExampleInput" />
        </div>
        <div v-if="dialogViewMode" class="col-span-8">
          {{ clothingStore.clothingItem.price }}
        </div>
        <div v-else class="col-span-8">
          <InputNumber
            v-model="clothingStore.clothingItem.price" placeholder="€"
            mode="currency" currency="EUR"
            locale="de-AT"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full border-t-2 pt-2 border-gray-100">
        <div class=" col-span-12 sm:col-span-4">
          <label v-t="'message.material'" />
        </div>
        <div v-if="dialogViewMode" class="col-span-8" />
        <div v-else class="col-span-8">
          <MultiSelect
            v-model="clothingStore.clothingItem.materials" :options="materialsStore.materials"
            option-label="material" placeholder="Select materials"
            display="chip" class="w-full"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full border-t-2 pt-2 border-gray-100">
        <div class=" col-span-12 sm:col-span-4">
          <label v-t="'message.washingMode'" for="washing-mode" />
        </div>
        <div v-if="dialogViewMode" class="col-span-8" />
        <div v-else class="col-span-8">
          <Dropdown
            v-model="clothingStore.clothingItem.washingMode" :options="washingModeStore.washingModes"
            option-label="washingMode" placeholder="Select washing mode"
            class="w-full"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full border-t-2 pt-2 border-gray-100">
        <div class=" col-span-12 sm:col-span-4">
          <label for="status">Status</label>
        </div>
        <div class="col-span-8">
          <Dropdown
            v-model="clothingStore.clothingItem.status" :options="masterdata.status"
            option-label="status" placeholder="Select status"
            class="w-full"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full border-t-2 pt-2 border-gray-100">
        <div class=" col-span-12 sm:col-span-4">
          <label v-t="'message.color'" for="formGroupExampleInput" />
        </div>
        <div v-if="dialogViewMode" class="col-span-8">
          <ColorIndicator :color="getColor" />
        </div>
        <div v-else class="col-span-8">
          <ColorPicker :colors="colorsStore.colors" />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full border-t-2 pt-2 border-gray-100">
        <div class=" col-span-12 sm:col-span-4">
          <label>Notizen</label>
        </div>
        <div class="col-span-8">
          <Textarea
            v-model="clothingStore.clothingItem.notes" rows="1"
            class="w-full"
          />
        </div>
      </div>
    </form>
    <template #footer>
      <Button label="Edit mode" @click="dialogMode = 'edit'" />
      <Button label="View mode" @click="dialogMode = 'view'" />
      <Button
        label="Ok" icon="pi pi-check"
        autofocus @click="visible = false"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ref, provide, computed, onMounted, unref, inject, ModelRef } from 'vue';
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMediaQuery, useElementSize } from '@vueuse/core';

// primevue
import Dialog from 'primevue/dialog';
import AutoComplete, { AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import TreeSelect from 'primevue/treeselect';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Card from 'primevue/card';
import Button from 'primevue/button';

// custom components
import NavBar from '@/components/NavBar.vue';
import testdata from '../../resources/test_data/clothing_items.json';
import { ClothingItem, Category, Brand } from '@/custom_types';
import masterdata from '../../resources/test_data/masterdata.json';
import ImageInput from '@/components/ImageInput.vue';
import ColorPicker from 'primevue/colorpicker';

// stores
import { useBrandsStore, useMaterialsStore, useStatusStore, useWashingModeStore, useColorStore }
  from '@/store/masterdata';
import { useClothingItemStore } from '@/store/clothingItem';
import { sortObjectsAlphabetically } from '@/helpers/arrayFunctions';

// test data
import categoriesTree from "../../resources/test_data/categories";

// dialog visibility

const visible = defineModel({ type: Boolean });
const dialogMode = ref("edit");
const dialogViewMode = computed(() => {
  return dialogMode.value == "view";
});

// current clothing item

const clothingStore = useClothingItemStore();

// categories

const categories = ref<Category[]>(masterdata.categories as Category[]);
const currentChildCategories = ref<Category[]>(masterdata.categories as Category[]);





// colors

const colorsStore = useColorStore();
const getColor = computed(() => {
  return colorsStore.colors.find((color) => {
    return color.id == clothingStore.clothingItem.colorID;
  });
});

// brands

const brandsStore = useBrandsStore();
const brandSuggestions = ref(brandsStore.brands);

function filterBrandList(event: AutoCompleteCompleteEvent): void {
  brandSuggestions.value = [...sortObjectsAlphabetically<Brand>(brandsStore.brands as Brand[], "name")].filter((listElement) => {
    return listElement.name.toUpperCase().includes(event.query.toUpperCase());
  });
}

// materials

const materialsStore = useMaterialsStore();

// washing modes

const washingModeStore = useWashingModeStore();

// status

const statusListStore = useStatusStore();
</script>