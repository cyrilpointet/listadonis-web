<script setup lang="ts">
import RegisterForm from '../components/user/RegisterForm.vue';
</script>

<template>
  <div>
    <div class="mx-auto max-w-xl">
      <h1 class="text-xl mb-4">Register</h1>
      <RegisterForm />
    </div>

    <RouterLink to="/login">Login</RouterLink>
  </div>
</template>
