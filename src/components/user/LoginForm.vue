<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();

const state = ref({
  email: '',
  password: ''
});

async function submit(): Promise<void> {
  try {
    await userStore.login(state.value.email, state.value.password);
    router.push('/');
  } catch (e) {
    alert(e);
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="flex gap-2">
    <input v-model="state.email" class="border p-1" />
    <input v-model="state.password" class="border p-1" />
    <button type="submit" class="p-1 bg-neutral-200">login</button>
  </form>
</template>
