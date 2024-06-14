<script setup lang="ts">

</script>

<template>
  <div class="w-xs font-mono pr-4">
    <div>
      <h1 class="mb-1">
        Model
      </h1>
      <div border-t="~ gray-200" class="pt-2">
        <div class="text-sm mb-4" flex="~ items-center gap-2">
          <div i-simple-icons:microsoftazure class="text-sm" />
          Azure OpenAI
        </div>
        <div class="grid gap-3">
          <Input type="password" title="API Key" />
          <Input title="Resource Name" />
        </div>
      </div>
    </div>
  </div>
</template>
