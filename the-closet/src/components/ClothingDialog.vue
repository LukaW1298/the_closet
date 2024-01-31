<template>
  <Dialog
    v-model:visible="visible" modal
    :draggable="false"
    class="w-[90dvw] sm:!w-[70dvw] lg:!w-[50dvw] xl:!w-[30dvw]"
  >
    <template #header>
      <span />
    </template>
    <form>
      <div class="custom-file mb-3 px-4 pb-5 w-full">
        <div class="flex justify-center">
          <ImageInput
            v-if="newMode" 
            @input="saveImage"
          />
          <img
            v-else :src="clothingStore.clothingItem.image.url" 
            class="max-h-44"
          >
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-quote-left" class="opacity-60" />
              <label for="name">Name</label>
            </div>
          </Chip>
        </div>
        <div v-if="viewMode" class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <span>{{ clothingStore.clothingItem.name }}</span>
        </div>
        <div v-else class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <InputText
            id="name" v-model="clothingStore.clothingItem.name"
            name="name"
            class="w-full" placeholder="e.g. Short pants"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-shirt" class="opacity-60" />
              <label
                v-t="'message.category'" for="inputState"
                class=" max-sm:text-sm"
              />
            </div>
          </Chip>
        </div>

        <div class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">  
          <span v-if="viewMode">
            {{ clothingStore.clothingItem.category.type }}
          </span>
          <TreeSelect
            v-else
            v-model="clothingStore.categoryTreeValue" :options="categoryStore.tree"
            selection-mode="single"
            class="w-full"
            :disabled="viewMode"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-copyright" class="opacity-60" />
              <label v-t="'message.brand'" for="inputState" />
            </div>
          </Chip>
        </div>
        <div class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <span v-if="viewMode">
            {{ clothingStore.clothingItem.brand.name }}
          </span>
          <AutoComplete
            v-else
            v-model="clothingStore.clothingItem.brand" option-label="name"
            class="w-full"
            :suggestions="brandSuggestions" :disabled="viewMode"
            :pt="{
              input: {
                class: 'w-full'
              }
            }"
            @complete="filterBrandList"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-tag" class="opacity-60" />
              <label v-t="'message.size'" for="formGroupExampleInput" />
            </div>
          </Chip>
        </div>
        <div class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <span v-if="viewMode">
            {{ clothingStore.clothingItem.size }}
          </span>
          <InputText
            v-else
            v-model="clothingStore.clothingItem.size" placeholder="e.g. M"
            class="w-full" 
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-euro-sign" class="opacity-60" />
              <label v-t="'message.price'" for="formGroupExampleInput" />
            </div>
          </Chip>
        </div>
        <div v-if="viewMode" class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          € {{ clothingStore.clothingItem.price.toFixed(2) }}
        </div>
        <div v-else class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <InputNumber
            v-model="clothingStore.clothingItem.price" placeholder="€"
            class="w-full"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-rug" class="opacity-60" />
              <label v-t="'message.material'" />
            </div>
          </Chip>
        </div>
        <div class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <span v-if="viewMode" class="flex gap-x-2">
            <Chip 
              v-for="material in clothingStore.clothingItem.clothingMaterials" :key="material.material.id"
              :label="material.material.material"
            />
          </span>
          <MultiSelect
            v-else
            v-model="clothingStore.materialSelectValue" :options="materialsStore.materials"
            option-label="material" placeholder="Select materials"
            display="chip" class="w-full max-w-full"
            :disabled="viewMode"
            @change="console.log(clothingStore.materialSelectValue)"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-jug-detergent" class="opacity-60" /> 
              <label v-t="'message.washingMode'" for="washing-mode" />
            </div>
          </Chip>
        </div>
       
        <div class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <span v-if="viewMode">
            {{ clothingStore.clothingItem.washingMode.washingMode }}
          </span>
          <Dropdown
            v-else
            v-model="clothingStore.clothingItem.washingMode" :options="washingModeStore.washingModes"
            option-label="washingMode" placeholder="Select washing mode"
            class="w-full"
            :disabled="viewMode"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-soap" class="opacity-60" />
              <label for="status">Status</label>
            </div>
          </Chip>
        </div>
        <div class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <span v-if="viewMode">
            <FontAwesomeIcon
              :icon="getStatusIcon(clothingStore.clothingItem.status.status)" :style="{
                color: getStatusColor(clothingStore.clothingItem.status.status)
              }"
            />
                &nbsp;
            {{ clothingStore.clothingItem.status.status }}
          </span>
          <Dropdown
            v-else
            v-model="clothingStore.clothingItem.status" :options="statusListStore.statusList"
            option-label="status" placeholder="Select status"
            class="w-full"
          >
            <template #value="slotProps">
              <FontAwesomeIcon
                :icon="getStatusIcon(slotProps.value.status)" :style="{
                  color: getStatusColor(slotProps.value.status)
                }"
              />
              &nbsp;{{ slotProps.value.status }}
            </template>
            <template #option="slotProps">
              <FontAwesomeIcon
                :icon="getStatusIcon(slotProps.option.status)" :style="{
                  color: getStatusColor(slotProps.option.status)
                }"
              />
              &nbsp;{{ slotProps.option.status }}
            </template>
          </Dropdown>
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-palette" class="opacity-60" />
            
              <label v-t="'message.color'" for="formGroupExampleInput" />
            </div>
          </Chip>
        </div>
        
        <div class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <span v-if="viewMode">
            <FontAwesomeIcon
              icon="fas fa-square" :style="{
                color: clothingStore.clothingItem.color.hexCode
              }"
            />
            &nbsp;
            {{ clothingStore.clothingItem.color.name }}
          </span>
          <ColorSelect
            v-else v-model="clothingStore.clothingItem.color"
            :options="colorsStore.colors"
          />
        </div>
      </div>
      <div class="mb-3 px-4 grid grid-cols-12 w-full items-center pb-1 gap-x-4">
        <div class="col-span-12 sm:col-span-5 sm:justify-self-end pr-5">
          <Chip class="p-1 px-2 bg-royal-purple-100 dark:bg-royal-purple-900">
            <div class="flex gap-x-2 text-royal-purple-800 dark:text-royal-purple-200">
              <FontAwesomeIcon icon="fas fa-comment-dots" class="opacity-60" />
              <label>Notes</label>
            </div>
          </Chip>
        </div>
        <div class="col-span-12 sm:col-span-7 max-sm:pt-2 max-sm:pb-1">
          <span v-if="viewMode">
            {{ clothingStore.clothingItem.notes }}
          </span>
          <Textarea
            v-else
            v-model="clothingStore.clothingItem.notes" rows="1"
            class="w-full"
            :disabled="viewMode"
          />
        </div>
      </div>
    </form>
    <template #footer>
      <div v-show="showAlert" class="flex justify-center pb-2">
        <InlineMessage severity="error">
          {{ alertMessage }}
        </InlineMessage>
      </div>
      <div class="flex justify-between">
        <Button
          icon="pi pi-trash" aria-label="Delete"
          class="w-12"
          :class="{
            'invisible': newMode
          }"
          severity="danger"
          rounded
          outlined
          @click="deleteItem"
        />
        <Button
          v-show="newMode"
          label="Save" icon="pi pi-check"
          autofocus @click="save"
        />
      </div>
    </template>
  </Dialog>
  <ConfirmDialog />
