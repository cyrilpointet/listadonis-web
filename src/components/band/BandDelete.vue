<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

async function deleteBand() {
  await userStore.deleteBand();
  router.push({ name: 'home' });
}
</script>

<template>
  <FormKit type="button" label="Supprimer" input-class="!bg-red-700" @click="deleteBand" />
</template>
