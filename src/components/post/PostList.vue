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
    userStore.setMessage('Une erreur est survenue');
  }
}
</script>

<template>
  <p v-if="band.posts.length < 1" class="my-4 italic">Aucun item dans la list</p>
  <TransitionGroup v-else name="list" tag="div" class="relative">
    <div v-for="post in band.posts" :key="post.id" class="py-2 border-b flex items-center">
      <p class="flex-1">{{ post.title }}</p>
      <ButtonIcon @click="removePost(post.id)" icon="delete" variant="danger" />
    </div>
  </TransitionGroup>
</template>
