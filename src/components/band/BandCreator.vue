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
        label="Nouvelle liste"
      />
      <FormKit type="submit" label="Supprimer" input-class="!p-2 !mt-5 !mr-0">
        <FormKitIcon icon="add" class="text-white !w-6 !h-6" svg-class="!max-w-full" />
      </FormKit>
    </div>
  </FormKit>
</template>
