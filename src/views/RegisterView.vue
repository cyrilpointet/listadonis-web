<script setup lang="ts">
import RegisterForm from '../components/user/RegisterForm.vue';
import Card from '@/components/common/Card.vue';
</script>

<template>
  <div class="pt-6">
    <Card class="mx-auto max-w-xl">
      <h1 class="text-xl mb-4 text-center">Créer un compte</h1>
      <RegisterForm />
    </Card>

    <div class="flex justify-center mt-4">
      <RouterLink to="/login" class="underline">J'ai déjà un compte ?</RouterLink>
    </div>
  </div>
</template>
