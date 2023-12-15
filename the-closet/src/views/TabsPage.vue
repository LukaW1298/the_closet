<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet>
        
      </ion-router-outlet>
      
      <ion-tab-bar slot="bottom" color="primary">
        
        <ion-tab-button tab="outfits" href="/tabs/outfits">
          
          <ion-label>Outfits</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="wardrobe" href="/tabs/wardrobe">
          
          <ion-label>Kleiderschrank</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="add" @click="showModal" color="primary" data-bs-toggle="modal" data-bs-target="#modalClothingItem">
          <font-awesome-icon icon="fas fa-circle-plus" size="2x"/>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/washing">
          <ion-label>Waschen</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab1" href="/tabs/wardrobe">
          
          <ion-label>Profil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    <modal-dialog-clothing-item ref="modalDialogClothing" />
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, addCircle } from 'ionicons/icons';
import ModalDialogClothingItem from '@/components/ModalDialogAddClothingItem.vue'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
import { defineComponent, ref } from 'vue';

const modalDialogClothing = ref<any>(null); 

function showModal() {
  if (modalDialogClothing.value != null )
  modalDialogClothing.value.openModal();
  
}

</script>
<style scoped>
.tab-selected {
    background-color: rgb(var(--royal-purple-900));
}
</style>
