<script setup lang="ts">
import Header from '@/components/common/Header.vue';
import Alert from '@/components/common/Alert.vue';
import image from '@/assets/images/shopping.jpg';
</script>

<template>
  <div
    class="fixed inset-0 bg-neutral-200 flex flex-col overflow-auto gap-2 bg-cover bg-center"
    :style="{ backgroundImage: 'url(' + image + ')' }"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative">
      <Header class="mb-4" />
      <div class="container mx-auto px-2 sm:px-0 flex-1 mb-4">
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in" name="rotate">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
    <Alert />
  </div>
</template>
