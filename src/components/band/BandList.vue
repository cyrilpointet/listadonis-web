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
      class="py-2 border-t last:border-b block w-full"
    >
      <p>{{ band.name }}</p>
    </RouterLink>
  </div>
</template>
