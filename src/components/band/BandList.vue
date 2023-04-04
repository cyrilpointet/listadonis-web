<script setup lang="ts">
import type { UserBand } from '@/stores/user';

const props = defineProps<{
  bands: UserBand;
}>();
</script>

<template>
  <div>
    <div v-for="(band, index) in bands" :key="index" class="py-2 border-t last:border-b">
      <p>{{ band.name }}</p>
    </div>
  </div>
</template>
