<script setup lang="ts">
  defineOptions({
    inheritAttrs: false
  })
  defineProps<{
    title: string
  }>()
  const modelValue = defineModel<string>()
</script>

<template>
  <div>
    <p class="text-xs text-gray-500 mb-1 ml-1">
      {{ title }}
    </p>
    <div class="bg-light-300 rounded w-full px-2 py-1" border="~  transparent focus-within:gray-300">
      <input
        v-bind="$attrs"
        v-model.trim="modelValue"
        outline-none
        class="w-full bg-transparent text-sm"
      >
    </div>
  </div>
</template>
