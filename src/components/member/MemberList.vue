<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue';

import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();
const { band } = storeToRefs(userStore);

async function removeMember(memberId: number) {
  try {
    await userStore.removeMember(memberId);
    if (memberId === userStore.user?.id) {
      router.push('/');
    }
  } catch {
    alert('error');
  }
}
</script>

<template>
  <h4 class="mb-1">Membres</h4>
  <div
    v-for="(user, index) in band.users"
    :key="index"
    class="py-2 border-t last:border-b flex items-center"
  >
    <p class="flex-1">{{ user.email }}</p>
    <button @click="removeMember(user.id)" class="p-2 block bg-red-600 rounded">
      <FormKitIcon icon="trash" class="text-white block w-4 h-4" svg-class="!max-w-full" />
    </button>
  </div>
</template>
