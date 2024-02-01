<template>
  <ion-page>
    <ion-header>
      <NavBar>Outfits</NavBar>
    </ion-header>
    <ion-content>
      <div class="grid grid-cols-12 p-2">
        <div class="col-span-12 md:col-span-6 lg:col-span-4 p-2">
          <Card
            class="max-sm:!h-44 sm:!h-64 cursor-pointer"
            :pt="{
              body: {
                class: 'p-4'
              }
            }"
            @click="selectOutfit"
          >
            <template #content>
              <div class="flex justify-center items-center flex-col h-full gap-y-8">
                <FontAwesomeIcon
                  size="4x"
                  icon="fas fa-plus"
                  class="sm:h-24 opacity-50 text-royal-purple-400"
                />
                <span v-t="'message.addNewOutfit'" class="card-text text-center  text-base" />
              </div>
            </template>
          </Card>
        </div>
        <div
          v-for="outfit of sortedOutfits"
          :key="outfit.id"
          class="col-span-12 md:col-span-6 lg:col-span-4 p-2"
        >
          <Card
            class="max-sm:!h-44 sm:!h-64 cursor-pointer"
            :pt="{
              title: {
                class: 'text-base text-center'
              },
              content: {
                class: 'py-1'
              },
              body: {
                class: 'p-4 flex flex-col justify-between h-full'
              },
              footer: {
                class: 'pt-4'
              }
            }"
          >
            <template #title>
              <div class="flex justify-between">
                <span>
                  {{ prettifyDate(outfit.date) }}
                </span>
              </div>
            </template>
            <template #content>
              <div class="flex">
                <img
                  v-for="clothing in outfit.clothingOutfits.slice(0, 3)"
                  :key="clothing.clothing.id"
                  :src="base64ToUrl(clothing.clothing.image.largeBinaryData, clothing.clothing.image.contentType)"
                  class="rounded max-h-16 sm:max-h-24 px-2"
                >
              </div>
            </template>
            <template #footer>
              <div class="flex relative">
                <div
                  v-for="occasion in outfit.outfitOccasions"
                  :key="occasion.occasion.id"
                  class="p-1"
                >
                  <Tag
                    class="badge-royal-purple"
                  >
                    {{ occasion.occasion.occasion }}
                  </Tag>
                </div>
                <div
                 
                  class="p-1"
                >
                  <Tag
                    class="badge-sky"
                  >
                    {{ outfit.weather.weather }}
                  </Tag>
                </div>
                <Tag class="absolute right-0" :severity="outfit.outfitType.outfitType == 'log' ? 'info' : 'primary'">
                  {{ outfit.outfitType.outfitType }}
                </Tag>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// primevue

import Card from 'primevue/card';
import Tag from 'primevue/tag';

// custom components

import NavBar from '@/components/NavBar.vue';
import { useWardrobeModeStore } from '@/store/outfitStore';
import router from '@/router';
import { useOutfitListStore } from '@/store/outfit';
import { prettifyDate } from '@/helpers/dateFunctions';
import { base64ToUrl } from '@/helpers/blobFunctions';
import { sortOutfitsByDate } from '@/helpers/arrayFunctions';


// get data

const outfitListStore = useOutfitListStore();

const sortedOutfits = computed(() => {
  return sortOutfitsByDate(outfitListStore.outfits);
})

// go to wardrobe page for outfit selection
const wardrobeModeStore = useWardrobeModeStore();

function selectOutfit() {
  wardrobeModeStore.changeToOutfitSelection();
  router.push("/tabs/wardrobe");
}
</script>
  