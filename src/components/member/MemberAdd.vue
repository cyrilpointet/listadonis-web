<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import { reset } from '@formkit/core';

const userStore = useUserStore();
async function submit(fields) {
  try {
    await userStore.addMember(fields.email);
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
    submit-label="Ajouter un membre"
    @submit="submit"
    :config="{ validationVisibility: 'submit' }"
  >
    <FormKit type="email" name="email" id="email" validation="required|email" label="Email" />
  </FormKit>
</template>
