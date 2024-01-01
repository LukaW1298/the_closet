<template>
  <ion-page>
    <ion-header>
      <NavBar>
        {{ $t("message.wardrobe") }} Mobile? {{ isMobileDevice }}

        <button class="btn btn-primary" @click="mode = 'outfitSelection'">
          Outfit mode
        </button>
        <button class="btn btn-primary" @click="mode = 'view'">
          View mode
        </button>
      </NavBar>
    </ion-header>
    <ion-content>
      <div class="row h-full">
        <div
          class="overflow-auto scrollbar scrollbar-thumb-royal-purple-700 scrollbar-track-royal-purple-400" :class="{
            'col-sm-9 h-full ': outfitSelectionMode
          }"
        >
          <div
            class="container-lg  max-sm:mb-32" :class="{
              'pr-0': outfitSelectionMode
            }"
          >
            <div
              class="row" :class="{
                '!mr-[-24px]': outfitSelectionMode
              }"
            >
              <div class="row align-items-center gy-5 max-sm:!px-2">
                <div class="col-4 col-md-3 col-xl-2 w-3 max-sm:!px-1 max-sm:!mt-4">
                  <div id="card-0" class="card !h-44 sm:!h-64 !bg-royal-purple-100 dark:!bg-[#0b0c0e]">
                    <div class="card-body cursor-pointer  max-sm:!px-2" @click="clothingItemDialog.openModal('new')">
                      <div class="flex justify-center items-center flex-col h-full gap-y-8">
                        <FontAwesomeIcon icon="fas fa-plus" class="h-16 sm:h-24 opacity-50 text-royal-purple-400" />
                        <p v-t="'message.addClothing'" class="card-text text-center text-xs sm:text-base" />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-for="(item) of items" :key="item.id"
                  class="col-4 col-md-3 col-xl-2 max-sm:!px-1 max-sm:!mt-4"
                >
                  <div :id="`card-${item.id}`" class="card !h-44 sm:!h-64">
                    <input
                      v-if="outfitSelectionMode" :id="`clothing-checkbox-${item.id}`"
                      :checked="isInCheckedItems(item.id)" type="checkbox"
                      class="form-check-input absolute !w-8 !h-8 !rounded-full right-1"
                      @change="(event) => onItemSelection(event, item)"
                    >

                    <div
                      class="card-body cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                      @click="() => showModal(item)"
                    >
                      <div class="flex justify-center">
                        <img :src="item.imageURL" class="card-img-top clothing-card-img">
                      </div>
                      <div class="absolute bottom-0 left-0 w-full px-2 pt-2 bg-[--bs-card-bg] rounded-b-md">
                        <h6 class="card-title text-xs sm:text-base text-center">
                          {{ item.name }}
                        </h6>
                      </div>
                    </div>
                  </div>
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
    <ClothingItemDialog ref="clothingItemDialog" />
    <AddClothingItemDialog ref="addClothingItemDialog" />
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, provide, computed } from 'vue';
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMediaQuery } from '@vueuse/core';

import NavBar from '@/components/NavBar.vue'
import testdata from '../../resources/test_data/clothing_items.json'
import ClothingItemDialog from '@/components/ClothingItemDialog.vue';
import AddClothingItemDialog from '@/components/ModalDialogAddClothingItem.vue';
import { ClothingItem } from '@/custom_types';

const items = ref<Array<ClothingItem>>([]);
const clothingItemDialog = ref<any>(null);
const addClothingItemDialog = ref<any>(null);
const clickedClothingItem = ref<ClothingItem>();

provide("clickedClothingItem", clickedClothingItem)
const mode = ref<"view" | "outfitSelection">("view")
const checkedItems = ref<Record<number | string, ClothingItem>>({});

const isMobileDevice = useMediaQuery('not all and (min-width: 640px)');

function onItemSelection(event: Event, item: ClothingItem) {

  if ((<HTMLInputElement>event.target).checked)
    addToCheckedItems(item);
  else
    removeFromCheckedItems(item.id);
}

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
  if (clothingItemDialog.value != null)
    clothingItemDialog.value.openModal();

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

  items.value = <ClothingItem[]>testdata;
}

getClothingItems();

// computed properties

const outfitSelectionMode = computed(() => {
  return mode.value == "outfitSelection";
})

const viewingMode = computed(() => {
  return mode.value == "view";
})
</script>
  
<style scoped>
.clothing-card-img {
  width: auto;
  object-fit: contain;
}
</style>