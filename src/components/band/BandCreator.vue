<script setup lang="ts">
import { reset } from '@formkit/core';
import { useUserStore } from '@/stores/user';
import ButtonIcon from '@/components/common/ButtonIcon.vue';

const userStore = useUserStore();

async function submit(fields) {
  try {
    await userStore.createBand(fields.name);
    reset('myForm');
  } catch (e) {
    userStore.setMessage('Une erreur est survenue');
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
        placeholder="Nom"
      />
      <ButtonIcon type="submit" icon="add" class="mt-6" />
    </div>
  </FormKit>
</template>
