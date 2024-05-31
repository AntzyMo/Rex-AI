<script setup lang="ts">
  import { content, flags, regex } from '@/logics'

  const regexp = computed(() => {
    try {
      return new RegExp(regex.value, flags.value)
    } catch (e) {
      console.error(e)
      return ''
    }
  })
  const matches = computed(() => [...content.value.matchAll(regexp.value)])
</script>

<template>
  <Editor
    v-model="content"
    :matches
    :class="{ source: regex }"
  />
</template>
