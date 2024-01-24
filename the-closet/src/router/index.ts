import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue';
import RegisterPage from '@/views/RegisterPage';
import { useUserStore } from '@/store/user';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/wardrobe'
      },
      {
        name: "Wardrobe",
        path: 'wardrobe',
        component: () => {
          return import('@/views/WardrobeOverviewPage.vue');
        }
      },
      {
        path: 'washing',
        component: () => {
          return import('@/views/WashingPage.vue');
        }
      },
      {
        path: 'profile',
        component: () => {
          return import('@/views/ProfilePage.vue');
        }
      },
      {
        path: 'outfits',
        component: () => {
          return import('@/views/OutfitsPage.vue');
        }
      }
    ]
  },
  {
    name: "Login",
    path: '/login',
    component: () => {
      return import('@/views/LoginPage.vue');
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  
  if (userStore.isLoggedIn) {
    return to.name == "Login" ? {
      name: "Wardrobe" 
    } : true;
  }
  else if (to.name !== "Login") {
    return {
      name: "Login" 
    };
  }
});

export default router;
