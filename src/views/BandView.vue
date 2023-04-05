<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

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

async function submit(fields) {
  try {
    await userStore.updateBand(fields.name);
  } catch (e) {
    alert('Error');
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

      <FormKit type="form" id="myForm" @submit="submit">
        <FormKit
          type="text"
          name="name"
          id="name"
          :value="band.name"
          validation="required|length:1,32"
        />
      </FormKit>

      <h4 class="mb-1">Membres</h4>
      <div v-for="(user, index) in band.users" :key="index" class="py-2 border-t last:border-b">
        <p>{{ user.email }}</p>
      </div>
    </div>

    <RouterLink to="/">Home</RouterLink>
  </div>
</template>
