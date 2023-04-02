<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import router from "@/router";

const userStore = useUserStore();

const name = userStore.$state.user?.email.split('@')[0] || 'unknown'

const logout = () => {
  router.push("/login");
  userStore.logout();
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <h2>Hello {{name}}</h2>
    <button @click="logout">logout</button>
  </div>
</template>
