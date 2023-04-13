<template>
  <div class="flex justify-center">
    <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
      <circle
        class="stroke-neutral-700"
        cx="50"
        cy="50"
        r="25"
        stroke-width="8"
        fill="none"
        :style="{
          strokeDasharray: 156,
          strokeDashoffset: 156,
          animation: 'load 2.3s infinite'
        }"
      />
    </svg>
  </div>
</template>
