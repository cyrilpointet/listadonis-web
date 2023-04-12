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
  <FormKit
    type="button"
    label="Supprimer la liste"
    input-class="!bg-red-700 !w-full"
    wrapper-class="w-full"
    outer-class="w-full"
    @click="deleteBand"
  />
</template>
