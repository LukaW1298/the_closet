<template>
  <ion-page>
    <ion-header>
     <nav-bar />
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Anmelden</ion-title>
        </ion-toolbar>
      </ion-header>


      <div v-if="pageMode == 'login'">

        <login-form />
        <p class="text-center pt-5">Noch kein Nutzerkonto? <a @click="pageMode = 'register'"
            :style="{ textDecoration: 'none', color: 'var(--bs-primary-text-emphasis)', cursor: 'pointer' }">Registrieren Sie
            sich hier.</a></p>


      </div>
      <div v-else>

        <registration-form></registration-form>
        <p class="text-center pt-5">Sie haben schon ein Nutzerkonto?
          <a @click="pageMode = 'login'"
            :style="{ textDecoration: 'none', color: 'var(--bs-primary-text-emphasis)', cursor: 'pointer' }">
            Melden Sie sich hier an.
          </a>
        </p>
      </div>

    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import LoginForm from '@/components/LoginComponent.vue';
import RegistrationForm from '@/components/RegistrationComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '@/router';
import { ref } from 'vue';
import NavBar from '@/components/Navbar.vue';

const pageMode = ref<string>("login");


</script>
  