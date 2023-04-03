<script setup lang="ts">
import LoginForm from '../components/user/LoginForm.vue';
</script>

<template>
  <div>
    <div class="mx-auto max-w-xl">
      <h1 class="text-xl mb-4">Login</h1>
      <LoginForm />
    </div>

    <RouterLink to="/register">Register</RouterLink>
  </div>
</template>
