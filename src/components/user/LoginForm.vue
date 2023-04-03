<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();

async function submit(fields): Promise<void> {
  try {
    await userStore.login(fields.email, fields.password);
    router.push('/');
  } catch (e) {
    alert(e);
  }
}
</script>

<template>
  <FormKit type="form" @submit="submit">
    <FormKit
      type="text"
      name="email"
      id="email"
      label="Email"
      placeholder="moi@moi.moi"
      validation="required|email"
    />
    <FormKit
      type="password"
      name="password"
      id="password"
      label="Mot de passe"
      validation="required"
    />
  </FormKit>
</template>
