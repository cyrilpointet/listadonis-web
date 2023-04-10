<script setup lang="ts">
import type { UserBand } from '@/stores/user';

const props = defineProps<{
  bands: UserBand;
}>();
</script>

<template>
  <div>
    <RouterLink
      v-for="(band, index) in bands"
      :key="index"
      :to="`/band/${band.id}`"
      class="py-2 px-1 border-t last:border-b flex items-center w-full hover:bg-neutral-200"
    >
      <p class="flex-1">{{ band.name }}</p>
      <span class="material-icons">chevron_right</span>
    </RouterLink>
  </div>
</template>
