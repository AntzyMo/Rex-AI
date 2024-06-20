<script setup lang="ts">
  import { modelSetting } from '@/logics'
</script>

<template>
  <div class="w-xs font-mono pr-4">
    <div>
      <h1 class="mb-1">
        Model
      </h1>
      <div class="grid gap-6">
        <div border-t="~ gray-200" class="pt-2">
          <div class="text-sm mb-4" flex="~ items-center gap-2">
            <div i-simple-icons:microsoftazure class="text-sm" />
            Azure OpenAI
          </div>
          <div class="grid gap-3">
            <Input v-model="modelSetting.azureApiKey" type="password" title="API Key" />
            <Input v-model="modelSetting.azureResourceName" title="Resource Name" />
          </div>
        </div>

        <div border-t="~ gray-200" class="pt-2">
          <div class="text-sm mb-4" flex="~ items-center gap-2">
            <div i-simple-icons:openai class="text-sm" />
            OpenAI
          </div>
          <div class="grid gap-3">
            <Input v-model="modelSetting.openaiApiKey" type="password" title="API Key" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
