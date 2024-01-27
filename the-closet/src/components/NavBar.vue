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
          <Button
            icon="pi pi-user" rounded
            outlined class="h-8 sm:h-10 w-8 sm:w-10 text-royal-purple-300"
            @click="showSidebar"
            v-show="userStore.isLoggedIn"
          />
        </div>
      </div>
    </div>
    <Sidebar
      v-model:visible="sidebarVisible" :header="userStore.name"
      position="right"
    >
      <template #header>
        <div class="flex gap-x-3 items-center">
          <i class="pi pi-user" />
          <span class="text-xl">
            {{ userStore.name }}
          </span>
        </div>
      </template>
      <div class="flex flex-col justify-between h-full">
        <div>
          <div class="flex gap-x-3 items-center">
            <i class="pi pi-envelope" />
            <span>
              {{ userStore.emailAddress }}
            </span>
          </div>

          <br>

          <h5>Settings</h5>

          <Divider />

          <div class="flex gap-x-2 items-center">
            <i class="pi pi-moon" />
            <label>Darkmode</label>
            <div>
              <InputSwitch
                v-model="isThemeDark" :pt="{
                  slider: ({ props }) => ({
                    class: props.modelValue ? 'bg-royal-purple-700' : 'bg-gray-400'
                  })
                }"
              />
            </div>
          </div>

          <div class="flex gap-x-2 items-center pt-3">
            <i class="pi pi-language" />
            <label id="language-label">Language</label>
          </div>

          <div class="pt-2">
            <SelectButton
              v-model="language" :options="languageOptions"
              option-label="label"
              option-value="value"
              aria-labelledby="language-label"
              @change="console.log(language)"
            />
          </div>
        </div>
        <div class="self-center">
          <Button label="Log out" @click="logout" />
        </div>
      </div>
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
import { useUserStore } from '@/store/user';
import Divider from 'primevue/divider';
import SelectButton from 'primevue/selectbutton';
import { I18nD, useI18n } from 'vue-i18n';
import router from '@/router';





const isThemeDark = ref(true);
const primeVue = usePrimeVue();

watch(isThemeDark, async (newValue) => {
  console.log(newValue);

  if (newValue) {
    switchToDarkMode();
  }
  else {
   
    switchToLightMode();
  }
});

function switchToLightMode() {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");

  primeVue.changeTheme('lara-dark-purple', 'lara-light-purple', 'theme-link', () => {
    console.log("Switched to light theme.");
  });

  isThemeDark.value = false;
}

function switchToDarkMode() {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");

  primeVue.changeTheme('lara-light-purple', 'lara-dark-purple', 'theme-link', () => {
    console.log("Switched to dark theme.");
  });

  isThemeDark.value = true;
}

// profile sidebar

const sidebarVisible = ref<boolean>(false);

function logout() {
  userStore.logout();
  sidebarVisible.value = false;
  router.push("/login");
}

function showSidebar () {
  sidebarVisible.value = true;
}

function hideSidebar () {
  sidebarVisible.value = false;
}

// sidebar user profile

const userStore = useUserStore();

// language
const i = useI18n({});
console.log(i);
console.log(i.locale);
console.log(i.fallbackLocale);

const language = ref("en");

const languageOptions = [
  {
    label: "English",
    value: "en"
  },
  {
    label: "Deutsch",
    value: "de"
  }
];

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