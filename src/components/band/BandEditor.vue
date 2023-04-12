<script setup lang="ts">
import { storeToRefs } from 'pinia';

import ButtonIcon from '@/components/common/ButtonIcon.vue';

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
  <div>
    <FormKit type="form" id="myForm" @submit="submit" :actions="false">
      <div class="flex w-full items-start gap-4">
        <FormKit
          type="text"
          name="name"
          id="name"
          :value="band.name"
          validation="required|length:1,32"
          label="Renommer la liste"
          outer-class="flex-1 !mb-0"
        />
        <ButtonIcon type="submit" icon="done" class="mt-6" />
      </div>
    </FormKit>
  </div>
</template>
