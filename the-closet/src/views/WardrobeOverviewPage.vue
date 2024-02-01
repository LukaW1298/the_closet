<template>
  <ion-page>
    <Teleport to="head">
      <meta name="description" content="Wardrobe overview page.">
    </Teleport>
    <ion-header>
      <NavBar>
        {{ $t("message.wardrobe") }}
      </NavBar>
    </ion-header>
    <ion-content>
      <span class="p-input-icon-left p-2">
        <i class="pi pi-search" />
        <InputText
          v-model="filterClothingName" placeholder="Search"
          size="small"
        />
      </span>
      
      <div class="grid grid-cols-12 h-full">
        <div
          class="col-span-12 overflow-auto scrollbar scrollbar-thumb-royal-purple-700 scrollbar-track-royal-purple-400"
          :class="{
            'sm:col-span-9 h-full ': outfitSelectionMode
          }"
        >
          <div
            class="lg:container  max-sm:mb-32 sm:p-3" :class="{
              'pr-0': outfitSelectionMode
            }"
          >
            <div>
              <div class="grid grid-cols-12 gap-2 sm:gap-3 align-items-center sm:gy-5 max-sm:!px-2">
                <div class="col-span-4 md:col-span-3 xl:col-span-2">
                  <Card
                    class="max-sm:!h-40 sm:!h-80 pb-2 cursor-pointer  flex flex-col justify-center" :pt="{
                      content: {
                        class: 'max-sm:p-0'
                      },
                      footer: {
                        class: 'max-sm:p-0'
                      }
                    }"
                    @click="showEmptyModal"
                  >
                    <template #content>
                      <div id="card-0" class="!h-16 sm:!h-64">
                        <div class=" cursor-pointer max-sm:!px-2">
                          <div class="flex justify-center items-center flex-col h-full gap-y-8">
                            <FontAwesomeIcon
                              icon="fas fa-plus"
                              class="text-7xl sm:text-8xl sm:h-24 opacity-50 text-royal-purple-400"
                            />
                          </div>
                        </div>
                      </div>
                    </template>
                  </Card>
                </div>

                <div
                  v-for="(clothing) of filteredClothing" :key="clothing.id"
                  class="col-span-4 md:col-span-3 xl:col-span-2"
                >
                  <Card
                    class="max-sm:!h-40 sm:!h-80 cursor-pointer" :pt="{
                      content: {
                        class: 'max-sm:p-0 sm:max-h-56'
                      }
                    }"
                    @click="() => showModal(clothing, 'view')"
                  >
                    <template #header>
                      <input
                        v-if="outfitSelectionMode" :id="`clothing-checkbox-${clothing.id}`"
                        :checked="isInCheckedItems(clothing.id)" type="checkbox"
                        class="absolute !w-8 !h-8 !rounded-full"
                        @change="(event) => onItemSelection(event, clothing)"
                      >
                    </template>
                    <template #content>
                      <div :id="`card-${clothing.id}`" class="max-sm:!h-16 sm:!h-64">
                        <div
                          class="cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                          @click="() => showModal(clothing, 'view')"
                        >
                          <div class="flex justify-center">
                            <img
                              :src="clothing.image.url" :alt="clothing.name"
                              class="card-img-top clothing-card-img sm:max-h-40"
                            >
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #footer>
                      <div class=" bottom-0 left-0 w-full sm:px-2 rounded-b-md text-center">
                        <span class="text-base text-center">
                          {{ clothing.name }}
                        </span>
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
          class="w-full sm:w-1/4 bg-white dark:!bg-zinc-900 flex items-center flex-col justify-between fixed right-0 bottom-0 sm:top-16  flex-nowrap"
        >
          <div class="flex justify-between p-3 w-full">
            <h5 v-t="'message.newOutfit'" class="max-sm:hidden dark:text-white" />
            <Button
              v-if="!isMobileDevice" icon="pi pi-times"
              text rounded
              aria-label="Cancel"
              @click="$router.push('/tabs/outfits')"
            />
          </div>
          <div class="shrink w-full sm:overflow-auto">
            <div
              class="flex sm:flex-col overflow-auto  scrollbar scrollbar-thumb-royal-purple-700 scrollbar-track-royal-purple-400  w-auto max-sm:gap-2 flex-nowrap max-sm:pb-2 sm:items-center"
            >
              <Card
                v-for="clothing in checkedItems" :id="`outfit-card-${clothing.id}`"
                :key="clothing.id"
                class="card sm:!h-48 sm:m-3 max-sm:!h-20 max-sm:!w-16 max-sm:shrink-0 sm:w-48"
                :pt="{
                  content: {
                    class: 'relative'
                  },
                  body: {
                    class: 'p-1 sm:p-3'
                  }
                }"
              >
                <template #content>
                  <div
                    class="cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                  >
                    <div />
                   
                    <div class="flex justify-center">
                      <img :src="clothing.image.url" class="card-img-top max-h-36 max-sm:max-h-12 clothing-card-img">
                    </div>
                  </div>
                  <Button
                    icon="pi pi-times" 
                    severity="secondary"
                    rounded aria-label="Remove clothing item"
                    class="absolute top-[-5px] right-[-5px] w-6 sm:w-8 h-6 sm:h-8 p-0"
                    size="small"
                    :pt="{
                      icon: {
                        class: 'max-sm:!text-xs'
                      }
                    }"
                    @click="() => removeFromCheckedItems(clothing.id)"
                  />
                </template>
              </Card>
            </div>
          </div>
          <div class="p-3 w-full flex justify-center">
            <Button
              v-if="isMobileDevice" v-t="'message.close'"
              aria-label="Close"
              class="m-auto"
              @click="$router.push('/tabs/outfits')"
            />

            <Button
              v-t="'message.saveOutfit'" class="m-auto"
              @click="saveOutfit"
            />
          </div>
        </div>
      </div>
    </ion-content>
    <ClothingDialog v-model="visible" :dialog-mode="dialogMode" />
    <OutfitDialog v-model="showOutfitDialog" :selected-clothes="checkedItems" />
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMediaQuery } from '@vueuse/core';
import { storeToRefs } from 'pinia';

