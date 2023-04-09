<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import { reset } from '@formkit/core';

const userStore = useUserStore();
async function submit(fields) {
  try {
    await userStore.addPost(fields.item);
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
    submit-label="Ajouter un item"
    @submit="submit"
    :config="{ validationVisibility: 'submit' }"
  >
    <FormKit type="text" name="item" id="MemberAdd.vue" validation="required" label="Titre" />
  </FormKit>
</template>
