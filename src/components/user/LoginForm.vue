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
    validation: 'required'
  }
];

async function submit(fields): Promise<void> {
  try {
    await userStore.login(fields.email, fields.password);
    router.push('/');
  } catch {
    userStore.setMessage('Erreur login');
  }
}
</script>

<template>
  <FormKit type="form" @submit="submit">
    <FormKitSchema :schema="formSchema" />
  </FormKit>
</template>