</template>
<script setup lang="ts">
import { ref, computed, unref, onUpdated } from 'vue';
import { presentToast } from '@/helpers/toastController';


// primevue
import Dialog from 'primevue/dialog';
import AutoComplete, { AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import TreeSelect from 'primevue/treeselect';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Chip from 'primevue/chip';
import { useToast } from 'primevue/usetoast';
import InlineMessage from 'primevue/inlinemessage';
import ConfirmDialog from 'primevue/confirmdialog';

import { useConfirm } from "primevue/useconfirm";

// custom components
import { Category, Brand } from '@/custom_types';
import masterdata from '../../resources/test_data/masterdata.json';
import ImageInput from '@/components/ImageInput.vue';
import ColorSelect from '@/components/ColorSelect.vue';


// stores
import { useBrandsStore, useMaterialsStore, useStatusStore, useWashingModeStore, useColorStore, useCategoryStore }
  from '@/store/masterdata';
import { useClothingStore, useImageStore, useClothingListStore } from '@/store/clothingItem';
import { sortObjectsAlphabetically } from '@/helpers/arrayFunctions';
import { postClothing } from '@/composables/PostCalls';
import { deleteClothing } from '@/composables/DeleteCalls';
import { TreeNode } from 'primevue/treenode';

// toast controller
const toast = useToast();


// dialog visibility

const visible = defineModel({
  type: Boolean 
});

const props = defineProps<{
  dialogMode: 'new' | 'view'
}>();

// const dialogMode = ref<"new" | "view">("new");

const viewMode = computed(() => {
  return props.dialogMode == "view";
});

const newMode = computed(() => {
  return props.dialogMode == "new";
});

// current clothing item

const clothingStore = useClothingStore();

// categories


const categoryStore = useCategoryStore();

console.log(categoryStore.tree);

// colors

const colorsStore = useColorStore();
const getColor = computed(() => {
  return colorsStore.colors.find((color) => {
    return color.id == clothingStore.clothingItem.color.id;
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

function getStatusIcon(statusText: string) {
  if (statusText == "clean")
    return "fas fa-soap";
  if (statusText == "okay")
    return "fas fa-thumbs-up";

  return "fas fa-circle-exclamation";
}

function getStatusColor(statusText: string) {
  if (statusText == "clean")
    return "#41823c";
  if (statusText == "okay")
    return "#e39a1b";

  return "#bf415b";
}

// save image
const imageStore = useImageStore();
const clothingListStore = useClothingListStore();

function getObjectUrl(image) {

  const blob =  new Blob([image.largeBinaryData], {
    type: image.contentType 
  });


  return URL.createObjectURL(blob);
}

function saveImage(input: File) {
  console.log(input);

  imageStore.setImage(input);
  imageStore.post()
    .then((result) => {
      if (imageStore.postSuccess) {
        toast.add({
          severity: "success",
          summary: "Saved image",
          closable: true,
          life: 5000
        });
      }
      else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "An internal server error occured when trying to save the image.",
          closable: true,
          life: 5000
        });
      }

      clothingStore.updateImage({
        id: result.id,
        blob: imageStore.image,
        url: imageStore.url
      });    

      imageStore.id = result.id;
    });
}

// save clothing

function save() {

  if (!validate())
    return;

  postClothing().then((result) => {
    if (result.ok) {
      visible.value = false;

      // update wardrobe view after saving new clothing item
      clothingListStore.fetch();
    }
    else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "An internal server error occured when trying to save the clothing item.",
        closable: true,
        life: 5000
      });
    }

    console.log(result);
    console.dir(result);
  });

  
}

