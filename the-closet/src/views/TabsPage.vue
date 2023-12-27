<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar
        slot="bottom"
        color="primary"
      >
        <ion-tab-button
          tab="outfits"
          href="/tabs/outfits"
        >
          <ion-label>Outfits</ion-label>
        </ion-tab-button>
        <ion-tab-button
          tab="wardrobe"
          href="/tabs/wardrobe"
        >
          <ion-label>Wardrobe</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
</script>

<style scoped>
.tab-selected {
  background-color: rgb(var(--royal-purple-900));
}
</style>
