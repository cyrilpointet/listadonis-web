import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/user';

async function autoLog(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
) {
  const userStore = useUserStore();
  if (!userStore.isLogged) {
    try {
      await userStore.autoLogin();
      next();
      return;
    } catch {
      userStore.logout();
      next({ path: '/login' });
      return;
    }
  } else {
    next();
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: [autoLog]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
});

export default router;
