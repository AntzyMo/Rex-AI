<script setup lang="ts">
  import 'splitpanes/dist/splitpanes.css'
  import { Pane, Splitpanes } from 'splitpanes'

  import { content, flags, fullResultIdx, regex } from '@/logics'

  const regexp = computed(() => {
    try {
      return new RegExp(regex.value, flags.value)
    } catch (e) {
      console.error(e)
      return ''
    }
  })

  const matches = computed(() => [...content.value.matchAll(regexp.value)])

  const iconsMatchNumbers = computed(() => {
    const matchLength = matches.value?.[0]?.length
    return Array.from({ length: matchLength }, (_, i) => `i-carbon:number-${i + 1}`)
  })

  const fullResult = computed(() => {
    return matches.value.map(item => item[fullResultIdx.value])
      .filter(Boolean)
      .join('\n')
  })
</script>

<template>
  <Splitpanes horizontal class=" overflow-hidden">
    <Pane flex="~ 1 col" class="px-5">
      <div flex="~ items-center justify-between" class="mb-3">
        <div flex="~ items-center" class="text-gray-500 gap-1.5">
          <div i-carbon:text-annotation-toggle text-xl />
          <span class="text-gray-400 text-sm">TEXT</span>
        </div>
        <div flex="~ items-center" class="text-gray-500 gap-3">
          <button i-carbon:trash-can text-xl />
          <button i-carbon:copy text-xl />
        </div>
      </div>
      <div class="overflow-auto">
        <Editor
          v-model="content"
          :matches
          :class="{ source: regex }"
        />
      </div>
    </Pane>
    <Pane size="30" class="px-5 mt-3">
      <div flex="~ items-center justify-between" class="mb-3">
        <div flex="~ items-center" class="text-gray-500 gap-1.5">
          <div i-carbon:migrate class="text-xl rotate-270" />
          <span class="text-gray-400 text-sm">MATCH</span>
        </div>
        <div flex="~ items-center" class="text-gray-500 gap-3">
          <template v-if="iconsMatchNumbers.length > 1">
            <button
              v-for="(item, index) in iconsMatchNumbers"
              :key="item"
              :class="item"
              class="text-xl"
              @click="fullResultIdx = index"
            />
          </template>
          <button i-carbon:copy text-xl />
        </div>
      </div>
      <div class="overflow-auto">
        <Editor :model-value="fullResult" class="fullResult" />
      </div>
    </Pane>
  </Splitpanes>
</template>

<style scoped>
:global(.splitpanes__splitter){
  background-color: #f0f0f0;
  border: 1px solid #e0e0e0;
  cursor: ew-resize;
}
</style>
