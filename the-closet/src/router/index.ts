import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import RegisterPage from '../views/RegisterPage';

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
        redirect: '/tabs/add'
      },
      {
        path: 'wardrobe',
        component: () => import('@/views/WardrobeOverviewPage.vue')
      },
      {
        path: 'add',
        component: () => import('@/views/AddClothingPage.vue')
      },
      {
        path: 'washing',
        component: () => import('@/views/WashingPage.vue')
      },
      {
        path: 'registration', 
        component: () => import('@/views/RegisterPage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
