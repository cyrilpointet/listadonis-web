<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();

const name = userStore.$state.user?.email.split('@')[0] || 'unknown';

const logout = () => {
  router.push('/login');
  userStore.logout();
};
</script>

<template>
  <div>
    <h1 class="mb-2 text-xl">Home</h1>
    <p class="mb-2">Hello {{ name }}</p>
    <FormKit type="button" label="Déconnexion" @click="logout" />
  </div>
</template>
