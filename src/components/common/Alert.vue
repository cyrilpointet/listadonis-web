<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { message } = storeToRefs(userStore);
</script>

<template>
  <Transition name="slide">
    <div
      v-if="message"
      class="absolute left-10 right-10 bottom-4 bg-red-800 text-white shadow-lg p-2 rounded"
    >
      <p>{{ message }}</p>
    </div>
  </Transition>
</template>
