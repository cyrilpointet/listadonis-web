<script setup lang="ts">
import { FormKitIcon } from '@formkit/vue';
import { reset } from '@formkit/core';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

async function submit(fields) {
  try {
    await userStore.createBand(fields.name);
    reset('myForm');
  } catch (e) {
    alert('Error');
  }
}
</script>

<template>
  <FormKit
    type="form"
    id="myForm"
    @submit="submit"
    :actions="false"
    :config="{ validationVisibility: 'submit' }"
  >
    <div class="flex w-full items-start gap-4">
      <FormKit
        type="text"
        name="name"
        id="name"
        validation="required|length:1,32"
        outer-class="flex-1 !mb-0"
      />
      <button type="submit" class="flex items-center justify-center bg-primary p-2 rounded-full">
        <FormKitIcon icon="add" class="text-white w-6 h-6 block" />
      </button>
    </div>
  </FormKit>
</template>
