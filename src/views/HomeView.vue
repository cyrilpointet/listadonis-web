<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import BandList from '@/components/band/BandList.vue';
import BandCreator from '@/components/band/BandCreator.vue';

const userStore = useUserStore();

const name = userStore.$state.user?.email.split('@')[0] || 'unknown';

const bands = userStore.$state.user?.bands || [];

const logout = () => {
  router.push('/login');
  userStore.logout();
};
</script>

<template>
  <div>
    <h1 class="mb-2 text-xl">Home</h1>
    <p class="mb-2">Hello {{ name }}</p>

    <BandList :bands="bands" class="mb-4" />

    <div class="mb-4">
      <BandCreator class="mb-4" />
    </div>

    <FormKit type="button" label="Déconnexion" @click="logout" />
  </div>
</template>
