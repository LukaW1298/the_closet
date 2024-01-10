<template>
  <ion-page>
    <Teleport to="head">
      <meta name="description" content="Wardrobe overview page.">
    </Teleport>
    <ion-header>
      <NavBar>
        {{ $t("message.wardrobe") }}

        <!-- <button class="btn btn-primary" @click="mode = 'outfitSelection'">
          O
        </button>
        <button class="btn btn-primary" @click="mode = 'view'">
          V
        </button>
        <Button
          label="D" outlined
          @click="toggleDialogVisibility"
        /> -->
      </NavBar>
    </ion-header>
    <ion-content>
      <div class="grid grid-cols-12 h-full">
        <div
          class="col-span-12 overflow-auto scrollbar scrollbar-thumb-royal-purple-700 scrollbar-track-royal-purple-400" :class="{
            'sm:col-span-9 h-full ': outfitSelectionMode
          }"
        >
          <div
            class="lg:container  max-sm:mb-32 p-3" :class="{
              'pr-0': outfitSelectionMode
            }"
          >
            <div
              class="row" :class="{
                '!mr-[-24px]': outfitSelectionMode
              }"
            >
              <div class="grid grid-cols-12 gap-3 align-items-center gy-5 max-sm:!px-2">
                <div class="col-span-4 md:col-span-3 xl:col-span-2 max-sm:!px-1 max-sm:!mt-4">
                  <Card class="h-80 pb-2">
                    <template #content>
                      <div id="card-0">
                        <div class=" cursor-pointer max-sm:!px-2">
                          <div class="flex justify-center items-center flex-col h-full gap-y-8">
                            <FontAwesomeIcon icon="fas fa-plus" class="text-8xl sm:h-24 opacity-50 text-royal-purple-400" />
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #footer>
                      <div class=" bottom-0 left-0 w-full px-2 pb-4 rounded-b-md">
                        <p v-t="'message.addClothing'" class="text-center text-xs sm:text-base" />
                      </div>
                    </template>
                  </Card>
                </div>

                <div 
                  v-for="(item) of items" :key="item.id"
                  class="col-span-4 md:col-span-3 xl:col-span-2 max-sm:!px-1 max-sm:!mt-4"
                >
                  <Card class="sm:h-80" @click="showModal">
                    <template #content>
                      <div :id="`card-${item.id}`" class="!h-44 sm:!h-76">
                        <input
                          v-if="outfitSelectionMode" :id="`clothing-checkbox-${item.id}`"
                          :checked="isInCheckedItems(item.id)" type="checkbox"
                          class="form-check-input absolute !w-8 !h-8 !rounded-full right-1"
                          @change="(event) => onItemSelection(event, item)"
                        >

                        <div
                          class="cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                          @click="() => showModal(item)"
                        >
                          <div class="flex justify-center">
                            <img
                              :src="item.imageURL" :alt="item.name"
                              class="card-img-top clothing-card-img"
                            >
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #footer>
                      <div class=" bottom-0 left-0 w-full px-2 rounded-b-md">
                        <h6 class="text-xs sm:text-base text-center">
                          {{ item.name }}
                        </h6>
                      </div>
                    </template>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="outfitSelectionMode"
          class="col-sm-3 bg-white dark:!bg-zinc-800 flex items-center flex-col justify-between fixed right-0 bottom-0 sm:top-16  flex-nowrap"
        >
          <div class="flex justify-between pt-3 w-full">
            <h5 v-t="'message.newOutfit'" class="max-sm:hidden dark:text-white" />
            <button
              v-if="!isMobileDevice" type="button"
              class="btn-close text-reset" aria-label="Close"
            />
          </div>
          <div class="shrink max-sm:w-full">
            <div
              class="overflow-auto  scrollbar scrollbar-thumb-royal-purple-700 scrollbar-track-royal-purple-400 flex w-auto max-sm:gap-2 flex-nowrap max-sm:pb-2"
            >
              <div
                v-for="item in checkedItems" :id="`outfit-card-${item.id}`"
                :key="item.id"
                class="card sm:!h-48 sm:m-3 max-sm:!h-20 max-sm:!w-16 max-sm:shrink-0"
              >
                <div
                  class="card-body cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                  @click="() => showModal(item)"
                >
                  <button
                    type="button"
                    class="!rounded-full flex justify-center items-center absolute right-1 top-1 w-7 h-7 max-sm:w-5 max-sm:h-5 text-center dark:bg-neutral-700 dark:hover:bg-neutral-900 bg-neutral-100 hover:bg-neutral-200"
                    aria-label="Remove clothing item" @click="() => removeFromCheckedItems(item.id)"
                  >
                    <FontAwesomeIcon icon="fas fa-xmark" class="max-sm:text-xs" />
                  </button>
                  <div class="flex justify-center">
                    <img :src="item.imageURL" class="card-img-top max-h-36 max-sm:max-h-12 clothing-card-img">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="  bg-[--bs-card-bg] p-3 w-full flex justify-center">
            <button
              v-if="isMobileDevice" v-t="'message.close'"
              aria-label="Close"
              class="btn btn-default m-auto !text-royal-purple-800 dark:text-royal-purple-400"
            />

            <button v-t="'message.saveOutfit'" class="btn btn-primary m-auto" />
          </div>
        </div>
      </div>
    </ion-content>
    <Dialog v-model:visible="visible">
      <form>
        <div class="custom-file mb-3 px-4 row">
          <div class="flex justify-center">
            <!-- <ImageViewer v-if="mode == 'view'" /> -->
            <ImageInput v-if="dialogMode == 'new'" />
            <ImageInput v-else :source="clickedClothingItem?.imageURL" />
          </div>
        </div>
        <div v-if="!viewingMode" class="mb-3 px-4 row">
          <div class=" col-sm-4">
            <label for="name" class="text-woodsmoke-600">Name</label>
          </div>
          <div v-if="mode == 'view'" class="col-sm-8">
            <span>{{ clickedClothingItem?.name }}</span>
          </div>
          <div v-else class=" col-sm-8">
            <input
              id="name" type="text"
              class="form-control" placeholder="e.g. Short pants"
              :value="dialogMode == 'edit' ? clickedClothingItem?.name : ''"
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
            {{ clickedClothingItem?.category }}
          </div>

          <div v-else>
            <!-- <CategorySelect :list="categories" /> -->
          </div>
        </div>
        <div class="mb-3 px-4 row">
          <div class="col-sm-4">
            <label v-t="'message.subCategory'" for="inputState" />
          </div>
          <div v-if="viewingMode" class="col-sm-8">
            {{ clickedClothingItem?.subCategory }}
          </div>
          <div v-else class="col-sm-8">
            <!-- <select
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
                </select> -->
          </div>
        </div>
        <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
          <div class="col-sm-4">
            <label v-t="'message.brand'" for="inputState" />
          </div>
          <div class="col-sm-8">
            <!-- <BrandAutocompleteSelect
              :list="brandsStore.brands" text-key="name"
              :multiple="false"
            /> -->
          </div>
        </div>
        <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
          <div class=" col-sm-4">
            <label v-t="'message.size'" for="formGroupExampleInput" />
          </div>
          <div v-if="viewingMode" class="col-sm-8">
            {{ clickedClothingItem?.size }}
          </div>
          <div v-else class=" col-sm-8">
            <input
              id="size" type="text"
              class="form-control" placeholder="e.g. M"
              :value="dialogMode == 'edit' ? clickedClothingItem?.size : ''"
            >
          </div>
        </div>
        <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
          <div class=" col-sm-4">
            <label v-t="'message.price'" for="formGroupExampleInput" />
          </div>
          <div v-if="viewingMode" class="col-sm-8">
            {{ clickedClothingItem?.price }}
          </div>
          <div v-else class="col-sm-8">
            <input
              id="price" type="text"
              class="form-control" placeholder="e.g. 19,99"
              :value="dialogMode == 'edit' ? clickedClothingItem?.price : ''"
            >
          </div>
        </div>
        <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
          <div class=" col-sm-4">
            <label v-t="'message.material'" />
          </div>
          <div v-if="viewingMode" class="col-sm-8">
            <!-- {{ materialText }} -->
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

            <!-- <MaterialAutocompleteSelect :list="materialsStore.materials" multiple /> -->
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
              <!-- <input
                    class="form-check-input" type="radio"
                    :value="washingMode.id"
                    :checked="washingMode.id == clickedClothingItem.washingModeID"
                    name="washingMode"
                  > -->
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
            <!-- <InputStatus v-model="status" /> -->
          </div>
        </div>
        <div class="mb-3 px-4 row border-t-2 pt-2 border-gray-100">
          <div class=" col-sm-4">
            <label v-t="'message.color'" for="formGroupExampleInput" />
          </div>
          <div v-if="viewingMode" class="col-sm-8">
            <!-- <ColorIndicator :color="getColor" /> -->
          </div>
          <div v-else class="col-sm-8">
            <ColorPicker
              :colors="colorsStore.colors"
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
      <template #footer>
        <Button
          label="Ok" icon="pi pi-check"
          autofocus @click="visible = false"
        />
      </template>
    </Dialog>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, provide, computed, onBeforeMount, onMounted } from 'vue';
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMediaQuery, useElementSize } from '@vueuse/core';
import Dialog from 'primevue/dialog';

