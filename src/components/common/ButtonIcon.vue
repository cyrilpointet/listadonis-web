<script setup lang="ts">
const props = defineProps<{
  icon: string;
  variant?: 'primary' | 'neutral' | 'danger';
  type?: 'button' | 'submit' | 'reset';
}>();

const classes = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  danger: 'bg-red-600 text-white hover:bg-red-800',
  neutral: 'bg-white text-black hover:bg-neutral-200'
};

const className = classes[props.variant ?? 'primary'];
</script>

<template>
  <button
    :class="`p-1 rounded-full shadow flex items-center justify-center cursor-pointer transition ${className}`"
    :type="type || 'button'"
  >
    <span class="material-icons">{{ icon }}</span>
  </button>
</template>
