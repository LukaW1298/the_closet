<template>
  <ion-page>
    <ion-header>
      <nav-bar />
    </ion-header>
    <ion-content>
      <div v-if="pageMode == 'login'">
        <login-form>
          <p class="dark:text-neutral-100 text-center pt-5">
            {{ $t("message.notYetRegistered") }}
            <a class="text-royal-purple-500 dark:!text-royal-purple-400 no-underline cursor-pointer" @click="changeToRegistration">
              {{ $t("message.signUpHere") }}
            </a>
          </p>
        </login-form>
      </div>

      <div v-else>
        <registration-form>
          <p class="dark:text-neutral-100 text-center pt-5">
            {{ $t("message.alreadyHaveAnAcc") }}
            <a class="text-royal-purple-500 dark:!text-royal-purple-400 no-underline cursor-pointer" @click="changeToLogin">
              {{ $t("message.logInHere") }}
            </a>
          </p>
        </registration-form>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import LoginForm from '@/components/LoginComponent.vue';
import RegistrationForm from '@/components/RegistrationComponent.vue'
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

const pageMode = ref<string>("login");

function changeToRegistration() {
  pageMode.value = "register";
}

function changeToLogin() {
  pageMode.value = "login";
}
</script>
  