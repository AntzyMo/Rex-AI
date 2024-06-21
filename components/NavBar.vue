<script setup lang="ts">
</script>

<template>
  <nav class="mx-5  pb-3 font-mono" flex="~ items-start justify-between">
    <div class="" flex="~ items-center gap-1">
      <span i-tabler:regex class="text-gray-400 text-xl" />
      <div class="mt-2">
        <h1 class="text-xs self-end">
          Rex AI
        </h1>
      </div>
    </div>
    <div class="text-10px text-end text-gray-400">
      <div flex="~ items-center justify-end">
        <a
          i-carbon:logo-github
          href="https://github.com/AntzyMo/Rex-AI"
          target="_blank"
          class="text-xs cursor-pointer hover:text-gray-500"
        />
      </div>
      <div class="select-none">
        <p>© 2024-PRESENT</p>
        <p>Made By AntzyMo </p>
      </div>
    </div>
  </nav>
</template>
