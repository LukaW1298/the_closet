import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router';
import store from './store'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
//import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import '../scss/custom.scss'

import 'vue-swatches/dist/vue-swatches.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPen, faShirt, faPlus, faCirclePlus, faCircle, faBorderAll, faSun, faMoon, faSoap, faCircleCheck, faXmark, faCheck, faSquare } from '@fortawesome/free-solid-svg-icons'

/* PrimeVue */
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';

import 'bootstrap/dist/js/bootstrap.min.js'

import { createPinia } from 'pinia';

import { createI18n } from 'vue-i18n';
import { messages } from './messages';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'de',
  messages
})

library.add(faPen, faShirt, faPlus, faCirclePlus, faCircle, faBorderAll, faSun, faMoon, faSoap, faCircleCheck, faXmark, faCheck, faSquare);

const pinia = createPinia();

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .use(pinia)
  .use(i18n)
  .use(PrimeVue)
  .component("FontAwesomeIcon", FontAwesomeIcon);

router.isReady().then(() => {
  app.mount('#app');
});

// use global stores

import { useBrandsStore, useMaterialsStore, useStatusStore, useWashingModeStore, useColorStore }
  from '@/store/masterdata';

const brandStore = useBrandsStore();
const materialsStore = useMaterialsStore();
const statusStore = useStatusStore();
const washingModeStore = useWashingModeStore();
const colorStore = useColorStore();

for (const store of [brandStore, materialsStore, statusStore, washingModeStore, colorStore]) {
  store.fetch();
}