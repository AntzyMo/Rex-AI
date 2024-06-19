<script setup lang="ts">
  import { aiRegex, regex, setRegex } from '@/logics'

  const loading = ref(false)
  let isFlag = 0
  watch(aiRegex, (val = []) => {
    if (val.length && isFlag < 1) {
      regex.value = ''
      loading.value = true
      isFlag++
      setRegex(val.at(-1)!, true, {
        onFinished() {
          loading.value = false
          isFlag = 0
        }
      })
    }
  })
</script>

<template>
  <div class="mx-5 grid gap-1">
    <Editor
      v-model.trim="regex"
      :loading="loading"
      placeholder="Regex..."
      class="px-2 py-1 mb-5 focus-within:border-gray-400/80 transition "
      border="~ rounded gray-300"
    />
  </div>
</template>
