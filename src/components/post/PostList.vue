<script setup lang="ts">
import ButtonIcon from '@/components/common/ButtonIcon.vue';

import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';

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
  <p v-if="band.posts.length < 1" class="my-4 italic">Aucun item dans la list</p>
  <div v-else>
    <div v-for="(post, index) in band.posts" :key="index" class="py-2 border-b flex items-center">
      <p class="flex-1">{{ post.title }}</p>
      <ButtonIcon @click="removePost(post.id)" icon="delete" variant="danger" />
    </div>
  </div>
</template>
