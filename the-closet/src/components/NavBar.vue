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
        <div class=" text-neutral-100 pr-1">
          <!-- <font-awesome-icon icon="fa-moon" class="text-neutral-100" />
          <div class="form-check form-switch mr-[-0.5em]">
           
            <InputSwitch
              v-model="isThemeLight" :pt="{
                slider: ({ props }) => ({
                  class: props.modelValue ? 'bg-royal-purple-800' : 'bg-gray-400'
                })
              }"
            />
          </div>
          <font-awesome-icon icon="fa-sun" /> -->
          <Button
            icon="pi pi-user" rounded
            outlined class="h-10 w-10"
            @click="showSidebar"
          />
        </div>
      </div>
    </div>
    <Sidebar
      v-model:visible="sidebarVisible" header="Sidebar"
      position="right"
    >
      <p>Lorem ipsum dolor sit amet.</p>
    </Sidebar>
  </IonToolbar>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import { usePrimeVue } from 'primevue/config';
import InputSwitch from 'primevue/inputswitch';
import { IonToolbar } from '@ionic/vue';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';



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

// profile sidebar

const sidebarVisible = ref<boolean>(false);

function showSidebar () {
  sidebarVisible.value = true;
}

function hideSidebar () {
  sidebarVisible.value = false;
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