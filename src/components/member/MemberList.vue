<script setup lang="ts">
import ButtonIcon from '@/components/common/ButtonIcon.vue';

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
  <div>
    <div
      v-for="(user, index) in band.users"
      :key="index"
      class="py-2 border-t last:border-b flex items-center"
    >
      <p class="flex-1">{{ user.email }}</p>
      <ButtonIcon @click="removeMember(user.id)" icon="person_remove" variant="danger" />
    </div>
  </div>
</template>
