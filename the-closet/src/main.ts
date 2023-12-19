import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
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

//import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap"

import 'vue-swatches/dist/vue-swatches.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPen, faShirt, faPlus, faCirclePlus, faCircle, faBorderAll, faSun, faMoon, faSoap } from '@fortawesome/free-solid-svg-icons'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'



library.add(faPen, faShirt, faPlus, faCirclePlus, faCircle, faBorderAll, faSun, faMoon, faSoap);

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon);
  
router.isReady().then(() => {
  app.mount('#app');
});

