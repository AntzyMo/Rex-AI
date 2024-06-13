<script setup lang="ts">
  import { aiRegex, aiRegexIdx, regex, setRegex } from '@/logics'

  const loading = ref(false)

  onMounted(() => {
    setRegex(regex)
  })
</script>

<template>
  <div class="mx-5 grid gap-1">
    <ClientOnly>
      <div flex="~ items-center gap-1.2">
        <IconButton
          v-for="(item, index) in aiRegex"
          :key="item"
          class="p-1!"
          :icon="`i-carbon:number-${index + 1}`"
          :checked="aiRegexIdx === index"
          @click="setRegex(item)"
        />
      </div>
    </ClientOnly>
    <Editor
      v-model.trim="regex"
      :loading="loading"
      placeholder="Regex..."
      class="px-2 py-1 mb-5 focus-within:border-gray-400/80 transition "
      border="~ rounded gray-300"
    />
  </div>
</template>
