<template>
  <ion-page>
    <ion-header>
      <NavBar>Outfits</NavBar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="row p-2">
        <div class=" col-md-6 col-lg-4 p-2">
          <div class="card !bg-royal-purple-100 dark:!bg-[#0b0c0e] !h-44 sm:!h-60 cursor-pointer">
            <div class="card-body">
              <div class="flex justify-center items-center flex-col h-full gap-y-8">
                <FontAwesomeIcon icon="fas fa-plus" class="h-16 sm:h-24 opacity-50 text-royal-purple-400">
                </FontAwesomeIcon>
                <p class="card-text text-center text-xs sm:text-base">
                  Add new outfit
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-for="outfit of outfits" class=" col-md-6 col-lg-4 p-2">
          <div class="card !h-36 sm:!h-60 cursor-pointer">
            <h5 class="card-header">
              {{ outfit.name }}
            </h5>
            <div class="card-body">
              <p class="card-text flex">
              <div v-for="occasion in getOutfitOccasions(outfit.occasionList)" class="p-1">
                <span
                  class="badge rounded-pill    !text-royal-purple-700 dark:!text-royal-purple-400 bg-royal-purple-50 dark:bg-royal-purple-950  ring-1 ring-inset ring-royal-purple-400 dark:ring-royal-purple-800">
                  {{ occasion.name }}
                </span>
              </div>
              <div v-for="weather in getOutfitWeather(outfit.weatherList)" class="p-1">
                <span
                  class="badge rounded-pill ring-1 ring-inset bg-sky-50 dark:bg-sky-950  !text-sky-700 dark:!text-sky-400">
                  {{ weather.name }}
                </span>
              </div>
              </p>
              <div class="flex">
                <img :src="clothing.imageURL" v-for="clothing in getOutfitClothings(outfit.clothingIdList)"
                  class="rounded max-h-24">
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import NavBar from '@/components/NavBar.vue';
import outfits from '../../resources/test_data/outfits.json';
import clothingItems from '../../resources/test_data/clothing_items.json';
import masterdata from '../../resources/test_data/masterdata.json'

function getOutfitWeather(weatherIdList: number[]) {
  return masterdata.weather.filter((weather) => weatherIdList.includes(weather.id));
}

function getOutfitClothings(clothingIdList: number[]) {
  return clothingItems.filter((item) => clothingIdList.includes(item.id))
}

function getOutfitOccasions(occasionIdList: number[]) {
  return masterdata.occasion.filter((item) => occasionIdList.includes(item.id));
}
</script>
  