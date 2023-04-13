<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { reset } from '@formkit/core';

import ButtonIcon from '@/components/common/ButtonIcon.vue';

const userStore = useUserStore();
async function submit(fields) {
  try {
    await userStore.addMember(fields.email);
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
    submit-label="Ajouter un membre"
    @submit="submit"
    :config="{ validationVisibility: 'submit' }"
    :actions="false"
  >
    <div class="flex w-full items-start gap-4">
      <FormKit
        type="email"
        name="email"
        id="email"
        validation="required|email"
        label="Ajouter un membre"
        outer-class="flex-1 !mb-0"
        placeholder="email"
        :validation-messages="{
          required: 'Un email est requis'
        }"
      />
      <ButtonIcon type="submit" icon="person_add" class="mt-6" />
    </div>
  </FormKit>
</template>
