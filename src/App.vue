<script setup lang="ts">
import Header from '@/components/common/Header.vue';
</script>

<template>
  <div class="fixed inset-0 bg-neutral-200 flex flex-col overflow-auto gap-2">
    <Header />
    <div class="container mx-auto px-2 sm:px-0 flex-1 mb-4">
      <RouterView />
    </div>
  </div>
</template>
