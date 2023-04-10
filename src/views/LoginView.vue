<script setup lang="ts">
import LoginForm from '../components/user/LoginForm.vue';
</script>

<template>
  <div class="pt-6">
    <div class="mx-auto max-w-xl">
      <h1 class="text-xl mb-4 text-center">Connexion</h1>
      <LoginForm />
    </div>

    <div class="flex justify-center">
      <RouterLink to="/register" class="underline">Je n'ai pas de compte ?</RouterLink>
    </div>
  </div>
</template>
