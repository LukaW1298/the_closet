<template>
  <ion-page>
    <ion-header>
      <nav class="navbar navbar-light bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand d-flex justify-content-between w-100" href="#">
            <div>
              <img src="/resources/favicon-96.png" alt="" width="30" height="24" class="d-inline-block align-text-top">
              The Closet
            </div>
            <div class="d-flex align-items-center" :style="{ columnGap: '10px' }">
              <font-awesome-icon icon="fa-moon" />

              <div class="form-check form-switch">

                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">

              </div>
              <font-awesome-icon icon="fa-sun" />
            </div>
          </a>
        </div>
      </nav>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Anmelden</ion-title>
        </ion-toolbar>
      </ion-header>


      <div v-if="pageMode == 'login'">

        <login-form>
          <p class="text-center pt-5">Noch kein Nutzerkonto? <a @click="pageMode = 'register'"
              :style="{ textDecoration: 'none', color: 'var(--bs-primary-text-emphasis)', cursor: 'pointer' }">Registrieren
              Sie
              sich hier.</a></p>
        </login-form>


      </div>
      <div v-else>

        <registration-form>
          <p class="text-center pt-5">Sie haben schon ein Nutzerkonto?
            <a @click="pageMode = 'login'"
              :style="{ textDecoration: 'none', color: 'var(--bs-primary-text-emphasis)', cursor: 'pointer' }">
              Melden Sie sich hier an.
            </a>
          </p>
        </registration-form>
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

const pageMode = ref<string>("login");


</script>
  