import Card from 'primevue/card';

import Button from 'primevue/button';

import NavBar from '@/components/NavBar.vue'
import testdata from '../../resources/test_data/clothing_items.json'
//import ClothingItemDialog from '@/components/ClothingItemDialog.vue';
// import AddClothingItemDialog from '@/components/ModalDialogAddClothingItem.vue';
import { ClothingItem, Category } from '@/custom_types';
import masterdata from '../../resources/test_data/masterdata.json'

// custom components
import ImageViewer from '@/components/ImageViewer.vue';
import ImageInput from '@/components/ImageInput.vue';
import ColorPicker from 'primevue/colorpicker';

// stores
import { useBrandsStore, useMaterialsStore, useStatusStore, useWashingModeStore, useColorStore }
from '@/store/masterdata';

const brandsStore = useBrandsStore();



const materialsStore = useMaterialsStore();
const washingModeStore = useWashingModeStore();
const statusListStore = useStatusStore();
const colorsStore = useColorStore();

const items = ref<Array<ClothingItem>>([]);

const clickedClothingItem = ref<ClothingItem>();

const dialogMode = ref("edit");

washingModeStore.fetch();

const categories = ref<Category[]>(masterdata.categories as Category[]);
const currentChildCategories = ref<Category[]>(masterdata.categories as Category[]);

