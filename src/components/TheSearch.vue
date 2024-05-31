<script setup lang="ts">
  import { regex } from '@/logics'
</script>

<template>
  <Editor
    v-model="regex"
    class="px-2 py-1 focus-within:border-orange-400"
    border="~ rounded gray-300"
  />
</template>
