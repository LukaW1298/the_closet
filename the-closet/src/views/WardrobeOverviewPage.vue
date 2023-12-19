<template>
  <ion-page>
    <ion-header>
      <NavBar>
        Kleiderschrank
      </NavBar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Kleiderschrank</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <div class="container-fluid pt-2 pb-3 d-flex justify-content-end">
      </div>
      
      <div class="container-md">
        <div class="row align-items-center gy-5">
          
          
          <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2" v-for="item of items">
            <div class="card " :id="`card-${item.id}`">
              <input class="form-check-input check-input-clothing" type="checkbox" :id="`checkbox-${item.id}`" @click="event => addBorder(event, item.id)">
              <div class="card-body cursor-pointer"  @click="showModal(item)">
                <div class="flex justify-center">
                  <img :src="item.imageURL" class="card-img-top clothing-card-img" >
                </div>
                <h6 class="card-title">{{ item.name }}</h6>
                <p class="card-text">
                  {{ item.brand }} <br />
                  <div class="flex justify-between">
                    <span class="badge rounded-pill bg-light text-dark"> {{ item.size }} </span>
                    <span :class="getStatusBadgeClass(item)"> {{ item.status }} </span>
                  </div>
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
    <ClothingItemDialog ref="clothingItemDialog" :data="clickedClothingItem"/>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { onBeforeMount } from 'vue';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';

import NavBar from '@/components/NavBar.vue'
import testdata from '../../resources/test_data/clothing_items.json'
import { ref, computed } from 'vue';
import ClothingItemDialog from '@/components/ClothingItemDialog.vue';
import { ClothingItem } from '@/custom_types';

const items = ref<Array<ClothingItem>>([]);
  const clothingItemDialog = ref<any>(null);
  const clickedClothingItem = ref<any>({});
  
  function addBorder(event: Event, id: number) {
    const card = document.getElementById(`card-${id}`)
    
    if ((<HTMLInputElement>event.target).checked)
      {
        card?.classList.add("border-primary-subtle")
      }
      else
      {
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
      if (clothingItemDialog.value != null )
      clothingItemDialog.value.openModal();
      
      clickedClothingItem.value = clothingItem;
      
    }
    
    function getClothingItems() {
      // api call...
      
      items.value = testdata;
    }
    
    onBeforeMount(() => {
      getClothingItems();
    });
    
  </script>
  
  <style scoped>
  .clothing-card-img {
    height: 150px;
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