//const mode = ref("edit")

// cards
const card = ref();
const { width, height } = useElementSize(card)

// dialog
const visible = ref<boolean>(true);
function toggleDialogVisibility() {
  if (visible.value)
    visible.value = false;
  else
    visible.value = true;
}

provide("clickedClothingItem", clickedClothingItem)
const mode = ref<"view" | "outfitSelection">("view")
const checkedItems = ref<Record<number | string, ClothingItem>>({});

const isMobileDevice = useMediaQuery('not all and (min-width: 640px)');

function onItemSelection(event: Event, item: ClothingItem) {

  if ((event.target as HTMLInputElement).checked)
    addToCheckedItems(item);
  else
    removeFromCheckedItems(item.id);
}

// const getColor = computed(() => {
//   return colorsStore.colors.filter((color) => color.id == clickedClothingItem?.value.colorID)[0];
// })

function getStatusBadgeClass(clothingItem: any) {
  let badgeClass = "badge rounded-pill ";

  if (clothingItem.status == "dirty")
    badgeClass += "bg-danger";
  else if (clothingItem.status == "okay")
    badgeClass += "bg-warning";
  else
    badgeClass += "bg-success";

  return badgeClass;
}

function showModal(clothingItem: any) {
  // if (clothingItemDialog.value != null)
  //   clothingItemDialog.value.openModal();

  console.log("show modal")

  visible.value = true;

  clickedClothingItem.value = clothingItem;
}

function addToCheckedItems(item: ClothingItem) {
  checkedItems.value[String(item.id)] = item;
  console.log("checkedItems", checkedItems.value)
}

function removeFromCheckedItems(id: number) {
  if (typeof checkedItems.value[String(id)] != "undefined")
    delete checkedItems.value[String(id)];
  console.log("checkedItems", checkedItems.value)
}

function isInCheckedItems(id: number) {
  return (typeof checkedItems.value[String(id)] != "undefined")
}

function getClothingItems() {
  // api call...

  items.value = (testdata as ClothingItem[]);
}

getClothingItems();

// computed properties

const outfitSelectionMode = computed(() => {
  return mode.value == "outfitSelection";
})

const viewingMode = computed(() => {
  return mode.value == "view";
})

onMounted(() => {
  if (brandsStore.isEmpty) {
    brandsStore.fetch();
  }

  if (materialsStore.isEmpty) {
    materialsStore.fetch();
  }

  //if (washingModeStore.isEmpty) {
    washingModeStore.fetch();
  //}

  if (statusListStore.isEmpty) {
    statusListStore.fetch();
  }

  if (colorsStore.isEmpty) {
    colorsStore.fetch();
  }

  console.log("washing mode store", washingModeStore.washingModes)
})
</script>
  
<style scoped>
.clothing-card-img {
  width: auto;
  object-fit: contain;
}
</style>