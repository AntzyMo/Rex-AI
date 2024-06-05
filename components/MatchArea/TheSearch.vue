<script setup lang="ts">
  import { regex } from '@/logics'
</script>

<template>
  <Editor
    v-model="regex"
    class="px-2 py-1 focus-within:border-gray-400/80 transition m-5"
    border="~ rounded gray-300"
  />
</template>
