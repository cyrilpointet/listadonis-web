<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

import BandEditor from '@/components/band/BandEditor.vue';
import BandDelete from '@/components/band/BandDelete.vue';
import MemberList from '@/components/member/MemberList.vue';
import MemberAdd from '@/components/member/MemberAdd.vue';
import PostList from '@/components/post/PostList.vue';
import PostAdd from '@/components/post/PostAdd.vue';
import Card from '@/components/common/Card.vue';

import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onBeforeMount(() => {
  init();
});

onUnmounted(() => {
  userStore.resetBand();
});

const { band } = storeToRefs(userStore);

async function init() {
  try {
    const id = route.params.id;
    await userStore.getBand(parseInt(id));
  } catch {
    alert('Error');
    router.push({ name: 'home' });
  }
}
</script>

<template>
  <Card>
    <div v-if="!userStore.$state.band">
      <p>loading</p>
    </div>
    <div v-else class="mb-4">
      <h1 class="text-xl mb-4">{{ band.name }}</h1>

      <BandEditor />
      <BandDelete />

      <MemberList />
      <MemberAdd />

      <PostList />
      <PostAdd />
    </div>
  </Card>
</template>
