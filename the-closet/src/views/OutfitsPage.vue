<template>
  <ion-page>
    <ion-header>
      <NavBar>Outfits</NavBar>
    </ion-header>
    <ion-content>
      <div class="grid grid-cols-12 p-2">
        <div class="md:col-span-6 lg:col-span-4 p-2">
          <Card class="max-sm!h-44 sm:!h-64 cursor-pointer">
            <template #content>
              <div class="flex justify-center items-center flex-col h-full gap-y-8">
                <FontAwesomeIcon
                  size="6x"
                  icon="fas fa-plus"
                  class="sm:h-24 opacity-50 text-royal-purple-400"
                />
                <p v-t="'message.addNewOutfit'" class="card-text text-center text-xs sm:text-base" />
              </div>
            </template>
          </Card>
        </div>
        <div
          v-for="outfit of outfits"
          :key="outfit.id"
          class="md:col-span-6 lg:col-span-4 p-2"
        >
          <Card class="max-sm:!h-44 sm:!h-64 cursor-pointer">
            <template #title>
              {{ outfit.name }}
            </template>
            <template #content>
              <div class="flex">
                <img
                  v-for="clothing in getOutfitClothings(outfit.clothingIdList)"
                  :key="clothing.id"
                  :src="clothing.image.url"
                  class="rounded max-h-24 px-2"
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



import NavBar from '@/components/NavBar.vue';
import outfits from '../../resources/test_data/outfits.json';
import clothingItems from '../../resources/test_data/clothing_items.json';
import masterdata from '../../resources/test_data/masterdata.json';

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
</script>
  