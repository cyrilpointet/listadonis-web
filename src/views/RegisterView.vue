<script setup lang="ts">
import RegisterForm from '../components/user/RegisterForm.vue';
</script>

<template>
  <div class="pt-6">
    <div class="mx-auto max-w-xl">
      <h1 class="text-xl mb-4 text-center">Créer un compte</h1>
      <RegisterForm />
    </div>

    <div class="flex justify-center">
      <RouterLink to="/login" class="underline">J'ai déjà un compte ?</RouterLink>
    </div>
  </div>
</template>
