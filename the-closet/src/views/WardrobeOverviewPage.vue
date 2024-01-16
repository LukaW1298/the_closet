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
      <div class="grid grid-cols-12 h-full">
        <div
          class="col-span-12 overflow-auto scrollbar scrollbar-thumb-royal-purple-700 scrollbar-track-royal-purple-400"
          :class="{
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
                            <FontAwesomeIcon
                              icon="fas fa-plus"
                              class="text-8xl sm:h-24 opacity-50 text-royal-purple-400"
                            />
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
                              :src="item.image.url" :alt="item.name"
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
                    <img :src="item.image.url" class="card-img-top max-h-36 max-sm:max-h-12 clothing-card-img">
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
    <ClothingDialog v-model="visible" />
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, provide, computed, onMounted, unref } from 'vue';
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMediaQuery, useElementSize } from '@vueuse/core';

// primevue
import Card from 'primevue/card';
import Button from 'primevue/button';

// custom components
import NavBar from '@/components/NavBar.vue';
import testdata from '../../resources/test_data/clothing_items.json';
import { ClothingItem, Category, Brand } from '@/custom_types';
import ClothingDialog from '@/components/ClothingDialog.vue';

// stores
import { useClothingItemStore } from '@/store/clothingItem';






const items = ref<Array<ClothingItem>>([]);

// const mode = ref("edit")

// cards

// dialog
const visible = ref<boolean>(true);

const mode = ref<"view" | "outfitSelection">("view");
const checkedItems = ref<Record<number | string, ClothingItem>>({});

const isMobileDevice = useMediaQuery('not all and (min-width: 640px)');

function onItemSelection(event: Event, item: ClothingItem) {

  if ((event.target as HTMLInputElement).checked)
    addToCheckedItems(item);
  else
    removeFromCheckedItems(item.id);
}


// clicked clothing item

const clothingItemStore = useClothingItemStore();


function showModal(clothingItem: any) {

  console.log("show modal");

  visible.value = true;
  clothingItemStore.updateClothingItem(clothingItem);
}

function addToCheckedItems(item: ClothingItem) {
  checkedItems.value[String(item.id)] = item;
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

function getClothingItems() {

  // api call...

  items.value = (testdata as ClothingItem[]);
}

getClothingItems();

// computed properties

const outfitSelectionMode = computed(() => {
  return mode.value == "outfitSelection";
});

const viewingMode = computed(() => {
  return mode.value == "view";
});
</script>
  
<style scoped>
.clothing-card-img {
  width: auto;
  object-fit: contain;
}
</style>