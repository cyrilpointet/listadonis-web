<script setup lang="ts">
import LoginForm from '../components/user/LoginForm.vue'
</script>

<template>
  <div>
    <h1>Login</h1>
    <LoginForm />
    <RouterLink to="/register">Register</RouterLink>
  </div>
</template>
