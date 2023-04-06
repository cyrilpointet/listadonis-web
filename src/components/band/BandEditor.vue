<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { band } = storeToRefs(userStore);

async function submit(fields) {
  try {
    await userStore.updateBand(fields.name);
  } catch (e) {
    alert('Error');
  }
}
</script>

<template>
  <FormKit type="form" id="myForm" @submit="submit">
    <FormKit
      type="text"
      name="name"
      id="name"
      :value="band.name"
      validation="required|length:1,32"
    />
  </FormKit>
</template>
