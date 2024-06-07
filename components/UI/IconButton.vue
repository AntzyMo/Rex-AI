<script setup lang="ts">
  defineProps<{
    icon: string
  }>()
</script>

<template>
  <button
    class="hover:bg-gray-100 p-1.5 rounded-md transition"
    flex="~ items-center"
  >
    <span :class="icon" />
  </button>
</template>