// alert for failed input validation

const showAlert = ref(false);
const alertMessage = ref("");

function validate() {
 
  let valid = true;

  const missingValues = [];

  if (clothingStore.clothingItem.image.url === undefined) {
    missingValues.push("image");
    valid = false;
  }

  if (clothingStore.clothingItem.name == "") {
    missingValues.push("name");
    valid = false;
  }

  if (clothingStore.clothingItem.color.id < 0)
    missingValues.push("color");

  if (clothingStore.clothingItem.brand.id < 0)
    missingValues.push("brand");

  alertMessage.value = "The following inputs are missing: " + missingValues.join(", ");

  if (!valid) {
    showAlert.value = true;
  }

  return valid;

}

onUpdated(() => {
  showAlert.value = false;
});

// ====================================================== //
// ================ Delete clothing item ================ //
// ====================================================== //

const confirm = useConfirm();

function deleteItem() {
  confirm.require({
    header: "Are you sure?",
    message: "Do you really want to delete this clothing item?",
    acceptLabel: "Delete",
    acceptClass: "p-button-danger",
    rejectLabel: "Cancel",
    accept: () => {
      console.log("accepted");
      deleteClothing(clothingStore.clothingItem.id).then((response) => {
        if (response.ok) {
          

          // close dialog and update wardrobe view after deleting clothing item
          visible.value = false;
          clothingListStore.fetch();

          presentToast("Successfully deleted clothing item.");

        }
        else
          presentToast("Could not delete clothing item.");
      });
    },
    reject: () => {
      console.log("rejected");
    }
  });

}
</script>