import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

// import NavBar from '@/components/NavBar.vue'
import NavBar from '../../src/components/NavBar.vue';
import  PrimeVue from 'primevue/config';
import InputSwitch from 'primevue/inputswitch';
import { IonToolbar } from '@ionic/vue';
import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import { useUserStore } from '../../src/store/user';

import { createI18n } from 'vue-i18n';
import { messages } from '../../src/messages';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'de',
  messages
});


const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(i18n);

const userStore = useUserStore();
userStore.id = 25;

test("Navbar default slot", () => {
  const wrapper = mount(NavBar, {
    slots: {
      default: "Main Title"
    },
    global: {
      components: {
        InputSwitch,
        IonToolbar 
      },
      plugins: [ PrimeVue ]
    }
  });

  expect(wrapper.find("[data-test-id=navbar-text]").text()).toEqual("Main Title");
});