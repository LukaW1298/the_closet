<template>
  <ion-page>
    <ion-header>
      <NavBar>Outfits</NavBar>
    </ion-header>
    <ion-content>
      <div class="grid grid-cols-12 p-2">
        <div class="col-span-12 md:col-span-6 lg:col-span-4 p-2">
          <Card
          @click="selectOutfit"
            class="max-sm:!h-44 sm:!h-64 cursor-pointer"
            :pt="{
              body: {
                class: 'p-4'
              }
            }"
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
          v-for="outfit of outfits"
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
              {{ outfit.name }}
            </template>
            <template #content>
              <div class="flex">
                <img
                  v-for="clothing in getOutfitClothings(outfit.clothingIdList)"
                  :key="clothing.id"
                  :src="clothing.image.url"
                  class="rounded max-h-16 sm:max-h-24 px-2"
                >
              </div>
            </template>
            <template #footer>
              <div class="flex">
                <div
                  v-for="occasion in getOutfitOccasions(outfit.occasionList)"
                  :key="occasion.id"
                  class="p-1"
                >
                  <Tag
                    class="badge-royal-purple"
                  >
                    {{ occasion.name }}
                  </Tag>
                </div>
                <div
                  v-for="weather in getOutfitWeather(outfit.weatherList)"
                  :key="weather.id"
                  class="p-1"
                >
                  <Tag
                    class="badge-sky"
                  >
                    {{ weather.name }}
                  </Tag>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// primevue

import Card from 'primevue/card';

import Tag from 'primevue/tag';

// custom components

import NavBar from '@/components/NavBar.vue';
import outfits from '../../resources/test_data/outfits.json';
import clothingItems from '../../resources/test_data/clothing_items.json';
import masterdata from '../../resources/test_data/masterdata.json';
import { useWardrobeModeStore } from '@/store/outfitStore'
import router from '@/router';


function getOutfitWeather(weatherIdList: number[]) {
  return masterdata.weather.filter((weather) => {
    return weatherIdList.includes(weather.id);
  });
}

function getOutfitClothings(clothingIdList: number[]) {
  return clothingItems.filter((item) => {
    return clothingIdList.includes(item.id);
  });
}

function getOutfitOccasions(occasionIdList: number[]) {
  return masterdata.occasion.filter((item) => {
    return occasionIdList.includes(item.id);
  });
}

// go to wardrobe page for outfit selection
const wardrobeModeStore = useWardrobeModeStore();

function selectOutfit() {
  wardrobeModeStore.changeToOutfitSelection();
  router.push("/tabs/wardrobe");
}
</script>
  