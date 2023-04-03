<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();

const formSchema = [
  {
    $formkit: 'text',
    name: 'email',
    label: 'Email',
    validation: 'required|email'
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Mot de passe',
    validation: 'required|length:8,16'
  }
];

async function submit(fields): Promise<void> {
  try {
    await userStore.register(fields.email, fields.password);
    router.push('/');
  } catch (e) {
    alert(e);
  }
}
</script>

<template>
  <FormKit type="form" @submit="submit">
    <FormKitSchema :schema="formSchema" />
  </FormKit>
</template>
