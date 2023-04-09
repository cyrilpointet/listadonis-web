<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue';

import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();
const { band } = storeToRefs(userStore);

async function removePost(postId: number) {
  try {
    await userStore.removePost(postId);
  } catch {
    alert('error');
  }
}
</script>

<template>
  <h4 class="mb-1">Posts</h4>
  <div
    v-for="(post, index) in band.posts"
    :key="index"
    class="py-2 border-t last:border-b flex items-center"
  >
    <p class="flex-1">{{ post.title }}</p>
    <button @click="removePost(post.id)" class="p-2 block bg-red-600 rounded">
      <FormKitIcon icon="trash" class="text-white block w-4 h-4" svg-class="!max-w-full" />
    </button>
  </div>
</template>
