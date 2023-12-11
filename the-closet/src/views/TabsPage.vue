<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet>

      </ion-router-outlet>
    
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/wardrobe">
          <font-awesome-layers class="fa-lg">

<font-awesome-icon icon="fa-solid fa-border-all"  transform="right-5  up-2" :style="{opacity: '60%'}"/>
<font-awesome-icon icon="fa-solid fa-shirt" transform="shrink-2 down-2 left-5" position="bottom-right" />

</font-awesome-layers>    
          <ion-label>Kleiderschrank</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" @click="showModal" color="primary" data-bs-toggle="modal" data-bs-target="#modalClothingItem">
          <ion-icon aria-hidden="true" :icon="addCircle" color="primary" />
          <ion-label>Hinzufügen</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/washing">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Waschen</ion-label>
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
