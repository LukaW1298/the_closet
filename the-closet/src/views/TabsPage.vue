<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/wardrobe">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Kleiderschrank</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/add" color="primary">
          <ion-icon aria-hidden="true" :icon="addCircle" color="primary" />
          <ion-label>Hinzufügen</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/washing">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Waschen</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, addCircle } from 'ionicons/icons';
</script>
