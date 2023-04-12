<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import BandList from '@/components/band/BandList.vue';
import BandCreator from '@/components/band/BandCreator.vue';
import Card from '@/components/common/Card.vue';

const userStore = useUserStore();

const name = userStore.$state.user?.email.split('@')[0] || 'unknown';

const bands = userStore.$state.user?.bands || [];
</script>

<template>
  <Card>
    <h1 class="mb-4 text-xl font-bold text-center">Mes listes</h1>

    <BandList :bands="bands" class="mb-8" />

    <div class="mb-4">
      <BandCreator class="mb-4" />
    </div>
  </Card>
</template>
