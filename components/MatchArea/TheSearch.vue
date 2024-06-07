<script setup lang="ts">
  import { regex } from '@/logics'
</script>

<template>
  <Editor
    v-model.trim="regex"
    placeholder="Regex..."
    class="px-2 py-1 mb-5 focus-within:border-gray-400/80 transition mx-5"
    border="~ rounded gray-300"
  />
</template>
