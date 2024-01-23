g<template>
  <ion-app>
    <ion-router-outlet />
    <Toast position="top-right"/>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import Toast from 'primevue/toast';


const { t } = useI18n();
</script>
