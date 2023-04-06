<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

import BandEditor from '@/components/band/BandEditor.vue';
import BandDelete from '@/components/band/BandDelete.vue';

import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onBeforeMount(() => {
  init();
});

onUnmounted(() => {
  userStore.resetBand();
});

const { band } = storeToRefs(userStore);

async function init() {
  try {
    const id = route.params.id;
    await userStore.getBand(parseInt(id));
  } catch {
    alert('Error');
    router.push({ name: 'home' });
  }
}
</script>

<template>
  <div>
    <div v-if="!userStore.$state.band">
      <p>loading</p>
    </div>
    <div v-else class="mb-4">
      <h1 class="text-xl mb-4">{{ band.name }}</h1>

      <BandEditor />

      <BandDelete />

      <h4 class="mb-1">Membres</h4>
      <div v-for="(user, index) in band.users" :key="index" class="py-2 border-t last:border-b">
        <p>{{ user.email }}</p>
      </div>
    </div>

    <RouterLink to="/">Home</RouterLink>
  </div>
</template>
