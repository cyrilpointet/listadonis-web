<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { reset } from '@formkit/core';

import ButtonIcon from '@/components/common/ButtonIcon.vue';

const userStore = useUserStore();
async function submit(fields) {
  try {
    await userStore.addPost(fields.item);
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
    submit-label="Ajouter un item"
    @submit="submit"
    :config="{ validationVisibility: 'submit' }"
    :actions="false"
  >
    <div class="flex w-full items-start gap-4">
      <FormKit
        type="text"
        name="item"
        id="MemberAdd.vue"
        validation="required"
        outer-class="flex-1 !mb-0"
        placeholder="Produit"
        :validation-messages="{
          required: 'Un nom est requis'
        }"
      />
      <ButtonIcon type="submit" icon="add" class="mt-1" />
    </div>
  </FormKit>
</template>
