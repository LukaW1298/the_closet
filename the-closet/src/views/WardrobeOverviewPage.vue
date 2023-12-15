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
        <button class="btn btn-primary btn-lg">Auswahlmodus aktivieren</button>
      </div>
      
      <div class="container-md">
        <div class="row align-items-center gy-5">
          
          
          <div class="col-sm-6 col-md-3" v-for="item of testdata">
            <div class="card cursor-pointer" :id="`card-${item.id}`" @click="showModal">
              <input class="form-check-input check-input-clothing" type="checkbox" :id="`checkbox-${n-1}`" @click="event => addBorder(event, n)">
              <img :src="item.imageURL" class="card-img-top clothing-card-img" >
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">
                  {{ item.brand }} <br />
                  
                  <span class="badge rounded-pill bg-light text-dark"> {{ item.size }} </span>
                  <span :class="getStatusBadgeClass(item)"> {{ item.status }} </span>
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
    <ClothingItemDialog ref="clothingItemDialog" />
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';

import NavBar from '@/components/NavBar.vue'
import testdata from '../../resources/test_data/clothing_items.json'
import { ref, computed } from 'vue';
import ClothingItemDialog from '@/components/ClothingItemDialog.vue';

const clothingItemDialog = ref<any>(null);

function addBorder(event: Event, id: number) {
  const card = document.getElementById(`card-${id}`)
  
  if (event?.target?.checked)
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

function showModal() {
  if (clothingItemDialog.value != null )
  clothingItemDialog.value.openModal();
  
}

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