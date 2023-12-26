<template>
  <ion-page>
    <ion-header>
      <NavBar>
        Wardrobe
      </NavBar>
    </ion-header>
    <ion-content :fullscreen="true">
      <button class="btn btn-primary" @click="mode = 'outfitSelection'">Outfit mode</button>
      <button class="btn btn-primary" @click="mode = 'view'">View mode</button>

      <div class="container-lg max-sm:!mt-6">
        <div class="row">
          <div class="row align-items-center gy-5 max-sm:!px-2" :class="{
            'col-9': outfitSelectionMode
          }">
            <div class="col-4 col-md-3 col-xl-2 w-3 max-sm:!px-1 max-sm:!mt-4">
              <div class="card !h-44 sm:!h-64 !bg-royal-purple-100 dark:!bg-[#0b0c0e]" id="card-0">
                <div class="card-body cursor-pointer  max-sm:!px-2" @click="addClothingItemDialog.openModal()">
                  <div class="flex justify-center items-center flex-col h-full gap-y-8">
                    <FontAwesomeIcon icon="fas fa-plus" class="h-16 sm:h-24 opacity-50 text-royal-purple-400">
                    </FontAwesomeIcon>
                    <p class="card-text text-center text-xs sm:text-base">
                      Add new clothing item
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-4 col-md-3 col-xl-2 max-sm:!px-1 max-sm:!mt-4" v-for="(item, index) of items" :key="item.id">
              <div class="card !h-44 sm:!h-64" :id="`card-${item.id}`">
                <input v-if="outfitSelectionMode" @change="(event) => onItemSelection(event, item)"
                  :checked="isInCheckedItems(item.id)" :id="`clothing-checkbox-${item.id}`" type="checkbox"
                  class="form-check-input absolute !w-8 !h-8 !rounded-full right-1">

                <div
                  class="card-body cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                  @click="showModal(item)">

                  <div class="flex justify-center">
                    <img :src="item.imageURL" class="card-img-top clothing-card-img">

                  </div>
                  <div class="absolute bottom-0 left-0 w-full px-2 pt-2"
                    :style="{ backgroundColor: 'var(--bs-card-bg)' }">
                    <h6 class="card-title text-xs sm:text-base text-center">{{ item.name }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="outfitSelectionMode" class="col-3 bg-white flex items-center flex-col">
            <div class="flex justify-between pt-3 w-full">
              <h5>Neues Outfit</h5>
              <button type="button" class="btn-close text-reset" aria-label="Close"></button>
            </div>
            <div>
              <div v-for="item in checkedItems" class="card !h-44 sm:!h-48" :id="`outfit-card-${item.id}`">
                <div
                  class="card-body cursor-pointer justify-between flex flex-col max-sm:!px-2 overflow-y-clip max-h-full"
                  @click="showModal(item)">
                  <button type="button" class="btn-close absolute right-1 top-1" aria-label="Remove clothing item"
                    @click="removeFromCheckedItems(item.id)"></button>

                  <div class="flex justify-center">
                    <img :src="item.imageURL" class="card-img-top clothing-card-img max-h-36">
                  </div>
                  <div class="absolute bottom-0 left-0 w-full px-2 pt-2"
                    :style="{ backgroundColor: 'var(--bs-card-bg)' }">
                    <h6 class="card-title text-xs sm:text-base text-center">{{ item.name }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <button class="btn btn-primary absolute bottom-20 m-auto">Save outfit</button>
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

import NavBar from '@/components/NavBar.vue'
import testdata from '../../resources/test_data/clothing_items.json'
import ClothingItemDialog from '@/components/ClothingItemDialog.vue';
import AddClothingItemDialog from '@/components/ModalDialogAddClothingItem.vue';
import { ClothingItem } from '@/custom_types';

const items = ref<Array<ClothingItem>>([]);
const clothingItemDialog = ref<any>(null);
const addClothingItemDialog = ref<any>(null);
const clickedClothingItem = ref<ClothingItem>(items.value[0]);

provide("clickedClothingItem", clickedClothingItem)
const mode = ref<"view" | "outfitSelection">("view")
const checkedItems = ref<Record<number | string, ClothingItem>>({});

function onItemSelection(event: Event, item: ClothingItem) {
  if ((<HTMLInputElement>event.target).checked) {
    addToCheckedItems(item);
  } else {
    removeFromCheckedItems(item.id);
  }
}

function addBorder(event: Event, id: number) {
  const card = document.getElementById(`card-${id}`)

  if ((<HTMLInputElement>event.target).checked) {
    card?.classList.add("border-primary-subtle")
  }
  else {
    card?.classList.remove("border-primary-subtle")
  }
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

.check-input-clothing {
  position: absolute;
  height: 20px;
  width: 20px;
  right: 5px;
}

.border-primary-subtle {
  border: 5px solid var(--bs-primary-border-subtle);
}
</style>