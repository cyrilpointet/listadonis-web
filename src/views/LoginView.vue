<script setup lang="ts">
import LoginForm from '../components/user/LoginForm.vue';
import Card from '@/components/common/Card.vue';
</script>

<template>
  <div class="pt-6">
    <Card class="mx-auto max-w-xl">
      <h1 class="text-xl mb-4 text-center">Connexion</h1>
      <LoginForm />
    </Card>

    <div class="flex justify-center mt-4">
      <RouterLink to="/register" class="underline">Je n'ai pas de compte ?</RouterLink>
    </div>
  </div>
</template>
