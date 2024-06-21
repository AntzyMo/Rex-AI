<script setup lang="ts">
  defineProps<{
    icon: string | any[]
    checked?: boolean
  }>()
</script>

<template>
  <button
    class="hover:bg-gray-200/70 active:bg-gray-200 p-1.5 rounded-md transition"
    flex="~ items-center"
    :class="{
      'bg-gray-100!': checked,
    }"
  >
    <span :class="icon" />
  </button>
</template>
