<template>
  <ion-page>
    <Teleport to="head">
      <meta name="description" content="Wardrobe overview page.">
    </Teleport>
    <ion-header>
      <NavBar>
        {{ $t("message.wardrobe") }}
      </NavBar>
      
      <span class="p-input-icon-left p-2">
        <i class="pi pi-search" />
        <InputText
          v-model="filterClothingName" placeholder="Search"
          size="small"
        />
      </span>
    </ion-header>
    <ion-content>
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
            <div
              class="row" :class="{
                '!mr-[-24px]': outfitSelectionMode
              }"
            >
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
                      <div id="card-0" class="!h-16 sm:!h-76">
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
                    <!-- <template #footer>
                     
                      <div class=" bottom-0 left-0 w-full sm:px-2 rounded-b-md text-center pt-3">
                        <span v-t="isMobileDevice ? 'message.addClothingShort' : 'message.addClothing'"  class="text-base text-center">
                        
                        </span>
                      </div>
                    </template> -->
                  </Card>
                </div>

                <div
                  v-for="(clothing) of filteredClothing" :key="clothing.id"
                  class="col-span-4 md:col-span-3 xl:col-span-2"
                >
                  <Card
                    class="max-sm:!h-40 sm:!h-80 cursor-pointer" :pt="{
                      content: {
                        class: 'max-sm:p-0'
                      }
                    }"
                    @click="() => showModal(clothing)"
                  >
                    <template #content>
                      <div :id="`card-${clothing.id}`" class="max-sm:!h-16 sm:!h-76">
                        <input
                          v-if="outfitSelectionMode" :id="`clothing-checkbox-${clothing.id}`"
                          :checked="isInCheckedItems(clothing.id)" type="checkbox"
                          class="form-check-input absolute !w-8 !h-8 !rounded-full right-1"
                          @change="(event) => onItemSelection(event, clothing)"
                        >

                        <div
                          class="cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                          @click="() => showModal(clothing)"
                        >
                          <div class="flex justify-center">
                            <img
                              :src="clothing.image.url" :alt="clothing.name"
                              class="card-img-top clothing-card-img"
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
          class="col-span-3 bg-white dark:!bg-zinc-800 flex items-center flex-col justify-between fixed right-0 bottom-0 sm:top-16  flex-nowrap"
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
                v-for="cothing in checkedItems" :id="`outfit-card-${cothing.id}`"
                :key="cothing.id"
                class="card sm:!h-48 sm:m-3 max-sm:!h-20 max-sm:!w-16 max-sm:shrink-0"
              >
                <div
                  class="card-body cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                  @click="() => showModal(cothing)"
                >
                  <button
                    type="button"
                    class="!rounded-full flex justify-center items-center absolute right-1 top-1 w-7 h-7 max-sm:w-5 max-sm:h-5 text-center dark:bg-neutral-700 dark:hover:bg-neutral-900 bg-neutral-100 hover:bg-neutral-200"
                    aria-label="Remove clothing cothing" @click="() => removeFromCheckedItems(cothing.id)"
                  >
                    <FontAwesomeIcon icon="fas fa-xmark" class="max-sm:text-xs" />
                  </button>
                  <div class="flex justify-center">
                    <img :src="cothing.image.url" class="card-img-top max-h-36 max-sm:max-h-12 clothing-card-img">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="  bg-[--bs-card-bg] p-3 w-full flex justify-center">
            <Button
              v-if="isMobileDevice" v-t="'message.close'"
              aria-label="Close"
              class="btn btn-default m-auto !text-royal-purple-800 dark:text-royal-purple-400"
            />

            <Button v-t="'message.saveOutfit'" class="btn btn-primary m-auto" />
          </div>
        </div>
      </div>
    </ion-content>
    <ClothingDialog v-model="visible" />
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMediaQuery } from '@vueuse/core';

// primevue
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

// custom components
import NavBar from '@/components/NavBar.vue';
import testdata from '../../resources/test_data/clothing_items.json';
import { ClothingItem } from '@/custom_types';
import ClothingDialog from '@/components/ClothingDialog.vue';

// stores
import { useClothingStore, useClothingListStore } from '@/store/clothingItem';


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
const mode = ref<"view" | "outfitSelection">("view");
const checkedItems = ref<Record<number | string, ClothingItem>>({});

const outfitSelectionMode = computed(() => {
  return mode.value == "outfitSelection";
});

const viewingMode = computed(() => {
  return mode.value == "view";
});


// ====================================================== //
// ================ clicked clothing cothing =============== //
// ====================================================== //

const clothingItemStore = useClothingStore();


function showModal(clothingItem: ClothingItem) {

    

  console.log("update");
  clothingItemStore.updateClothingItem(clothingItem);


  console.log("show modal");

  visible.value = true;
}

function showEmptyModal() {
  console.log("clear");
  clothingItemStore.clear();
  visible.value = true;
}

// ====================================================== //
// ================== outfit selection ================== //
// ====================================================== //
function onItemSelection(event: Event, cothing: ClothingItem) {

  if ((event.target as HTMLInputElement).checked)
    addToCheckedItems(cothing);
  else
    removeFromCheckedItems(cothing.id);
}

function addToCheckedItems(cothing: ClothingItem) {
  checkedItems.value[String(cothing.id)] = cothing;
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