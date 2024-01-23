<template>
  <IonToolbar color="primary">
    <div class="w-full">
      <div class="flex justify-between items-center w-full " href="javascript:void(0)">
        <div class="text-neutral-100 max-sm:text-xs flex items-center">
          <img
            src="/resources/favicon-96.png" alt=""
            width="30" height="24"
            class="inline-block align-top"
          >
          The Closet
        </div>
        <div class="text-neutral-100" data-test-id="navbar-text">
          <slot />
        </div>
        <div class="flex items-center text-neutral-100 gap-x-3 pr-4">
          <font-awesome-icon icon="fa-moon" class="text-neutral-100" />
          <div class="form-check form-switch mr-[-0.5em]">
            <!-- <input
              class="form-check-input" type="checkbox"
              role="switch" aria-label="Use lightmode"
              :checked="isThemeLight" @change="toggleColorMode"
            > -->
            <InputSwitch
              v-model="isThemeLight" :pt="{
                slider: ({ props }) => ({
                  class: props.modelValue ? 'bg-royal-purple-800' : 'bg-gray-400'
                })
              }"
            />
          </div>
          <font-awesome-icon icon="fa-sun" />
        </div>
      </div>
    </div>
  </IonToolbar>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import { usePrimeVue } from 'primevue/config';
import InputSwitch from 'primevue/inputswitch';
import { IonToolbar } from '@ionic/vue';

const isThemeLight = ref(false);
const primeVue = usePrimeVue();

watch(isThemeLight, async (newValue) => {
  console.log(newValue);

  if (newValue) {
    switchToLightMode();
  }
  else {
    switchToDarkMode();
  }
});

function switchToLightMode() {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");

  primeVue.changeTheme('lara-dark-purple', 'lara-light-purple', 'theme-link', () => {
    console.log("Switched to light theme.");
  });

  isThemeLight.value = true;
}

function switchToDarkMode() {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");

  primeVue.changeTheme('lara-light-purple', 'lara-dark-purple', 'theme-link', () => {
    console.log("Switched to dark theme.");
  });

  isThemeLight.value = false;
}

onBeforeMount(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    switchToDarkMode();
  }
  else {
    switchToLightMode();
  }
});
</script>

<style scoped>
.form-check-input:checked {
  background-color: rgb(var(--royal-purple-500));
  border-color: #7030a0;
}
</style>