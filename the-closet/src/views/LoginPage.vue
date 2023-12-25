<template>
  <ion-page>
    <ion-header>
      <nav-bar />
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-if="pageMode == 'login'">
        <login-form>
          <p class="text-center pt-5">Not yet registered? <a class="text-royal-purple-500" @click="pageMode = 'register'"
              :style="{ textDecoration: 'none', cursor: 'pointer' }">
              Sign up here.</a></p>
        </login-form>
      </div>

      <div v-else>
        <registration-form>
          <p class="text-center pt-5">You already have an account?
            <a @click="pageMode = 'login'"
          class="text-royal-purple-500"
              :style="{ textDecoration: 'none', cursor: 'pointer' }">
              Log in here.
            </a>
          </p>
        </registration-form>
      </div>

    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import LoginForm from '@/components/LoginComponent.vue';
import RegistrationForm from '@/components/RegistrationComponent.vue'
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

const pageMode = ref<string>("login");


</script>
  