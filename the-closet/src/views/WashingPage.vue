<template>
  <ion-page>
    <ion-header>
      <NavBar>Waschen</NavBar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Waschen
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="container">
        <div
          v-for="mode in washingModes" :key="mode.id"
          class="card mt-3"
        >
          <div class="card-header">
            {{ mode.washingMode }}
          </div>
          <div class="card-body">
            <div class="flex justify-end">
              <button class="btn btn-primary self-end">
                Waschen
              </button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import NavBar from '@/components/NavBar.vue';
import { getWashingModes } from '@/composables/GetCalls';
import { WashingMode } from '@/custom_types';
import { ref, onBeforeMount } from 'vue';

const washingModes = ref<WashingMode[]>([]);

onBeforeMount(() => {
  getWashingModes().then((data) => {
    washingModes.value = data;
    console.log(data);
  })
})
</script>
