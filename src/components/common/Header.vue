<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import ButtonIcon from '@/components/common/ButtonIcon.vue';
import router from '@/router';

const userStore = useUserStore();

const logout = () => {
  router.push('/register');
  userStore.logout();
};
</script>

<template>
  <div class="w-full bg-primary text-white p-2 flex items-center shadow gap-4">
    <h1 class="text-xl flex-1">Pimp my list</h1>
    <RouterLink to="/">
      <ButtonIcon v-if="userStore.user" icon="home" variant="neutral" />
    </RouterLink>
    <ButtonIcon v-if="userStore.user" @click="logout" icon="logout" variant="neutral" />
  </div>
</template>
