<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import BandList from '@/components/band/BandList.vue';
import BandCreator from '@/components/band/BandCreator.vue';

const userStore = useUserStore();

const name = userStore.$state.user?.email.split('@')[0] || 'unknown';

const bands = userStore.$state.user?.bands || [];
</script>

<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Mes listes</h1>

    <BandList :bands="bands" class="mb-4" />

    <div class="mb-4">
      <BandCreator class="mb-4" />
    </div>
  </div>
</template>
