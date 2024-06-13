<script setup lang="ts">
  import 'splitpanes/dist/splitpanes.css'
  import { Pane, Splitpanes } from 'splitpanes'

  import { content, flags, regex } from '@/logics'

  enum IconsIsNumber {
    'i-carbon:number-1',
    'i-carbon:number-2',
    'i-carbon:number-3',
    'i-carbon:number-4',
    'i-carbon:number-5',
    'i-carbon:number-6',
    'i-carbon:number-7',
    'i-carbon:number-8',
    'i-carbon:number-9'
  }

  const { copy } = useClipboard()

  const regexp = computed(() => {
    try {
      return new RegExp(regex.value, flags.value)
    } catch (e) {
      console.error(e)
      return /\b/g
    }
  })

  const matches = computed(() => [...content.value?.matchAll?.(regexp.value)])

  const iconsMatchNumbers = computed(() => {
    const matchLength = matches.value?.[0]?.length
    return Array.from({ length: matchLength }, (_, i) => IconsIsNumber[i])
  })

  const fullResultIdx = ref(0)
  const fullResult = computed(() => {
    return matches.value.map(item => item[fullResultIdx.value])
      .filter(Boolean)
      .join('\n')
  })
</script>

<template>
  <Splitpanes horizontal>
    <Pane flex="~ col">
      <div flex="~ items-center justify-between" class="mb-3 mx-5">
        <div flex="~ items-center" class="text-gray-500 gap-1.5">
          <div i-carbon:text-annotation-toggle text-xl />
          <span class="text-gray-400 text-sm">TEXT</span>
        </div>
        <div flex="~ items-center" class="text-gray-500 gap-1">
          <IconButton icon="i-carbon:text-clear-format text-xl" title="Clear" @click="content = ''" />
          <IconButton icon="i-carbon:copy text-xl" title="Copy" @click="copy(content)" />
        </div>
      </div>
      <div class="overflow-auto mb-1 scrollbar-lite ml-5 ">
        <Editor
          v-model.trim="content"
          :matches
          :class="{ source: regex }"
          placeholder="Paste your content here..."
        />
      </div>
    </Pane>
    <Pane size="40" flex="~  col" class="mt-3">
      <div flex="~ items-center justify-between" class=" mx-5">
        <div flex="~ items-center" class="text-gray-500 gap-1.5">
          <div i-carbon:migrate class="text-xl rotate-270" />
          <span class="text-gray-400 text-sm">MATCH</span>
        </div>
        <div flex="~ items-center" class="text-gray-700 gap-3">
          <template v-if="iconsMatchNumbers.length > 1">
            <IconButton
              v-for="(item, index) in iconsMatchNumbers"
              :key="item"
              :icon="`${item} text-xl`"
              :title="`Group ${index + 1}`"
              :checked="fullResultIdx === index"
              @click="fullResultIdx = index"
            />
          </template>
        </div>
      </div>
      <div class="overflow-auto scrollbar-lite ml-5">
        <Editor
          :model-value="fullResult"
          read-only
          class="fullResult"
          placeholder="No found..."
        />
      </div>
    </Pane>
  </Splitpanes>
</template>

<style scoped>
:global(.splitpanes__splitter){
  background-color: #f5f5f5;
  opacity: .9;
  border: 1px solid #e0e0e0;
  cursor: ew-resize;
}
</style>
