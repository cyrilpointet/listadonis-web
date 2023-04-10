<script setup lang="ts">
import Header from '@/components/common/Header.vue';
</script>

<template>
  <Header class="mb-2" />
  <div class="container mx-auto px-2 sm:px-0">
    <RouterView />
  </div>
</template>
