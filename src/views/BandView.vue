<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

import BandEditor from '@/components/band/BandEditor.vue';
import BandDelete from '@/components/band/BandDelete.vue';
import MemberList from '@/components/member/MemberList.vue';
import MemberAdd from '@/components/member/MemberAdd.vue';
import PostList from '@/components/post/PostList.vue';
import PostAdd from '@/components/post/PostAdd.vue';
import Card from '@/components/common/Card.vue';
import Loader from '@/components/common/Loader.vue';

import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

enum tabsEnum {
  ITEMS,
  MEMBERS,
  EDIT
}

const activeTab = ref<tabsEnum>(tabsEnum.ITEMS);

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
    userStore.setMessage('Une erreur est survenue');
    router.push({ name: 'home' });
  }
}
</script>

<template>
  <Card>
    <div v-if="!userStore.$state.band" class="flex justify-center">
      <Loader class="w-20" />
    </div>
    <div v-else class="mb-4">
      <h1 class="text-xl mb-4 text-center font-bold">{{ band.name }}</h1>

      <div class="flex border-b-2">
        <button
          @click="activeTab = tabsEnum.ITEMS"
          class="px-4 py-1 hover:bg-neutral-100 cursor-pointer transition"
          :class="{ 'border-b-4 border-primary font-bold': activeTab === tabsEnum.ITEMS }"
        >
          Items
        </button>
        <button
          @click="activeTab = tabsEnum.MEMBERS"
          class="px-4 py-1 hover:bg-neutral-100 cursor-pointer transition"
          :class="{ 'border-b-4 border-primary font-bold': activeTab === tabsEnum.MEMBERS }"
        >
          Partage
        </button>
        <button
          @click="activeTab = tabsEnum.EDIT"
          class="px-4 py-1 hover:bg-neutral-100 cursor-pointer transition"
          :class="{ 'border-b-4 border-primary font-bold': activeTab === tabsEnum.EDIT }"
        >
          Edition
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="activeTab === tabsEnum.ITEMS">
          <PostList class="mb-4" />
          <PostAdd />
        </div>

        <div v-else-if="activeTab === tabsEnum.MEMBERS">
          <MemberList class="mb-8" />
          <MemberAdd />
        </div>

        <div v-else-if="activeTab === tabsEnum.EDIT" class="pt-6">
          <BandEditor class="mb-8" />
          <BandDelete />
        </div>
      </Transition>
    </div>
  </Card>
</template>