// primevue
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';


// custom components
import NavBar from '@/components/NavBar.vue';
import testdata from '../../resources/test_data/clothing_items.json';
import { Clothing, ClothingItem } from '@/custom_types';
import ClothingDialog from '@/components/ClothingDialog.vue';
import OutfitDialog from '@/components/OutfitDialog.vue';

// stores
import { useClothingStore, useClothingListStore } from '@/store/clothingItem';
import { useWardrobeModeStore } from '@/store/outfitStore';


// ====================================================== //
// ================= show clothing items ================ //
// ====================================================== //
const clothingListStore = useClothingListStore();

// filter clothing items
const filterClothingName = ref("");

const filteredClothing = computed(() => {
  return clothingListStore.clothings.filter((clothing) => {
    return clothing.name.toUpperCase().includes(filterClothingName.value.toUpperCase());
  });
});


// ====================================================== //
// ======================= dialog ======================= //
// ====================================================== //
const visible = ref<boolean>(false);

// ====================================================== //
// ================= wardrobe page mode ================= //
// ====================================================== //

const { viewingMode, outfitSelectionMode } = storeToRefs(useWardrobeModeStore());
const wardrobeStore = useWardrobeModeStore();

// ====================================================== //
// ================ clicked clothing item =============== //
// ====================================================== //

const clothingItemStore = useClothingStore();
const dialogMode = ref<"new" | "view">("new");


function showModal(clothingItem: ClothingItem, newDialogMode: "new" | "view") {

  if (viewingMode.value) {

    console.log("update");
    clothingItemStore.updateClothingItem(clothingItem);
    dialogMode.value = newDialogMode;


    console.log("show modal");

    visible.value = true;
  }
}

function showEmptyModal() {
  console.log("clear");
  clothingItemStore.clear();
  dialogMode.value = "new";
  visible.value = true;
}

// ====================================================== //
// ================== outfit selection ================== //
// ====================================================== //
const checkedItems = ref<Record<number | string, Clothing>>({});



function onItemSelection(event: any, clothing: Clothing) {

  console.log(event);

  if ((event.target as HTMLInputElement).checked)
    addToCheckedItems(clothing);
  else
    removeFromCheckedItems(clothing.id);
}

function addToCheckedItems(clothing: Clothing) {
  checkedItems.value[String(clothing.id)] = clothing;
  console.log("checkedItems", checkedItems.value);
}

function removeFromCheckedItems(id: number) {
  if (checkedItems.value[String(id)] !== undefined)
    delete checkedItems.value[String(id)];
  console.log("checkedItems", checkedItems.value);
}

function isInCheckedItems(id: number) {
  return (checkedItems.value[String(id)] !== undefined);
}

// save outfit

const showOutfitDialog = ref(false);

function saveOutfit() {
  showOutfitDialog.value = true;
}

// ====================================================== //
// ==================== card styling ==================== //
// ====================================================== //
const isMobileDevice = useMediaQuery('not all and (min-width: 640px)');
</script>
  
<style scoped>
.clothing-card-img {
  width: auto;
  object-fit: contain;
}
</style>