<script setup lang="ts">
import RegisterForm from '../components/user/RegisterForm.vue'
</script>

<template>
  <div>
    <h1>Register</h1>
    <RegisterForm />
    <RouterLink to="/login">Login</RouterLink>
  </div>
</template>
